import { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { SearchBox, ThemeToggle } from '../../ui';
import { useFavoritesStore } from '../../../store/favoritesStore';
import { APP_NAME } from '../../../app/config/constants';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onToggleSidebar: () => void;
  onOpenFavorites: () => void;
}

export default function Navbar({ searchQuery, onSearchChange, onToggleSidebar, onOpenFavorites }: NavbarProps) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const favoritesCount = useFavoritesStore((s) => s.favorites.length);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 safe-area-top"
      style={{
        background: 'var(--neu-bg)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      }}
    >
      <div className="px-3 md:px-4 h-14 md:h-20 flex items-center justify-between gap-2 md:gap-4">
        {/* Actions (right side in RTL) */}
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={onToggleSidebar}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-soft text-primary hover:bg-primary-soft/80 transition-all"
            aria-label="القائمة"
          >
            <Menu className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden lg:inline text-sm font-semibold">القائمة</span>
          </button>

          <ThemeToggle />

          <button
            onClick={onOpenFavorites}
            className="relative w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-card text-second hover:bg-glass hover:text-pink-400 transition-all"
            aria-label="المفضلة"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -left-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-pink-500 text-white text-[9px] md:text-[10px] font-bold flex items-center justify-center shadow-lg">
                {favoritesCount > 9 ? '9+' : favoritesCount}
              </span>
            )}
          </button>

          {/* Mobile search toggle */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-card text-second hover:bg-glass transition-colors"
            aria-label="بحث"
          >
            {mobileSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:block flex-1 max-w-md">
          <SearchBox value={searchQuery} onChange={onSearchChange} />
        </div>

        {/* Logo (left side in RTL) */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
            style={{
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--neu-shadow-outset-sm), var(--shadow-glow-primary)',
            }}
          >
            <img src="/dalylak-logo.svg" alt="دليلك" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-extrabold gradient-text-primary hidden sm:block">
            {APP_NAME}
          </span>
          <span className="text-xl font-extrabold gradient-text-primary sm:hidden">
            دليلك
          </span>
        </a>
      </div>

      {/* Mobile search */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-4 animate-slideDown">
          <SearchBox value={searchQuery} onChange={onSearchChange} />
        </div>
      )}
    </nav>
  );
}
