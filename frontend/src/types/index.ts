export interface Campaign {
    id: number;
    title: string;
    name?: string;
    summary?: string;
    description?: string;
    shortDescription?: string;
    fullDescription?: string;
    target: number;
    raised: number;
    status?: 'draft' | 'active' | 'funded' | 'completed' | 'cancelled' | 'closed';
    ownerId?: number;
    owner?: {
        id: number;
        name?: string;
        email: string;
    };
    imageUrl?: string;
    coverImage?: string;
    createdAt?: string;
    daysLeft?: number;
    raisedAmount?: number;
    fundingGoal?: number;
    currentAmount?: number;
    investorCount?: number;
    companyName?: string;
    companyLogo?: string;
    location?: string;
    category?: string;
    investmentType?: string;
    expectedROI?: number;
    term?: number;
    riskLevel?: string;
    startDate?: string;
    vision?: string;
    businessModel?: string;
    team?: string;
    fundingPlan?: string;
    endDate?: Date;
    industry?: string;
    type?: 'equity' | 'debt' | 'donation';
    teamMembers?: TeamMember[];
    investors?: number;
    rating?: number;
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