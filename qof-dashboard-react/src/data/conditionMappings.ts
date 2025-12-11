import type { ConditionKey } from './forecastData';

export type { ConditionKey };

export interface ConditionInfo {
  title: string;
  percentage: number;
  hasTargetDetails: boolean;
}

export const clinicalConditions: Record<ConditionKey, ConditionInfo> = {
  asthma: { title: 'Asthma', percentage: 52, hasTargetDetails: true },
  hypertension: { title: 'Hypertension', percentage: 29, hasTargetDetails: true },
  cholesterol: { title: 'Cholesterol', percentage: 80, hasTargetDetails: true },
  diabetes: { title: 'Diabetes', percentage: 2, hasTargetDetails: true },
  copd: { title: 'COPD', percentage: 45, hasTargetDetails: true },
  'heart-failure': { title: 'Heart Failure', percentage: 38, hasTargetDetails: true },
  'atrial-fibrillation': { title: 'Atrial Fibrillation', percentage: 61, hasTargetDetails: true },
  'coronary-heart-disease': { title: 'Coronary Heart Disease', percentage: 67, hasTargetDetails: true },
  dementia: { title: 'Dementia', percentage: 34, hasTargetDetails: true },
  'mental-health': { title: 'Mental Health', percentage: 56, hasTargetDetails: true },
  ndh: { title: 'NDH', percentage: 42, hasTargetDetails: true },
  'stroke-tia': { title: 'Stroke and TIA', percentage: 48, hasTargetDetails: true },
  'blood-pressure': { title: 'Blood Pressure', percentage: 58, hasTargetDetails: true },
  smoking: { title: 'Smoking', percentage: 72, hasTargetDetails: true },
  'vaccination-immunisations': { title: 'Vaccination and Immunisations', percentage: 85, hasTargetDetails: true },
  'cervical-screening': { title: 'Cervical Screening', percentage: 64, hasTargetDetails: true },
};

export const clinicalDomainConditions: ConditionKey[] = [
  'asthma',
  'hypertension',
  'cholesterol',
  'diabetes',
  'copd',
  'heart-failure',
  'atrial-fibrillation',
  'coronary-heart-disease',
  'dementia',
  'mental-health',
  'ndh',
  'stroke-tia',
];

export const publicHealthConditions: ConditionKey[] = [
  'blood-pressure',
  'smoking',
  'vaccination-immunisations',
  'cervical-screening',
];

export function getConditionTitle(condition: string): string {
  if (condition in clinicalConditions) {
    return clinicalConditions[condition as ConditionKey].title;
  }
  return condition;
}

export function isValidCondition(condition: string): condition is ConditionKey {
  return condition in clinicalConditions;
}
