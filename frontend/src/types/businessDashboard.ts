// Extended interfaces for comprehensive business dashboard

export interface Investor {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  investmentAmount: number;
  investmentDate: Date;
  investmentType: 'equity' | 'debt' | 'reward';
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  equityPercentage?: number;
  expectedReturn?: number;
  location?: string;
  investorType: 'individual' | 'institutional' | 'accredited';
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  previousInvestments?: number;
  notes?: string;
  verified?: boolean;
  totalInvestments?: number;
  portfolio?: string[];
  phone?: string;
  age?: number | null;
  occupation?: string;
}

export interface Campaign {
  id: number;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  percentage: number;
  status: 'draft' | 'active' | 'funded' | 'closed' | 'cancelled';
  startDate: Date;
  endDate: Date;
  daysRemaining: number;
  category: string;
  imageUrl?: string;
  
  // Enhanced fields
  investors: Investor[];
  totalInvestors: number;
  averageInvestment: number;
  conversionRate: number;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  
  // Financial details
  minimumInvestment: number;
  maximumInvestment?: number;
  investmentType: 'equity' | 'debt' | 'reward';
  expectedROI?: number;
  
  // Progress tracking
  milestones: Milestone[];
  updates: CampaignUpdate[];
  documents: Document[];
  
  // Performance metrics
  dailyFunding: DailyFunding[];
  investorDemographics: InvestorDemographics;
  marketingMetrics: MarketingMetrics;
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  completionDate?: Date;
}

export interface CampaignUpdate {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: Date;
  views: number;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  replies?: Comment[];
}

export interface DailyFunding {
  date: Date;
  amount: number;
  investorCount: number;
  averageInvestment: number;
}

export interface InvestorDemographics {
  ageGroups: { range: string; count: number; percentage: number }[];
  locations: { city: string; count: number; percentage: number }[];
  investmentSizes: { range: string; count: number; percentage: number }[];
  investorTypes: { type: string; count: number; percentage: number }[];
}

export interface MarketingMetrics {
  organicTraffic: number;
  socialMediaReach: number;
  emailEngagement: number;
  referralSources: { source: string; visitors: number; conversions: number }[];
  conversionFunnel: {
    visitors: number;
    signups: number;
    investments: number;
    conversionRate: number;
  };
}

export interface BusinessAnalytics {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalFundsRaised: number;
  totalInvestors: number;
  averageFundingTime: number;
  successRate: number;
  
  // Additional metrics for dashboard
  averageROI: number;
  monthlyGrowth: number;
  investorRetentionRate: number;
  averageCampaignDuration: number;
  totalViews: number;
  conversionRate: number;
  topPerformingCampaigns: number[];
  
  // Performance trends
  monthlyTrends: {
    month: string;
    fundsRaised: number;
    newInvestors: number;
    campaignsLaunched: number;
  }[];
  
  // Comparative metrics
  industryBenchmarks: {
    averageSuccessRate: number;
    averageFundingTime: number;
    averageTargetAmount: number;
  };
}

export interface LegalCompliance {
  id: number;
  type: 'financial_report' | 'tax_filing' | 'regulatory_update' | 'investor_communication';
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  requiredDocuments: string[];
  completedDocuments: string[];
}

export interface PayoutSchedule {
  id: number;
  campaignId: number;
  campaignTitle: string;
  amount: number;
  dueDate: Date;
  status: 'scheduled' | 'processing' | 'completed' | 'failed';
  payoutType: 'dividend' | 'interest' | 'principal' | 'reward';
  investors: {
    investorId: number;
    name: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
  }[];
}

export interface CommunicationLog {
  id: number;
  type: 'email' | 'sms' | 'notification' | 'announcement';
  subject: string;
  content: string;
  recipients: number[];
  sentAt: Date;
  openRate?: number;
  clickRate?: number;
  responseRate?: number;
}

export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high';
  factors: {
    marketRisk: number;
    financialRisk: number;
    operationalRisk: number;
    regulatoryRisk: number;
  };
  recommendations: string[];
  lastUpdated: Date;
}