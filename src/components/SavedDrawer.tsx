import React from 'react';
import { Artwork } from '../types';
import { X, Trash2, Eye, ShieldCheck, ShoppingBag, Leaf, ArrowRight } from 'lucide-react';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArtworks: Artwork[];
  onRemove: (id: string) => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onOpenARStudio: (artwork: Artwork) => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedArtworks,
  onRemove,
  onSelectArtwork,
  onOpenARStudio
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#11141c] border-r border-[#262b3a] h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#232737] pb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c59d5f]" />
              <h3 className="text-lg font-bold text-white">اللوحات المحفوظة</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#1b202c] text-[#e5c384] font-mono">
                {savedArtworks.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#161822] text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          {savedArtworks.length === 0 ? (
            <div className="py-16 text-center text-gray-400 space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-sm">لم تقم بحفظ أي أعمال تشكيلية بعد.</p>
              <p className="text-xs text-gray-500">
                انقر على أيقونة القلب على أي لوحة في المعرض لحفظها ومقارنتها في استوديو AR.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedArtworks.map((art) => (
                <div
                  key={art.id}
                  className="p-3.5 rounded-2xl bg-[#0e1015] border border-[#222736] flex gap-3 relative group"
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-20 h-20 rounded-xl object-cover border border-[#2d3345] shrink-0"
                  />
                  <div className="flex-1 text-xs space-y-1">
                    <h4 className="font-bold text-white line-clamp-1">{art.title}</h4>
                    <p className="text-gray-400 text-[11px]">{art.artistName} ({art.artistCity})</p>
                    <p className="text-[#e5c384] font-bold font-serif-luxury text-sm">
                      {art.isAuction ? (art.currentBidMAD || art.priceMAD).toLocaleString() : art.priceMAD.toLocaleString()} د.م
                    </p>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenARStudio(art);
                        }}
                        className="py-1 px-2.5 rounded-lg bg-[#1a1d28] hover:bg-[#242939] text-[#c59d5f] text-[11px] font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>معاينة AR</span>
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          onSelectArtwork(art);
                        }}
                        className="py-1 px-2.5 rounded-lg bg-[#c59d5f] text-black text-[11px] font-bold cursor-pointer"
                      >
                        عرض
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemove(art.id)}
                    className="absolute top-3 left-3 p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-[#1a1d28] cursor-pointer"
                    title="حذف من المحفوظات"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {savedArtworks.length > 0 && (
          <div className="pt-4 border-t border-[#232737] space-y-3">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#1c212e] text-white text-xs font-bold hover:bg-[#252c3d] cursor-pointer"
            >
              متابعة التصفح في المعرض
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
