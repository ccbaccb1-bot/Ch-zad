import React, { useState } from 'react';
import { Artwork } from '../types';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  Truck, 
  Leaf, 
  CheckCircle2, 
  Package, 
  Award, 
  Download,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onPaymentSuccess: (artwork: Artwork) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  artwork,
  onClose,
  onPaymentSuccess
}) => {
  const [step, setStep] = useState<'details' | 'cmi_gateway' | 'success'>('details');
  const [fullName, setFullName] = useState('كريم العلمي');
  const [phone, setPhone] = useState('+212 6 61 23 45 67');
  const [city, setCity] = useState('الدار البيضاء');
  const [address, setAddress] = useState('حي كاليفورنيا، شارع النخيل، رقم 42');
  const [deliveryCompany, setDeliveryCompany] = useState<'aramex' | 'ghazala'>('aramex');
  const [paymentMethod, setPaymentMethod] = useState<'cmi_card' | 'bank_transfer' | 'apple_pay'>('cmi_card');
  
  // Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/26');
  const [cardCvv, setCardCvv] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!artwork) return null;

  const shippingCost = deliveryCompany === 'aramex' ? 250 : 180;
  const totalAmount = artwork.priceMAD + shippingCost;
  const ecoContribution = artwork.ecoContributionMAD;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#10B981', '#ffffff']
        });
      } catch {}
      onPaymentSuccess(artwork);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        id="checkout-modal"
        className="relative w-full max-w-2xl rounded-3xl bg-[#11141c] border border-[#2d3345] shadow-2xl overflow-hidden my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: DELIVERY & ESCROW SUMMARY */}
        {step === 'details' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#232838] pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                  حماية Escrow 48h
                </span>
                <h3 className="text-xl font-bold text-white">إتمام اقتناء العمل الفني</h3>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                تُجمد أموالك في حساب الضمان، ولا تُحرر للفنان إلا بعد 48 ساعة من استلامك وتأكيد سلامة اللوحة.
              </p>
            </div>

            {/* Artwork Mini Summary */}
            <div className="p-4 rounded-2xl bg-[#0e1015] border border-[#232736] flex items-center gap-4">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-20 h-20 rounded-xl object-cover border border-[#343a4e]"
              />
              <div className="flex-1 text-xs">
                <h4 className="text-sm font-bold text-white line-clamp-1">{artwork.title}</h4>
                <p className="text-gray-400 mt-0.5">الفنان: {artwork.artistName} ({artwork.artistCity})</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1e222e]">
                  <span className="text-[#e5c384] font-bold font-serif-luxury text-sm">
                    {artwork.priceMAD.toLocaleString()} د.م
                  </span>
                  <span className="text-emerald-400 font-medium">
                    +{ecoContribution} د.م لدعم غابات بنسليمان
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Form */}
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-gray-300 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#c59d5f]" />
                <span>بيانات الشحن والتوصيل الآمن</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1">الاسم الكامل للمقتني</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">رقم الهاتف للتنسيق</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">المدينة</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-gray-200"
                  >
                    <option value="الدار البيضاء">الدار البيضاء</option>
                    <option value="الرباط">الرباط</option>
                    <option value="مراكش">مراكش</option>
                    <option value="طنجة">طنجة</option>
                    <option value="فاس">فاس</option>
                    <option value="بنسليمان">بنسليمان</option>
                    <option value="أكادير">أكادير</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">شركة الشحن المعتمدة</label>
                  <select
                    value={deliveryCompany}
                    onChange={(e) => setDeliveryCompany(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-gray-200"
                  >
                    <option value="aramex">أرامكس المغرب VIP للأعمال الفنية (250 د.م)</option>
                    <option value="ghazala">غزال إكسبريس للطرود المؤمنة (180 د.م)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">العنوان الدقيق للرواق / الإقامة</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1015] border border-[#2b3040] text-gray-200"
                  required
                />
              </div>
            </div>

            {/* Packaging Protocol Badge */}
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-700/40 flex items-center gap-3 text-xs text-emerald-300">
              <Package className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                التغليف بصندوق شعوب المعتمد (Chaoub Eco-Box) مع 3 طبقات حماية وتأمين 100% ضد الكسر.
              </span>
            </div>

            {/* Next Button */}
            <button
              onClick={() => setStep('cmi_gateway')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black font-extrabold text-sm shadow-xl hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>المتابعة للدفع عبر بوابة CMI المغربية ({totalAmount.toLocaleString()} د.م)</span>
            </button>
          </div>
        )}

        {/* STEP 2: CMI MOROCCAN PAYMENT GATEWAY SIMULATION */}
        {step === 'cmi_gateway' && (
          <form onSubmit={handleSimulatePayment} className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#232838] pb-4">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-white rounded-lg text-black font-black text-xs tracking-wider">
                  CMI
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">بوابة الدفع الإلكتروني المعتمدة (CMI)</h3>
                  <p className="text-[11px] text-gray-400">Centre Monétique Interbancaire - اتصال مشفر 256-bit</p>
                </div>
              </div>
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('cmi_card')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  paymentMethod === 'cmi_card'
                    ? 'border-[#c59d5f] bg-[#1d222e] text-white font-bold'
                    : 'border-[#272b38] bg-[#0e1015] text-gray-400'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#c59d5f]" />
                <span>بطاقة بنكية مغربية</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#c59d5f] bg-[#1d222e] text-white font-bold'
                    : 'border-[#272b38] bg-[#0e1015] text-gray-400'
                }`}
              >
                <span>تحويل بنكي مباشر</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  paymentMethod === 'apple_pay'
                    ? 'border-[#c59d5f] bg-[#1d222e] text-white font-bold'
                    : 'border-[#272b38] bg-[#0e1015] text-gray-400'
                }`}
              >
                <span>Apple Pay</span>
              </button>
            </div>

            {/* Card Inputs */}
            <div className="p-4 rounded-2xl bg-[#0e1015] border border-[#232736] space-y-3 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">رقم البطاقة البنكية</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141720] border border-[#2b3040] text-white font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1">تاريخ الانتهاء</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141720] border border-[#2b3040] text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">رمز الأمان (CVV)</label>
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141720] border border-[#2b3040] text-white font-mono"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-400 pt-1">
              <div className="flex justify-between">
                <span>سعر اللوحة الأصلية:</span>
                <span className="text-white font-mono">{artwork.priceMAD.toLocaleString()} د.م</span>
              </div>
              <div className="flex justify-between">
                <span>الشحن المؤمن (Chaoub Eco-Box):</span>
                <span className="text-white font-mono">{shippingCost} د.م</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>المساهمة المباشرة في غابات بنسليمان (2%):</span>
                <span className="font-mono">{ecoContribution} د.م</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#232838]">
                <span>المجموع النهائي:</span>
                <span className="text-[#e5c384] font-mono">{totalAmount.toLocaleString()} درهم مغربي</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:brightness-110 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>جاري معالجة الدفع عبر CMI وحبس الأموال في الضمان...</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>تأكيد الدفع الآمن والحبس المالي ({totalAmount.toLocaleString()} د.م)</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 3: SUCCESS & CERTIFICATE RECEIPT */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">تهانينا! تم تأكيد اقتنائك بنجاح</h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                تم تجميد المبلغ في نظام الضمان Escrow. سيتم تجهيز اللوحة داخل "صندوق شعوب المعتمد" وتسليمها لشركة الشحن خلال 24 ساعة.
              </p>
            </div>

            {/* Digital Certificate Download Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#191610] via-[#12141c] to-[#0e1017] border-2 border-[#c59d5f] text-right space-y-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#3d3322] pb-2">
                <span className="text-xs font-bold text-[#e5c384] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#c59d5f]" />
                  شهادة الأصالة الرقمية الموثقة
                </span>
                <span className="font-mono text-[10px] text-gray-400">{artwork.certificateNumber}</span>
              </div>
              <p className="text-xs text-gray-200">
                اللوحة: <strong className="text-white">{artwork.title}</strong> • الفنان: <strong>{artwork.artistName}</strong>
              </p>
              <div className="flex justify-between items-center text-[10px] text-emerald-400 pt-1">
                <span>تم إيداع مساهمتك البيئية ({ecoContribution} د.م) لجمعية بنسليمان</span>
                <span className="text-[#c59d5f] font-semibold">موقعة: نبيل شعوب</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-[#1c212e] text-white font-bold text-xs hover:bg-[#252c3d]"
              >
                العودة للمعرض
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
