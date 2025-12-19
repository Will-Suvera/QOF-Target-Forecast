import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { IndicatorsContent } from '../components/IndicatorsContent';
import { usePracticeData } from '../context/PracticeDataContext';
import { type TargetAreas } from '../extracts/dataService';

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

export function Indicators() {
  const [searchParams] = useSearchParams();
  const condition = searchParams.get('condition') as TargetAreas | null;
  const formattedDate = useMemo(() => formatDate(), []);
  const { meta, getTargetAreas } = usePracticeData();

  // Validate that condition is a valid target area
  const validAreas = getTargetAreas();
  const isValidArea = condition && validAreas.includes(condition);
  const areaKey = isValidArea ? condition : null;

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
            <div className="card-glass px-4 py-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-500">Practice:</span>
                  <span className="text-gray-900">{meta.practiceName} ({meta.ods})</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-500">ICB:</span>
                  <span className="text-gray-900">{meta.icbName} ({meta.icbCode})</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-500">PCN:</span>
                  <span className="text-gray-900">{meta.pcnName} ({meta.pcnCode})</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-500">Patients:</span>
                  <span className="font-semibold text-gray-900">{meta.listSize.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <HeroSection selectedAreas={areaKey ? [areaKey] : []} />

          {/* Back to Dashboard Link */}
          <div className="mb-6">
            <div className="mb-3">
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Indicators Content */}
          {areaKey ? (
            <IndicatorsContent areaKey={areaKey} />
          ) : (
            <div className="card-glass p-6">
              <p className="text-gray-600">
                {condition
                  ? `"${condition}" is not a valid condition. Please select a condition from the dashboard.`
                  : 'No condition selected. Please select a condition from the dashboard.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
