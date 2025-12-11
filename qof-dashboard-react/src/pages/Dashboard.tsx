import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { IndicatorsMergedSummary } from '../components/IndicatorsMergedSummary';
import { IndicatorsContent } from '../components/IndicatorsContent';
import {
  clinicalDomainConditions,
  publicHealthConditions,
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
    <div
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onToggle();
        }
      }}
      role="button"
      tabIndex={0}
      className={`bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow ${
        isExpanded ? 'border-blue-500' : 'border-gray-200'
      }`}
    >
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-medium text-gray-900">{info.title}</h4>
        <span className="text-sm font-semibold text-gray-900">{info.percentage}%</span>
      </div>
    </div>
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
  const [expandedConditions, setExpandedConditions] = useState<ConditionKey[]>([]);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Hello, Pilly 👋</h1>
              <div className="text-sm text-gray-500">{formattedDate}</div>
            </div>

            {/* Practice Information Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-500">Practice:</span>
                  <span className="text-gray-900">Maltings Surgery (E82031)</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-500">ICB:</span>
                  <span className="text-gray-900">NHS Hertfordshire and West Essex ICB (06N)</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-500">PCN:</span>
                  <span className="text-gray-900">Abbey Health PCN (U06079)</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-500">Patients:</span>
                  <span className="font-semibold text-gray-900">19,026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <HeroSection condition={firstExpandedCondition} />

          {/* Clinical Domain Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Clinical Domain</h2>
          </div>

          {/* Clinical Domain Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {clinicalDomainConditions.map((condition) => (
              <ConditionCard
                key={condition}
                condition={condition}
                isExpanded={isConditionExpanded(condition)}
                onToggle={() => { toggleCondition(condition); }}
              />
            ))}
          </div>

          {/* Public Health Domain Section */}
          <div className="mt-12 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Public Health Domain</h2>
          </div>

          {/* Public Health Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {publicHealthConditions.map((condition) => (
              <ConditionCard
                key={condition}
                condition={condition}
                isExpanded={isConditionExpanded(condition)}
                onToggle={() => { toggleCondition(condition); }}
              />
            ))}
          </div>

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
