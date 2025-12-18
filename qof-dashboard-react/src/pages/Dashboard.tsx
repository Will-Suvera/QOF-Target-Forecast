import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { IndicatorsMergedSummary } from '../components/IndicatorsMergedSummary';
import { HospitalIcon, Check, X, Plus } from 'lucide-react';
import { usePracticeData } from '../context/PracticeDataContext';
import { type TargetAreas } from '../extracts/dataService';

interface ConditionCardProps {
  areaKey: TargetAreas;
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
}

function ConditionCard({ title, isExpanded, onToggle }: ConditionCardProps) {
  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-2 px-1.5 py-1.5 rounded-lg border transition-all duration-200 ${
        isExpanded
          ? 'bg-[#E6EBF2] border-[#ACBBD4] text-brand-dark shadow-sm'
          : 'bg-white border-gray-200 text-gray-700 hover:border-[#ACBBD4] hover:bg-gray-50'
      }`}
    >
      {isExpanded ? (
        <Check className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
      ) : (
        <Plus className="w-4 h-4 flex-shrink-0 text-gray-400" strokeWidth={2.5} />
      )}
      <span className={`text-sm font-medium ${isExpanded ? 'text-brand-dark' : 'text-gray-700'}`}>
        {title}
      </span>
    </button>
  );
}

function formatDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return `Today is ${now.toLocaleDateString('en-US', options)}`;
}

export function Dashboard() {
  const { meta, getTargetAreas, getAreaData } = usePracticeData();

  // Get available areas from data service
  const availableAreas = useMemo(() => getTargetAreas(), [getTargetAreas]);

  // Initialize with all available areas selected
  const [expandedAreas, setExpandedAreas] = useState<TargetAreas[]>(availableAreas);
  const formattedDate = useMemo(() => formatDate(), []);

  const toggleArea = (area: TargetAreas) => {
    setExpandedAreas((prev) => {
      const isSelected = prev.includes(area);
      const newSelection = isSelected
        ? prev.filter((a) => a !== area)
        : [...prev, area];
      // Sort to match the order of availableAreas
      return newSelection.sort((a, b) =>
        availableAreas.indexOf(a) - availableAreas.indexOf(b)
      );
    });
  };

  const isAreaExpanded = (area: TargetAreas): boolean => {
    return expandedAreas.includes(area);
  };

  
  const handleToggleFilters = () => {
    if (expandedAreas.length > 0) {
      // Clear all filters
      setExpandedAreas([]);
    } else {
      // Select all filters
      setExpandedAreas(availableAreas);
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* Background gradient image with blend */}
      <div
        className="absolute left-0 top-0 w-full h-[318px] pointer-events-none bg-no-repeat"
        style={{
          background: `linear-gradient(176deg, rgba(252, 252, 252, 0.00) 43.7%, #FCFCFC 78.86%), url(/assets/background-gradient.png) 0.356px -201.219px / 100.05% 291.727% no-repeat`
        }}
      />

      <Header />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-medium text-brand-dark leading-tight">Hello, Pilly 👋</h1>
                <div className="text-base text-brand-gray leading-normal mt-2">{formattedDate}</div>
              </div>
              <div>
                <div className="text-base font-medium text-brand-dark leading-normal flex items-center gap-2 py-2 px-2 bg-[rgba(172,187,212,0.15)] rounded-md">
                  <HospitalIcon className="w-5 h-5" /> {meta.practiceName} ({meta.ods})
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <HeroSection selectedAreas={expandedAreas} />

          {/* Clinical Domain Filters */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 leading-tight">Filter conditions</h2>
              <button
                onClick={handleToggleFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {expandedAreas.length > 0 ? (
                  <>
                    <X className="w-3.5 h-3.5" />
                    Clear Filters
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Select All
                  </>
                )}
              </button>
            </div>

            {/* Filter Chips - rendered dynamically from available areas */}
            <div className="flex flex-wrap gap-2">
              {availableAreas.map((area) => {
                const areaData = getAreaData(area);
                return (
                  <ConditionCard
                    key={area}
                    areaKey={area}
                    title={areaData?.areaName ?? area}
                    isExpanded={isAreaExpanded(area)}
                    onToggle={() => { toggleArea(area); }}
                  />
                );
              })}
            </div>
          </div>

          {/* Expanded Areas Content */}
          {expandedAreas.length > 0 && (
            <div className="mt-8">
              <IndicatorsMergedSummary expandedAreas={expandedAreas} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
