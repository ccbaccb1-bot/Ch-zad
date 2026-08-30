import { Artwork, ArtistStats, EcoImpactData } from '../types';

export const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: 'art-01',
    title: 'نبض غابة بنسليمان والذاكرة الحية',
    titleEn: 'Pulse of Ben Slimane Forest & Living Memory',
    artistName: 'نبيل شعوب',
    artistTitle: 'فنان تشكيلي وبصري ومؤسس المنصة',
    artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    artistBio: 'فنان تشكيلي وبصري مغربي، رئيس جمعية فنون الإنسان للبيئة والتنمية بنسليمان. تستلهم أعماله تدرجات الأرض المغربية وعلاقة الإنسان ببيئته الحيوية.',
    artistCity: 'بنسليمان',
    isVerified: true,
    style: 'انطباعي بيئي',
    medium: 'أصباغ ترابية طبيعية وألوان زيتية على قماش الكتان',
    dimensions: {
      widthCm: 120,
      heightCm: 90,
      depthCm: 4
    },
    weightKg: 4.5,
    year: 2024,
    priceMAD: 14500,
    isAuction: true,
    // Set auction end to 2 hours 45 mins in future from session start
    auctionEndsAt: new Date(Date.now() + 1000 * 60 * 165).toISOString(),
    startingBidMAD: 8000,
    currentBidMAD: 12500,
    reservePriceMAD: 11000,
    minIncrementMAD: 500,
    bidsHistory: [
      {
        id: 'b-1',
        bidderName: 'مقتني خاص',
        bidderCity: 'الرباط',
        amountMAD: 8500,
        timestamp: 'منذ ساعتين'
      },
      {
        id: 'b-2',
        bidderName: 'رواق الأندلس الفني',
        bidderCity: 'الدار البيضاء',
        amountMAD: 10000,
        timestamp: 'منذ ساعة'
      },
      {
        id: 'b-3',
        bidderName: 'عاشق الفن الأصيل',
        bidderCity: 'مراكش',
        amountMAD: 12500,
        timestamp: 'منذ 18 دقيقة'
      }
    ],
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579783901450-48227b7d03a1?auto=format&fit=crop&w=1000&q=80'
    ],
    isFramed: true,
    frameOptions: ['gold', 'black', 'natural', 'none'],
    selectedFrame: 'natural',
    story: 'تجسد هذه اللوحة الصراع والتناغم بين أشجار البلوط الفليني في غابات بنسليمان والامتداد الإنساني المعاصر. تم استخدام تربة محلية معالجة ممزوجة بالأصباغ الزيتية لتوثيق هوية الأرض.',
    certificateNumber: 'CHAOUB-CERT-2024-001',
    ecoContributionMAD: 290,
    packagingType: 'eco_box_wooden',
    viewsCount: 1420,
    likesCount: 284,
    isFeatured: true
  },
  {
    id: 'art-02',
    title: 'توهج الطين والأمازيغية',
    titleEn: 'Glow of Clay & Amazigh Roots',
    artistName: 'فاطمة الزهراء الإدريسي',
    artistTitle: 'خريجة المعهد الوطني للفنون الجميلة بتطوان',
    artistAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    artistBio: 'فنانة تشكيلية متخصصة في الرموز البصرية الأمازيغية والوشم التقليدي بأبعاد تجريدية معاصرة.',
    artistCity: 'تطوان',
    isVerified: true,
    style: 'أمازيغي معاصر',
    medium: 'أكريليك ومواد مركبة على خشب السنديان',
    dimensions: {
      widthCm: 80,
      heightCm: 100,
      depthCm: 3
    },
    weightKg: 3.2,
    year: 2024,
    priceMAD: 6800,
    isAuction: false,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85',
    isFramed: true,
    frameOptions: ['gold', 'black', 'natural', 'none'],
    selectedFrame: 'black',
    story: 'استكشاف لعلامات تيفيناغ العريقة كبنية هندسية حية، تمتزج بألوان الحناء والزعفران والأوكر الصحراوي.',
    certificateNumber: 'CHAOUB-CERT-2024-042',
    ecoContributionMAD: 136,
    packagingType: 'eco_box_standard',
    viewsCount: 890,
    likesCount: 156,
    isFeatured: true
  },
  {
    id: 'art-03',
    title: 'إشراقات الحروفية الفاسية',
    titleEn: 'Illuminations of Fassi Calligraphy',
    artistName: 'مولاي رشيد العلمي',
    artistTitle: 'خطاط ومُذهّب فني معتمد',
    artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    artistBio: 'مواليد فاس العتيقة، يمزج بين الخط الكوفي المغربي وتجريد الأفق المعماري للرياضات الأندلسية.',
    artistCity: 'فاس',
    isVerified: true,
    style: 'حروفية مغربية أصيلة',
    medium: 'حبر نباتي وماء الذهب على ورق حريري معتق ومثبت',
    dimensions: {
      widthCm: 70,
      heightCm: 70,
      depthCm: 2
    },
    weightKg: 2.1,
    year: 2023,
    priceMAD: 5200,
    isAuction: true,
    auctionEndsAt: new Date(Date.now() + 1000 * 60 * 45).toISOString(), // 45 mins left!
    startingBidMAD: 3500,
    currentBidMAD: 5400,
    reservePriceMAD: 4500,
    minIncrementMAD: 250,
    bidsHistory: [
      {
        id: 'bf-1',
        bidderName: 'طارق ب.',
        bidderCity: 'طنجة',
        amountMAD: 4000,
        timestamp: 'منذ 35 دقيقة'
      },
      {
        id: 'bf-2',
        bidderName: 'سارة م.',
        bidderCity: 'باريس',
        amountMAD: 4800,
        timestamp: 'منذ 15 دقيقة'
      },
      {
        id: 'bf-3',
        bidderName: 'كريم التازي',
        bidderCity: 'فاس',
        amountMAD: 5400,
        timestamp: 'منذ دقيقتين'
      }
    ],
    image: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1200&q=85',
    isFramed: true,
    frameOptions: ['gold', 'black', 'natural', 'none'],
    selectedFrame: 'gold',
    story: 'أبيات شعرية في العشق الصوفي محفورة بالحرف المغربي المبسوط، مع تذهيب يدوي بذهب عيار 22 قيراط يعكس نور الصباح.',
    certificateNumber: 'CHAOUB-CERT-2024-019',
    ecoContributionMAD: 108,
    packagingType: 'eco_box_standard',
    viewsCount: 1120,
    likesCount: 230,
    isFeatured: true
  },
  {
    id: 'art-04',
    title: 'أطلس الصامت: تجريد الصخور البركانية',
    titleEn: 'Silent Atlas: Volcanic Stone Abstraction',
    artistName: 'ياسين بنجلون',
    artistTitle: 'فنان تشكيلي - المدرسة العليا للفنون بالبيضاء',
    artistAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    artistBio: 'مستكشف للطبيعة الجيولوجية لجبال الأطلس المتوسط والكبير ومترجمها إلى حركات لونية جريئة.',
    artistCity: 'الدار البيضاء',
    isVerified: true,
    style: 'تجريدي معاصر',
    medium: 'ألوان زيتية بالسكين وطبقات شمعية سميكة (Impasto)',
    dimensions: {
      widthCm: 150,
      heightCm: 100,
      depthCm: 4.5
    },
    weightKg: 6.8,
    year: 2024,
    priceMAD: 9200,
    isAuction: false,
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=85',
    isFramed: false,
    frameOptions: ['gold', 'black', 'natural', 'none'],
    selectedFrame: 'none',
    story: 'تراكيب ملمسية مستوحاة من التصدعات الصخرية في مضايق دادس وورزازات، حيث يتداخل الضوء والظلال العميقة.',
    certificateNumber: 'CHAOUB-CERT-2024-088',
    ecoContributionMAD: 184,
    packagingType: 'eco_box_wooden',
    viewsCount: 670,
    likesCount: 94
  },
  {
    id: 'art-05',
    title: 'أزقة شفشاون: سيمفونية النيلة الزرقاء',
    titleEn: 'Chefchaouen Alleys: Indigo Blue Symphony',
    artistName: 'مريم الشاوني',
    artistTitle: 'فنانة مائية وبصرية',
    artistAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    artistBio: 'تختص مريم في توثيق الحارات الشمالية وأثر الضوء الأندلسي على الجدران الكلسية.',
    artistCity: 'طنجة',
    isVerified: true,
    style: 'تشخيصي وتعبيري',
    medium: 'ألوان مائية وأكريليك رقيق على قماش قطني معالج',
    dimensions: {
      widthCm: 60,
      heightCm: 80,
      depthCm: 2.5
    },
    weightKg: 1.8,
    year: 2024,
    priceMAD: 3800,
    isAuction: false,
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=85',
    isFramed: true,
    frameOptions: ['gold', 'black', 'natural', 'none'],
    selectedFrame: 'natural',
    story: 'لقطة شاعرية لباب تقليدي مغربي مع ظلال شجرة الياسمين المتدلية، بأصباغ النيلة المغربية الأصلية.',
    certificateNumber: 'CHAOUB-CERT-2024-104',
    ecoContributionMAD: 76,
    packagingType: 'tube',
    viewsCount: 1540,
    likesCount: 310
  },
  {
    id: 'art-06',
    title: 'أفق الساحل الصويري والرياح',
    titleEn: 'Essaouira Coastal Horizon & Winds',
    artistName: 'حمزة الصويري',
    artistTitle: 'فنان فطري معاصر',
    artistAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    artistBio: 'يواصل مسيرة الفن الكناوي الفطري المستلهم من أمواج موكادور وأشجار الأركان.',
    artistCity: 'الصويرة',
    isVerified: true,
    style: 'سريالي رمزي',
    medium: 'تقنية مختلطة، خشب الأركان وأصباغ طبيعية',
    dimensions: {
      widthCm: 90,
      heightCm: 90,
      depthCm: 3
    },
    weightKg: 3.5,
    year: 2024,
    priceMAD: 4900,
    isAuction: true,
    auctionEndsAt: new Date(Date.now() + 1000 * 60 * 320).toISOString(),
    startingBidMAD: 3000,
    currentBidMAD: 4600,
    reservePriceMAD: 4000,
    minIncrementMAD: 200,
    bidsHistory: [
      {
        id: 'be-1',
        bidderName: 'أمينة ز.',
        bidderCity: 'مراكش',
        amountMAD: 3500,
        timestamp: 'منذ ساعتين'
      },
      {
        id: 'be-2',
        bidderName: 'مقتني دولي',
        bidderCity: 'دبي',
        amountMAD: 4600,
        timestamp: 'منذ 40 دقيقة'
      }
    ],
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&q=85',
    isFramed: true,
    frameOptions: ['gold', 'black', 'natural', 'none'],
    selectedFrame: 'black',
    story: 'رمزيات بصرية مستوحاة من رقصة القراقيب والموسيقى الروحية وطائر النورس المحلق فوق أسوار الصويرة العتيقة.',
    certificateNumber: 'CHAOUB-CERT-2024-112',
    ecoContributionMAD: 92,
    packagingType: 'eco_box_standard',
    viewsCount: 780,
    likesCount: 145
  }
];

export const INITIAL_ARTIST_STATS: ArtistStats = {
  viewsThisMonth: 3420,
  totalArtworkViews: 12850,
  activeListings: 4,
  soldArtworks: 7,
  totalSalesMAD: 46500,
  pendingEscrowMAD: 12500, // In 48-hour escrow protection
  withdrawableMAD: 34000,
  promoSavedCommissionMAD: 5580, // Saved due to 0% promo
  freeSalesRemaining: 1, // First 2 free promotional sales
  topCities: [
    { city: 'الدار البيضاء', percentage: 42 },
    { city: 'الرباط', percentage: 24 },
    { city: 'مراكش', percentage: 16 },
    { city: 'باريس', percentage: 12 },
    { city: 'دبي', percentage: 6 }
  ]
};

export const INITIAL_ECO_IMPACT: EcoImpactData = {
  totalContributionsMAD: 18420,
  targetContributionsMAD: 54000,
  treesPlantedBenSlimane: 240,
  workshopsOrganized: 8,
  beneficiaryYouth: 185,
  nextEvent: {
    title: 'ورشة الفن الإيكولوجي وغرس 50 شجرة بلوط',
    date: '15 أكتوبر 2024',
    location: 'غابة بنسليمان - الفضاء البيئي لجمعية فنون الإنسان'
  }
};
