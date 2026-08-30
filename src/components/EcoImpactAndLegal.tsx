import React, { useState } from 'react';
import { EcoImpactData, FinancialPlanState } from '../types';
import { 
  Leaf, 
  Trees, 
  Users, 
  Calendar, 
  FileText, 
  Calculator, 
  ShieldCheck, 
  Code2, 
  Sliders, 
  Sparkles, 
  Building2, 
  Scale, 
  Package, 
  CreditCard,
  CheckCircle2,
  Copy,
  ChevronDown
} from 'lucide-react';

interface EcoImpactAndLegalProps {
  ecoData: EcoImpactData;
}

export const EcoImpactAndLegal: React.FC<EcoImpactAndLegalProps> = ({ ecoData }) => {
  const [activeSection, setActiveSection] = useState<'eco' | 'finance' | 'legal' | 'rfp'>('eco');

  // Interactive Financial Model Sliders
  const [avgPrice, setAvgPrice] = useState<number>(4500);
  const [monthlySales, setMonthlySales] = useState<number>(50);
  const [platformFeeRate, setPlatformFeeRate] = useState<number>(12);
  const [associationRate, setAssociationRate] = useState<number>(2);

  // Calculations
  const annualSalesCount = monthlySales * 12;
  const annualGMV = avgPrice * annualSalesCount;
  const annualPlatformFee = Math.round(annualGMV * (platformFeeRate / 100));
  const annualAssociationFund = Math.round(annualGMV * (associationRate / 100));
  const netPlatformRevenue = annualPlatformFee - annualAssociationFund;
  const annualArtistPayout = annualGMV - annualPlatformFee;

  const [copiedLegal, setCopiedLegal] = useState(false);

  const copyLegalText = () => {
    const text = `اتفاقية إطار للشراكة والمساهمة التنموية\nبين:\n1) شركة Chaoub Art Market ش.م.م.م.و (في طور التأسيس)، يمثلها السيد نبيل شعوب بصفته مديراً عاماً.\n2) جمعية فنون الإنسان للبيئة والتنمية بنسليمان، يمثلها السيد نبيل شعوب بصفته رئيساً.\n\nالمادة 1: تحديد آليات التعاون المالي واللوجستي والترويجي.\nالمادة 2: اقتطاع نسبة ثابثة 2% من إجمالي المبيعات شهرياً للجمعية لدعم التشجير والإقامات الإيكولوجية ببنسليمان.\nالمادة 3: منح الجمعية فضاء شعوب للفن الإيكولوجي داخل المنصة.\nالمادة 4: الخضوع للقوانين المغربية والمحكمة التجارية بالدار البيضاء.`;
    navigator.clipboard.writeText(text);
    setCopiedLegal(true);
    setTimeout(() => setCopiedLegal(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Section Header */}
      <div className="border-b border-[#232735] pb-6">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
            الاستدامة والشفافية
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            فضاء بنسليمان البيئي، النموذج المالي، والاتفاقية القانونية
          </h2>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          رؤية تشغيلية ومؤسساتية متكاملة تضمن استدامة المنصة ودعم المشاريع البيئية لجمعية فنون الإنسان
        </p>
      </div>

      {/* Internal Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#232735] pb-3">
        <button
          onClick={() => setActiveSection('eco')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
            activeSection === 'eco'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 font-bold'
              : 'bg-[#151822] text-gray-300 hover:text-white border border-[#272b38]'
          }`}
        >
          <Leaf className="w-4 h-4" />
          <span>أثر جمعية فنون الإنسان ببنسليمان</span>
        </button>

        <button
          onClick={() => setActiveSection('finance')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
            activeSection === 'finance'
              ? 'bg-[#c59d5f] text-black shadow-lg font-bold'
              : 'bg-[#151822] text-gray-300 hover:text-white border border-[#272b38]'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>حاسبة الجدوى والتدفق المالي (GMV)</span>
        </button>

        <button
          onClick={() => setActiveSection('legal')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
            activeSection === 'legal'
              ? 'bg-[#c59d5f] text-black shadow-lg font-bold'
              : 'bg-[#151822] text-gray-300 hover:text-white border border-[#272b38]'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>الاتفاقية الإطار والبروتوكول اللوجستي</span>
        </button>

        <button
          onClick={() => setActiveSection('rfp')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
            activeSection === 'rfp'
              ? 'bg-sky-600 text-white shadow-lg font-bold'
              : 'bg-[#151822] text-gray-300 hover:text-white border border-[#272b38]'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>طلب العروض التقني للمطورين (RFP)</span>
        </button>
      </div>

      {/* SECTION 1: BEN SLIMANE ECO-HUMAN IMPACT */}
      {activeSection === 'eco' && (
        <div className="space-y-8">
          {/* Top Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-[#10151f] to-[#0c0e14] border border-emerald-700/40 relative overflow-hidden shadow-2xl">
            <div className="max-w-3xl space-y-4 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-600/60 text-emerald-300 text-xs">
                <Trees className="w-3.5 h-3.5" />
                <span>جمعية فنون الإنسان للبيئة والتنمية - إقليم بنسليمان</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                الفن في خدمة غابات بنسليمان والإنسان
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed font-light">
                تلتزم منصة Chaoub Art & Human باقتطاع نسبة 2% ثابتة من كل عملية اقتناء أو مزاد وتحويلها مباشرة لمشاريع إعادة تشجير البلوط الفليني، ورشات الفن الإيكولوجي الموجهة لشباب وأطفال المنطقة، وتنظيم الإقامات الفنية الإيكولوجية في قلب طبيعة بنسليمان الخلابة.
              </p>
            </div>
          </div>

          {/* Key Impact Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-2">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-400" />
                المساهمات المجمعة حتى الآن
              </span>
              <p className="text-2xl font-black text-emerald-400 font-serif-luxury">
                {ecoData.totalContributionsMAD.toLocaleString()} <span className="text-xs text-emerald-300">د.م</span>
              </p>
              <div className="w-full bg-[#1e2330] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full rounded-full" 
                  style={{ width: `${(ecoData.totalContributionsMAD / ecoData.targetContributionsMAD) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-400">
                الهدف السنوي: {ecoData.targetContributionsMAD.toLocaleString()} د.م
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-2">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-emerald-400" />
                أشجار تم غرسها ببنسليمان
              </span>
              <p className="text-2xl font-black text-white font-serif-luxury">
                {ecoData.treesPlantedBenSlimane} <span className="text-xs text-emerald-400 font-normal">شجرة بلوط وزيتون</span>
              </p>
              <span className="text-[11px] text-emerald-400">
                بمعدل شجرة لكل 75 د.م مساهمة
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-2">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#c59d5f]" />
                ورش الفن الإيكولوجي المنجزة
              </span>
              <p className="text-2xl font-black text-[#f4eedb] font-serif-luxury">
                {ecoData.workshopsOrganized} <span className="text-xs text-[#c59d5f] font-normal">ورشات مجانية</span>
              </p>
              <span className="text-[11px] text-gray-400">
                استخدام الأصباغ والمواد الطبيعية
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#13161f] border border-[#252a38] space-y-2">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-sky-400" />
                أطفال وشباب مستفيدون
              </span>
              <p className="text-2xl font-black text-sky-300 font-serif-luxury">
                {ecoData.beneficiaryYouth} <span className="text-xs text-sky-400 font-normal">مستفيد</span>
              </p>
              <span className="text-[11px] text-gray-400">
                في إقليم بنسليمان ونواحيه
              </span>
            </div>
          </div>

          {/* Next Community Event */}
          <div className="p-6 rounded-2xl bg-[#13161f] border border-[#272b38] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs text-[#c59d5f] font-bold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                النشاط الميداني القادم للجمعية
              </span>
              <h4 className="text-base font-bold text-white">{ecoData.nextEvent.title}</h4>
              <p className="text-xs text-gray-400">
                {ecoData.nextEvent.date} • {ecoData.nextEvent.location}
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer">
              التسجيل كمتطوع / داعم
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: INTERACTIVE FINANCIAL FEASIBILITY MODEL */}
      {activeSection === 'finance' && (
        <div className="space-y-8">
          <div className="p-6 rounded-3xl bg-[#13161f] border border-[#272b38] space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#c59d5f]" />
                <span>خطة التدفق المالي وحسابات الجدوى والاستدامة السنوية</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                جرّب تغيير المعايير أدناه لمحاكاة أداء المنصة المالي وحصص الجمعية والفنانين
              </p>
            </div>

            {/* Interactive Sliders Control Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-[#0e1015] border border-[#222736]">
              {/* Slider 1: Average Artwork Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-medium">متوسط سعر اللوحة الفنية المنسقة:</span>
                  <span className="text-[#e5c384] font-bold font-mono text-sm">{avgPrice.toLocaleString()} درهم</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="15000"
                  step="500"
                  value={avgPrice}
                  onChange={(e) => setAvgPrice(Number(e.target.value))}
                  className="w-full accent-[#c59d5f] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>2,000 د.م</span>
                  <span className="text-[#c59d5f]">المرجعي: 4,500 د.م</span>
                  <span>15,000 د.م</span>
                </div>
              </div>

              {/* Slider 2: Monthly Sales Volume */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-medium">مستهدف المبيعات الشهري (تطبيق + مزادات):</span>
                  <span className="text-[#e5c384] font-bold font-mono text-sm">{monthlySales} لوحة / شهر</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={monthlySales}
                  onChange={(e) => setMonthlySales(Number(e.target.value))}
                  className="w-full accent-[#c59d5f] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>10 لوحات</span>
                  <span className="text-[#c59d5f]">المرجعي: 50 لوحة</span>
                  <span>150 لوحة</span>
                </div>
              </div>
            </div>

            {/* Simulated Results Grid (Matches Section 6 of specs) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* GMV */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#181d28] to-[#12151e] border border-[#2e3549] space-y-1">
                <span className="text-xs text-gray-400">إجمالي قيمة التداول السنوي (GMV)</span>
                <p className="text-2xl font-black text-white font-serif-luxury">
                  {annualGMV.toLocaleString()} <span className="text-xs font-normal text-[#c59d5f]">د.م</span>
                </p>
                <span className="text-[11px] text-gray-400">({annualSalesCount} عمل فني سنوياً)</span>
              </div>

              {/* Platform Commission 12% */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#181d28] to-[#12151e] border border-[#2e3549] space-y-1">
                <span className="text-xs text-gray-400">عمولة المنصة الثابتة ({platformFeeRate}%)</span>
                <p className="text-2xl font-black text-[#f4eedb] font-serif-luxury">
                  {annualPlatformFee.toLocaleString()} <span className="text-xs font-normal text-[#c59d5f]">د.م</span>
                </p>
                <span className="text-[11px] text-gray-400">إجمالي دخل التسويق والوساطة</span>
              </div>

              {/* Association 2% */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-950/50 to-[#12151e] border border-emerald-700/40 space-y-1">
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5" />
                  تمويل جمعية بنسليمان ({associationRate}%)
                </span>
                <p className="text-2xl font-black text-emerald-300 font-serif-luxury">
                  {annualAssociationFund.toLocaleString()} <span className="text-xs font-normal text-emerald-400">د.م</span>
                </p>
                <span className="text-[11px] text-emerald-400/80">مخصص لمشاريع البيئة والورش</span>
              </div>

              {/* Net Operating Revenue */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#181d28] to-[#12151e] border border-[#2e3549] space-y-1">
                <span className="text-xs text-gray-400">صافي إيرادات تشغيل وتطوير المنصة</span>
                <p className="text-2xl font-black text-amber-300 font-serif-luxury">
                  {netPlatformRevenue.toLocaleString()} <span className="text-xs font-normal text-amber-400">د.م</span>
                </p>
                <span className="text-[11px] text-gray-400">بعد اقتطاع حصة الجمعية</span>
              </div>
            </div>

            {/* Artist payout transparency */}
            <div className="p-4 rounded-xl bg-[#0e1015] border border-[#222736] flex flex-wrap items-center justify-between text-xs text-gray-300 gap-2">
              <span>إجمالي المستحقات المالية الصافية المحولة للفنانين التشكيليين (88%):</span>
              <span className="font-mono text-[#e5c384] text-base font-bold">
                {annualArtistPayout.toLocaleString()} درهم مغربي
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: LEGAL FRAMEWORK & LOGISTICS */}
      {activeSection === 'legal' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#13161f] border border-[#272b38] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222633] pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-[#c59d5f]" />
                  <span>اتفاقية إطار للشراكة والمساهمة التنموية (نموذج قانوني رسمي)</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  الإطار المنظم للعلاقة بين الشركة التجارية والجمعية البيئية ببنسليمان
                </p>
              </div>

              <button
                onClick={copyLegalText}
                className="px-4 py-2 rounded-xl bg-[#1c202c] hover:bg-[#272d3e] text-gray-200 border border-[#373e52] text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors"
              >
                {copiedLegal ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#c59d5f]" />}
                <span>{copiedLegal ? 'تم نسخ نص الاتفاقية' : 'نسخ النص القانوني'}</span>
              </button>
            </div>

            {/* Legal Document Render */}
            <div className="p-6 rounded-2xl bg-[#0e1015] border border-[#222736] space-y-5 text-right font-sans">
              <div className="text-center border-b border-[#222736] pb-4 space-y-1">
                <h4 className="text-base font-bold text-[#e5c384]">المملكة المغربية</h4>
                <p className="text-xs text-gray-400">عقد شراكة والتزام بالمساهمة البيئية والمجتمعية</p>
              </div>

              <div className="space-y-3 text-xs text-gray-300 leading-relaxed">
                <p className="font-bold text-white">بين الموقعين أسفله:</p>
                <div className="pr-4 space-y-2 border-r-2 border-[#c59d5f]/40">
                  <p>
                    <strong>1) شركة Chaoub Art Market ش.م.م.م.و</strong> (في طور التأسيس)، الكائن مقرها الاجتماعي ببنسليمان، يمثلها السيد <strong>نبيل شعوب</strong> بصفته مديراً عاماً.
                  </p>
                  <p>
                    <strong>2) جمعية فنون الإنسان للبيئة والتنمية بنسليمان</strong>، الجمعية المؤسسة وفق ظهير الحريات العامة، يمثلها السيد <strong>نبيل شعوب</strong> بصفته رئيساً.
                  </p>
                </div>

                <div className="pt-3 space-y-3">
                  <div className="p-3 rounded-xl bg-[#141721] border border-[#232736]">
                    <p className="text-white font-bold text-xs mb-1">المادة 1: موضوع الاتفاقية</p>
                    <p className="text-gray-300">
                      تهدف هذه الاتفاقية إلى تحديد آليات التعاون المالي، اللوجستي، والترويجي بين المنصة التجارية للوساطة في الفنون التشكيلية والمشاريع التنموية والبيئية لجمعية فنون الإنسان ببنسليمان.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141721] border border-[#232736]">
                    <p className="text-emerald-400 font-bold text-xs mb-1">المادة 2: الاقتطاع المالي البيئي (2%)</p>
                    <p className="text-gray-300">
                      تلتزم الشركة باقتطاع نسبة ثابثة قدرها <strong>2% من إجمالي القيمة التجارية (GMV)</strong> لكل عملية بيع أو مزاد فني ناجح، وتحويلها شهرياً للحساب البنكي المعتمد للجمعية، لتغطية نفقات غرس الأشجار في غابة بنسليمان وتنظيم الورش الفنية المجانية.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141721] border border-[#232736]">
                    <p className="text-white font-bold text-xs mb-1">المادة 3: الفضاء الرقمي والحقوق المتبادلة</p>
                    <p className="text-gray-300">
                      تمنح الشركة للجمعية مساحة دائمة ومميزة داخل التطبيق والموقع تحمل اسم <strong>"فضاء شعوب للفن الإيكولوجي"</strong>، وبالمقابل تمنح الجمعية الحق الحصري للشركة لاستخدام رصيدها الثقافي والجمعوي في الترويج المسؤول.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141721] border border-[#232736]">
                    <p className="text-white font-bold text-xs mb-1">المادة 4: الاختصاص القضائي والقانون الواجب التطبيق</p>
                    <p className="text-gray-300">
                      تخضع هذه الاتفاقية للقوانين الجاري بها العمل في المملكة المغربية، وتُحال النزاعات الناتجة عنها على أنظار <strong>المحكمة التجارية بالدار البيضاء</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logistics & Escrow Protocol Summary */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171c26] to-[#12151e] border border-[#2c3346] space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>بروتوكول الشحن وحبس الأموال (Escrow & Carrier Protocol)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
                <div className="p-3 rounded-xl bg-[#0e1015] border border-[#222736] space-y-1">
                  <p className="text-emerald-400 font-bold">نظام حبس الأموال (Escrow 48h):</p>
                  <p className="text-gray-400 text-[11px]">
                    عند دفع المقتني، تُجمد الأموال في حساب الضمان، ولا تُحرر للفنان إلا بعد انقضاء 48 ساعة من استلام اللوحة وفحص مطابقتها.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#0e1015] border border-[#222736] space-y-1">
                  <p className="text-[#c59d5f] font-bold">الشراكة اللوجستية المعتمدة:</p>
                  <p className="text-gray-400 text-[11px]">
                    اتفاقية إطار مع أرامكس المغرب وغزال لشحن القطع الحساسة مع تتبع مباشر وتأمين 100% ضد الكسر أو التلف.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: DEVELOPER TECHNICAL RFP */}
      {activeSection === 'rfp' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#13161f] border border-[#272b38] space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-sky-400" />
                <span>ملخص فني تنفيذي وطلب عروض تقني (RFP) موجه للمطورين</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                المواصفات الهندسية الشاملة لتطوير منصة وتطبيقات Chaoub Art & Human
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#0e1015] border border-[#222736] space-y-2">
                <span className="text-sky-400 font-bold text-sm block">1) واجهة المعرض المنسق (Curated Gallery UI)</span>
                <p className="text-gray-400 leading-relaxed">
                  تطوير واجهة مستخدم فائقة الأداء تعتمد على التمرير الرأسي السريع والتخزين المؤقت للصور عالية الجودة، مع فلاتر ديناميكية للأسلوب، المقاس، والسعر.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e1015] border border-[#222736] space-y-2">
                <span className="text-red-400 font-bold text-sm block">2) محرك المزادات الحية (Live Auction Engine)</span>
                <p className="text-gray-400 leading-relaxed">
                  نظام مزادات فوري منخفض الكمون (WebSockets / Server-Sent Events) مع عداد تنازلي دقيق، وتطبيق خاصية Anti-sniping (+2 min) لضمان النزاهة التنافسية.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e1015] border border-[#222736] space-y-2">
                <span className="text-[#c59d5f] font-bold text-sm block">3) استوديو الواقع المعزز (AR Studio 1:1)</span>
                <p className="text-gray-400 leading-relaxed">
                  دمج محرك Google ARCore و Apple ARKit ومكتبات WebXR لحساب أبعاد الغرفة وإسقاط اللوحة بمقياس فيزيائي حقيقي 1:1 على جدار المقتني.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e1015] border border-[#222736] space-y-2">
                <span className="text-emerald-400 font-bold text-sm block">4) الربط المالي الآمن (CMI Gateway & Escrow)</span>
                <p className="text-gray-400 leading-relaxed">
                  دمج مباشر مع مركز النقديات المغربي CMI لمعالجة بطاقات الائتمان المغربية والدولية مع بنية تحتية لحبس أموال الضمان Escrow لـ 48 ساعة.
                </p>
              </div>
            </div>

            {/* Roadmap Timeline */}
            <div className="p-5 rounded-2xl bg-[#0e1015] border border-[#222736] space-y-3">
              <h4 className="text-xs font-bold text-white">خارطة طريق الانطلاق الميداني (5 Months Roadmap):</h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-[#141722] border border-[#242938]">
                  <p className="text-[#c59d5f] font-bold">الشهر 1:</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">التأسيس القانوني + حجز العلامة التجارية والشهادة السلبية وتوقيع العقد الإطار.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#141722] border border-[#242938]">
                  <p className="text-[#c59d5f] font-bold">الشهر 2-3:</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">تطوير المنصة والتطبيقات ومحرك المزادات الحية واستوديو AR.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#141722] border border-[#242938]">
                  <p className="text-[#c59d5f] font-bold">الشهر 4:</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">تفعيل بوابة CMI + فتح باب تسجيل أول 100 فنان مع مبادرة التصوير المجاني.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#141722] border border-[#242938]">
                  <p className="text-emerald-400 font-bold">الشهر 5:</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">الانطلاق الرسمي (Grand Opening) بالمزاد الحي الأول بإشراف نبيل شعوب.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
