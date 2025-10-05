import { apiClient } from './apiClient';
import { Campaign } from '../types';
import { mockCampaigns } from '../mocks/campaignMock';

export interface CampaignFilter {
  industry?: string;
  fundingAmount?: string;
  risk?: string;
  type?: string;
  status?: string;
  ownerId?: string;
}

// Campaign services
export const fetchCampaigns = async (filters: CampaignFilter = {}): Promise<Campaign[]> => {
  try {
    // Check if we should use mock data
    if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
      // Filter mock campaigns based on provided filters
      let filtered = [...mockCampaigns];
      
    if (filters.ownerId) {
        filtered = filtered.filter(c => c.ownerId?.toString() === filters.ownerId);
    }      if (filters.industry) {
        filtered = filtered.filter(c => c.industry === filters.industry);
      }
      
      if (filters.status) {
        filtered = filtered.filter(c => c.status === filters.status);
      }
      
      return new Promise(resolve => {
        setTimeout(() => resolve(filtered), 500); // Add artificial delay
      });
    }
    
    // For production with real API
    const response = await apiClient.get('/campaigns', filters);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

export const fetchCampaignById = async (id: number) => {
  try {
    // Check if we should use mock data
    if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
      const campaign = mockCampaigns.find(c => c.id === id);
      if (!campaign) {
        throw new Error('Campaign not found');
      }
      return new Promise(resolve => {
        setTimeout(() => resolve(campaign), 500); // Add artificial delay
      });
    }
    
    const response = await apiClient.get(`/campaigns/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching campaign ${id}:`, error);
    throw error;
  }
};

interface CampaignData {
  title: string;
  summary?: string;
  description?: string;
  target: number;
  imageUrl?: string;
  industry?: string;
  riskLevel?: string;
  type?: string;
  location?: string;
  [key: string]: any;
}

export const createCampaign = async (campaignData: CampaignData) => {
  try {
    const response = await apiClient.post('/campaigns', campaignData);
    return response.data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
};

export const updateCampaign = async (id: number, campaignData: Partial<CampaignData>) => {
  try {
    const response = await apiClient.put(`/campaigns/${id}`, campaignData);
    return response.data;
  } catch (error) {
    console.error(`Error updating campaign ${id}:`, error);
    throw error;
  }
};

export const deleteCampaign = async (id: number) => {
  try {
    const response = await apiClient.delete(`/campaigns/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting campaign ${id}:`, error);
    throw error;
  }
};
