import React, { useState } from 'react';
import { UserRole, Artwork } from './types';
import { INITIAL_ARTWORKS, INITIAL_ARTIST_STATS, INITIAL_ECO_IMPACT } from './data/mockArtworks';
import { Navbar } from './components/Navbar';
import { ManifestoHeader } from './components/ManifestoHeader';
import { GalleryView } from './components/GalleryView';
import { LiveAuctionRoom } from './components/LiveAuctionRoom';
import { ARStudio } from './components/ARStudio';
import { ArtistDashboard } from './components/ArtistDashboard';
import { EcoImpactAndLegal } from './components/EcoImpactAndLegal';
import { ArtworkModal } from './components/ArtworkModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SavedDrawer } from './components/SavedDrawer';
import { 
  ShieldCheck, 
  Leaf, 
  Award, 
  MapPin, 
  Heart, 
  Sparkles, 
  Trees, 
  Phone, 
  Mail,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('gallery');
  const [userRole, setUserRole] = useState<UserRole>('collector');

  // Application State
  const [artworks, setArtworks] = useState<Artwork[]>(INITIAL_ARTWORKS);
  const [artistStats, setArtistStats] = useState(INITIAL_ARTIST_STATS);
  const [ecoData, setEcoData] = useState(INITIAL_ECO_IMPACT);

  // Saved Artworks
  const [savedIds, setSavedIds] = useState<string[]>(['art-01', 'art-03']);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Modals & Selected Artwork
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [arTargetArtwork, setArTargetArtwork] = useState<Artwork | undefined>(undefined);
  const [auctionTargetId, setAuctionTargetId] = useState<string | undefined>(undefined);
  const [checkoutArtwork, setCheckoutArtwork] = useState<Artwork | null>(null);

  // Toggle Save / Wishlist
  const handleToggleSave = (id: string) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Live Bid Handler
  const handlePlaceBid = (
    artworkId: string, 
    bidAmount: number, 
    bidderName: string, 
    bidderCity: string
  ) => {
    setArtworks(prev => prev.map(art => {
      if (art.id === artworkId) {
        const newBid = {
          id: `b-${Date.now()}`,
          bidderName: bidderName || 'مقتني معتمد',
          bidderCity: bidderCity || 'الرباط',
          amountMAD: bidAmount,
          timestamp: 'الآن'
        };
        const updatedBids = [...(art.bidsHistory || []), newBid];
        const newEco = Math.round(bidAmount * 0.02);
        return {
          ...art,
          currentBidMAD: bidAmount,
          ecoContributionMAD: newEco,
          bidsHistory: updatedBids,
          viewsCount: art.viewsCount + 1
        };
      }
      return art;
    }));

    // Update eco counter live
    const ecoBonus = Math.round(bidAmount * 0.02);
    setEcoData(prev => ({
      ...prev,
      totalContributionsMAD: prev.totalContributionsMAD + 50,
      treesPlantedBenSlimane: prev.treesPlantedBenSlimane + 1
    }));
  };

  // Add New Artwork from Artist Hub
  const handleAddNewArtwork = (newArt: Artwork) => {
    setArtworks(prev => [newArt, ...prev]);
    setArtistStats(prev => ({
      ...prev,
      activeListings: prev.activeListings + 1
    }));
  };

  // Successful Payment Handler
  const handlePaymentSuccess = (art: Artwork) => {
    // Add to eco contributions and tree counter
    setEcoData(prev => ({
      ...prev,
      totalContributionsMAD: prev.totalContributionsMAD + art.ecoContributionMAD,
      treesPlantedBenSlimane: prev.treesPlantedBenSlimane + Math.max(1, Math.round(art.ecoContributionMAD / 75))
    }));
  };

  // Trigger Open AR Studio with a specific artwork
  const handleOpenARStudio = (art: Artwork) => {
    setArTargetArtwork(art);
    setCurrentTab('ar_studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger Open Live Auction Room for a specific lot
  const handleOpenAuction = (art: Artwork) => {
    setAuctionTargetId(art.id);
    setCurrentTab('auctions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeAuctionsCount = artworks.filter(a => a.isAuction).length;
  const savedArtworks = artworks.filter(a => savedIds.includes(a.id));

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f3f4f6] flex flex-col justify-between selection:bg-[#c59d5f] selection:text-black">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={setUserRole}
        savedCount={savedIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        activeAuctionsCount={activeAuctionsCount}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {/* Tab 1: Smart Curated Gallery */}
        {currentTab === 'gallery' && (
          <div className="space-y-4">
            <ManifestoHeader
              ecoData={ecoData}
              onExploreClick={() => {
                const el = document.getElementById('gallery-search-input');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onAuctionClick={() => setCurrentTab('auctions')}
              onArtistJoinClick={() => {
                setUserRole('artist');
                setCurrentTab('artist_hub');
              }}
            />
            <GalleryView
              artworks={artworks}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              onSelectArtwork={(art) => setSelectedArtwork(art)}
              onOpenARStudio={handleOpenARStudio}
              onOpenAuction={handleOpenAuction}
            />
          </div>
        )}

        {/* Tab 2: Live Digital Auction Arena */}
        {currentTab === 'auctions' && (
          <LiveAuctionRoom
            artworks={artworks}
            selectedArtworkId={auctionTargetId}
            onSelectArtwork={(art) => setSelectedArtwork(art)}
            onOpenARStudio={handleOpenARStudio}
            onPlaceBid={handlePlaceBid}
          />
        )}

        {/* Tab 3: AR Studio Virtual Wall Preview */}
        {currentTab === 'ar_studio' && (
          <ARStudio
            artworks={artworks}
            initialArtwork={arTargetArtwork}
            onSelectArtwork={(art) => setSelectedArtwork(art)}
          />
        )}

        {/* Tab 4: Ben Slimane Eco Space & Association */}
        {currentTab === 'eco_impact' && (
          <EcoImpactAndLegal ecoData={ecoData} />
        )}

        {/* Tab 5: Artist Studio & Upload Wizard */}
        {currentTab === 'artist_hub' && (
          <ArtistDashboard
            stats={artistStats}
            artworks={artworks}
            onAddNewArtwork={handleAddNewArtwork}
          />
        )}

        {/* Tab 6: Legal Agreement & Financial Feasibility Model */}
        {currentTab === 'legal_finance' && (
          <EcoImpactAndLegal ecoData={ecoData} />
        )}
      </main>

      {/* Modals & Drawers */}
      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onOpenARStudio={handleOpenARStudio}
        onOpenAuction={handleOpenAuction}
        onProceedCheckout={(art) => setCheckoutArtwork(art)}
        isSaved={selectedArtwork ? savedIds.includes(selectedArtwork.id) : false}
        onToggleSave={handleToggleSave}
      />

      <CheckoutModal
        artwork={checkoutArtwork}
        onClose={() => setCheckoutArtwork(null)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedArtworks={savedArtworks}
        onRemove={handleToggleSave}
        onSelectArtwork={(art) => setSelectedArtwork(art)}
        onOpenARStudio={handleOpenARStudio}
      />

      {/* Platform Luxury Footer */}
      <footer className="bg-[#090a0d] border-t border-[#1e222d] pt-12 pb-8 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-right">
            {/* Column 1: Identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#c59d5f] flex items-center justify-center font-bold text-black text-sm font-serif-luxury">
                  CH
                </div>
                <span className="font-extrabold text-white text-base font-serif-luxury">
                  CHAOUB ART & HUMAN
                </span>
              </div>
              <p className="leading-relaxed text-gray-400 text-[11px]">
                المؤسس: <strong>الفنان التشكيلي والبصري نبيل شعوب</strong>. منصة مغربية متخصصة في الفنون التشكيلية المعاصرة والمزادات الحية والمعاينة الافتراضية بتقنية الواقع المعزز.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <Trees className="w-4 h-4" />
                <span>شراكة استراتيجية مع جمعية فنون الإنسان ببنسليمان</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-white text-sm">أقسام المنصة الذكية</h4>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <button onClick={() => setCurrentTab('gallery')} className="hover:text-[#c59d5f] transition-colors cursor-pointer">
                    المعرض المنسق (Curated Gallery)
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('auctions')} className="hover:text-[#c59d5f] transition-colors cursor-pointer">
                    قاعة المزادات الحية (Live Auction Engine)
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('ar_studio')} className="hover:text-[#c59d5f] transition-colors cursor-pointer">
                    استوديو الواقع المعزز 1:1 (AR Wall Studio)
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('eco_impact')} className="hover:text-[#c59d5f] transition-colors cursor-pointer">
                    فضاء شعوب للفن الإيكولوجي ببنسليمان
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Guarantees & Logistics */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-white text-sm">الضمانات والبروتوكول اللوجستي</h4>
              <ul className="space-y-2 text-[11px] text-gray-400">
                <li className="flex items-center gap-1.5 text-gray-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>حبس الأموال Escrow 48h بعد الاستلام</span>
                </li>
                <li className="flex items-center gap-1.5 text-gray-300">
                  <Award className="w-3.5 h-3.5 text-[#c59d5f] shrink-0" />
                  <span>شهادة أصالة موثقة مع كل لوحة</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span>شحن مؤمن: أرامكس المغرب & غزال إكسبريس</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span>التغليف بصندوق شعوب المعتمد (Eco-Box)</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Legal Headquarter */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-white text-sm">المقر والاتصال</h4>
              <div className="space-y-1.5 text-[11px] text-gray-400">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c59d5f]" />
                  <span>إقليم بنسليمان / الدار البيضاء، المملكة المغربية</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span>contact@chaoub-art.ma</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span dir="ltr">+212 5 23 29 XX XX</span>
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentTab('legal_finance')}
                  className="px-3 py-1.5 rounded-lg bg-[#141722] hover:bg-[#1f2434] text-[#c59d5f] border border-[#2b3346] text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <span>العقد الإطار والنموذج المالي</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="pt-6 border-t border-[#181b24] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
            <p>© 2024 Chaoub Art & Human. جميع الحقوق محفوظة لشركة Chaoub Art Market وجمعية فنون الإنسان للبيئة والتنمية بنسليمان.</p>
            <div className="flex items-center gap-4">
              <span>بوابة CMI المعتمدة</span>
              <span>•</span>
              <span>المحكمة التجارية بالدار البيضاء</span>
              <span>•</span>
              <span>برؤية الفنان نبيل شعوب</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
