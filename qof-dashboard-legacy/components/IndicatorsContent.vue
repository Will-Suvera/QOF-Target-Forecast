<template>
  <div>
    <!-- Embed indicators page content inline -->
    <div class="indicators-content-wrapper border-t border-gray-200 pt-6 mt-6">
      <!-- Summary Section for conditions with targetDetails (Hypertension, Cholesterol, etc.) -->
      <template v-if="conditionData.targetDetails && conditionData.targetDetails.length > 0">
        <IndicatorsHypertensionSummary :condition="condition" />
      </template>
      
      <!-- QOF Target Cards for other conditions -->
      <template v-else>
        <IndicatorsTargetCards :condition="condition" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  condition: {
    type: String,
    required: true
  }
})

// Toggle state for showing previous year comparison
const showPreviousYear = ref(true)

// Condition data mapping (full version from indicators.vue)
const conditionMap = {
  'asthma': {
    title: 'Asthma',
    qofCode: 'QOF_AST0077',
    description: 'Asthma review including control score, number of exacerbations, inhaler technique and written plan (Asthma)',
    targets: [
      { code: 'AST007', name: 'Targets AST007' },
      { code: 'AST012', name: 'Targets AST012' }
    ],
    targetDetails: [
      {
        code: 'AST007',
        qofCode: 'QOF_AST007',
        description: 'Asthma management target AST007',
        minThreshold: 45,
        maxThreshold: 70,
        maxPoints: 20,
        currentPoints: 20,
        totalCompletion: 76
      },
      {
        code: 'AST012',
        qofCode: 'QOF_AST012',
        description: 'Asthma management target AST012',
        minThreshold: 45,
        maxThreshold: 80,
        maxPoints: 15,
        currentPoints: 15,
        totalCompletion: 88
      }
    ]
  },
  'hypertension': {
    title: 'Hypertension',
    qofCode: 'QOF_HYP001',
    description: 'Hypertension management including blood pressure monitoring and medication review',
    targets: [
      { code: 'HYP008', name: 'Targets HYP008' },
      { code: 'HYP009', name: 'Targets HYP009' }
    ],
    targetDetails: [
      {
        code: 'HYP008',
        qofCode: 'QOF_HYP008',
        description: 'The percentage of patients aged 79 years or under with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 140/90 mmHg or less (or equivalent home blood pressure reading)',
        minThreshold: 40,
        maxThreshold: 85,
        maxPoints: 38,
        currentPoints: 26.19,
        totalCompletion: 71
      },
      {
        code: 'HYP009',
        qofCode: 'QOF_HYP009',
        description: 'The percentage of patients aged 80 years or over with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 150/90 mmHg or less (or equivalent home blood pressure reading)',
        minThreshold: 40,
        maxThreshold: 85,
        maxPoints: 14,
        currentPoints: 10.2,
        totalCompletion: 73
      }
    ]
  },
  'cholesterol': {
    title: 'Cholesterol',
    qofCode: 'QOF_CHL001',
    description: 'Cholesterol management including lipid profile monitoring and statin therapy',
    targets: [
      { code: 'CHOL003', name: 'Targets CHOL003' },
      { code: 'CHOL004', name: 'Targets CHOL004' }
    ],
    targetDetails: [
      {
        code: 'CHOL003',
        qofCode: 'QOF_CHOL003',
        description: 'Cholesterol management target CHOL003',
        minThreshold: 70,
        maxThreshold: 95,
        maxPoints: 38,
        currentPoints: 14.15,
        totalCompletion: 79
      },
      {
        code: 'CHOL004',
        qofCode: 'QOF_CHOL004',
        description: 'Cholesterol management target CHOL004',
        minThreshold: 20,
        maxThreshold: 50,
        maxPoints: 44,
        currentPoints: 44,
        totalCompletion: 57
      }
    ]
  },
  'diabetes': {
    title: 'Diabetes',
    qofCode: 'QOF_DIA001',
    description: 'Diabetes management including HbA1c monitoring, foot care, and eye screening',
    targets: [
      { code: 'DM006', name: 'Targets DM006' },
      { code: 'DM012', name: 'Targets DM012' },
      { code: 'DM014', name: 'Targets DM014' },
      { code: 'DM020', name: 'Targets DM020' },
      { code: 'DM021', name: 'Targets DM021' },
      { code: 'DM034', name: 'Targets DM034' },
      { code: 'DM035', name: 'Targets DM035' },
      { code: 'DM036', name: 'Targets DM036' }
    ],
    targetDetails: [
      {
        code: 'DM006',
        qofCode: 'QOF_DM006',
        description: 'Diabetes management target DM006',
        minThreshold: 57,
        maxThreshold: 97,
        maxPoints: 3,
        currentPoints: 1.41,
        totalCompletion: 76
      },
      {
        code: 'DM012',
        qofCode: 'QOF_DM012',
        description: 'Diabetes management target DM012',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 4,
        currentPoints: 1.03,
        totalCompletion: 60
      },
      {
        code: 'DM014',
        qofCode: 'QOF_DM014',
        description: 'Diabetes management target DM014',
        minThreshold: 40,
        maxThreshold: 90,
        maxPoints: 11,
        currentPoints: 11,
        totalCompletion: 100
      },
      {
        code: 'DM020',
        qofCode: 'QOF_DM020',
        description: 'Diabetes management target DM020',
        minThreshold: 37,
        maxThreshold: 75,
        maxPoints: 17,
        currentPoints: 8.59,
        totalCompletion: 55
      },
      {
        code: 'DM021',
        qofCode: 'QOF_DM021',
        description: 'Diabetes management target DM021',
        minThreshold: 52,
        maxThreshold: 92,
        maxPoints: 10,
        currentPoints: 5.75,
        totalCompletion: 75
      },
      {
        code: 'DM034',
        qofCode: 'QOF_DM034',
        description: 'Diabetes management target DM034',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 4,
        currentPoints: 2.31,
        totalCompletion: 73
      },
      {
        code: 'DM035',
        qofCode: 'QOF_DM035',
        description: 'Diabetes management target DM035',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 2,
        currentPoints: 1.84,
        totalCompletion: 87
      },
      {
        code: 'DM036',
        qofCode: 'QOF_DM036',
        description: 'Diabetes management target DM036',
        minThreshold: 38,
        maxThreshold: 90,
        maxPoints: 27,
        currentPoints: 18.3,
        totalCompletion: 73
      }
    ]
  },
  'copd': {
    title: 'COPD',
    qofCode: 'QOF_COPD001',
    description: 'COPD management including spirometry, smoking cessation, and inhaler technique',
    targets: [
      { code: 'COPD010', name: 'Targets COPD010' }
    ],
    targetDetails: [
      {
        code: 'COPD010',
        qofCode: 'QOF_COPD010',
        description: 'COPD management target COPD010',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 9,
        currentPoints: 4.94,
        totalCompletion: 72
      }
    ]
  },
  'heart-failure': {
    title: 'Heart Failure',
    qofCode: 'QOF_HF001',
    description: 'Heart failure management including echocardiography, medication review, and symptom monitoring',
    targets: [
      { code: 'HF003', name: 'Targets HF003' },
      { code: 'HF006', name: 'Targets HF006' },
      { code: 'HF007', name: 'Targets HF007' },
      { code: 'HF008', name: 'Targets HF008' }
    ],
    targetDetails: [
      {
        code: 'HF003',
        qofCode: 'QOF_HF003',
        description: 'Heart failure management target HF003',
        minThreshold: 60,
        maxThreshold: 92,
        maxPoints: 6,
        currentPoints: 3.28,
        totalCompletion: 78
      },
      {
        code: 'HF006',
        qofCode: 'QOF_HF006',
        description: 'Heart failure management target HF006',
        minThreshold: 60,
        maxThreshold: 92,
        maxPoints: 6,
        currentPoints: 3.47,
        totalCompletion: 78
      },
      {
        code: 'HF007',
        qofCode: 'QOF_HF007',
        description: 'Heart failure management target HF007',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 7,
        currentPoints: 1.18,
        totalCompletion: 57
      },
      {
        code: 'HF008',
        qofCode: 'QOF_HF008',
        description: 'Heart failure management target HF008',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 6,
        currentPoints: 6,
        totalCompletion: 91
      }
    ]
  },
  'atrial-fibrillation': {
    title: 'Atrial Fibrillation',
    qofCode: 'QOF_AF001',
    description: 'Atrial fibrillation management including anticoagulation therapy and stroke risk assessment',
    targets: [
      { code: 'AF006', name: 'Targets AF006' },
      { code: 'AF008', name: 'Targets AF008' }
    ],
    targetDetails: [
      {
        code: 'AF006',
        qofCode: 'QOF_AF006',
        description: 'Atrial fibrillation management target AF006',
        minThreshold: 40,
        maxThreshold: 90,
        maxPoints: 12,
        currentPoints: 12,
        totalCompletion: 98
      },
      {
        code: 'AF008',
        qofCode: 'QOF_AF008',
        description: 'Atrial fibrillation management target AF008',
        minThreshold: 70,
        maxThreshold: 95,
        maxPoints: 12,
        currentPoints: 11.4,
        totalCompletion: 94
      }
    ]
  },
  'coronary-heart-disease': {
    title: 'Coronary Heart Disease',
    qofCode: 'QOF_CHD001',
    description: 'Coronary heart disease management including lipid control, blood pressure monitoring, and medication review',
    targets: [
      { code: 'CHD005', name: 'Targets CHD005' },
      { code: 'CHD015', name: 'Targets CHD015' },
      { code: 'CHD016', name: 'Targets CHD016' }
    ],
    targetDetails: [
      {
        code: 'CHD005',
        qofCode: 'QOF_CHD005',
        description: 'Coronary heart disease management target CHD005',
        minThreshold: 56,
        maxThreshold: 96,
        maxPoints: 7,
        currentPoints: 5.07,
        totalCompletion: 85
      },
      {
        code: 'CHD015',
        qofCode: 'QOF_CHD015',
        description: 'Coronary heart disease management target CHD015',
        minThreshold: 40,
        maxThreshold: 90,
        maxPoints: 33,
        currentPoints: 14.68,
        totalCompletion: 62
      },
      {
        code: 'CHD016',
        qofCode: 'QOF_CHD016',
        description: 'Coronary heart disease management target CHD016',
        minThreshold: 46,
        maxThreshold: 90,
        maxPoints: 14,
        currentPoints: 9.23,
        totalCompletion: 75
      }
    ]
  },
  'dementia': {
    title: 'Dementia',
    qofCode: 'QOF_DEM001',
    description: 'Dementia care including cognitive assessment, medication review, and carer support',
    targets: [
      { code: 'DEM004', name: 'Targets DEM004' }
    ],
    targetDetails: [
      {
        code: 'DEM004',
        qofCode: 'QOF_DEM004',
        description: 'Dementia care target DEM004',
        minThreshold: 35,
        maxThreshold: 70,
        maxPoints: 14,
        currentPoints: 0,
        totalCompletion: 0
      }
    ]
  },
  'mental-health': {
    title: 'Mental Health',
    qofCode: 'QOF_MH001',
    description: 'Mental health management including depression screening, medication review, and care planning',
    targets: [
      { code: 'MH002', name: 'Targets MH002' },
      { code: 'MH003', name: 'Targets MH003' },
      { code: 'MH006', name: 'Targets MH006' },
      { code: 'MH007', name: 'Targets MH007' },
      { code: 'MH011', name: 'Targets MH011' },
      { code: 'MH012', name: 'Targets MH012' }
    ],
    targetDetails: [
      {
        code: 'MH002',
        qofCode: 'QOF_MH002',
        description: 'Mental health management target MH002',
        minThreshold: 40,
        maxThreshold: 90,
        maxPoints: 5,
        currentPoints: 0.04,
        totalCompletion: 40
      },
      {
        code: 'MH003',
        qofCode: 'QOF_MH003',
        description: 'Mental health management target MH003',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 3,
        currentPoints: 0.39,
        totalCompletion: 55
      },
      {
        code: 'MH006',
        qofCode: 'QOF_MH006',
        description: 'Mental health management target MH006',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 3,
        currentPoints: 0,
        totalCompletion: 48
      },
      {
        code: 'MH007',
        qofCode: 'QOF_MH007',
        description: 'Mental health management target MH007',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 3,
        currentPoints: 0.23,
        totalCompletion: 53
      },
      {
        code: 'MH011',
        qofCode: 'QOF_MH011',
        description: 'Mental health management target MH011',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 7,
        currentPoints: 1.75,
        totalCompletion: 60
      },
      {
        code: 'MH012',
        qofCode: 'QOF_MH012',
        description: 'Mental health management target MH012',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 7,
        currentPoints: 1.19,
        totalCompletion: 57
      }
    ]
  },
  'ndh': {
    title: 'NDH',
    qofCode: 'QOF_NDH001',
    description: 'Non-diabetic hyperglycaemia management including lifestyle interventions and monitoring',
    targets: [
      { code: 'NDH002', name: 'Targets NDH002' }
    ],
    targetDetails: [
      {
        code: 'NDH002',
        qofCode: 'QOF_NDH002',
        description: 'Non-diabetic hyperglycaemia management target NDH002',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 18,
        currentPoints: 15.28,
        totalCompletion: 84
      }
    ]
  },
  'stroke-tia': {
    title: 'Stroke and TIA',
    qofCode: 'QOF_STK001',
    description: 'Stroke and TIA management including anticoagulation, blood pressure control, and secondary prevention',
    targets: [
      { code: 'STIA007', name: 'Targets STIA007' },
      { code: 'STIA014', name: 'Targets STIA014' },
      { code: 'STIA015', name: 'Targets STIA015' }
    ],
    targetDetails: [
      {
        code: 'STIA007',
        qofCode: 'QOF_STIA007',
        description: 'Stroke and TIA management target STIA007',
        minThreshold: 57,
        maxThreshold: 97,
        maxPoints: 4,
        currentPoints: 3.11,
        totalCompletion: 88
      },
      {
        code: 'STIA014',
        qofCode: 'QOF_STIA014',
        description: 'Stroke and TIA management target STIA014',
        minThreshold: 40,
        maxThreshold: 90,
        maxPoints: 8,
        currentPoints: 3.17,
        totalCompletion: 60
      },
      {
        code: 'STIA015',
        qofCode: 'QOF_STIA015',
        description: 'Stroke and TIA management target STIA015',
        minThreshold: 46,
        maxThreshold: 90,
        maxPoints: 6,
        currentPoints: 4.4,
        totalCompletion: 78
      }
    ]
  },
  'blood-pressure': {
    title: 'Blood Pressure',
    qofCode: 'QOF_BP001',
    description: 'Blood pressure monitoring and management including hypertension screening and control',
    targets: [
      { code: 'BP002', name: 'Targets BP002' }
    ],
    targetDetails: [
      {
        code: 'BP002',
        qofCode: 'QOF_BP002',
        description: 'Blood pressure management target BP002',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 15,
        currentPoints: 0,
        totalCompletion: 0
      }
    ]
  },
  'smoking': {
    title: 'Smoking',
    qofCode: 'QOF_SMK001',
    description: 'Smoking cessation support including advice, referrals, and follow-up care',
    targets: [
      { code: 'SMOK002', name: 'Targets SMOK002' },
      { code: 'SMOK004', name: 'Targets SMOK004' }
    ],
    targetDetails: [
      {
        code: 'SMOK002',
        qofCode: 'QOF_SMOK002',
        description: 'Smoking cessation target SMOK002',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 25,
        currentPoints: 0,
        totalCompletion: 0
      },
      {
        code: 'SMOK004',
        qofCode: 'QOF_SMOK004',
        description: 'Smoking cessation target SMOK004',
        minThreshold: 40,
        maxThreshold: 90,
        maxPoints: 12,
        currentPoints: 0,
        totalCompletion: 0
      }
    ]
  },
  'vaccination-immunisations': {
    title: 'Vaccination and Immunisations',
    qofCode: 'QOF_VAC001',
    description: 'Vaccination and immunisation coverage including flu, COVID-19, and routine childhood vaccinations',
    targets: [
      { code: 'VI001', name: 'Targets VI001' },
      { code: 'VI002', name: 'Targets VI002' },
      { code: 'VI003', name: 'Targets VI003' },
      { code: 'VI004', name: 'Targets VI004' }
    ],
    targetDetails: [
      {
        code: 'VI001',
        qofCode: 'QOF_VI001',
        description: 'Vaccination and immunisations target VI001',
        minThreshold: 89,
        maxThreshold: 96,
        maxPoints: 18,
        currentPoints: 0,
        totalCompletion: 0
      },
      {
        code: 'VI002',
        qofCode: 'QOF_VI002',
        description: 'Vaccination and immunisations target VI002',
        minThreshold: 86,
        maxThreshold: 96,
        maxPoints: 18,
        currentPoints: 0,
        totalCompletion: 0
      },
      {
        code: 'VI003',
        qofCode: 'QOF_VI003',
        description: 'Vaccination and immunisations target VI003',
        minThreshold: 86,
        maxThreshold: 96,
        maxPoints: 18,
        currentPoints: 0,
        totalCompletion: 0
      },
      {
        code: 'VI004',
        qofCode: 'QOF_VI004',
        description: 'Vaccination and immunisations target VI004',
        minThreshold: 57,
        maxThreshold: 97,
        maxPoints: 10,
        currentPoints: 0,
        totalCompletion: 0
      }
    ]
  },
  'cervical-screening': {
    title: 'Cervical Screening',
    qofCode: 'QOF_CS001',
    description: 'Cervical screening coverage including invitations, uptake, and follow-up care',
    targets: [
      { code: 'CS005', name: 'Targets CS005' },
      { code: 'CS006', name: 'Targets CS006' }
    ],
    targetDetails: [
      {
        code: 'CS005',
        qofCode: 'QOF_CS005',
        description: 'Cervical screening target CS005',
        minThreshold: 45,
        maxThreshold: 80,
        maxPoints: 7,
        currentPoints: 0,
        totalCompletion: 0
      },
      {
        code: 'CS006',
        qofCode: 'QOF_CS006',
        description: 'Cervical screening target CS006',
        minThreshold: 45,
        maxThreshold: 80,
        maxPoints: 4,
        currentPoints: 0,
        totalCompletion: 0
      }
    ]
  }
}

const conditionData = computed(() => {
  return conditionMap[props.condition] || conditionMap['asthma']
})
</script>
