import React from 'react';
import { Leaf, Award, ShieldCheck, Sparkles, Trees, Users, ArrowUpRight } from 'lucide-react';
import { EcoImpactData } from '../types';

interface ManifestoHeaderProps {
  ecoData: EcoImpactData;
  onExploreClick: () => void;
  onAuctionClick: () => void;
  onArtistJoinClick: () => void;
}

export const ManifestoHeader: React.FC<ManifestoHeaderProps> = ({
  ecoData,
  onExploreClick,
  onAuctionClick,
  onArtistJoinClick
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-[#21242e] bg-gradient-to-b from-[#0f1117] via-[#0d0e13] to-[#0a0b0e]">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c59d5f]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Founder Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181b24] border border-[#2e3342] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#c59d5f]"></span>
            <span className="text-gray-300 font-medium">رؤية وإشراف:</span>
            <span className="text-[#e5c384] font-bold">الفنان التشكيلي والبصري نبيل شعوب</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">رئيس جمعية فنون الإنسان للبيئة والتنمية بنسليمان</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-700/40 text-emerald-300 text-xs">
            <Trees className="w-3.5 h-3.5 text-emerald-400" />
            <span>2% من كل اقتناء يُمول مشاريع التشجير والفن الإيكولوجي</span>
          </div>
        </div>

        {/* Hero & Manifesto Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6 text-right">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                منصة <span className="gold-gradient-text">CHAOUB ART & HUMAN</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#c59d5f] font-serif-luxury font-medium">
                جسر بين الإبداع التشكيلي المغربي والمقتني الشغوف
              </p>
            </div>

            {/* Official Manifesto Quote */}
            <div className="relative p-5 sm:p-6 rounded-2xl bg-[#13161f] border border-[#282d3c] shadow-xl">
              <div className="absolute top-2 right-4 text-4xl text-[#c59d5f]/20 font-serif leading-none select-none">“</div>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light italic pr-4">
                "الفن ليس مجرد لون على قماش، بل هو نبض الإنسان وأثر البيئة. من قلب بنسليمان، نطلق منصة 'CHAOUB ART & HUMAN' لنسد الفجوة بين المبدع المغربي والمقتني الشغوف. نحن لا نبيع لوحات؛ بل نوثق الهوية البصرية المغربية، وندعم التنمية المستدامة، حيث يساهم كل اقتناء فني في تمويل المشاريع البيئية والورش الإنسانية للجمعية."
              </p>
              <div className="mt-3 flex items-center justify-end gap-2 text-xs text-[#d4af37] font-semibold">
                <span>— نبيل شعوب، الفنان المؤسس</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#c59d5f]/20 flex items-center gap-2 cursor-pointer"
              >
                <span>استكشف المعرض الذكي</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                id="hero-auction-btn"
                onClick={onAuctionClick}
                className="px-6 py-3 rounded-xl bg-[#1a1d26] border border-[#373c4d] text-white hover:border-[#c59d5f] font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span>المزادات الحية الآن</span>
              </button>

              <button
                id="hero-artist-join-btn"
                onClick={onArtistJoinClick}
                className="px-5 py-3 rounded-xl bg-emerald-900/30 border border-emerald-600/40 text-emerald-300 hover:bg-emerald-800/30 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>انضمام الفنانين (عرض عمولة 0%)</span>
              </button>
            </div>
          </div>

          {/* Quick Impact & Security Card */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#161a24] to-[#101218] border border-[#2b3040] space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-[#252a38] pb-4">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  أثر جمعية فنون الإنسان ببنسليمان
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  تحديث مباشر
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 text-right">
                <div className="p-3 rounded-xl bg-[#0e1015] border border-[#222633]">
                  <p className="text-xs text-gray-400">مساهمات بيئية مجمعة</p>
                  <p className="text-lg font-bold text-[#e5c384] mt-1">
                    {ecoData.totalContributionsMAD.toLocaleString()} <span className="text-xs font-normal text-gray-400">د.م</span>
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#0e1015] border border-[#222633]">
                  <p className="text-xs text-gray-400">أشجار تم غرسها</p>
                  <p className="text-lg font-bold text-emerald-400 mt-1 flex items-center justify-end gap-1">
                    <span>{ecoData.treesPlantedBenSlimane}</span>
                    <Trees className="w-4 h-4 text-emerald-400" />
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#0e1015] border border-[#222633]">
                  <p className="text-xs text-gray-400">ورشات تشكيلية للشباب</p>
                  <p className="text-lg font-bold text-white mt-1">
                    {ecoData.workshopsOrganized} ورشات
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#0e1015] border border-[#222633]">
                  <p className="text-xs text-gray-400">شباب مستفيد</p>
                  <p className="text-lg font-bold text-sky-400 mt-1 flex items-center justify-end gap-1">
                    <span>{ecoData.beneficiaryYouth}</span>
                    <Users className="w-4 h-4" />
                  </p>
                </div>
              </div>

              {/* Guarantees Badges */}
              <div className="pt-2 border-t border-[#232733] space-y-2">
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>حبس الأموال Escrow 48h حتى فحص واستلام اللوحة</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <Award className="w-4 h-4 text-[#c59d5f] shrink-0" />
                  <span>شهادة أصالة موثقة بإمضاء نبيل شعوب والفنان</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
