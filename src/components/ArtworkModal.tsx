import React, { useState } from 'react';
import { Artwork } from '../types';
import { 
  X, 
  Eye, 
  Gavel, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Leaf, 
  MapPin, 
  Package, 
  Layers, 
  QrCode, 
  FileText,
  Heart,
  Share2
} from 'lucide-react';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onOpenARStudio: (artwork: Artwork) => void;
  onOpenAuction: (artwork: Artwork) => void;
  onProceedCheckout: (artwork: Artwork) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artwork,
  onClose,
  onOpenARStudio,
  onOpenAuction,
  onProceedCheckout,
  isSaved,
  onToggleSave
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [shareNotice, setShareNotice] = useState(false);

  if (!artwork) return null;

  const images = [artwork.image, ...(artwork.additionalImages || [])];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareNotice(true);
    setTimeout(() => setShareNotice(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        id="artwork-detail-modal"
        className="relative w-full max-w-5xl rounded-3xl bg-[#11131a] border border-[#2d3345] shadow-2xl overflow-hidden flex flex-col my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Visual Column */}
          <div className="lg:col-span-7 p-6 bg-[#090b0e] flex flex-col justify-between space-y-4 border-b lg:border-b-0 lg:border-l border-[#222736]">
            {/* Main Stage */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-[#1f2330]">
              <img
                src={images[activeImageIndex] || artwork.image}
                alt={artwork.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail switcher if multiple images exist */}
            {images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#c59d5f] scale-105' : 'border-gray-800 opacity-60'
                    }`}
                  >
                    <img src={img} alt="detail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* AR and Certificate Quick Action bar */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenARStudio(artwork);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#1c212e] hover:bg-[#252b3b] border border-[#353d52] text-xs font-bold text-gray-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#c59d5f]" />
                <span>معاينة AR بأبعاد 1:1 على جدارك</span>
              </button>

              <button
                onClick={() => setShowCertificate(!showCertificate)}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  showCertificate
                    ? 'bg-[#c59d5f] text-black shadow-md'
                    : 'bg-[#181b24] text-[#e5c384] border border-[#3b4256]'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>{showCertificate ? 'إخفاء الشهادة' : 'شهادة الأصالة'}</span>
              </button>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header Title & Badges */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#c59d5f] font-semibold">{artwork.style}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleSave(artwork.id)}
                      className={`p-2 rounded-lg border transition-all ${
                        isSaved
                          ? 'bg-red-500/20 border-red-500/40 text-red-400'
                          : 'bg-[#161820] border-[#292e3d] text-gray-400 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={handleShare}
                      className="p-2 rounded-lg bg-[#161820] border border-[#292e3d] text-gray-400 hover:text-white"
                      title="مشاركة رابط اللوحة"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {shareNotice && (
                  <p className="text-[11px] text-emerald-400">تم نسخ رابط اللوحة للحافظة بنجاح!</p>
                )}

                <h2 className="text-2xl font-extrabold text-white">{artwork.title}</h2>
                <p className="text-xs text-gray-400">{artwork.titleEn}</p>
              </div>

              {/* Artist Card */}
              <div className="p-3.5 rounded-2xl bg-[#0e1015] border border-[#222736] flex items-center gap-3">
                <img
                  src={artwork.artistAvatar}
                  alt={artwork.artistName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#c59d5f]/40"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span>{artwork.artistName}</span>
                    {artwork.isVerified && (
                      <CheckCircle2 className="w-4 h-4 text-sky-400" title="فنان موثق ومعتمد" />
                    )}
                  </div>
                  <p className="text-gray-400 text-[11px] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span>{artwork.artistCity}</span>
                    <span>•</span>
                    <span>{artwork.artistTitle}</span>
                  </p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#0e1015] border border-[#222736]">
                  <p className="text-[10px] text-gray-400">الأبعاد الفيزيائية</p>
                  <p className="text-white font-mono font-semibold mt-0.5" dir="ltr">
                    {artwork.dimensions.widthCm} × {artwork.dimensions.heightCm} سم
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#0e1015] border border-[#222736]">
                  <p className="text-[10px] text-gray-400">سنة الإنجاز والوسيط</p>
                  <p className="text-white font-semibold mt-0.5 truncate">{artwork.year} • {artwork.medium}</p>
                </div>
              </div>

              {/* Story */}
              <div className="p-4 rounded-xl bg-[#0e1015] border border-[#222736] text-xs text-gray-300 leading-relaxed space-y-1">
                <p className="text-[11px] font-bold text-[#c59d5f]">القصة والرؤية الفنية:</p>
                <p className="text-gray-300 font-light">{artwork.story}</p>
              </div>

              {/* Certificate View Drawer if toggled */}
              {showCertificate && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1c1811] via-[#15171f] to-[#12141c] border-2 border-[#c59d5f]/60 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#3b3322] pb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#e5c384]">
                      <Award className="w-4 h-4 text-[#c59d5f]" />
                      <span>شهادة الأصالة الرسمية الموثقة</span>
                    </div>
                    <span className="font-mono text-[10px] text-gray-400">{artwork.certificateNumber}</span>
                  </div>

                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    يشهد رواق Chaoub Art & Human وجمعية فنون الإنسان ببنسليمان بأن هذا العمل الفني أصلي بنسبة 100% وموقع يدوياً من الفنان.
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#3b3322] text-[10px] text-gray-400">
                    <div>
                      <span className="block text-white font-bold">إمضاء: نبيل شعوب</span>
                      <span>المؤسس ورئيس الجمعية</span>
                    </div>
                    <QrCode className="w-8 h-8 text-[#c59d5f]" />
                  </div>
                </div>
              )}
            </div>

            {/* Price & Checkout Action Footer */}
            <div className="pt-4 border-t border-[#222736] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">
                    {artwork.isAuction ? 'أعلى مزايدة حالية' : 'السعر الإجمالي (شامل التأمين والتغليف)'}
                  </p>
                  <p className="text-2xl font-black text-[#f4eedb] font-serif-luxury">
                    {artwork.isAuction 
                      ? (artwork.currentBidMAD || artwork.priceMAD).toLocaleString() 
                      : artwork.priceMAD.toLocaleString()} <span className="text-xs font-normal text-[#c59d5f]">درهم مغربي</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-800/40">
                    <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+{artwork.ecoContributionMAD} د.م للبيئة</span>
                  </span>
                </div>
              </div>

              {/* Direct Buttons */}
              {artwork.isAuction ? (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAuction(artwork);
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-700 hover:brightness-110 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Gavel className="w-4 h-4" />
                  <span>دخول قاعة المزايدة الحية</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onProceedCheckout(artwork);
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] hover:brightness-110 text-black font-extrabold text-sm shadow-xl shadow-[#c59d5f]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>اقتناء اللوحة عبر CMI (مع حماية Escrow)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
