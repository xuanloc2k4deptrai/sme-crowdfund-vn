export interface CampaignFormData {
  // Basic Information
  title: string;
  summary: string;
  description: string;
  category: string;
  industry: string;
  location: string;
  
  // Financial Information
  targetAmount: number;
  minimumInvestment: number;
  maximumInvestment: number;
  investmentType: 'equity' | 'debt' | 'reward';
  expectedROI: number;
  investmentTerm: number; // months
  
  // Business Information
  businessModel: string;
  revenueModel: string;
  marketSize: string;
  competitiveAdvantage: string;
  useOfFunds: string;
  financialProjection: string;
  teamDescription: string;
  vision: string;
  mission: string;
  
  // Campaign Settings
  daysToRun: number;
  startDate: Date | null;
  riskLevel: 'low' | 'medium' | 'high';
  
  // Media
  coverImage: File | null;
  videoUrl: string;
  pitchDeckUrl: string;
  
  // SEO
  tags: string[];
  slug: string;
}

export interface CampaignValidationErrors {
  [key: string]: string;
}

export interface Document {
  id?: number;
  filename: string;
  originalName: string;
  fileType: string;
  fileSize: number;
  documentType: DocumentType;
  isVerified: boolean;
  uploadedAt: Date;
}

export type DocumentType = 
  | 'business_license'
  | 'financial_statement' 
  | 'tax_certificate'
  | 'pitch_deck'
  | 'business_plan'
  | 'market_research'
  | 'legal_documents'
  | 'identity_verification'
  | 'other';

export interface Milestone {
  id?: number;
  title: string;
  description: string;
  targetAmount: number;
  deadline: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
}

export interface CampaignUpdate {
  id?: number;
  title: string;
  content: string;
  imageUrl?: string;
  isPublic: boolean;
  createdAt: Date;
}

export interface Campaign {
  id: number;
  title: string;
  summary: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  status: CampaignStatus;
  category: string;
  industry: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date | null;
  endDate: Date | null;
  imageUrl: string | null;
  videoUrl: string | null;
  riskLevel: string;
  rating: number;
  investors: number;
  
  // Business details
  businessModel: string;
  revenueModel: string;
  marketSize: string;
  competitiveAdvantage: string;
  useOfFunds: string;
  teamDescription: string;
  vision: string;
  mission: string;
  
  // Investment terms
  investmentType: string;
  minimumInvestment: number;
  maximumInvestment: number | null;
  expectedROI: number | null;
  investmentTerm: number | null;
  
  // Verification
  isVerified: boolean;
  verificationDate: Date | null;
  complianceStatus: string;
  
  // SEO
  slug: string | null;
  tags: string | null;
  
  // Relations
  owner: {
    id: number;
    name: string;
    companyName: string | null;
    isVerified: boolean;
  };
  documents: Document[];
  milestones: Milestone[];
  updates: CampaignUpdate[];
}

export type CampaignStatus = 
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'rejected';