import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    
    const where = status ? { status: String(status) } : {};
    
    const campaigns = await prisma.campaign.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
};

export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campaign = await prisma.campaign.findUnique({
      where: { id: Number(id) },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
};

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const { 
      title, 
      summary, 
      description, 
      target, 
      imageUrl,
      industry,
      riskLevel,
      type,
      location
    } = req.body;
    const userId = (req as any).user.id;
    
    if (!title || !target) {
      return res.status(400).json({ error: 'Title and target amount are required' });
    }
    
    const campaign = await prisma.campaign.create({
      data: {
        title,
        summary,
        description,
        target,
        targetAmount: target, // Add targetAmount field
        imageUrl,
        industry,
        riskLevel,
        type,
        location,
        status: 'draft',
        raised: 0,
        owner: {
          connect: { id: userId }
        },
      },
    });
    
    res.status(201).json(campaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
};

export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      summary, 
      description,
      target, 
      status,
      imageUrl,
      industry,
      riskLevel,
      type,
      location 
    } = req.body;
    const userId = (req as any).user.id;
    
    // Check if campaign exists and belongs to user
    const existingCampaign = await prisma.campaign.findUnique({
      where: { id: Number(id) }
    });
    
    if (!existingCampaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    if (existingCampaign.ownerId !== userId && (req as any).user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this campaign' });
    }
    
    const campaign = await prisma.campaign.update({
      where: { id: Number(id) },
      data: {
        title,
        summary,
        description,
        target,
        status,
        imageUrl,
        industry,
        riskLevel,
        type,
        location
      },
    });
    
    res.json(campaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    
    // Check if campaign exists and belongs to user
    const existingCampaign = await prisma.campaign.findUnique({
      where: { id: Number(id) }
    });
    
    if (!existingCampaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    if (existingCampaign.ownerId !== userId && (req as any).user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this campaign' });
    }
    
    await prisma.campaign.delete({
      where: { id: Number(id) },
    });
    
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
};