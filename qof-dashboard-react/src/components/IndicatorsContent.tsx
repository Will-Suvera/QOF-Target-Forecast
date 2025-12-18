import { conditionTargetMap } from '../data/targetMappings';
import { IndicatorsHypertensionSummary } from './IndicatorsHypertensionSummary';
import { type ViewMode } from '../hooks/useForecastData';

interface IndicatorsContentProps {
  condition: string;
  viewMode?: ViewMode;
}

export function IndicatorsContent({ condition, viewMode = 'forecast' }: IndicatorsContentProps) {
  const conditionData = conditionTargetMap[condition];

  // If condition has targetDetails, show the HypertensionSummary (stacked bar chart view)
  if (conditionData?.targetDetails && conditionData.targetDetails.length > 0) {
    return <IndicatorsHypertensionSummary condition={condition} viewMode={viewMode} />;
  }

  // Otherwise show IndicatorsTargetCards
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <p className="text-gray-600">No target details available for this condition.</p>
    </div>
  );
}
