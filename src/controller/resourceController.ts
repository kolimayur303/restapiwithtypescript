import { Request, Response } from 'express';
import { Resource } from '../model/resourceModel';


export const createResource = async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      
     const newResource = await Resource.create({ id: null as unknown as number, name : name, description : description });

      res.status(201).json(newResource);
    } catch (error) {
      console.error('Error in creating resource:', error);
      res.status(500).json({ message: 'Internal server error' });    }
  };

export const getResources = async (req: Request, res: Response) => {
  try {
    const resources = await Resource.findAll();
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error in getting resources:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getResourceById = async (req: Request, res: Response) => {
  try {
    const resourceId = req.params.id;
    const resource = await Resource.findByPk(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (error) {
    console.error('Error in getting resource by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const resourceId = req.params.id;
    const { name, description } = req.body;

    const resource = await Resource.findByPk(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    resource.name = name;
    resource.description = description;
    await resource.save();

    res.status(200).json(resource);
  } catch (error) {
    console.error('Error in updating resource:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const resourceId = req.params.id;

    const resource = await Resource.findByPk(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    await resource.destroy();
    res.status(200).json({message : "Data deleted"});

  } catch (error) {
    console.error('Error in deleting resource:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
