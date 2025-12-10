export type TargetCode =
  | 'HYP008'
  | 'HYP009'
  | 'CHOL003'
  | 'CHOL004'
  | 'AF006'
  | 'AF008'
  | 'AST007'
  | 'AST012'
  | 'BP002'
  | 'CHD005'
  | 'CHD015'
  | 'CHD016'
  | 'COPD010'
  | 'CS005'
  | 'CS006'
  | 'DEM004'
  | 'DM006'
  | 'DM012'
  | 'DM014'
  | 'DM020'
  | 'DM021'
  | 'DM034'
  | 'DM035'
  | 'DM036'
  | 'HF003'
  | 'HF006'
  | 'HF007'
  | 'HF008'
  | 'MH002'
  | 'MH003'
  | 'MH006'
  | 'MH007'
  | 'MH011'
  | 'MH012'
  | 'NDH002'
  | 'SMOK002'
  | 'SMOK004'
  | 'STIA007'
  | 'STIA014'
  | 'STIA015'
  | 'VI001'
  | 'VI002'
  | 'VI003'
  | 'VI004';

export const targetCompletions: Record<TargetCode, number> = {
  HYP008: 71,
  HYP009: 73,
  CHOL003: 79,
  CHOL004: 57,
  AF006: 98,
  AF008: 94,
  AST007: 76,
  AST012: 88,
  BP002: 0,
  CHD005: 85,
  CHD015: 62,
  CHD016: 75,
  COPD010: 72,
  CS005: 0,
  CS006: 0,
  DEM004: 0,
  DM006: 76,
  DM012: 60,
  DM014: 100,
  DM020: 55,
  DM021: 75,
  DM034: 73,
  DM035: 87,
  DM036: 73,
  HF003: 78,
  HF006: 78,
  HF007: 57,
  HF008: 91,
  MH002: 40,
  MH003: 55,
  MH006: 48,
  MH007: 53,
  MH011: 60,
  MH012: 57,
  NDH002: 84,
  SMOK002: 0,
  SMOK004: 0,
  STIA007: 88,
  STIA014: 60,
  STIA015: 78,
  VI001: 0,
  VI002: 0,
  VI003: 0,
  VI004: 0,
};

export interface SpecialCaseData {
  complete: number;
  incomplete: number;
  exceptionInvited: number;
  exceptionClinical: number;
  totalRegister: number;
}

export const specialCases: Partial<Record<TargetCode, SpecialCaseData>> = {
  HYP008: {
    complete: 54.4,
    incomplete: 32.7,
    exceptionInvited: 12.9,
    exceptionClinical: 0,
    totalRegister: 951,
  },
  HYP009: {
    complete: 67,
    incomplete: 28.2,
    exceptionInvited: 4.8,
    exceptionClinical: 0,
    totalRegister: 333,
  },
};

export const DEFAULT_REGISTER_SIZE = 1000;
