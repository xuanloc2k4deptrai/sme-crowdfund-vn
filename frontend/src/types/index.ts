export interface Campaign {
    id: number;
    title: string;
    summary?: string;
    description?: string;
    target: number;
    raised: number;
    status: 'draft' | 'active' | 'funded' | 'completed' | 'cancelled';
    ownerId: number;
    owner?: {
        id: number;
        name?: string;
        email: string;
    };
    imageUrl?: string;
    createdAt: string;
    
    // Backward compatibility with existing code
    fundingGoal?: number;
    currentAmount?: number;
    startDate?: Date;
    endDate?: Date;
    riskLevel?: 'low' | 'medium' | 'high';
    industry?: string;
    type?: 'equity' | 'debt' | 'donation';
    teamMembers?: TeamMember[];
    investors?: number;
    rating?: number;
    location?: string;
}

export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    linkedIn?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'investor' | 'creator' | 'admin';
    password?: string; // Optional for login
    investments?: Investment[];
}

export interface Investment {
    campaignId: string;
    amount: number;
    date: Date;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ApiError {
    message: string;
    code: number;
}