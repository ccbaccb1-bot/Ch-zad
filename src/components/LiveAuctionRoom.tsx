import React, { useState, useEffect } from 'react';
import { Artwork, Bid } from '../types';
import { 
  Gavel, 
  Clock, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  UserCheck, 
  CheckCircle2, 
  MapPin, 
  Leaf, 
  Layers, 
  AlertCircle,
  Eye,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveAuctionRoomProps {
  artworks: Artwork[];
  selectedArtworkId?: string;
  onSelectArtwork: (artwork: Artwork) => void;
  onOpenARStudio: (artwork: Artwork) => void;
  onPlaceBid: (artworkId: string, bidAmount: number, bidderName: string, bidderCity: string) => void;
}

export const LiveAuctionRoom: React.FC<LiveAuctionRoomProps> = ({
  artworks,
  selectedArtworkId,
  onSelectArtwork,
  onOpenARStudio,
  onPlaceBid
}) => {
  const auctionArtworks = artworks.filter(a => a.isAuction);
  const [activeLotId, setActiveLotId] = useState<string>(
    selectedArtworkId && auctionArtworks.some(a => a.id === selectedArtworkId)
      ? selectedArtworkId
      : auctionArtworks[0]?.id || ''
  );

  const activeLot = auctionArtworks.find(a => a.id === activeLotId) || auctionArtworks[0];

  // Custom Bid Form States
  const [customBid, setCustomBid] = useState<number>(0);
  const [bidderName, setBidderName] = useState('مقتني شغوف');
  const [bidderCity, setBidderCity] = useState('الرباط');
  const [antiSnipingTriggered, setAntiSnipingTriggered] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Time remaining state in seconds
  const [timeLeftSec, setTimeLeftSec] = useState<number>(2700); // 45 mins default

  useEffect(() => {
    if (activeLot?.auctionEndsAt) {
      const endMs = new Date(activeLot.auctionEndsAt).getTime();
      const nowMs = Date.now();
      const diff = Math.max(0, Math.floor((endMs - nowMs) / 1000));
      setTimeLeftSec(diff > 0 ? diff : 3600);
    }
  }, [activeLotId, activeLot?.auctionEndsAt]);

  // Real-time ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSec(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentPrice = activeLot?.currentBidMAD || activeLot?.startingBidMAD || 5000;
  const minIncrement = activeLot?.minIncrementMAD || 250;
  const nextMinBid = currentPrice + minIncrement;

  // Formatting time
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0'),
    };
  };

  const timeFormatted = formatTime(timeLeftSec);

  const handleQuickBid = (increment: number) => {
    const newAmount = currentPrice + increment;
    submitBid(newAmount);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customBid < nextMinBid) {
      setNotificationMsg(`المبلغ يجب أن يكون على الأقل ${nextMinBid.toLocaleString()} د.م`);
      return;
    }
    submitBid(customBid);
  };

  const submitBid = (amount: number) => {
    // Check Anti-sniping: if time < 120 sec (2 mins), add 120 sec
    if (timeLeftSec < 120) {
      setTimeLeftSec(prev => prev + 120);
      setAntiSnipingTriggered(true);
      setTimeout(() => setAntiSnipingTriggered(false), 8000);
    }

    // Trigger celebratory confetti for live bid placement
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#10B981', '#E5C384']
      });
    } catch {
      // fallback
    }

    onPlaceBid(activeLot.id, amount, bidderName, bidderCity);
    setNotificationMsg(`تم تسجيل مزايدتك بقيمة ${amount.toLocaleString()} د.م بنجاح! أنت الآن صاحب أعلى عرض.`);
    setTimeout(() => setNotificationMsg(null), 5000);
  };

  if (!activeLot) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-400">
        لا توجد مزادات نشطة حالياً.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232735] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              قاعة المزادات الرقمية المباشرة
            </h2>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            نظام مزايدة فوري مع خاصية حماية منع الخطف (Anti-sniping) وتوثيق شفاف بنسبة 2% لجمعية بنسليمان
          </p>
        </div>

        {/* Lot Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {auctionArtworks.map((item, idx) => (
            <button
              key={item.id}
              id={`lot-tab-${item.id}`}
              onClick={() => setActiveLotId(item.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeLot.id === item.id
                  ? 'bg-gradient-to-r from-red-600 to-amber-700 text-white shadow-lg'
                  : 'bg-[#151822] text-gray-400 border border-[#272b38] hover:text-white'
              }`}
            >
              <span>لوط #{idx + 1}:</span>
              <span className="truncate max-w-[120px]">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Anti-Sniping Notification Alert */}
      {antiSnipingTriggered && (
        <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-500/60 text-amber-200 text-sm flex items-center gap-3 animate-bounce">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <p className="font-bold">تفعيل نظام منع الخطف (Anti-sniping Protection):</p>
            <p className="text-xs text-amber-300">تم تمديد وقت المزاد بدقيقتين إضافيتين لإتاحة فرصة عادلة لكافة المقتنين.</p>
          </div>
        </div>
      )}

      {/* General Bid Notification */}
      {notificationMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-sm flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold">{notificationMsg}</span>
          </div>
          <button onClick={() => setNotificationMsg(null)} className="text-xs underline text-emerald-300">إغلاق</button>
        </div>
      )}

      {/* Main Auction Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left/Main Column: Artwork Stage & High Res View */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-3xl bg-[#090b0e] border border-[#272b39] overflow-hidden shadow-2xl group">
            <img
              src={activeLot.image}
              alt={activeLot.title}
              className="w-full max-h-[500px] object-contain mx-auto transition-transform duration-700 group-hover:scale-102"
            />

            {/* Live Timer Overlay */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-red-500/40 text-right shadow-2xl">
              <span className="text-[10px] text-gray-400 font-medium flex items-center justify-end gap-1">
                <Clock className="w-3 h-3 text-red-400 animate-spin" />
                الوقت المتبقي لغلق المزاد
              </span>
              <div className="font-mono text-xl sm:text-2xl font-black text-white flex items-center gap-1 justify-end mt-0.5" dir="ltr">
                <span className="bg-[#1c202a] px-2 py-0.5 rounded text-amber-400">{timeFormatted.hours}</span>:
                <span className="bg-[#1c202a] px-2 py-0.5 rounded text-amber-400">{timeFormatted.minutes}</span>:
                <span className="bg-red-950/80 text-red-400 px-2 py-0.5 rounded border border-red-800">{timeFormatted.seconds}</span>
              </div>
            </div>

            {/* AR Wall Link Button in stage */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <button
                id="auction-ar-preview-btn"
                onClick={() => onOpenARStudio(activeLot)}
                className="px-4 py-2.5 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-bold border border-[#c59d5f]/60 backdrop-blur-md pointer-events-auto flex items-center gap-2 shadow-xl cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#c59d5f]" />
                <span>عاين اللوحة بأبعاد 1:1 على جدارك</span>
              </button>

              <button
                onClick={() => onSelectArtwork(activeLot)}
                className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-medium backdrop-blur-md pointer-events-auto cursor-pointer"
              >
                شهادة الأصالة والقصة
              </button>
            </div>
          </div>

          {/* Artwork Narrative & Dimensions */}
          <div className="p-6 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222633] pb-3">
              <div>
                <h3 className="text-xl font-bold text-white">{activeLot.title}</h3>
                <p className="text-xs text-gray-400">{activeLot.titleEn}</p>
              </div>
              <div className="text-right text-xs">
                <span className="text-[#c59d5f] font-semibold">{activeLot.style}</span>
                <span className="text-gray-500 mx-1.5">•</span>
                <span className="text-gray-300 font-mono" dir="ltr">{activeLot.dimensions.widthCm}×{activeLot.dimensions.heightCm} سم</span>
              </div>
            </div>

            {/* Artist Card */}
            <div className="flex items-center gap-3">
              <img
                src={activeLot.artistAvatar}
                alt={activeLot.artistName}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#c59d5f]/40"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white">{activeLot.artistName}</span>
                  {activeLot.isVerified && (
                    <CheckCircle2 className="w-4 h-4 text-sky-400" title="فنان موثق ومعتمد" />
                  )}
                  <span className="text-xs text-gray-400">({activeLot.artistCity})</span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-1">{activeLot.artistTitle}</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed bg-[#0d0f14] p-3.5 rounded-xl border border-[#1f2330]">
              {activeLot.story}
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-[#171a24] border border-[#252936]">
                <p className="text-gray-500 text-[10px]">الوسيط الفني</p>
                <p className="text-gray-200 font-medium truncate mt-0.5">{activeLot.medium}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#171a24] border border-[#252936]">
                <p className="text-gray-500 text-[10px]">سنة الإنجاز</p>
                <p className="text-gray-200 font-medium mt-0.5">{activeLot.year}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#171a24] border border-[#252936]">
                <p className="text-gray-500 text-[10px]">بروتوكول التغليف</p>
                <p className="text-emerald-400 font-medium mt-0.5">صندوق شعوب المعتمد</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bidding Controls & Live Bids History */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Price Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#191d29] via-[#141722] to-[#10121a] border border-[#2d3345] shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-[#292f42] pb-4">
              <div>
                <p className="text-xs text-gray-400 font-medium">أعلى مزايدة حالية</p>
                <p className="text-3xl sm:text-4xl font-black text-[#f4eedb] font-serif-luxury mt-1">
                  {currentPrice.toLocaleString()} <span className="text-sm font-normal text-[#c59d5f]">درهم مغربي</span>
                </p>
              </div>
              <div className="text-left">
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{activeLot.bidsHistory?.length || 1} مزايدات</span>
                </span>
                <p className="text-[11px] text-gray-400 mt-1">
                  السعر الافتتاحي: {activeLot.startingBidMAD?.toLocaleString()} د.م
                </p>
              </div>
            </div>

            {/* Quick Bidding Increments */}
            <div className="space-y-2">
              <label className="text-xs text-gray-300 font-medium flex items-center justify-between">
                <span>مزايدة سريعة فورية</span>
                <span className="text-[11px] text-gray-400">أقل زيادة مقبولة: +{minIncrement} د.م</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  id="bid-inc-250"
                  onClick={() => handleQuickBid(minIncrement)}
                  className="py-3 px-2 rounded-xl bg-[#1e2332] hover:bg-[#282f42] border border-[#353d52] text-xs font-bold text-white transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:border-[#c59d5f]"
                >
                  <span className="text-[10px] text-gray-400 font-normal">مزايدة بـ</span>
                  <span>+{(minIncrement).toLocaleString()} د.م</span>
                </button>

                <button
                  id="bid-inc-500"
                  onClick={() => handleQuickBid(minIncrement * 2)}
                  className="py-3 px-2 rounded-xl bg-[#1e2332] hover:bg-[#282f42] border border-[#353d52] text-xs font-bold text-[#e5c384] transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:border-[#c59d5f]"
                >
                  <span className="text-[10px] text-gray-400 font-normal">مزايدة بـ</span>
                  <span>+{(minIncrement * 2).toLocaleString()} د.م</span>
                </button>

                <button
                  id="bid-inc-1000"
                  onClick={() => handleQuickBid(minIncrement * 4)}
                  className="py-3 px-2 rounded-xl bg-gradient-to-r from-[#c59d5f] to-[#aa7c11] text-black text-xs font-black transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:brightness-110 shadow-md"
                >
                  <span className="text-[10px] text-black/70 font-semibold">مزايدة بـ</span>
                  <span>+{(minIncrement * 4).toLocaleString()} د.م</span>
                </button>
              </div>
            </div>

            {/* Custom Amount Form */}
            <form onSubmit={handleCustomSubmit} className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-gray-400 block mb-1">اسم المزايد / اللقب</label>
                  <input
                    type="text"
                    value={bidderName}
                    onChange={(e) => setBidderName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e1015] border border-[#2b3040] text-gray-200 focus:outline-none focus:border-[#c59d5f]"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">المدينة</label>
                  <select
                    value={bidderCity}
                    onChange={(e) => setBidderCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e1015] border border-[#2b3040] text-gray-200 focus:outline-none focus:border-[#c59d5f]"
                  >
                    <option value="الرباط">الرباط</option>
                    <option value="الدار البيضاء">الدار البيضاء</option>
                    <option value="مراكش">مراكش</option>
                    <option value="طنجة">طنجة</option>
                    <option value="فاس">فاس</option>
                    <option value="بنسليمان">بنسليمان</option>
                    <option value="باريس">باريس (مقتني دولي)</option>
                    <option value="دبي">دبي (مقتني دولي)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">أو حدد مبلغ مزايدتك المخصص (د.م)</label>
                <div className="flex gap-2">
                  <input
                    id="custom-bid-input"
                    type="number"
                    min={nextMinBid}
                    step={minIncrement}
                    placeholder={`الحد الأدنى: ${nextMinBid}`}
                    onChange={(e) => setCustomBid(Number(e.target.value))}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-sm font-bold text-white focus:outline-none focus:border-[#c59d5f]"
                  />
                  <button
                    id="submit-custom-bid-btn"
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-700 hover:brightness-110 text-white font-bold text-xs shadow-lg cursor-pointer"
                  >
                    تأكيد المزايدة
                  </button>
                </div>
              </div>
            </form>

            {/* Financial Transparency Calculation */}
            <div className="pt-3 border-t border-[#252b3d] text-[11px] text-gray-400 space-y-1.5">
              <div className="flex justify-between">
                <span>عمولة المنصة الثابتة (12%):</span>
                <span className="text-gray-300 font-mono">{(currentPrice * 0.12).toLocaleString()} د.م</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Leaf className="w-3 h-3" />
                  مساهمة جمعية فنون الإنسان ببنسليمان (2%):
                </span>
                <span className="font-mono">{(currentPrice * 0.02).toLocaleString()} د.م</span>
              </div>
              <div className="flex justify-between text-gray-300 font-medium pt-1 border-t border-[#232737]">
                <span>صافي مستحقات الفنان في نظام Escrow (86%):</span>
                <span className="font-mono text-[#e5c384]">{(currentPrice * 0.86).toLocaleString()} د.م</span>
              </div>
            </div>
          </div>

          {/* Real-time Bidding Log */}
          <div className="p-5 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-4">
            <h4 className="text-xs font-bold text-gray-300 flex items-center justify-between">
              <span>سجل المزايدات الحية (Live Feed)</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/40">
                محدث الآن
              </span>
            </h4>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {activeLot.bidsHistory && activeLot.bidsHistory.length > 0 ? (
                activeLot.bidsHistory.slice().reverse().map((bid, index) => (
                  <div
                    key={bid.id || index}
                    className={`p-3 rounded-xl flex items-center justify-between text-xs transition-all ${
                      index === 0
                        ? 'bg-[#1b2230] border border-[#3b4760] text-white shadow-md'
                        : 'bg-[#0f1118] border border-[#1e222e] text-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-emerald-400 animate-ping' : 'bg-gray-600'}`} />
                      <div>
                        <div className="flex items-center gap-1 font-medium">
                          <span>{bid.bidderName}</span>
                          <span className="text-[10px] text-gray-400 font-normal flex items-center">
                            <MapPin className="w-2.5 h-2.5 mx-0.5" />
                            {bid.bidderCity}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500">{bid.timestamp}</span>
                      </div>
                    </div>

                    <div className="text-left font-mono font-bold text-sm text-[#e5c384]">
                      {bid.amountMAD.toLocaleString()} <span className="text-[10px] font-normal text-gray-400">د.م</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 text-center py-4">كن أول من يفتتح المزايدة على هذا العمل الفني</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
