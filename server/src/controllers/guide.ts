import { Request, Response } from 'express';
import Guide from '../models/guide';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { SessionUser } from '../types';

export const getGuides = async (req: Request, res: Response) => {
  const { featured } = req.query;
  try {
    const guides =
      featured && featured === 'true'
        ? await Guide.scan('featured').eq(true).exec()
        : await Guide.scan('status').eq('published').exec();
    res.json({ message: 'guides retrieved successfully', data: guides });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving guides', error });
  }
};

export const getGuide = async (req: Request, res: Response) => {
  const { guideId } = req.params;
  try {
    const guide = await Guide.get(guideId);
    if (!guide) {
      res.status(404).json({ error: 'guide not found' });
      return;
    }

    res.json({ message: 'Guides retrieved successfully', data: guide });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving guide', error });
  }
};

export const getMyGuides = async (req: Request, res: Response) => {
  const user = req.user as SessionUser;
  try {
    const guides = await Guide.scan('authorId').eq(user.id).exec();
    res.json({ message: 'Guides retrieved successfully', data: guides });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving guides', error });
  }
};

export const getFavouriteGuides = async (req: Request, res: Response) => {
  const user = req.user as SessionUser;
  try {
    const favouriteIds = user.favourites || [];
    const guides = await Guide.batchGet(favouriteIds);
    res.json({ message: 'Guides retrieved successfully', data: guides });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving guides', error });
  }
};

export const createGuide = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { authorId, authorName } = req.body;
    if (!authorId || !authorName) {
      res.status(400).json({ error: 'Author Id and name are required' });
      return;
    }

    const newguide = new Guide({
      guideId: uuidv4(),
      authorId,
      authorName,
      title: 'Untitled guide',
      description: '',
      category: 'Uncategorized',
      image: '',
      status: 'draft',
      sections: [],
      features: false,
      createdAt: format(new Date(), 'dd/MM/yyyy'),
      updatedAt: format(new Date(), 'dd/MM/yyyy'),
    });

    await newguide.save();
    res.json({ data: newguide });
  } catch (error) {
    res.status(500).json({ message: 'Error creating guide', error });
  }
};

export const deleteGuide = async (req: Request, res: Response) => {
  const { guideId } = req.params;
  const user = req.user as SessionUser;

  try {
    const guide = await Guide.get(guideId);
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

    await guide.delete();
    res.json({ data: 'Guide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting guide', error });
  }
};

export const updateGuide = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { guideId } = req.params;
  const updateData = { ...req.body };
  const user = req.user as SessionUser;

  try {
    const guide = await Guide.get(guideId);
    if (!guide) {
      res.status(404).json({ message: 'Guide not found' });
      return;
    }

    if (guide.authorId !== (user?.id || '')) {
      res.status(403).json({ message: 'Not authorized to update this guide' });
      return;
    }

    guide.updatedAt = format(new Date(), 'dd/MM/yyyy');
    guide.title = updateData.title;
    guide.description = updateData.description;
    guide.sections = updateData.sections;
    guide.status = updateData.status;
    console.log(guide);
    await guide.save();

    res.json({ message: 'Guide updated successfully', data: guide });
  } catch (error) {
    res.status(500).json({ message: 'Error updating guide', error });
  }
};
