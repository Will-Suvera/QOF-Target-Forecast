import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { IndicatorsContent } from '../components/IndicatorsContent';

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
  const condition = searchParams.get('condition');
  const formattedDate = useMemo(() => formatDate(), []);

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
          <HeroSection condition={condition} />

          {/* Back to Dashboard Link */}
          <div className="mb-6">
            <div className="mb-3">
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Indicators Content */}
          {condition ? (
            <IndicatorsContent condition={condition} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">
                No condition selected. Please select a condition from the dashboard.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
