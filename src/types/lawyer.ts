export type LawyerSummary = {
  id: string;
  name: string;
  initials: string;
  bio: string | null;
  expertiseAreas: string[];
  location: string | null;
  fee: number | null;
  isAvailable: boolean;
  avatar: string | null;
  rating: number | null;
  reviewCount: number;
  sessionsCount: number;
};

export type LawyerReview = {
  id: string;
  rating: number;
  comment: string | null;
  tags: string[];
  createdAt: string;
};

export type LawyerProfile = LawyerSummary & {
  tier: string | null;
  yearOfCall: string | null;
  reviews: LawyerReview[];
};

export type LawyerSearchParams = {
  name?: string;
  expertise?: string;
  location?: string;
  maxFee?: number;
  minRating?: number;
  available?: boolean;
  page?: number;
  limit?: number;
};

export type LawyerPage = {
  items: LawyerSummary[];
  total: number;
  page: number;
  totalPages: number;
};

export type ExpertiseStat = {
  expertise: string;
  count: number;
};
