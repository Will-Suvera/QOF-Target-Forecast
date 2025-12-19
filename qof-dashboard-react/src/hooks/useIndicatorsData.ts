/**
 * Financial year progress utility for QOF calculations.
 * UK financial year runs April 1 to March 31.
 */
export function getFinancialYearProgress(): number {
  const today = new Date();
  const currentYear = today.getFullYear();

  let financialYearStart: Date;
  if (today.getMonth() < 3) {
    financialYearStart = new Date(currentYear - 1, 3, 1);
  } else {
    financialYearStart = new Date(currentYear, 3, 1);
  }

  const daysElapsed = Math.floor(
    (today.getTime() - financialYearStart.getTime()) / (1000 * 60 * 60 * 24)
  );

  const year = financialYearStart.getFullYear();
  const isLeapYear =
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInYear = isLeapYear ? 366 : 365;

  return daysElapsed / daysInYear;
}
