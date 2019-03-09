import firebase from 'firebase'

const state = {
  isOpen: true,
  error: null,
  loading: false,
  language: 'fr',
  areaOfPractices: [
    { category: 'Admiralty & Maritime', practices: [
      'Admiralty & Maritime', 'Boating Accident', 'Commercial Ship Accident', 'Cruise Ship Accidents', 'Jones Act', 'Ship Registration'
    ]},
     {category: 'Antitrust & Trade Regulation', practices: [
       'Antitrust & Trade Regulation', 'Competition Law', 'Trade', 'Unfair Competition'
     ]},
     {category: 'Aviation Law', practices: [
       'Aviation Law', 'Aerospace Law', 'Aviation Accidents'
     ]},
     {category: 'Banking & Finance', practices: [
       'Banking & Finance', 'Asset Protection', 'Banking Law', 'Capital Markets', 'Corporate Finance', 'Finance', 'Financial Services Law', 'Investment Law', 'Private Equity', 'Project Finance', 'Public Finance', 'Securities', 'Trade Investment', 'Venture Capital'
     ]},
     {category: 'Bankruptcy', practices: [
       'Bankruptcy', 'Credit & Mortgage', 'Debt Relief', 'Debtor & Creditor', 'Insolvency'
     ]},
     {category: 'Business & Industry', practices: [
       'Business & Industry', 'Agency & Distributorship', 'Business Formation', 'Business Law', 'Commercial Law', 'Contracts', 'Corporate Governance', 'Corporate Law', 'e-Commerce', 'Food & Beverages Law', 'Franchising', 'Inustrial & Manufacturing', 'Joint Ventures', 'Legal Economics', 'Mergers & Acquisitions', 'Privatization Law', 'Retail', 'Shareholders Rights', 'Utilities'
     ]},
     {category: 'Civil Rights', practices: [
       'Civil Rights', 'Constitutional Law', 'Consumer Law', 'Human Rights', 'Native Populations', 'Privacy Law'
     ]},
     {category: 'Communication', practices: [
       'Communication', 'Advertising', 'Internet Law', 'Marketing Law', 'Media'
     ]},
     {
       category: 'Criminal Law', practices: [
         'Criminal Law', 'Arson', 'Assault', 'Battery', 'Bribery', 'Burglary', 'Child Abuse', 'Child Pornography', 'Computer Crime', 'Controlled Substances', 'Credit Card Fraud', 'Criminal Defense', 'Drug Crime', 'DUI', 'DWI', 'Embezzlement', 'Expungements', 'Felonies', 'Fraud', 'Homicide', 'Identity Theft', 'Juvenile Crime', 'Manslaughter', 'Money Laundering', 'Murder', 'Narcotics', 'Perjury', 'Prostition', 'Rape', 'RICO', 'Robbery', 'Sex Crimes', 'Sexual Abuse', 'Shoplifting', 'Theft', 'Weapons', 'White Collar Crime', 'Wire Fraud'
      ]},
      {category: 'Divorce', practices: [
        'Divorce', 'Alimony', 'Child Custody & Visitation', 'Child Support', 'Separation'
      ]},
    { category: 'Education Law', practices: ['Education Law']},
      {category:'Employment', practices: [
        'Employment', 'Discrimination', 'Employee Benefits', 'Employees Rights', 'ERISA', 'FLSA Overtime Claim', 'Human Resources Law', 'Labor', 'Outsourcing', 'Qui Tam False Claims Act', 'Sexual Harassment', 'Whistleblower', 'Workers Compensation', 'Wrongful Termination'
      ]},
      {category: 'Environmental', practices: [
        'Environmental', 'Agricultural Law', 'Animal Law', 'Energy', 'Environmental Law', 'Equine Law', 'Forestry & Fisheries', 'Natural Resources', 'Oil & Gas'
      ]},
      {category: 'Estate Planning', practices: [
        'Estate Planning', 'Estate & Trust', 'Inheritance Law', 'Personal Property', 'Probate', 'Will'
      ]},
      {category: 'Ethics', practices: [
        'Ethics', 'Malpractice', 'Professional Liability', 'Professional Malpractice'
      ]},
      {category: 'Family Law', practices: [
        'Family Law', 'Adoption', 'Collaborative Law', 'Domestic Violence', 'Elder Law', 'Juvenile Law', 'Paternity', 'Pre-nuptial Agreement'
      ]},
      {category: 'General Practice', practices: ['General Practice']},
      {category: 'Government', practices: [
        'General Practice', 'Administrative Law', 'Case Law', 'Election & Political Law', 'Federal Law', 'Government Contracts', 'Military Law', 'Municipal & State Law', 'Public Law', 'Regulatory Law', 'US Federal Courts', 'Veteran Benefits'
      ]},
      {category: 'Health Care & Social', practices: [
        'Health Care & Social', 'Defective Drugs', 'Failure to Diagnose', 'Health Care', 'Informed Consent', 'Medical Law', 'Medical Malpractice', 'Medicare & Medicaid', 'Medication Erros', 'Pharmaceutical Law', 'Social Security', 'Social Security Disability', 'Social Services Law', 'Surgical Errors'
      ]},
      {category: 'Immigration', practices: [
        'Immigration', 'Extradition', 'Green Cards', 'Naturalization & Citizenship', 'Visa', 'Work Permit'
      ]},
      {category: 'Insurance', practices: [
        'Insurance', 'Bad Faith Insurance', 'Insurance Defense', 'Insurance Fraud', 'Medical Insurance'
      ]},
      {category: 'Intellectual Property', practices: [
        'Intellectual Property', 'Copyright', 'Domain Names', 'Entertainement Law', 'Licensing Law', 'Patents', 'Trade Secrets', 'Trademark'
      ]},
      {category: 'International Law', practices: [
        'International Law', 'Customs Law', 'European Community Law', 'Import & Export', 'International Arbitration', 'International Investments', 'International Trade', 'Islamic Law', 'Offshore Services'
      ]},
      {category: 'Leisure', practices: [
        'Leisure', 'Art & Culture', 'Gaming', 'Hospitality Law', 'Sports & Recreation', 'Tourism & Travel'
      ]},
      {category: 'Litigation', practices: [
        'Litigation', 'Alternative Dispute Resolution', 'Appellate Practice', 'Arbitration', 'Business Litigation', 'Civil Litigation', 'Class Actions', 'Commercial Litigation', 'Corporate Litigation', 'Financial Litigation', 'Mediation', 'Pharmaceutical Litigation', 'Product Liability Litigation'
      ]},
      { category: 'Motor Vehicles', practices: [
        'Motor Vehicles', 'Auto Dealer Fraud', 'Automotive', 'Bus Accidents', 'Car Accident', 'Lemon Law', 'Motor Vehicle Accidents', 'Motorcycle Accident', 'Railroad Accidents', 'Rollover Accident', 'Traffic Ticket', 'Transportation', 'Truck Accident',
      ]},
    { category: 'Nonprofit Organizations', practices: ['Nonprofit Organizations']},
    { category: 'Personal Injury', practices: [
      'Personal Injury', 'Accident', 'Animal Bites', 'Asbestos Mesothelioma', 'Back & Neck Injury', 'Bicycle Accident', 'Birth Injury', 'Brain Injury', 'Burn Injuries', 'Catastrophic Injuries', 'Construction Accidents', 'Construction Injuries', 'Defamation, Libel & Slander', 'Defective Products', 'FELA Railroad Injuries', 'Food Poisoning', 'Industrial Injuries', 'Mass Tort', 'Negligence', 'Nursing Home Abuse', 'Pedestrian Accident', 'Premises Liability', 'Product Liability', 'Slip & Fall', 'Spinal Cord Injury', 'Torts', 'Toxic Mold', 'Toxic Torts', 'Workplace Injuries', 'Wrongful Death',
    ]},
    { category: 'Real Estate', practices: [
      'Real Estate', 'Construction Law', 'Eminent Domain', 'Foreclosure', 'Homeowners Association', 'Land Use & Zoning', 'Landlord & Tenant Law', 'Property Law', 'Property Management',
    ]},
    { category: 'Science & Technology', practices: [
      'Science & Technology', 'Biotechnology', 'Chemical Law', 'Computer & Software', 'Data Protection', 'Information Technology', 'Research & Development', 'Telecommunications Law',
    ]},
    {category: 'Tax', practices: [
      'Tax', 'Corporate Taxation', 'Tax Planning'
    ]}
  ]
}

const getters = {
  isOpen: (state) => state.isOpen,
  error: (state) => state.error,
  loading: (state) => state.loading,
  language: (state) => state.language,
  areaOfPractices: (state) => state.areaOfPractices,
}

const mutations = {
  SET_LOADING (state, payload) {
      return state.loading = payload
  },
  SET_ERROR (state, payload) {
      return state.error = payload
  },
  CLEAR_ERROR (state, payload) {
      return state.error = null
  },
  'CHANGE_LANGUAGE': (state, payload) => {
    return state.language = payload
  },
  'SET_IS_OPEN': (state, payload) => {
    return state.isOpen = payload
  }
}

const actions = {
  setIsOpen({commit}, payload) {
    commit('SET_IS_OPEN', payload)
  },
  setError({ commit }, payload) {
      commit('SET_ERROR', payload)
  },
  clearError: ({ commit }) => {
      commit('CLEAR_ERROR')
  },
  setLoading ({commit}, payload) {
      commit('SET_LOADING', payload)
  },
  getLanguage ({commit}) {
    var payload = window.localStorage.getItem('language')
    commit('CHANGE_LANGUAGE', payload)
  },
  changeLanguage ({commit}, payload) {
    window.localStorage.setItem('language', payload)
    commit('CHANGE_LANGUAGE', payload)
  },
}

export default {
    state,
    getters,
    mutations,
    actions
}
