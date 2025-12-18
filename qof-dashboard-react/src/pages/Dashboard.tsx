import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { IndicatorsMergedSummary } from '../components/IndicatorsMergedSummary';
import { IndicatorsContent } from '../components/IndicatorsContent';
import { HospitalIcon, Check, X, Plus } from 'lucide-react';
import {
  clinicalDomainConditions, 
  clinicalConditions,
  type ConditionKey,
} from '../data/conditionMappings';

interface ConditionCardProps {
  condition: ConditionKey;
  isExpanded: boolean;
  onToggle: () => void;
}

function ConditionCard({ condition, isExpanded, onToggle }: ConditionCardProps) {
  const info = clinicalConditions[condition];
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
        {info.title}
      </span>
      <span className={`text-sm font-semibold flex-shrink-0 ${isExpanded ? 'text-brand-dark' : 'text-gray-500'}`}>
        {info.percentage}%
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
  // Initialize with all clinical domain conditions selected
  // Note: Public Health Domain is commented out, so only using clinicalDomainConditions
  const allConditions = useMemo(() => [...clinicalDomainConditions], []);
  // const allConditions = useMemo(() => [...clinicalDomainConditions, ...publicHealthConditions], []); // Original with Public Health
  const [expandedConditions, setExpandedConditions] = useState<ConditionKey[]>(allConditions);
  const formattedDate = useMemo(() => formatDate(), []);

  const toggleCondition = (condition: ConditionKey) => {
    setExpandedConditions((prev) => {
      const index = prev.indexOf(condition);
      if (index > -1) {
        return prev.filter((c) => c !== condition);
      }
      return [...prev, condition];
    });
  };

  const isConditionExpanded = (condition: ConditionKey): boolean => {
    return expandedConditions.includes(condition);
  };

  const hasConditionsWithTargetDetails = useMemo(() => {
    if (expandedConditions.length < 2) return false;
    return expandedConditions.some((condition) => {
      return clinicalConditions[condition]?.hasTargetDetails;
    });
  }, [expandedConditions]);

  const firstExpandedCondition = expandedConditions.length > 0 ? expandedConditions[0] : null;

  const handleToggleFilters = () => {
    if (expandedConditions.length > 0) {
      // Clear all filters
      setExpandedConditions([]);
    } else {
      // Select all filters
      setExpandedConditions(allConditions);
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
                <div className="text-base font-medium text-brand-dark leading-normal flex items-center gap-2 py-2 px-2 bg-[rgba(172,187,212,0.15)] rounded-md"><HospitalIcon className="w-5 h-5" /> Maltings Surgery (E82031)</div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <HeroSection condition={firstExpandedCondition} />

          {/* Clinical Domain Filters */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 leading-tight">Filter conditions</h2>
              <button
                onClick={handleToggleFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {expandedConditions.length > 0 ? (
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

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {clinicalDomainConditions.map((condition) => (
                <ConditionCard
                  key={condition}
                  condition={condition}
                  isExpanded={isConditionExpanded(condition)}
                  onToggle={() => { toggleCondition(condition); }}
                />
              ))}
            </div>
          </div>

          {/* Public Health Domain Section - Commented Out */}
          {/* <div className="mt-12 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">Public Health Domain</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {publicHealthConditions.map((condition) => (
              <ConditionCard
                key={condition}
                condition={condition}
                isExpanded={isConditionExpanded(condition)}
                onToggle={() => { toggleCondition(condition); }}
              />
            ))}
          </div> */}

          {/* Expanded Conditions Content */}
          {expandedConditions.length > 0 && (
            <div className="mt-8">
              {hasConditionsWithTargetDetails ? (
                <IndicatorsMergedSummary conditions={expandedConditions} />
              ) : (
                <div className="space-y-8">
                  {expandedConditions.map((condition) => (
                    <IndicatorsContent key={condition} condition={condition} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
