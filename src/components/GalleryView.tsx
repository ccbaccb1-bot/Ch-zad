import React, { useState, useMemo } from 'react';
import { Artwork, ArtStyle } from '../types';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Eye, 
  Gavel, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Layers, 
  Maximize2,
  CheckCircle2,
  Leaf,
  X
} from 'lucide-react';

interface GalleryViewProps {
  artworks: Artwork[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onOpenARStudio: (artwork: Artwork) => void;
  onOpenAuction: (artwork: Artwork) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  artworks,
  savedIds,
  onToggleSave,
  onSelectArtwork,
  onOpenARStudio,
  onOpenAuction
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'buy_now' | 'auction'>('all');
  const [selectedSize, setSelectedSize] = useState<'all' | 'small' | 'medium' | 'large'>('all');
  const [selectedFramed, setSelectedFramed] = useState<'all' | 'framed' | 'unframed'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'recent'>('popular');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const stylesList: Array<{ id: string; label: string }> = [
    { id: 'all', label: 'كافة الأساليب' },
    { id: 'انطباعي بيئي', label: 'انطباعي بيئي' },
    { id: 'حروفية مغربية أصيلة', label: 'حروفية مغربية' },
    { id: 'أمازيغي معاصر', label: 'أمازيغي معاصر' },
    { id: 'تجريدي معاصر', label: 'تجريدي معاصر' },
    { id: 'تشخيصي وتعبيري', label: 'تشخيصي وتعبيري' },
    { id: 'سريالي رمزي', label: 'سريالي رمزي' },
  ];

  const filteredArtworks = useMemo(() => {
    return artworks.filter((item) => {
      // Search
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artistCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.medium.toLowerCase().includes(searchQuery.toLowerCase());

      // Style
      const matchesStyle = selectedStyle === 'all' || item.style === selectedStyle;

      // Type
      const matchesType = 
        selectedType === 'all' || 
        (selectedType === 'auction' && item.isAuction) || 
        (selectedType === 'buy_now' && !item.isAuction);

      // Size
      const maxDim = Math.max(item.dimensions.widthCm, item.dimensions.heightCm);
      const matchesSize = 
        selectedSize === 'all' ||
        (selectedSize === 'small' && maxDim < 70) ||
        (selectedSize === 'medium' && maxDim >= 70 && maxDim <= 100) ||
        (selectedSize === 'large' && maxDim > 100);

      // Framed
      const matchesFramed = 
        selectedFramed === 'all' ||
        (selectedFramed === 'framed' && item.isFramed) ||
        (selectedFramed === 'unframed' && !item.isFramed);

      return matchesSearch && matchesStyle && matchesType && matchesSize && matchesFramed;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.viewsCount - a.viewsCount;
      if (sortBy === 'price_asc') {
        const priceA = a.isAuction ? (a.currentBidMAD || a.priceMAD) : a.priceMAD;
        const priceB = b.isAuction ? (b.currentBidMAD || b.priceMAD) : b.priceMAD;
        return priceA - priceB;
      }
      if (sortBy === 'price_desc') {
        const priceA = a.isAuction ? (a.currentBidMAD || a.priceMAD) : a.priceMAD;
        const priceB = b.isAuction ? (b.currentBidMAD || b.priceMAD) : b.priceMAD;
        return priceB - priceA;
      }
      return b.year - a.year;
    });
  }, [artworks, searchQuery, selectedStyle, selectedType, selectedSize, selectedFramed, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Filter Controls Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <span>المعرض المنسق الذكي</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#1f2430] text-[#e5c384] border border-[#343a4e] font-sans font-normal">
                {filteredArtworks.length} عملاً فنياً معتمداً
              </span>
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              لوحات تشكيلية أصلية موثقة برؤية فنية مغربية، مع المعاينة المباشرة بأبعاد حقيقية 1:1
            </p>
          </div>

          {/* Quick Search and Sort */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="gallery-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالفنان، المدينة، الأسلوب..."
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-[#141720] border border-[#272c3b] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c59d5f] transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              id="mobile-filters-trigger"
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="lg:hidden p-2.5 rounded-xl bg-[#171a24] border border-[#2b3040] text-gray-300 flex items-center gap-2 text-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#c59d5f]" />
              <span>الفلاتر</span>
            </button>
          </div>
        </div>

        {/* Art Styles Quick Pills Horizontal Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          {stylesList.map((style) => (
            <button
              key={style.id}
              id={`filter-style-${style.id}`}
              onClick={() => setSelectedStyle(style.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                selectedStyle === style.id
                  ? 'bg-[#c59d5f] text-black font-bold shadow-md shadow-[#c59d5f]/20'
                  : 'bg-[#151821] text-gray-300 border border-[#262a37] hover:border-[#3d4458] hover:text-white'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter Row */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 ${showFiltersMobile ? 'block' : 'hidden lg:grid'}`}>
          {/* Listing Type Filter */}
          <div className="space-y-1">
            <label className="text-[11px] text-gray-400 font-medium">نوع العرض</label>
            <select
              id="filter-listing-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-[#141720] border border-[#262a37] text-xs text-gray-200 focus:outline-none focus:border-[#c59d5f]"
            >
              <option value="all">كافة الأنواع (شراء + مزاد)</option>
              <option value="buy_now">شراء فوري فقط</option>
              <option value="auction">مزاد جاري فقط 🔴</option>
            </select>
          </div>

          {/* Size Filter */}
          <div className="space-y-1">
            <label className="text-[11px] text-gray-400 font-medium">حجم اللوحة</label>
            <select
              id="filter-size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-[#141720] border border-[#262a37] text-xs text-gray-200 focus:outline-none focus:border-[#c59d5f]"
            >
              <option value="all">كافة المقاسات</option>
              <option value="small">صغير (أقل من 70 سم)</option>
              <option value="medium">متوسط (70 - 100 سم)</option>
              <option value="large">جداري ضخم (أكثر من 100 سم)</option>
            </select>
          </div>

          {/* Framing Filter */}
          <div className="space-y-1">
            <label className="text-[11px] text-gray-400 font-medium">التأطير</label>
            <select
              id="filter-framing"
              value={selectedFramed}
              onChange={(e) => setSelectedFramed(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-[#141720] border border-[#262a37] text-xs text-gray-200 focus:outline-none focus:border-[#c59d5f]"
            >
              <option value="all">الكل (مؤطر وغير مؤطر)</option>
              <option value="framed">مع إطار أصلي فاخر</option>
              <option value="unframed">قماش مشدود بدون إطار</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <label className="text-[11px] text-gray-400 font-medium">ترتيب حسب</label>
            <select
              id="filter-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-[#141720] border border-[#262a37] text-xs text-[#e5c384] focus:outline-none focus:border-[#c59d5f]"
            >
              <option value="popular">الأكثر تفاعلاً وشهرة</option>
              <option value="price_asc">السعر: من الأقل للأعلى</option>
              <option value="price_desc">السعر: من الأعلى للأقل</option>
              <option value="recent">الأحدث إبداعاً</option>
            </select>
          </div>
        </div>
      </div>

      {/* Artworks Grid */}
      {filteredArtworks.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#12151d] border border-[#232734] space-y-4">
          <p className="text-lg text-gray-300 font-medium">لم يتم العثور على لوحات تطابق خيارات البحث الحالية.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStyle('all');
              setSelectedType('all');
              setSelectedSize('all');
              setSelectedFramed('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#c59d5f] text-black font-bold text-xs"
          >
            إعادة تعيين كافة الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArtworks.map((artwork) => {
            const isSaved = savedIds.includes(artwork.id);
            return (
              <div
                key={artwork.id}
                id={`artwork-card-${artwork.id}`}
                className="group relative rounded-2xl bg-[#13161f] border border-[#252a39] hover:border-[#c59d5f]/60 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Artwork Frame Container */}
                <div className="relative aspect-[4/3] bg-[#090b0e] overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Top Badges overlay */}
                  <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-1.5 pointer-events-auto">
                      {artwork.isAuction ? (
                        <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold flex items-center gap-1 shadow-lg backdrop-blur-sm animate-pulse">
                          <Gavel className="w-3.5 h-3.5" />
                          <span>مزاد حي</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-[#13161f]/90 border border-[#3b4256] text-[#e5c384] text-[11px] font-semibold backdrop-blur-sm">
                          شراء فوري
                        </span>
                      )}
                      {artwork.isFeatured && (
                        <span className="px-2 py-1 rounded-full bg-[#c59d5f]/90 text-black text-[10px] font-extrabold flex items-center gap-0.5 shadow-md">
                          <Sparkles className="w-3 h-3" />
                          <span>مختارة</span>
                        </span>
                      )}
                    </div>

                    {/* Favorite Heart Button */}
                    <button
                      id={`save-btn-${artwork.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(artwork.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md transition-all pointer-events-auto ${
                        isSaved
                          ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                          : 'bg-black/50 text-gray-300 hover:text-white hover:bg-black/80'
                      }`}
                      title={isSaved ? 'إزالة من المحفوظات' : 'حفظ في المفضلة'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Hover Floating Action: AR Room Try-On & Zoom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 pointer-events-none">
                    <button
                      id={`ar-tryon-btn-${artwork.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenARStudio(artwork);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black font-bold text-xs flex items-center gap-1.5 shadow-lg pointer-events-auto hover:brightness-110 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>معاينة AR على الجدار</span>
                    </button>

                    <button
                      id={`quick-inspect-btn-${artwork.id}`}
                      onClick={() => onSelectArtwork(artwork)}
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white pointer-events-auto cursor-pointer"
                      title="فحص التفاصيل والشهادة"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Information Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Style and Dimensions */}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="text-[#c59d5f] font-medium">{artwork.style}</span>
                      <span className="font-mono" dir="ltr">
                        {artwork.dimensions.widthCm} × {artwork.dimensions.heightCm} cm
                      </span>
                    </div>

                    {/* Artwork Title */}
                    <h3 
                      onClick={() => onSelectArtwork(artwork)}
                      className="text-lg font-bold text-white group-hover:text-[#e5c384] transition-colors cursor-pointer line-clamp-1"
                    >
                      {artwork.title}
                    </h3>

                    {/* Artist row */}
                    <div className="flex items-center gap-2 pt-1">
                      <img
                        src={artwork.artistAvatar}
                        alt={artwork.artistName}
                        className="w-7 h-7 rounded-full object-cover border border-[#3b4256]"
                      />
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-gray-200 font-medium">{artwork.artistName}</span>
                        {artwork.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" title="فنان معتمد وموثق" />
                        )}
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-gray-500" />
                          {artwork.artistCity}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action footer */}
                  <div className="pt-3 border-t border-[#222736] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-gray-400">
                          {artwork.isAuction ? 'أعلى مزايدة حالية' : 'السعر المباشر'}
                        </p>
                        <p className="text-lg font-black text-[#f4eedb] font-serif-luxury">
                          {artwork.isAuction 
                            ? (artwork.currentBidMAD || artwork.priceMAD).toLocaleString()
                            : artwork.priceMAD.toLocaleString()} <span className="text-xs font-normal text-[#c59d5f]">د.م</span>
                        </p>
                      </div>

                      {/* 2% Eco guarantee micro-pill */}
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/40">
                          <Leaf className="w-3 h-3 text-emerald-400" />
                          <span>+{artwork.ecoContributionMAD} د.م للبيئة</span>
                        </span>
                      </div>
                    </div>

                    {/* Primary Button */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        id={`card-ar-btn-${artwork.id}`}
                        onClick={() => onOpenARStudio(artwork)}
                        className="py-2.5 px-3 rounded-xl bg-[#1a1e29] hover:bg-[#232837] border border-[#2d3345] text-xs font-medium text-gray-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#c59d5f]" />
                        <span>معاينة AR</span>
                      </button>

                      {artwork.isAuction ? (
                        <button
                          id={`card-bid-btn-${artwork.id}`}
                          onClick={() => onOpenAuction(artwork)}
                          className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-700 hover:brightness-110 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-red-900/30 cursor-pointer"
                        >
                          <Gavel className="w-3.5 h-3.5" />
                          <span>مزايدة حية</span>
                        </button>
                      ) : (
                        <button
                          id={`card-buy-btn-${artwork.id}`}
                          onClick={() => onSelectArtwork(artwork)}
                          className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] hover:brightness-110 text-black text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#c59d5f]/20 cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>اقتناء اللوحة</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
