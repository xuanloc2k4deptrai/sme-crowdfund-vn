export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Campaign {
    id: string;
    title: string;
    description: string;
    fundingGoal: number;
    currentAmount: number;
    startDate: Date;
    endDate: Date;
    ownerId: string;
    status: 'active' | 'completed' | 'failed';
    createdAt: Date;
    updatedAt: Date;
}

export interface Investment {
    id: string;
    userId: string;
    campaignId: string;
    amount: number;
    createdAt: Date;
}

export interface Notification {
    id: string;
    userId: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
}

export interface AuthResponse {
    user: User;
    token: string;
}