import { type TargetAreas } from '../extracts/dataService';
import { usePracticeData } from '../context/PracticeDataContext';
import { TargetAreaSummary } from './TargetAreaSummary';

interface IndicatorsContentProps {
  areaKey: TargetAreas;
}

export function IndicatorsContent({ areaKey }: IndicatorsContentProps) {
  const { getAreaData } = usePracticeData();
  const areaData = getAreaData(areaKey);

  if (!areaData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">No data available for this condition.</p>
      </div>
    );
  }

  return <TargetAreaSummary areaKey={areaKey} />;
}
