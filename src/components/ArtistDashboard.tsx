import React, { useState } from 'react';
import { ArtistStats, Artwork, ArtStyle } from '../types';
import { 
  TrendingUp, 
  Eye, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  PlusCircle, 
  Award, 
  Camera, 
  Building, 
  MapPin, 
  Clock, 
  FileCheck,
  PackageCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ArtistDashboardProps {
  stats: ArtistStats;
  artworks: Artwork[];
  onAddNewArtwork: (artwork: Artwork) => void;
}

export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({
  stats,
  artworks,
  onAddNewArtwork
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'new_listing' | 'verification' | 'youth_prize'>('overview');

  // New Artwork Form State
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [style, setStyle] = useState<ArtStyle>('تجريدي معاصر');
  const [medium, setMedium] = useState('ألوان زيتية وأكريليك على قماش الكتان');
  const [widthCm, setWidthCm] = useState(80);
  const [heightCm, setHeightCm] = useState(100);
  const [depthCm, setDepthCm] = useState(3.5);
  const [weightKg, setWeightKg] = useState(3);
  const [year, setYear] = useState(2024);
  const [isAuction, setIsAuction] = useState(false);
  const [priceMAD, setPriceMAD] = useState(4500);
  const [startingBidMAD, setStartingBidMAD] = useState(3000);
  const [reservePriceMAD, setReservePriceMAD] = useState(4000);
  const [minIncrementMAD, setMinIncrementMAD] = useState(250);
  const [story, setStory] = useState('');
  const [packagingType, setPackagingType] = useState<'tube' | 'eco_box_standard' | 'eco_box_wooden'>('eco_box_standard');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&q=85');
  const [listingSuccess, setListingSuccess] = useState(false);

  // Verification Request Form
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);
  const [diplomaInstitute, setDiplomaInstitute] = useState('المعهد الوطني للفنون الجميلة بتطوان (INBA)');
  const [portfolioLink, setPortfolioLink] = useState('');

  // Youth Prize Registration Form
  const [prizeRegistered, setPrizeRegistered] = useState(false);

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const newArt: Artwork = {
      id: `art-${Date.now()}`,
      title: title || 'لوحة تجريدية جديدة',
      titleEn: titleEn || 'New Contemporary Painting',
      artistName: 'نبيل شعوب',
      artistTitle: 'فنان تشكيلي معتمد',
      artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      artistBio: 'فنان تشكيلي وبصري معتمد في منصة شعوب آرت آند هيومان.',
      artistCity: 'بنسليمان',
      isVerified: true,
      style,
      medium,
      dimensions: {
        widthCm: Number(widthCm),
        heightCm: Number(heightCm),
        depthCm: Number(depthCm)
      },
      weightKg: Number(weightKg),
      year: Number(year),
      priceMAD: Number(priceMAD),
      isAuction,
      startingBidMAD: isAuction ? Number(startingBidMAD) : undefined,
      currentBidMAD: isAuction ? Number(startingBidMAD) : undefined,
      reservePriceMAD: isAuction ? Number(reservePriceMAD) : undefined,
      minIncrementMAD: isAuction ? Number(minIncrementMAD) : undefined,
      auctionEndsAt: isAuction ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString() : undefined,
      bidsHistory: [],
      image: imageUrl,
      isFramed: true,
      frameOptions: ['gold', 'black', 'natural', 'none'],
      selectedFrame: 'natural',
      story: story || 'عمل فني أصيل يجسد الهوية البصرية المغربية والعمق الإنساني.',
      certificateNumber: `CHAOUB-CERT-2024-${Math.floor(100 + Math.random() * 900)}`,
      ecoContributionMAD: Math.round(Number(priceMAD) * 0.02),
      packagingType,
      viewsCount: 1,
      likesCount: 0,
    };

    onAddNewArtwork(newArt);
    setListingSuccess(true);
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch {}
    setTimeout(() => {
      setListingSuccess(false);
      setActiveTab('overview');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Promo Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232735] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              واجهة الفنان التشكيلي
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              لوحة التحكم الاحترافية وإدارة الأعمال
            </h2>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            إدارة المعروضات، إطلاق المزادات المرنة، ومتابعة مبيعات نظام الحبس المالي Escrow
          </p>
        </div>

        {/* 0% Commission Promo Banner */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-[#12161f] border border-emerald-600/40 text-right space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>عرض "العمولة الصفرية 0%" الترويجي نشط</span>
          </div>
          <p className="text-[11px] text-gray-300">
            متبقي لك <strong className="text-white">{stats.freeSalesRemaining} مبيعات مجانية</strong> بدون عمولة منصة (وفرت {stats.promoSavedCommissionMAD.toLocaleString()} د.م)!
          </p>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#232735] pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#c59d5f] text-black shadow-md'
              : 'bg-[#151822] text-gray-300 hover:text-white border border-[#272b38]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>الإحصائيات والأرباح</span>
        </button>

        <button
          onClick={() => setActiveTab('new_listing')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'new_listing'
              ? 'bg-[#c59d5f] text-black shadow-md'
              : 'bg-[#151822] text-gray-300 hover:text-white border border-[#272b38]'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>إدراج عمل جديد / مزاد</span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'verification'
              ? 'bg-[#c59d5f] text-black shadow-md'
              : 'bg-[#151822] text-gray-300 hover:text-white border border-[#272b38]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>طلب توثيق الملف والشهادة</span>
        </button>

        <button
          onClick={() => setActiveTab('youth_prize')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'youth_prize'
              ? 'bg-[#c59d5f] text-black shadow-md'
              : 'bg-[#151822] text-gray-300 hover:text-white border border-[#272b38]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#e5c384]" />
          <span>جائزة نبيل شعوب للشباب</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & STATS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-2">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-[#c59d5f]" />
                إجمالي المبيعات المكتملة
              </span>
              <p className="text-2xl font-black text-[#f4eedb] font-serif-luxury">
                {stats.totalSalesMAD.toLocaleString()} <span className="text-xs text-[#c59d5f]">د.م</span>
              </p>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                تم بيع {stats.soldArtworks} لوحات بنجاح
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-2">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                أموال محبوسة في Escrow (48h)
              </span>
              <p className="text-2xl font-black text-amber-300 font-serif-luxury">
                {stats.pendingEscrowMAD.toLocaleString()} <span className="text-xs text-amber-400">د.م</span>
              </p>
              <span className="text-[11px] text-gray-400">
                تتحرر بعد 48 ساعة من تأكيد استلام المقتني
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-2">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                الرصيد المتاح للتحويل البنكي
              </span>
              <p className="text-2xl font-black text-emerald-400 font-serif-luxury">
                {stats.withdrawableMAD.toLocaleString()} <span className="text-xs text-emerald-300">د.م</span>
              </p>
              <button className="text-[11px] px-2.5 py-1 rounded bg-[#1e2433] hover:bg-[#283145] text-gray-200 border border-[#37425c] cursor-pointer">
                طلب تحويل لحسابك البنكي
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-2">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-sky-400" />
                مشاهدات الأعمال هذا الشهر
              </span>
              <p className="text-2xl font-black text-white font-serif-luxury">
                {stats.viewsThisMonth.toLocaleString()} <span className="text-xs text-gray-400">مشاهدة</span>
              </p>
              <span className="text-[11px] text-sky-400">
                من {stats.topCities.length} مدن رئيسية مهتمة
              </span>
            </div>
          </div>

          {/* Geographical Interest & Packaging Standards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Top Interested Cities */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c59d5f]" />
                <span>توزيع اهتمام المقتنين حسب المدن (Audience Heatmap)</span>
              </h3>
              <p className="text-xs text-gray-400">
                المدن الأكثر زيارة وتفاعلاً مع لوحاتك المعروضة على المنصة
              </p>

              <div className="space-y-3 pt-2">
                {stats.topCities.map((item) => (
                  <div key={item.city} className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>{item.city}</span>
                      <span className="font-mono text-[#e5c384]">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#1e2330] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#996515]"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Packaging Protocol Card (Chaoub Eco-Box) */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-emerald-400" />
                <span>بروتوكول التغليف الإيكولوجي المعتمد (Chaoub Eco-Box)</span>
              </h3>
              <p className="text-xs text-gray-400">
                معايير التغليف الإلزامية لضمان سلامة اللوحة وتفعيل تأمين الشحن مع أرامكس وغزال
              </p>

              <div className="space-y-2.5 text-xs text-gray-300 pt-1">
                <div className="p-3 rounded-xl bg-[#0e1015] border border-[#222736] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#c59d5f]/20 text-[#c59d5f] flex items-center justify-center shrink-0 font-bold">1</span>
                  <p><strong>اللوحات بدون إطار:</strong> تُلف داخل أنابيب كرتونية سميكة مع ورق كرافت واقي ومقاوم للرطوبة.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0e1015] border border-[#222736] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#c59d5f]/20 text-[#c59d5f] flex items-center justify-center shrink-0 font-bold">2</span>
                  <p><strong>اللوحات المؤطرة:</strong> تغطية الزوايا بـ 4 واقيات إسفنجية + لَف بـ 3 طبقات بلاستيك فقاعي + صندوق كرتوني مزدوج مقاوم للصدمات.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0e1015] border border-[#222736] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#c59d5f]/20 text-[#c59d5f] flex items-center justify-center shrink-0 font-bold">3</span>
                  <p><strong>اللوحات الثمينة النادرة:</strong> إدراج داخل صندوق خشب خفيف مُعالج وقفل أمان مخصص.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NEW LISTING & AUCTION WIZARD */}
      {activeTab === 'new_listing' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#13161f] border border-[#272b38] space-y-6">
          <div className="border-b border-[#222633] pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#c59d5f]" />
              <span>إدراج عمل فني تشكيلي جديد</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              سيتم تدقيق العمل وتوليد شهادة الأصالة الرقمية الموثقة برقم تسلسلي خاص
            </p>
          </div>

          {listingSuccess && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-sm font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>تم إدراج العمل وتوليد شهادة الأصالة بنجاح! يتم نقلك للمعرض...</span>
            </div>
          )}

          <form onSubmit={handleCreateListing} className="space-y-6">
            {/* Titles & Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-300 block mb-1 font-medium">عنوان اللوحة (بالعربية) *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: أصداء الأطلس وتوهج الزعفران"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-sm text-white focus:outline-none focus:border-[#c59d5f]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1 font-medium">العنوان بالإنجليزية أو الفرنسية</label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Echoes of Atlas & Saffron Glow"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-sm text-white focus:outline-none focus:border-[#c59d5f]"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1 font-medium">الأسلوب الفني *</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value as ArtStyle)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-sm text-white focus:outline-none focus:border-[#c59d5f]"
                >
                  <option value="تجريدي معاصر">تجريدي معاصر</option>
                  <option value="حروفية مغربية أصيلة">حروفية مغربية أصيلة</option>
                  <option value="تشخيصي وتعبيري">تشخيصي وتعبيري</option>
                  <option value="أمازيغي معاصر">أمازيغي معاصر</option>
                  <option value="انطباعي بيئي">انطباعي بيئي</option>
                  <option value="سريالي رمزي">سريالي رمزي</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1 font-medium">الوسيط والمواد المستخدمة *</label>
                <input
                  type="text"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  placeholder="مثال: أصباغ ترابية وألوان زيتية على قماش الكتان"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-sm text-white focus:outline-none focus:border-[#c59d5f]"
                  required
                />
              </div>
            </div>

            {/* Dimensions for 1:1 AR Studio */}
            <div className="p-4 rounded-2xl bg-[#0d0f15] border border-[#222736] space-y-3">
              <span className="text-xs text-[#e5c384] font-bold block">
                الأبعاد الفيزيائية الدقيقة (تُستخدم لمعاينة AR بمقياس 1:1)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-gray-400 block mb-1">العرض (سم)</label>
                  <input
                    type="number"
                    value={widthCm}
                    onChange={(e) => setWidthCm(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#141720] border border-[#2b3040] text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">الارتفاع (سم)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#141720] border border-[#2b3040] text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">العمق (سم)</label>
                  <input
                    type="number"
                    value={depthCm}
                    onChange={(e) => setDepthCm(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#141720] border border-[#2b3040] text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">الوزن التقديري (كغ)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#141720] border border-[#2b3040] text-white"
                  />
                </div>
              </div>
            </div>

            {/* Direct Sale vs Live Auction Mode */}
            <div className="space-y-4">
              <label className="text-xs text-gray-300 font-bold block">نوع طرح اللوحة</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsAuction(false)}
                  className={`p-4 rounded-xl border text-right transition-all cursor-pointer ${
                    !isAuction
                      ? 'border-[#c59d5f] bg-[#1d222e] text-white'
                      : 'border-[#272b38] bg-[#0e1015] text-gray-400'
                  }`}
                >
                  <p className="text-sm font-bold">شراء فوري مباشر</p>
                  <p className="text-xs text-gray-400 mt-1">تحديد سعر ثابت للاقتناء الفوري عبر بوابة CMI</p>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAuction(true)}
                  className={`p-4 rounded-xl border text-right transition-all cursor-pointer ${
                    isAuction
                      ? 'border-red-500 bg-red-950/40 text-white'
                      : 'border-[#272b38] bg-[#0e1015] text-gray-400'
                  }`}
                >
                  <p className="text-sm font-bold text-red-400">مزاد ديناميكي حي 🔴</p>
                  <p className="text-xs text-gray-400 mt-1">طرح اللوحة للمزايدة التنافسية مع عداد تنازلي</p>
                </button>
              </div>

              {!isAuction ? (
                <div>
                  <label className="text-xs text-gray-300 block mb-1 font-medium">السعر المطلوب (درهم مغربي) *</label>
                  <input
                    type="number"
                    value={priceMAD}
                    onChange={(e) => setPriceMAD(Number(e.target.value))}
                    className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-sm text-white focus:outline-none focus:border-[#c59d5f]"
                    required
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#181214] border border-red-900/40">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1 font-medium">السعر الافتتاحي (د.م)</label>
                    <input
                      type="number"
                      value={startingBidMAD}
                      onChange={(e) => setStartingBidMAD(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-[#0e1015] border border-[#2b3040] text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 block mb-1 font-medium">السعر الاحتياطي السري (Reserve)</label>
                    <input
                      type="number"
                      value={reservePriceMAD}
                      onChange={(e) => setReservePriceMAD(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-[#0e1015] border border-[#2b3040] text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 block mb-1 font-medium">أقل زيادة مزايدة (د.م)</label>
                    <input
                      type="number"
                      value={minIncrementMAD}
                      onChange={(e) => setMinIncrementMAD(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-[#0e1015] border border-[#2b3040] text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Narrative Story */}
            <div>
              <label className="text-xs text-gray-300 block mb-1 font-medium">قصة العمل الفني وفلسفته الإبداعية</label>
              <textarea
                rows={3}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="اكتب نبذة عن الفكرة، الرموز، وظروف إنجاز اللوحة لتوثيقها في شهادة الأصالة..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-sm text-white focus:outline-none focus:border-[#c59d5f]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black font-extrabold text-sm shadow-xl shadow-[#c59d5f]/20 hover:brightness-110 transition-all cursor-pointer"
            >
              نشر اللوحة وإدراجها بالمعرض
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: VERIFICATION REQUEST */}
      {activeTab === 'verification' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#13161f] border border-[#272b38] space-y-6 max-w-3xl mx-auto">
          <div className="border-b border-[#222633] pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-sky-400" />
              <span>طلب التحقق والتوثيق للملف الاحترافي (Verified Artist Badge)</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              تمنح شارة التحقق الزرقاء الثقة للمقتنين وتتيح المشاركة في المزادات الحية الكبرى
            </p>
          </div>

          {verificationSubmitted ? (
            <div className="p-6 rounded-2xl bg-sky-950/60 border border-sky-600 text-sky-200 space-y-2 text-center">
              <CheckCircle2 className="w-10 h-10 text-sky-400 mx-auto" />
              <h4 className="font-bold text-base">تم استلام ملف التوثيق بنجاح!</h4>
              <p className="text-xs text-gray-300">
                تقوم اللجنة الفنية برئاسة الفنان نبيل شعوب بمراجعة الملف والمصادقة عليه خلال 48 ساعة.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setVerificationSubmitted(true);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="text-gray-300 block mb-1 font-medium">المؤسسة الفنية أو مسار التكوين</label>
                <select
                  value={diplomaInstitute}
                  onChange={(e) => setDiplomaInstitute(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-gray-200"
                >
                  <option value="المعهد الوطني للفنون الجميلة بتطوان (INBA)">المعهد الوطني للفنون الجميلة بتطوان (INBA)</option>
                  <option value="المدرسة العليا للفنون الجميلة بالدار البيضاء (ESBA)">المدرسة العليا للفنون الجميلة بالدار البيضاء (ESBA)</option>
                  <option value="فنان عصامي ذو مسار معارض احترافية">فنان عصامي ذو مسار معارض احترافية مثبتة</option>
                  <option value="أكاديمية دولية للفنون">خريج أكاديمية دولية للفنون</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 block mb-1 font-medium">رابط المعرض أو الملف الرقمي (Portfolio URL)</label>
                <input
                  type="url"
                  placeholder="https://instagram.com/artist_portfolio"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-gray-200"
                  required
                />
              </div>

              <div className="p-4 rounded-xl bg-[#0e1015] border border-[#222736] text-gray-400 space-y-2">
                <span className="text-gray-200 font-bold flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#c59d5f]" />
                  مبادرة التصوير الاحترافي المجاني
                </span>
                <p className="text-[11px]">
                  يحق لأول 20 فناناً مسجلاً في المدن الكبرى (الدار البيضاء، الرباط، تطوان، طنجة، فاس، مراكش) الاستفادة من جلسة تصوير احترافية مجانية للوحاتهم لضمان دقة العرض 1:1 في تقنية AR.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-sky-800 text-white font-bold text-xs shadow-lg cursor-pointer hover:brightness-110"
              >
                إرسال طلب التوثيق والاعتماد
              </button>
            </form>
          )}
        </div>
      )}

      {/* TAB 4: NABIL CHAOUB YOUTH ARTIST PRIZE */}
      {activeTab === 'youth_prize' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#181a24] to-[#11131a] border border-[#303649] space-y-6 max-w-3xl mx-auto shadow-2xl">
          <div className="flex items-center gap-3 border-b border-[#282e3f] pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c59d5f] to-[#aa7c11] flex items-center justify-center text-black font-black text-xl shadow-lg">
              🏆
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                جائزة نبيل شعوب للفنانين التشكيليين الشباب
              </h3>
              <p className="text-xs text-[#e5c384]">
                مسابقة رقمية وإقامة فنية برعاية جمعية فنون الإنسان للبيئة والتنمية بنسليمان
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-gray-300 leading-relaxed">
            <p>
              تهدف الجائزة إلى اكتشاف ورعاية المواهب التشكيلية الصاعدة في المغرب (من سن 18 إلى 35 سنة)، وإتاحة الفرصة لهم لعرض أعمالهم في قاعة المزادات الرقمية مع تمويل كامل لتكاليف التغليف والشهادات المعتمدة.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-[#0e1015] border border-[#242938] text-center">
                <span className="text-xl font-bold text-[#c59d5f] block">20,000 د.م</span>
                <span className="text-[11px] text-gray-400">الجائزة الأولى + إقامة فنية</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0e1015] border border-[#242938] text-center">
                <span className="text-xl font-bold text-gray-300 block">10,000 د.م</span>
                <span className="text-[11px] text-gray-400">الجائزة الثانية + دعم الإنتاج</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0e1015] border border-[#242938] text-center">
                <span className="text-xl font-bold text-emerald-400 block">5,000 د.م</span>
                <span className="text-[11px] text-gray-400">جائزة الفن والبيئة ببنسليمان</span>
              </div>
            </div>
          </div>

          {prizeRegistered ? (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-bold text-center">
              تم تسجيل ترشحك في المسابقة بنجاح! سيتم إخطارك بموعد تصفيات المعرض الرقمي.
            </div>
          ) : (
            <button
              onClick={() => {
                setPrizeRegistered(true);
                try { confetti({ particleCount: 50 }); } catch {}
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black font-extrabold text-xs shadow-lg hover:brightness-110 cursor-pointer"
            >
              الترشح والمشاركة في جائزة الشباب
            </button>
          )}
        </div>
      )}
    </div>
  );
};
