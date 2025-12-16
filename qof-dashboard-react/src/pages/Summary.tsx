import { useState } from 'react';
import { Header } from '../components/Header';

interface QOFTarget {
  code: string;
  patients: number;
  completion: number;
  forecast: number;
  target: number;
  points: number;
  status: 'On Track' | 'At Risk' | 'In Progress';
}

const qofTargets: QOFTarget[] = [
  { code: 'HYP001', patients: 1234, completion: 92, forecast: 1135, target: 1136, points: 15, status: 'On Track' },
  { code: 'HYP008', patients: 1234, completion: 29, forecast: 358, target: 1136, points: 15, status: 'At Risk' },
  { code: 'HYP009', patients: 1234, completion: 80, forecast: 987, target: 1136, points: 15, status: 'On Track' },
  { code: 'AF001', patients: 234, completion: 60, forecast: 140, target: 234, points: 15, status: 'On Track' },
  { code: 'AF006', patients: 234, completion: 45, forecast: 105, target: 234, points: 15, status: 'At Risk' },
  { code: 'AF008', patients: 234, completion: 70, forecast: 164, target: 234, points: 15, status: 'On Track' },
  { code: 'AST005', patients: 456, completion: 52, forecast: 237, target: 456, points: 15, status: 'At Risk' },
  { code: 'AST012', patients: 456, completion: 38, forecast: 173, target: 456, points: 15, status: 'At Risk' },
  { code: 'AST007', patients: 456, completion: 65, forecast: 296, target: 456, points: 15, status: 'On Track' },
  { code: 'AST008', patients: 456, completion: 42, forecast: 192, target: 456, points: 15, status: 'At Risk' },
  { code: 'CHD001', patients: 345, completion: 75, forecast: 259, target: 345, points: 15, status: 'On Track' },
  { code: 'CHD015', patients: 345, completion: 68, forecast: 235, target: 345, points: 15, status: 'On Track' },
  { code: 'CHD016', patients: 345, completion: 55, forecast: 190, target: 345, points: 15, status: 'At Risk' },
  { code: 'CHD005', patients: 345, completion: 80, forecast: 276, target: 345, points: 15, status: 'On Track' },
  { code: 'CHOLREG', patients: 1234, completion: 80, forecast: 987, target: 1234, points: 15, status: 'On Track' },
  { code: 'CHOL2REG', patients: 1234, completion: 75, forecast: 925, target: 1234, points: 15, status: 'On Track' },
  { code: 'CHOL003', patients: 1234, completion: 70, forecast: 864, target: 1234, points: 15, status: 'On Track' },
  { code: 'CHOL004', patients: 1234, completion: 65, forecast: 802, target: 1234, points: 15, status: 'On Track' },
  { code: 'COPD015', patients: 234, completion: 30, forecast: 70, target: 234, points: 15, status: 'At Risk' },
  { code: 'COPD014', patients: 234, completion: 25, forecast: 59, target: 234, points: 15, status: 'At Risk' },
  { code: 'COPD010', patients: 234, completion: 40, forecast: 94, target: 234, points: 15, status: 'At Risk' },
  { code: 'DEM001', patients: 123, completion: 10, forecast: 12, target: 123, points: 15, status: 'At Risk' },
  { code: 'DEM004', patients: 123, completion: 8, forecast: 10, target: 123, points: 15, status: 'At Risk' },
  { code: 'DM017', patients: 456, completion: 2, forecast: 9, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM014', patients: 456, completion: 5, forecast: 23, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM036', patients: 456, completion: 3, forecast: 14, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM034', patients: 456, completion: 4, forecast: 18, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM035', patients: 456, completion: 6, forecast: 27, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM006', patients: 456, completion: 7, forecast: 32, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM020', patients: 456, completion: 8, forecast: 36, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM021', patients: 456, completion: 9, forecast: 41, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM012', patients: 456, completion: 10, forecast: 46, target: 456, points: 15, status: 'At Risk' },
  { code: 'HF1', patients: 89, completion: 20, forecast: 18, target: 89, points: 15, status: 'At Risk' },
  { code: 'HF2', patients: 89, completion: 15, forecast: 13, target: 89, points: 15, status: 'At Risk' },
  { code: 'HF008', patients: 89, completion: 25, forecast: 22, target: 89, points: 15, status: 'At Risk' },
  { code: 'HF003', patients: 89, completion: 18, forecast: 16, target: 89, points: 15, status: 'At Risk' },
  { code: 'HF006', patients: 89, completion: 22, forecast: 20, target: 89, points: 15, status: 'At Risk' },
  { code: 'HF007', patients: 89, completion: 28, forecast: 25, target: 89, points: 15, status: 'At Risk' },
  { code: 'MH1_REG', patients: 567, completion: 60, forecast: 340, target: 567, points: 15, status: 'On Track' },
  { code: 'MH2_REG', patients: 567, completion: 55, forecast: 312, target: 567, points: 15, status: 'On Track' },
  { code: 'MH001', patients: 567, completion: 45, forecast: 255, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH002', patients: 567, completion: 50, forecast: 284, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH003', patients: 567, completion: 40, forecast: 227, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH006', patients: 567, completion: 35, forecast: 198, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH007', patients: 567, completion: 42, forecast: 238, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH011', patients: 567, completion: 38, forecast: 215, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH012', patients: 567, completion: 33, forecast: 187, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH021', patients: 567, completion: 48, forecast: 272, target: 567, points: 15, status: 'At Risk' },
  { code: 'NDH_Reg', patients: 234, completion: 20, forecast: 47, target: 234, points: 15, status: 'At Risk' },
  { code: 'NDH002', patients: 234, completion: 15, forecast: 35, target: 234, points: 15, status: 'At Risk' },
  { code: 'STIA001', patients: 123, completion: 10, forecast: 12, target: 123, points: 15, status: 'At Risk' },
  { code: 'STIA014', patients: 123, completion: 8, forecast: 10, target: 123, points: 15, status: 'At Risk' },
  { code: 'STIA015', patients: 123, completion: 12, forecast: 15, target: 123, points: 15, status: 'At Risk' },
  { code: 'STIA007', patients: 123, completion: 6, forecast: 7, target: 123, points: 15, status: 'At Risk' },
];

function getStatusClass(status: QOFTarget['status']): string {
  switch (status) {
    case 'On Track':
      return 'bg-green-100 text-green-800';
    case 'At Risk':
      return 'bg-red-100 text-red-800';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800';
  }
}

export function Summary() {
  const [targets] = useState<QOFTarget[]>(qofTargets);

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-glass p-6">
            <p className="text-sm font-medium text-gray-500 leading-normal">Total QOF Points</p>
            <p className="text-2xl font-semibold text-gray-900 leading-tight">564</p>
          </div>

          <div className="card-glass p-6">
            <p className="text-sm font-medium text-gray-500 leading-normal">Completed Targets</p>
            <p className="text-2xl font-semibold text-gray-900 leading-tight">42</p>
          </div>

          <div className="card-glass p-6">
            <p className="text-sm font-medium text-gray-500 leading-normal">In Progress</p>
            <p className="text-2xl font-semibold text-gray-900 leading-tight">8</p>
          </div>

          <div className="card-glass p-6">
            <p className="text-sm font-medium text-gray-500 leading-normal">At Risk</p>
            <p className="text-2xl font-semibold text-gray-900 leading-tight">4</p>
          </div>
        </div>

        {/* Performance Overview Table */}
        <div className="card-glass">
          <div className="px-6 py-4 border-b border-gray-200 mb-0">
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">QOF Performance Overview</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    QOF Target
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Forecast
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Target
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {targets.map((target) => (
                  <tr key={target.code}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {target.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {target.patients.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {target.completion}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {target.forecast.toLocaleString()}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        target.forecast >= target.target ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {target.forecast >= target.target ? '+' : ''}
                      {target.forecast - target.target}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {target.points}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md ${getStatusClass(target.status)}`}
                      >
                        {target.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
