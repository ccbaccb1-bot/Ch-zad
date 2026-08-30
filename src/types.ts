export type UserRole = 'collector' | 'artist' | 'association';

export type ArtStyle = 
  | 'تجريدي معاصر'
  | 'حروفية مغربية أصيلة'
  | 'تشخيصي وتعبيري'
  | 'أمازيغي معاصر'
  | 'انطباعي بيئي'
  | 'سريالي رمزي';

export interface Bid {
  id: string;
  bidderName: string;
  bidderCity: string;
  amountMAD: number;
  timestamp: string;
  isAutomatic?: boolean;
}

export interface Artwork {
  id: string;
  title: string;
  titleEn: string;
  artistName: string;
  artistTitle: string;
  artistAvatar: string;
  artistBio: string;
  artistCity: string;
  isVerified: boolean;
  style: ArtStyle;
  medium: string;
  dimensions: {
    widthCm: number;
    heightCm: number;
    depthCm?: number;
  };
  weightKg: number;
  year: number;
  priceMAD: number;
  isAuction: boolean;
  auctionEndsAt?: string; // ISO string
  startingBidMAD?: number;
  currentBidMAD?: number;
  reservePriceMAD?: number;
  minIncrementMAD?: number;
  bidsHistory?: Bid[];
  image: string;
  additionalImages?: string[];
  isFramed: boolean;
  frameOptions: Array<'gold' | 'black' | 'natural' | 'none'>;
  selectedFrame?: 'gold' | 'black' | 'natural' | 'none';
  story: string;
  certificateNumber: string;
  ecoContributionMAD: number; // 2% of price
  packagingType: 'tube' | 'eco_box_standard' | 'eco_box_wooden';
  viewsCount: number;
  likesCount: number;
  isFeatured?: boolean;
}

export interface ArtistStats {
  viewsThisMonth: number;
  totalArtworkViews: number;
  activeListings: number;
  soldArtworks: number;
  totalSalesMAD: number;
  pendingEscrowMAD: number;
  withdrawableMAD: number;
  promoSavedCommissionMAD: number;
  freeSalesRemaining: number;
  topCities: Array<{ city: string; percentage: number }>;
}

export interface EcoImpactData {
  totalContributionsMAD: number;
  targetContributionsMAD: number;
  treesPlantedBenSlimane: number;
  workshopsOrganized: number;
  beneficiaryYouth: number;
  nextEvent: {
    title: string;
    date: string;
    location: string;
  };
}

export interface FinancialPlanState {
  avgPricePerArtwork: number;
  monthlySalesTarget: number;
  platformFeeRate: number; // e.g. 12%
  associationShareRate: number; // e.g. 2%
}
