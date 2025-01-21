import { Request, Response } from 'express';
import Guide from '../models/guide';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export const getGuides = async (req: Request, res: Response) => {
  const { featured } = req.query;
  try {
    const guides =
      featured && featured === 'true'
        ? await Guide.scan('featured').eq(true).exec()
        : await Guide.scan().exec();
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
      res.status(404).json({ message: 'guide not found' });
      return;
    }

    res.json({ message: 'Guides retrieved successfully', data: guide });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving guide', error });
  }
};

export const createGuide = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { authorId, authorName } = req.body;

    if (!authorId || !authorName) {
      res.status(400).json({ message: 'Author Id and name are required' });
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
      status: 'Draft',
      sections: [],
      features: false,
      createdAt: format(new Date(), 'dd/MM/yyyy'),
      updatedAt: format(new Date(), 'dd/MM/yyyy'),
    });
    await newguide.save();

    res.json({ message: 'guide created successfully', data: newguide });
  } catch (error) {
    res.status(500).json({ message: 'Error creating guide', error });
  }
};

export const deleteGuide = async (req: Request, res: Response) => {
  const { guideId } = req.params;
  const user = req.user;

  try {
    const guide = await Guide.get(guideId);
    if (!guide) {
      res.status(404).json({ message: 'guide not found' });
      return;
    }

    if (guide.authorId !== user?.id) {
      res
        .status(403)
        .json({ message: 'You are not authorized to delete this guide' });
      return;
    }

    await guide.delete();
    res.json({ message: 'guide deleted successfully' });
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
  const user = req.user;

  try {
    const guide = await Guide.get(guideId);
    if (!guide) {
      res.status(404).json({ message: 'Guide not found' });
      return;
    }

    if (guide.teacherId !== user?.id) {
      res.status(403).json({ message: 'Not authorized to update this guide' });
      return;
    }

    if (updateData.sections) {
      const sectionsData =
        typeof updateData.sections === 'string'
          ? JSON.parse(updateData.sections)
          : updateData.sections;

      updateData.sections = sectionsData.map((section: any) => ({
        ...section,
        sectionId: section.sectionId || uuidv4(),
        chapters: section.chapters.map((chapter: any) => ({
          ...chapter,
          chapterId: chapter.chapterId || uuidv4(),
        })),
      }));
    }

    Object.assign(guide, updateData);
    await guide.save();

    res.json({ message: 'Course updated successfully', data: guide });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
  }
};
