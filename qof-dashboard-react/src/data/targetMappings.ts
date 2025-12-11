export interface TargetDetail {
  code: string;
  qofCode: string;
  minThreshold: number;
  maxThreshold: number;
  description: string;
}

export interface ConditionTargetInfo {
  title: string;
  targetDetails: TargetDetail[];
  showPrevalence: boolean;
}

export const conditionTargetMap: Record<string, ConditionTargetInfo> = {
  hypertension: {
    title: 'Hypertension',
    targetDetails: [
      {
        code: 'HYP008',
        qofCode: 'QOF_HYP008',
        minThreshold: 40,
        maxThreshold: 85,
        description:
          'The percentage of patients aged 79 years or under with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 140/90 mmHg or less (or equivalent home blood pressure reading)',
      },
      {
        code: 'HYP009',
        qofCode: 'QOF_HYP009',
        minThreshold: 40,
        maxThreshold: 85,
        description:
          'The percentage of patients aged 80 years or over with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 150/90 mmHg or less (or equivalent home blood pressure reading)',
      },
    ],
    showPrevalence: true,
  },
  cholesterol: {
    title: 'Cholesterol',
    targetDetails: [
      { code: 'CHOL003', qofCode: 'QOF_CHOL003', minThreshold: 70, maxThreshold: 95, description: 'Cholesterol management target CHOL003' },
      { code: 'CHOL004', qofCode: 'QOF_CHOL004', minThreshold: 20, maxThreshold: 50, description: 'Cholesterol management target CHOL004' },
    ],
    showPrevalence: false,
  },
  asthma: {
    title: 'Asthma',
    targetDetails: [
      { code: 'AST007', qofCode: 'QOF_AST007', minThreshold: 45, maxThreshold: 70, description: 'Asthma management target AST007' },
      { code: 'AST012', qofCode: 'QOF_AST012', minThreshold: 45, maxThreshold: 80, description: 'Asthma management target AST012' },
    ],
    showPrevalence: false,
  },
  'atrial-fibrillation': {
    title: 'Atrial Fibrillation',
    targetDetails: [
      { code: 'AF006', qofCode: 'QOF_AF006', minThreshold: 40, maxThreshold: 90, description: 'Atrial fibrillation management target AF006' },
      { code: 'AF008', qofCode: 'QOF_AF008', minThreshold: 70, maxThreshold: 95, description: 'Atrial fibrillation management target AF008' },
    ],
    showPrevalence: false,
  },
  'coronary-heart-disease': {
    title: 'Coronary Heart Disease',
    targetDetails: [
      { code: 'CHD005', qofCode: 'QOF_CHD005', minThreshold: 56, maxThreshold: 96, description: 'Coronary heart disease management target CHD005' },
      { code: 'CHD015', qofCode: 'QOF_CHD015', minThreshold: 40, maxThreshold: 90, description: 'Coronary heart disease management target CHD015' },
      { code: 'CHD016', qofCode: 'QOF_CHD016', minThreshold: 46, maxThreshold: 90, description: 'Coronary heart disease management target CHD016' },
    ],
    showPrevalence: false,
  },
  copd: {
    title: 'COPD',
    targetDetails: [
      { code: 'COPD010', qofCode: 'QOF_COPD010', minThreshold: 50, maxThreshold: 90, description: 'COPD management target COPD010' },
    ],
    showPrevalence: false,
  },
  'heart-failure': {
    title: 'Heart Failure',
    targetDetails: [
      { code: 'HF003', qofCode: 'QOF_HF003', minThreshold: 60, maxThreshold: 92, description: 'Heart failure management target HF003' },
      { code: 'HF006', qofCode: 'QOF_HF006', minThreshold: 60, maxThreshold: 92, description: 'Heart failure management target HF006' },
      { code: 'HF007', qofCode: 'QOF_HF007', minThreshold: 50, maxThreshold: 90, description: 'Heart failure management target HF007' },
      { code: 'HF008', qofCode: 'QOF_HF008', minThreshold: 50, maxThreshold: 90, description: 'Heart failure management target HF008' },
    ],
    showPrevalence: false,
  },
  diabetes: {
    title: 'Diabetes',
    targetDetails: [
      { code: 'DM006', qofCode: 'QOF_DM006', minThreshold: 57, maxThreshold: 97, description: 'Diabetes management target DM006' },
      { code: 'DM012', qofCode: 'QOF_DM012', minThreshold: 50, maxThreshold: 90, description: 'Diabetes management target DM012' },
      { code: 'DM014', qofCode: 'QOF_DM014', minThreshold: 40, maxThreshold: 90, description: 'Diabetes management target DM014' },
      { code: 'DM020', qofCode: 'QOF_DM020', minThreshold: 37, maxThreshold: 75, description: 'Diabetes management target DM020' },
      { code: 'DM021', qofCode: 'QOF_DM021', minThreshold: 52, maxThreshold: 92, description: 'Diabetes management target DM021' },
      { code: 'DM034', qofCode: 'QOF_DM034', minThreshold: 50, maxThreshold: 90, description: 'Diabetes management target DM034' },
      { code: 'DM035', qofCode: 'QOF_DM035', minThreshold: 50, maxThreshold: 90, description: 'Diabetes management target DM035' },
      { code: 'DM036', qofCode: 'QOF_DM036', minThreshold: 38, maxThreshold: 90, description: 'Diabetes management target DM036' },
    ],
    showPrevalence: false,
  },
  dementia: {
    title: 'Dementia',
    targetDetails: [
      { code: 'DEM004', qofCode: 'QOF_DEM004', minThreshold: 35, maxThreshold: 70, description: 'Dementia care target DEM004' },
    ],
    showPrevalence: false,
  },
  'mental-health': {
    title: 'Mental Health',
    targetDetails: [
      { code: 'MH002', qofCode: 'QOF_MH002', minThreshold: 40, maxThreshold: 90, description: 'Mental health management target MH002' },
      { code: 'MH003', qofCode: 'QOF_MH003', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH003' },
      { code: 'MH006', qofCode: 'QOF_MH006', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH006' },
      { code: 'MH007', qofCode: 'QOF_MH007', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH007' },
      { code: 'MH011', qofCode: 'QOF_MH011', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH011' },
      { code: 'MH012', qofCode: 'QOF_MH012', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH012' },
    ],
    showPrevalence: false,
  },
  ndh: {
    title: 'NDH',
    targetDetails: [
      { code: 'NDH002', qofCode: 'QOF_NDH002', minThreshold: 50, maxThreshold: 90, description: 'Non-diabetic hyperglycaemia management target NDH002' },
    ],
    showPrevalence: false,
  },
  'stroke-tia': {
    title: 'Stroke and TIA',
    targetDetails: [
      { code: 'STIA007', qofCode: 'QOF_STIA007', minThreshold: 57, maxThreshold: 97, description: 'Stroke and TIA management target STIA007' },
      { code: 'STIA014', qofCode: 'QOF_STIA014', minThreshold: 40, maxThreshold: 90, description: 'Stroke and TIA management target STIA014' },
      { code: 'STIA015', qofCode: 'QOF_STIA015', minThreshold: 46, maxThreshold: 90, description: 'Stroke and TIA management target STIA015' },
    ],
    showPrevalence: false,
  },
  'blood-pressure': {
    title: 'Blood Pressure',
    targetDetails: [
      { code: 'BP002', qofCode: 'QOF_BP002', minThreshold: 50, maxThreshold: 90, description: 'Blood pressure management target BP002' },
    ],
    showPrevalence: false,
  },
  smoking: {
    title: 'Smoking',
    targetDetails: [
      { code: 'SMOK002', qofCode: 'QOF_SMOK002', minThreshold: 50, maxThreshold: 90, description: 'Smoking cessation target SMOK002' },
      { code: 'SMOK004', qofCode: 'QOF_SMOK004', minThreshold: 40, maxThreshold: 90, description: 'Smoking cessation target SMOK004' },
    ],
    showPrevalence: false,
  },
  'vaccination-immunisations': {
    title: 'Vaccination and Immunisations',
    targetDetails: [
      { code: 'VI001', qofCode: 'QOF_VI001', minThreshold: 89, maxThreshold: 96, description: 'Vaccination and immunisations target VI001' },
      { code: 'VI002', qofCode: 'QOF_VI002', minThreshold: 86, maxThreshold: 96, description: 'Vaccination and immunisations target VI002' },
      { code: 'VI003', qofCode: 'QOF_VI003', minThreshold: 86, maxThreshold: 96, description: 'Vaccination and immunisations target VI003' },
      { code: 'VI004', qofCode: 'QOF_VI004', minThreshold: 57, maxThreshold: 97, description: 'Vaccination and immunisations target VI004' },
    ],
    showPrevalence: false,
  },
  'cervical-screening': {
    title: 'Cervical Screening',
    targetDetails: [
      { code: 'CS005', qofCode: 'QOF_CS005', minThreshold: 45, maxThreshold: 80, description: 'Cervical screening target CS005' },
      { code: 'CS006', qofCode: 'QOF_CS006', minThreshold: 45, maxThreshold: 80, description: 'Cervical screening target CS006' },
    ],
    showPrevalence: false,
  },
};
