import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Home, FileText, Tag, ChevronDown, LogOut, type LucideIcon } from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  {
    to: '/',
    label: 'Dashboard',
    icon: Home,
  },
  {
    to: '/summary',
    label: 'Summary',
    icon: FileText,
  },
  {
    to: '/pricing',
    label: 'Pricing',
    icon: Tag,
  },
];

export function Header() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
    return undefined;
  }, [isDropdownOpen]);

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
    setIsDropdownOpen(false);
  };

  return (
    <header className="relative z-10" style={{ borderBottom: '0.5px solid rgba(40,50,77,0.16)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-2">
          {/* Left side - Brand */}
          <div className="flex items-center gap-[7px]">
            <svg width="30" height="30" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.71517 3.25454C9.71517 5.05197 11.154 6.50907 12.9289 6.50907C14.7038 6.50907 16.1426 5.05197 16.1426 3.25454C16.1426 1.45711 14.7038 0 12.9289 0C11.154 0 9.71517 1.45711 9.71517 3.25454Z" fill="#2075FF"/>
              <path d="M10.8959 8.89017C13.4361 12.1974 13.6784 15.3553 13.6868 17.4855C13.6892 18.1089 13.2959 18.667 12.6938 18.7967C10.7328 19.2192 6.42045 19.5316 2.90092 15.4431C-1.9952 9.75548 1.55637 4.37045 1.89102 4.01985C4.76948 5.07113 8.59797 5.89847 10.8959 8.89017Z" fill="#1EBA4A"/>
              <path d="M15.4566 17.2671C15.6342 15.6141 15.4802 14.3336 15.1175 13.1327C14.3562 10.6121 14.8406 8.0701 17.3494 7.36802L17.3881 7.35719C18.6898 6.99293 20.0642 6.60833 21.2574 5.98333C21.8629 6.87826 21.9861 10.4977 20.7475 12.9784C19.5333 15.4101 17.5092 17.0118 16.0975 17.7566C15.7688 17.9301 15.4165 17.6403 15.4566 17.2671Z" fill="#9B63FF"/>
            </svg>
            <span className="text-base font-semibold leading-tight text-brand-dark">QOF Forecaster</span>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden md:flex gap-[2px] flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <div key={item.to} className="flex flex-col items-center justify-center p-2">
                  <Link
                    to={item.to}
                    className={`flex gap-1 items-center px-3 py-2.5 rounded-md ${
                      isActive
                        ? 'bg-[rgba(172,187,212,0.3)]'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-1.5" />
                    <span className="text-[14px] font-medium leading-normal text-brand-dark">
                      {item.label}
                    </span>
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right side - User */}
          <div className="flex items-center relative" ref={dropdownRef}>
            <div 
              className="bg-[rgba(172,187,212,0.3)] rounded-full flex items-center max-w-[56px] min-w-[56px] w-[56px] cursor-pointer hover:bg-[rgba(172,187,212,0.5)]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div 
                className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
              >
                <span className="text-sm font-semibold leading-snug text-brand-dark">PS</span>
              </div>
              <ChevronDown className="h-4 w-4 text-[#0f1b38]" />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              >
                {/* Profile Section */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white border-2 border-[#cecece] rounded-full w-10 h-10 flex items-center justify-center">
                      <span className="text-[16px] font-semibold text-[#0f1b38]">PS</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-brand-dark leading-normal">Pilly Smith</div>
                      <div className="text-xs text-brand-gray leading-snug">pilly.smith@nhs.net</div>
                    </div>
                  </div>
                  
                  {/* Practice Info */}
                  <div className="space-y-1.5 text-xs leading-snug">
                    <div className="flex items-start">
                      <span className="text-brand-gray w-20 shrink-0">Practice:</span>
                      <span className="text-brand-dark font-medium">Maltings Surgery (E82031)</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-brand-gray w-20 shrink-0">ICB:</span>
                      <span className="text-brand-dark">NHS Hertfordshire and West Essex ICB (06N)</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-brand-gray w-20 shrink-0">PCN:</span>
                      <span className="text-brand-dark">Abbey Health PCN (U06079)</span>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-5 h-5 text-[#717182]" />
                  <span className="text-sm font-medium text-brand-dark leading-normal">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
