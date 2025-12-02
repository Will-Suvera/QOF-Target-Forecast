import { computed, ref } from 'vue'

export const useIndicatorsData = () => {
  // Accordion state for summary section - dynamically initialized
  const expandedSections = ref({})
  
  // Initialize accordion sections for a condition
  const initializeAccordionSections = (targetCodes) => {
    targetCodes.forEach(code => {
      if (!(code in expandedSections.value)) {
        expandedSections.value[code] = false
      }
    })
  }

  // Toggle accordion section
  const toggleAccordion = (section) => {
    expandedSections.value[section] = !expandedSections.value[section]
  }

  // Helper function to calculate financial year progress (0 to 1)
  const getFinancialYearProgress = () => {
    // Financial year runs from April 1 to March 31
    const today = new Date()
    const currentYear = today.getFullYear()
    
    // Determine which financial year we're in
    // If month is Jan-Mar, we're in the financial year that started the previous April
    // If month is Apr-Dec, we're in the financial year that started this April
    let financialYearStart
    if (today.getMonth() < 3) { // Jan (0), Feb (1), Mar (2)
      financialYearStart = new Date(currentYear - 1, 3, 1) // April 1 of previous year
    } else {
      financialYearStart = new Date(currentYear, 3, 1) // April 1 of current year
    }
    
    // Calculate days from financial year start to today
    const daysElapsed = Math.floor((today - financialYearStart) / (1000 * 60 * 60 * 24))
    
    // Total days in a year (365, or 366 for leap years)
    const daysInYear = ((financialYearStart.getFullYear() % 4 === 0 && financialYearStart.getFullYear() % 100 !== 0) || 
                         (financialYearStart.getFullYear() % 400 === 0)) ? 366 : 365
    
    // Calculate percentage of year elapsed
    return daysElapsed / daysInYear
  }

  // Calculate expected achievement for summary bars (both HYP008 and HYP009 have 85% max)
  const getExpectedAchievementForSummary = () => {
    const yearProgress = getFinancialYearProgress()
    const maxAchievement = 85 // Both HYP008 and HYP009 have 85% max achievement
    // Expected achievement = year progress * max achievement
    return yearProgress * maxAchievement
  }

  // Helper function to calculate breakdown from totalCompletion
  // Assumes ~85-90% of totalCompletion is clinically complete, rest is exception invited
  const calculateBreakdown = (totalCompletion) => {
    if (!totalCompletion || totalCompletion === 0) {
      return { complete: 0, exceptionInvited: 0, incomplete: 100 }
    }
    // Estimate: 85-90% of totalCompletion is clinically complete
    const completePercent = Math.round(totalCompletion * 0.88)
    const exceptionInvitedPercent = totalCompletion - completePercent
    const incompletePercent = 100 - totalCompletion
    return {
      complete: completePercent,
      exceptionInvited: Math.round(exceptionInvitedPercent * 10) / 10,
      incomplete: Math.round(incompletePercent * 10) / 10
    }
  }

  const getSummaryData = (targetCode) => {
    // Total register sizes - using 1000 as default, can be updated with actual data
    const defaultRegister = 1000
    
    // Target completion data from user's table
    const targetCompletions = {
      'HYP008': 71,
      'HYP009': 73,
      'CHOL003': 79,
      'CHOL004': 57,
      'AF006': 98,
      'AF008': 94,
      'AST007': 76,
      'AST012': 88,
      'BP002': 0,
      'CHD005': 85,
      'CHD015': 62,
      'CHD016': 75,
      'COPD010': 72,
      'CS005': 0,
      'CS006': 0,
      'DEM004': 0,
      'DM006': 76,
      'DM012': 60,
      'DM014': 100,
      'DM020': 55,
      'DM021': 75,
      'DM034': 73,
      'DM035': 87,
      'DM036': 73,
      'HF003': 78,
      'HF006': 78,
      'HF007': 57,
      'HF008': 91,
      'MH002': 40,
      'MH003': 55,
      'MH006': 48,
      'MH007': 53,
      'MH011': 60,
      'MH012': 57,
      'NDH002': 84,
      'SMOK002': 0,
      'SMOK004': 0,
      'STIA007': 88,
      'STIA014': 60,
      'STIA015': 78,
      'VI001': 0,
      'VI002': 0,
      'VI003': 0,
      'VI004': 0
    }
    
    // Special cases with known breakdowns
    const specialCases = {
      'HYP008': {
        complete: 54.4,
        incomplete: 32.7,
        exceptionInvited: 12.9,
        exceptionClinical: 0,
        totalRegister: 951
      },
      'HYP009': {
        complete: 67,
        incomplete: 28.2,
        exceptionInvited: 4.8,
        exceptionClinical: 0,
        totalRegister: 333
      }
    }
    
    // If we have a special case, use it
    if (specialCases[targetCode]) {
      const data = specialCases[targetCode]
      return {
        ...data,
        completePatients: Math.round((data.complete / 100) * data.totalRegister),
        incompletePatients: Math.round((data.incomplete / 100) * data.totalRegister),
        exceptionInvitedPatients: Math.round((data.exceptionInvited / 100) * data.totalRegister),
        exceptionClinicalPatients: Math.round((data.exceptionClinical / 100) * data.totalRegister)
      }
    }
    
    // Otherwise calculate from totalCompletion
    const totalCompletion = targetCompletions[targetCode] || 0
    const breakdown = calculateBreakdown(totalCompletion)
    
    return {
      complete: breakdown.complete,
      incomplete: breakdown.incomplete,
      exceptionInvited: breakdown.exceptionInvited,
      exceptionClinical: 0,
      totalRegister: defaultRegister,
      completePatients: Math.round((breakdown.complete / 100) * defaultRegister),
      incompletePatients: Math.round((breakdown.incomplete / 100) * defaultRegister),
      exceptionInvitedPatients: Math.round((breakdown.exceptionInvited / 100) * defaultRegister),
      exceptionClinicalPatients: 0
    }
  }

  return {
    expandedSections,
    toggleAccordion,
    initializeAccordionSections,
    getFinancialYearProgress,
    getExpectedAchievementForSummary,
    getSummaryData
  }
}

