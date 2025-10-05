import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCampaign = async (data: any) => {
    return await prisma.campaign.create({
        data,
    });
};

export const getCampaignById = async (id: any) => {
    return await prisma.campaign.findUnique({
        where: { id },
    });
};

export const getAllCampaigns = async (filters: any) => {
    return await prisma.campaign.findMany({
        where: {
            ...filters,
        },
    });
};

export const updateCampaign = async (id: any, data: any) => {
    return await prisma.campaign.update({
        where: { id },
        data,
    });
};

export const deleteCampaign = async (id: any) => {
    return await prisma.campaign.delete({
        where: { id },
    });
};