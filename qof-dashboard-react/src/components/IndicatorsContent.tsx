import { conditionTargetMap } from '../data/targetMappings';
import { IndicatorsHypertensionSummary } from './IndicatorsHypertensionSummary';

interface IndicatorsContentProps {
  condition: string;
}

export function IndicatorsContent({ condition }: IndicatorsContentProps) {
  const conditionData = conditionTargetMap[condition];

  // If condition has targetDetails, show the HypertensionSummary (stacked bar chart view)
  if (conditionData?.targetDetails && conditionData.targetDetails.length > 0) {
    return <IndicatorsHypertensionSummary condition={condition} />;
  }

  // Otherwise show IndicatorsTargetCards
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <p className="text-gray-600">No target details available for this condition.</p>
    </div>
  );
}
