import { Request, Response } from 'express';
import Guide from '../models/guide';
import User from '../models/user';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { SessionUser } from '../types';
import { uploadImgS3, getImgS3, deleteImgS3 } from '../libs/utils';

export const getGuides = async (req: Request, res: Response) => {
  try {
    const guides = await Guide.find({ status: 'published' });
    const updatedGuides = await Promise.all(
      guides.map(async (guide) => {
        if (guide.image) {
          guide.image = await getImgS3(guide.image);
        }
        return guide;
      })
    );
    res.json({ message: 'guides retrieved successfully', data: updatedGuides });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving guides', error });
  }
};

export const getFeatured = async (req: Request, res: Response) => {
  try {
    const guides = await Guide.find({ status: 'published' });
    const topGuides = guides
      .sort((a, b) => b.favourites - a.favourites)
      .slice(0, 7);
    const updatedGuides = await Promise.all(
      topGuides.map(async (guide) => {
        if (guide.image) {
          guide.image = await getImgS3(guide.image);
        }
        return guide;
      })
    );
    res.json({
      message: 'featured guides retrieved successfully',
      data: updatedGuides,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving featured guides', error });
  }
};

export const getGuide = async (req: Request, res: Response) => {
  const { guideId } = req.params;
  try {
    const guide = await Guide.findById(guideId);
    if (!guide) {
      res.status(404).json({ error: 'guide not found' });
      return;
    }

    if (guide.image) guide.image = await getImgS3(guide.image);
    res.json({ message: 'Guides retrieved successfully', data: guide });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving guide', error });
  }
};

export const getMyGuides = async (req: Request, res: Response) => {
  const user = req.user as SessionUser;
  try {
    const guides = await Guide.find({ authorId: user.id });
    const updatedGuides = await Promise.all(
      guides.map(async (guide) => {
        if (guide.image) {
          guide.image = await getImgS3(guide.image);
        }
        return guide;
      })
    );
    res.json({ message: 'guides retrieved successfully', data: updatedGuides });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving guides', error });
  }
};

export const getFavouriteGuides = async (req: Request, res: Response) => {
  const user = req.user as SessionUser;
  try {
    const favouriteIds = user.favourites || [];
    const guides = await Guide.find({ _id: { $in: favouriteIds } });
    const updatedGuides = await Promise.all(
      guides.map(async (guide) => {
        if (guide.image) {
          guide.image = await getImgS3(guide.image);
        }
        return guide;
      })
    );
    res.json({ message: 'guides retrieved successfully', data: updatedGuides });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving guides', error });
  }
};

export const createGuide = async (
  req: Request,
  res: Response
): Promise<void> => {
  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    const { authorId, authorName } = req.body;
    if (!authorId || !authorName) {
      await dbSession.abortTransaction();
      res.status(400).json({ error: 'Author Id and name are required' });
      return;
    }

    const [newGuide] = await Guide.create(
      [
        {
          authorId,
          authorName,
          title: 'Untitled guide',
          description: '',
          category: 'Uncategorized',
          image: '',
          status: 'draft',
          sections: [],
          featured: false,
          createdAt: format(new Date(), 'dd/MM/yyyy'),
          updatedAt: format(new Date(), 'dd/MM/yyyy'),
        },
      ],
      { session: dbSession }
    );
    await Guide.findByIdAndUpdate(
      newGuide._id,
      {
        guideId: newGuide._id,
      },
      {
        session: dbSession,
      }
    );
    await dbSession.commitTransaction();
    res.json({ data: newGuide });
  } catch (error) {
    await dbSession.abortTransaction();
    res.status(500).json({ message: 'Error creating guide', error });
  } finally {
    dbSession.endSession();
  }
};

export const deleteGuide = async (req: Request, res: Response) => {
  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    const { guideId } = req.params;
    const user = req.user as SessionUser;
    const guide = await Guide.findById(guideId);
    if (!guide) {
      res.status(404).json({ error: 'guide not found' });
      return;
    }

    if (guide.authorId !== (user?.id || '')) {
      res
        .status(403)
        .json({ error: 'You are not authorized to delete this guide' });
      return;
    }

    await guide.deleteOne({ session: dbSession });
    await dbSession.commitTransaction();
    if (guide.image) await deleteImgS3(guide.image);
    res.json({ data: 'Guide deleted successfully' });
  } catch (error) {
    await dbSession.abortTransaction();
    res.status(500).json({ message: 'Error deleting guide', error });
  } finally {
    dbSession.endSession();
  }
};

export const updateGuide = async (
  req: Request,
  res: Response
): Promise<void> => {
  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    const { guideId } = req.params;
    const updateData = { ...JSON.parse(req.body.guide) };
    const user = req.user as SessionUser;
    const guide = await Guide.findById(guideId).session(dbSession);
    if (!guide) {
      res.status(404).json({ message: 'Guide not found' });
      return;
    }

    if (guide.authorId !== (user?.id || '')) {
      res.status(403).json({ message: 'Not authorized to update this guide' });
      return;
    }

    if (req.file) {
      await uploadImgS3(req.file, guideId);
      guide.image = guideId;
    }

    guide.updatedAt = format(new Date(), 'dd/MM/yyyy');
    guide.title = updateData.title;
    guide.description = updateData.description;
    guide.sections = updateData.sections;
    guide.status = updateData.status;
    await guide.save({ session: dbSession });
    await dbSession.commitTransaction();
    res.json({ message: 'Guide updated successfully', data: guide });
  } catch (error) {
    await dbSession.abortTransaction();
    res.status(500).json({ message: 'Error updating guide', error });
  } finally {
    dbSession.endSession();
  }
};

export const likeGuide = async (req: Request, res: Response) => {
  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    const { guideId } = req.params;
    const user = req.user as SessionUser;
    const guide = await Guide.findById(guideId);
    if (!guide) {
      res.status(404).json({ error: 'guide not found' });
      return;
    }

    const liked = user.favourites?.includes(guideId);
    guide.favourites += liked ? -1 : 1;
    const updatedFavourites = liked
      ? user.favourites.filter((id) => id !== guideId)
      : [...(user.favourites || []), guideId];

    await guide.save({ session: dbSession });
    await User.findByIdAndUpdate(
      user.id,
      { favourites: updatedFavourites },
      { session: dbSession }
    );
    await dbSession.commitTransaction();
    res.json({ data: 'Endorse Guide Successfully' });
  } catch (error) {
    await dbSession.abortTransaction();
    res.status(500).json({ message: 'Error endorsing guide', error });
  } finally {
    dbSession.endSession();
  }
};
