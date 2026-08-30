import React, { useState, useRef, useEffect } from 'react';
import { Artwork } from '../types';
import { 
  Camera, 
  Eye, 
  Maximize2, 
  RotateCcw, 
  Sliders, 
  Sun, 
  Sparkles, 
  Download, 
  Layers, 
  Check, 
  AlertCircle,
  Video,
  VideoOff,
  Move,
  Info
} from 'lucide-react';

interface ARStudioProps {
  artworks: Artwork[];
  initialArtwork?: Artwork;
  onSelectArtwork: (artwork: Artwork) => void;
}

export const ARStudio: React.FC<ARStudioProps> = ({
  artworks,
  initialArtwork,
  onSelectArtwork
}) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork>(
    initialArtwork || artworks[0]
  );

  // AR Mode: 'simulated_room' | 'live_camera'
  const [arMode, setArMode] = useState<'simulated_room' | 'live_camera'>('simulated_room');

  // Room presets
  const roomPresets = [
    { id: 'moroccan_salon', name: 'صالون مغربي أندلسي', bg: 'from-[#1a140e] to-[#2e1d0c]', interiorStyle: 'moroccan' },
    { id: 'modern_living', name: 'غرفة معيشة عصرية', bg: 'from-[#181a20] to-[#252834]', interiorStyle: 'modern' },
    { id: 'executive_office', name: 'مكتب رئاسي فخم', bg: 'from-[#12161f] to-[#1e2330]', interiorStyle: 'office' },
    { id: 'gallery_wall', name: 'رواق معرض فني محايد', bg: 'from-[#111215] to-[#1c1d22]', interiorStyle: 'gallery' },
  ];
  const [selectedRoom, setSelectedRoom] = useState(roomPresets[0].id);

  // Wall paint color
  const wallColors = [
    { id: 'ecru', name: 'بيج كلاسيكي (Ecru)', hex: '#EADBC8' },
    { id: 'fassi_blue', name: 'أزرق فاسي ملكي', hex: '#1E3A8A' },
    { id: 'marrakech_terracotta', name: 'طين مراكش الترابي', hex: '#9A3412' },
    { id: 'slate_charcoal', name: 'رمادي حجري حديث', hex: '#334155' },
    { id: 'olive_forest', name: 'أخضر غابوي زيتوني', hex: '#14532D' },
    { id: 'pure_white', name: 'أبيض مرمر فاخر', hex: '#F8FAFC' },
  ];
  const [selectedWallColor, setSelectedWallColor] = useState(wallColors[0].hex);

  // Lighting Mode
  const [lighting, setLighting] = useState<'spotlight' | 'daylight' | 'ambient'>('spotlight');

  // Frame selector
  const [selectedFrame, setSelectedFrame] = useState<'gold' | 'black' | 'natural' | 'none'>('gold');

  // Interactive Position & Scale
  const [position, setPosition] = useState({ x: 0, y: -20 });
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Camera video stream ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Handle camera stream setup
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (arMode === 'live_camera') {
      navigator.mediaDevices?.getUserMedia({ 
        video: { facingMode: { ideal: 'environment' } } 
      })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play();
        }
        setCameraActive(true);
        setCameraError(null);
      })
      .catch((err) => {
        console.warn('Camera access denied or unavailable:', err);
        setCameraError('تعذر الوصول للكاميرا (يرجى منح إذن الكاميرا أو استخدام المحاكي الثلاثي الأبعاد).');
        setCameraActive(false);
      });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const s = videoRef.current.srcObject as MediaStream;
        s.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [arMode]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Compute 1:1 aspect and pixel scale based on real centimeters
  // Assuming 100cm = 280px at scaleMultiplier 1
  const widthPx = (selectedArtwork.dimensions.widthCm / 100) * 280 * scaleMultiplier;
  const heightPx = (selectedArtwork.dimensions.heightCm / 100) * 280 * scaleMultiplier;

  // Frame Styles
  const getFrameClasses = () => {
    switch (selectedFrame) {
      case 'gold':
        return 'p-3 bg-gradient-to-br from-[#d4af37] via-[#f7e6a7] to-[#aa7c11] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#ffeaa7]';
      case 'black':
        return 'p-3 bg-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-[#333]';
      case 'natural':
        return 'p-3 bg-gradient-to-b from-[#8B5A2B] to-[#5C3A21] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#A0522D]';
      case 'none':
      default:
        return 'p-0 shadow-[0_25px_60px_rgba(0,0,0,0.9)]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232735] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#c59d5f]/20 text-[#e5c384] text-xs font-bold border border-[#c59d5f]/40">
              AR Studio 1:1
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              غرفة المعاينة الافتراضية والواقع المعزز
            </h2>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            عاين مقاسات اللوحة بدقة 1:1 على جدار صالونك أو مكتبك قبل اتخاذ قرار الاقتناء
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center p-1 bg-[#151821] rounded-xl border border-[#272b38]">
          <button
            id="ar-mode-sim-btn"
            onClick={() => setArMode('simulated_room')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              arMode === 'simulated_room'
                ? 'bg-[#c59d5f] text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>محاكي الجدار الافتراضي</span>
          </button>

          <button
            id="ar-mode-camera-btn"
            onClick={() => setArMode('live_camera')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              arMode === 'live_camera'
                ? 'bg-[#c59d5f] text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>كاميرا الجدار الحقيقية (AR)</span>
          </button>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Visual Wall Canvas (The Stage) */}
        <div className="lg:col-span-8 space-y-4">
          <div
            id="ar-wall-stage"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative w-full h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-[#2c3142] select-none cursor-grab active:cursor-grabbing flex items-center justify-center transition-colors duration-500"
            style={{
              backgroundColor: arMode === 'simulated_room' ? selectedWallColor : '#000000',
            }}
          >
            {/* Live Camera Stream if active */}
            {arMode === 'live_camera' && (
              <div className="absolute inset-0 z-0">
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
                {cameraError && (
                  <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/80 text-center">
                    <div className="space-y-3 max-w-md">
                      <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                      <p className="text-sm text-gray-200">{cameraError}</p>
                      <button
                        onClick={() => setArMode('simulated_room')}
                        className="px-4 py-2 rounded-xl bg-[#c59d5f] text-black font-bold text-xs"
                      >
                        العودة للمحاكي الجداري
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Room architectural decor background if simulated room */}
            {arMode === 'simulated_room' && (
              <div className="absolute inset-0 pointer-events-none z-0">
                {/* Subtle baseboard / wainscoting bottom moulding */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#1a1c22]/30 border-t-2 border-white/20 backdrop-blur-xs flex items-center justify-center">
                  <div className="w-full h-1 bg-black/20" />
                </div>

                {/* Moroccan arch stencil overlay if moroccan salon */}
                {selectedRoom === 'moroccan_salon' && (
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-transparent pointer-events-none" />
                )}

                {/* Lighting effects */}
                {lighting === 'spotlight' && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-b from-amber-100/35 via-amber-100/10 to-transparent blur-2xl rounded-full pointer-events-none" />
                )}
                {lighting === 'daylight' && (
                  <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-gradient-to-bl from-white/25 via-blue-100/10 to-transparent blur-3xl pointer-events-none" />
                )}
                {lighting === 'ambient' && (
                  <div className="absolute inset-0 bg-black/20 backdrop-brightness-95 pointer-events-none" />
                )}
              </div>
            )}

            {/* Scale & Alignment Reference Guides */}
            <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-gray-200 font-mono flex items-center gap-2">
              <span className="text-[#c59d5f] font-bold">1:1 أبعاد حقيقية:</span>
              <span>{selectedArtwork.dimensions.widthCm} سم × {selectedArtwork.dimensions.heightCm} سم</span>
            </div>

            <div className="absolute bottom-4 right-4 z-20 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-gray-300 flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5 text-[#c59d5f]" />
              <span>اسحب اللوحة لتغيير موضع التعليق</span>
            </div>

            {/* The Calibrated Artwork on Wall */}
            <div
              className={`relative z-10 transition-shadow duration-300 ${getFrameClasses()}`}
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                width: `${widthPx}px`,
                height: `${heightPx}px`,
                maxWidth: '90%',
                maxHeight: '80%',
              }}
            >
              <img
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                className="w-full h-full object-cover shadow-inner select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Controls below stage */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#13161f] border border-[#252a38]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPosition({ x: 0, y: -20 })}
                className="p-2 rounded-lg bg-[#1a1d28] hover:bg-[#252938] text-gray-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="إعادة توسيط اللوحة على الجدار"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#c59d5f]" />
                <span>إعادة توسيط</span>
              </button>

              {/* Scale Zoom Multiplier */}
              <div className="flex items-center gap-2 text-xs text-gray-300 pr-3 border-r border-[#262b3a]">
                <span>المسافة من الجدار:</span>
                <input
                  type="range"
                  min="0.7"
                  max="1.4"
                  step="0.05"
                  value={scaleMultiplier}
                  onChange={(e) => setScaleMultiplier(parseFloat(e.target.value))}
                  className="w-24 accent-[#c59d5f] cursor-pointer"
                />
                <span className="text-gray-400 font-mono text-[11px]">{Math.round(scaleMultiplier * 100)}%</span>
              </div>
            </div>

            {/* Lighting Toggle */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-gray-400 ml-1">إضاءة الغرفة:</span>
              <button
                onClick={() => setLighting('spotlight')}
                className={`px-2.5 py-1 rounded-lg ${lighting === 'spotlight' ? 'bg-[#c59d5f] text-black font-bold' : 'bg-[#1b1e2a] text-gray-300'}`}
              >
                سبوتلايت الرواق
              </button>
              <button
                onClick={() => setLighting('daylight')}
                className={`px-2.5 py-1 rounded-lg ${lighting === 'daylight' ? 'bg-[#c59d5f] text-black font-bold' : 'bg-[#1b1e2a] text-gray-300'}`}
              >
                ضوء النهار
              </button>
              <button
                onClick={() => setLighting('ambient')}
                className={`px-2.5 py-1 rounded-lg ${lighting === 'ambient' ? 'bg-[#c59d5f] text-black font-bold' : 'bg-[#1b1e2a] text-gray-300'}`}
              >
                إضاءة ليلية دافئة
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Artwork Info & Customization Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Artwork Switcher */}
          <div className="p-5 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-4">
            <h3 className="text-xs font-bold text-gray-300 flex items-center justify-between">
              <span>اختر اللوحة للمعاينة</span>
              <span className="text-[11px] text-[#c59d5f]">{artworks.length} لوحات متاحة</span>
            </h3>

            <div className="grid grid-cols-4 gap-2">
              {artworks.map((art) => (
                <button
                  key={art.id}
                  onClick={() => {
                    setSelectedArtwork(art);
                    setPosition({ x: 0, y: -20 });
                  }}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedArtwork.id === art.id
                      ? 'border-[#c59d5f] ring-2 ring-[#c59d5f]/30 scale-105'
                      : 'border-[#262a37] opacity-60 hover:opacity-100'
                  }`}
                  title={art.title}
                >
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Selected Info */}
            <div className="pt-3 border-t border-[#222736] space-y-1">
              <h4 className="text-sm font-bold text-white line-clamp-1">{selectedArtwork.title}</h4>
              <p className="text-xs text-gray-400">{selectedArtwork.artistName} ({selectedArtwork.artistCity})</p>
              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-[#e5c384] font-bold font-serif-luxury">
                  {selectedArtwork.isAuction ? (selectedArtwork.currentBidMAD || selectedArtwork.priceMAD).toLocaleString() : selectedArtwork.priceMAD.toLocaleString()} د.م
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">
                  +{selectedArtwork.ecoContributionMAD} د.م لبنسليمان
                </span>
              </div>
            </div>
          </div>

          {/* Wall Paint Color Picker (for simulated room) */}
          {arMode === 'simulated_room' && (
            <div className="p-5 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-3">
              <label className="text-xs font-bold text-gray-300 block">
                لون طلاء الجدار المحاكى
              </label>
              <div className="grid grid-cols-3 gap-2">
                {wallColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedWallColor(color.hex)}
                    className={`p-2 rounded-xl flex items-center gap-2 text-right transition-all border cursor-pointer ${
                      selectedWallColor === color.hex
                        ? 'border-[#c59d5f] bg-[#1d222e]'
                        : 'border-[#262a38] bg-[#0e1015] hover:border-gray-600'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/30 shadow-sm shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[11px] text-gray-300 truncate">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Frame Style Selector */}
          <div className="p-5 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-3">
            <label className="text-xs font-bold text-gray-300 block">
              نوع ولون الإطار (Framing)
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setSelectedFrame('gold')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer ${
                  selectedFrame === 'gold'
                    ? 'border-[#c59d5f] bg-[#1d222e] text-[#f4eedb] font-bold'
                    : 'border-[#262a38] bg-[#0e1015] text-gray-400 hover:text-white'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#d4af37]" />
                <span>إطار مذهب فاخر</span>
              </button>

              <button
                onClick={() => setSelectedFrame('black')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer ${
                  selectedFrame === 'black'
                    ? 'border-[#c59d5f] bg-[#1d222e] text-white font-bold'
                    : 'border-[#262a38] bg-[#0e1015] text-gray-400 hover:text-white'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-black border border-gray-600" />
                <span>خشب أسود مات</span>
              </button>

              <button
                onClick={() => setSelectedFrame('natural')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer ${
                  selectedFrame === 'natural'
                    ? 'border-[#c59d5f] bg-[#1d222e] text-amber-200 font-bold'
                    : 'border-[#262a38] bg-[#0e1015] text-gray-400 hover:text-white'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#8B5A2B]" />
                <span>خشب سنديان طبيعي</span>
              </button>

              <button
                onClick={() => setSelectedFrame('none')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer ${
                  selectedFrame === 'none'
                    ? 'border-[#c59d5f] bg-[#1d222e] text-white font-bold'
                    : 'border-[#262a38] bg-[#0e1015] text-gray-400 hover:text-white'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-gray-500" />
                <span>قماش بدون إطار</span>
              </button>
            </div>
          </div>

          {/* Action CTA */}
          <button
            onClick={() => onSelectArtwork(selectedArtwork)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black font-extrabold text-sm shadow-xl shadow-[#c59d5f]/20 hover:brightness-110 transition-all cursor-pointer"
          >
            متابعة اقتناء هذه اللوحة
          </button>
        </div>
      </div>
    </div>
  );
};
