import React from 'react';
import { UserRole } from '../types';
import { 
  Palette, 
  Gavel, 
  Eye, 
  Leaf, 
  UserCheck, 
  FileText, 
  ShoppingBag, 
  Sparkles,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  savedCount: number;
  onOpenSaved: () => void;
  activeAuctionsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  savedCount,
  onOpenSaved,
  activeAuctionsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'gallery', label: 'المعرض الذكي', icon: Palette },
    { 
      id: 'auctions', 
      label: 'المزادات الحية', 
      icon: Gavel, 
      badge: activeAuctionsCount > 0 ? `${activeAuctionsCount} مباشر` : undefined 
    },
    { id: 'ar_studio', label: 'استوديو AR (المعاينة)', icon: Eye, highlight: true },
    { id: 'eco_impact', label: 'أثر بنسليمان والجمعية', icon: Leaf },
    { id: 'artist_hub', label: 'فضاء الفنان', icon: UserCheck },
    { id: 'legal_finance', label: 'الاتفاقية والجدوى', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0d0f12]/95 backdrop-blur-md border-b border-[#252830] transition-all">
      {/* Top micro-banner */}
      <div className="bg-gradient-to-r from-[#12151c] via-[#1a1e27] to-[#12151c] text-xs py-1.5 px-4 border-b border-[#2a2e39] text-[#c59d5f] flex justify-between items-center">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>المؤسس: الفنان التشكيلي نبيل شعوب | جمعية فنون الإنسان للبيئة والتنمية بنسليمان</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-gray-300">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              حماية الدفع والحبس المالي Escrow 48h
            </span>
            <span className="text-[#c59d5f] font-semibold">2% دعم مستدام لمشاريع البيئة</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Founder Identity */}
          <div 
            id="brand-logo-btn"
            onClick={() => setCurrentTab('gallery')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c59d5f] via-[#d4af37] to-[#996515] p-0.5 shadow-lg shadow-[#c59d5f]/15 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0d0f12] rounded-[10px] flex items-center justify-center font-bold text-lg text-[#f4eedb] tracking-wider font-serif-luxury">
                CH
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-serif-luxury">
                  CHAOUB
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#c59d5f]/15 text-[#e5c384] border border-[#c59d5f]/30 font-semibold">
                  Art & Human
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-light -mt-0.5">
                منصة الفن التشكيلي المغربي والتنمية البيئية
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'text-white bg-[#1e222d] shadow-inner border border-[#373c4c]'
                      : 'text-gray-300 hover:text-white hover:bg-[#161820]'
                  } ${item.highlight ? 'text-[#e5c384] hover:text-[#f4eedb]' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#c59d5f]' : item.highlight ? 'text-[#c59d5f]' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse font-bold">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-[#c59d5f] to-transparent rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls: Role Switcher & Saved Items */}
          <div className="flex items-center gap-3">
            {/* User Role Switcher Pill */}
            <div className="hidden sm:flex items-center p-1 bg-[#151820] rounded-xl border border-[#262a35] text-xs">
              <button
                id="role-collector-btn"
                onClick={() => setUserRole('collector')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  userRole === 'collector'
                    ? 'bg-[#c59d5f] text-black shadow-md font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                مقتني
              </button>
              <button
                id="role-artist-btn"
                onClick={() => {
                  setUserRole('artist');
                  if (currentTab !== 'artist_hub') setCurrentTab('artist_hub');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  userRole === 'artist'
                    ? 'bg-[#c59d5f] text-black shadow-md font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                فنان تشكيلي
              </button>
            </div>

            {/* Saved artworks badge button */}
            <button
              id="saved-artworks-btn"
              onClick={onOpenSaved}
              className="relative p-2.5 rounded-xl bg-[#171a22] border border-[#292d3a] hover:border-[#c59d5f]/50 text-gray-300 hover:text-white transition-all"
              title="اللوحات المحفوظة"
            >
              <ShoppingBag className="w-5 h-5 text-[#c59d5f]" />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#c59d5f] text-black font-bold text-xs flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#171a22] border border-[#292d3a] text-gray-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#232733] space-y-2">
            <div className="flex items-center justify-between p-2 mb-3 bg-[#161820] rounded-xl border border-[#262a35]">
              <span className="text-xs text-gray-400">وضع المستخدم:</span>
              <div className="flex gap-1 text-xs">
                <button
                  onClick={() => {
                    setUserRole('collector');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-lg ${userRole === 'collector' ? 'bg-[#c59d5f] text-black font-bold' : 'text-gray-400'}`}
                >
                  مقتني
                </button>
                <button
                  onClick={() => {
                    setUserRole('artist');
                    setCurrentTab('artist_hub');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-lg ${userRole === 'artist' ? 'bg-[#c59d5f] text-black font-bold' : 'text-gray-400'}`}
                >
                  فنان
                </button>
              </div>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive ? 'bg-[#1e222d] text-white border border-[#373c4c]' : 'text-gray-300 hover:bg-[#161820]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#c59d5f]' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
