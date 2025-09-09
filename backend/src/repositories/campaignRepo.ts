import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCampaign = async (data) => {
    return await prisma.campaign.create({
        data,
    });
};

export const getCampaignById = async (id) => {
    return await prisma.campaign.findUnique({
        where: { id },
    });
};

export const getAllCampaigns = async (filters) => {
    return await prisma.campaign.findMany({
        where: {
            ...filters,
        },
    });
};

export const updateCampaign = async (id, data) => {
    return await prisma.campaign.update({
        where: { id },
        data,
    });
};

export const deleteCampaign = async (id) => {
    return await prisma.campaign.delete({
        where: { id },
    });
};