<template>
  <div class="home">
    <!-- Header -->
    <Header />
    <!--  -->
    <main role="main" class="row no-gutters">
      <SidebarTile>
        <Sidebar />
      </SidebarTile>
      <transition name="slide" appear mode="out-in">
        <MainTile>
          <div class="widget--listing-1 w3-padding-48 px-md-5 w3-container">
            <div class="container">
              <h1 class="my-0 d-flex flex-row align-items-center">
                <i class="icon-layers font-weight-bold mr-2" aria-hidden="true"></i>
                <strong>Area of Practices</strong>
              </h1>
            </div>
          </div>
          <div class="w3-padding-48 px-5 font-size-16">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="row no-gutters">
                    <!--  -->
                    <div class="col-12 col-md-4">
                      <ul class="list-unstyled" v-for="(practice, i) in practices1" :key="practice.category">
                        <li class="mb-2">
                          <a class="widget--underline-dotted" href="#"><strong>{{practice.category}}</strong></a>
                          <ul class="list-unstyled ml-4 mt-2">
                            <li v-for="area in practice.practices" :key="area">
                              <a class="widget--underline-dotted" href="#">{{area}}</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div class="col-12 col-md-4">
                      <ul class="list-unstyled">
                        <li class="mb-2" v-for="(practice, i) in practices2" :key="practice.category">
                          <a class="widget--underline-dotted" href="#"><strong>{{practice.category}}</strong></a>
                          <ul class="list-unstyled ml-4 mt-2">
                            <li v-for="area in practice.practices" :key="area">
                              <a class="widget--underline-dotted" href="#">{{area}}</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div class="col-12 col-md-4">
                      <ul class="list-unstyled">
                        <li class="mb-2" v-for="(practice, i) in practices3" :key="practice.category">
                          <a class="widget--underline-dotted" href="#"><strong>{{practice.category}}</strong></a>
                          <ul class="list-unstyled ml-4 mt-2">
                            <li v-for="area in practice.practices" :key="area">
                              <a class="widget--underline-dotted" href="#">{{area}}</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!--  -->
                <div class="col-12 col-md-4">

                </div>
              </div>
            </div>
          </div>
          <!-- <div id='map' style='width: 600px; height: 300px;'></div> -->
        </MainTile>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'legal-articles',
  data: () => ({
    practices1: [
      { category: 'Admiralty & Maritime', practices: [
         'Boating Accident', 'Commercial Ship Accident', 'Cruise Ship Accidents', 'Jones Act', 'Ship Registration'
      ]},
       {category: 'Antitrust & Trade Regulation', practices: [
         'Competition Law', 'Trade', 'Unfair Competition'
       ]},
       {category: 'Aviation Law', practices: [
         'Aerospace Law', 'Aviation Accidents'
       ]},
       {category: 'Banking & Finance', practices: [
         'Asset Protection', 'Banking Law', 'Capital Markets', 'Corporate Finance', 'Finance', 'Financial Services Law', 'Investment Law', 'Private Equity', 'Project Finance', 'Public Finance', 'Securities', 'Trade Investment', 'Venture Capital'
       ]},
       {category: 'Bankruptcy', practices: [
         'Credit & Mortgage', 'Debt Relief', 'Debtor & Creditor', 'Insolvency'
       ]},
       {category: 'Business & Industry', practices: [
         'Agency & Distributorship', 'Business Formation', 'Business Law', 'Commercial Law', 'Contracts', 'Corporate Governance', 'Corporate Law', 'e-Commerce', 'Food & Beverages Law', 'Franchising', 'Inustrial & Manufacturing', 'Joint Ventures', 'Legal Economics', 'Mergers & Acquisitions', 'Privatization Law', 'Retail', 'Shareholders Rights', 'Utilities'
       ]},
       {category: 'Civil Rights', practices: [
         'Constitutional Law', 'Consumer Law', 'Human Rights', 'Native Populations', 'Privacy Law'
       ]},
       {category: 'Communication', practices: [
         'Advertising', 'Internet Law', 'Marketing Law', 'Media'
       ]},
       {
         category: 'Criminal Law', practices: [
           'Arson', 'Assault', 'Battery', 'Bribery', 'Burglary', 'Child Abuse', 'Child Pornography', 'Computer Crime', 'Controlled Substances', 'Credit Card Fraud', 'Criminal Defense', 'Drug Crime', 'DUI', 'DWI', 'Embezzlement', 'Expungements', 'Felonies', 'Fraud', 'Homicide', 'Identity Theft', 'Juvenile Crime', 'Manslaughter', 'Money Laundering', 'Murder', 'Narcotics', 'Perjury', 'Prostition', 'Rape', 'RICO', 'Robbery', 'Sex Crimes', 'Sexual Abuse', 'Shoplifting', 'Theft', 'Weapons', 'White Collar Crime', 'Wire Fraud'
        ]},

    ],
    practices2: [
      {category: 'Divorce', practices: [
        'Alimony', 'Child Custody & Visitation', 'Child Support', 'Separation'
      ]},
      { category: 'Education Law', practices: []},
      {category:'Employment', practices: [
        'Discrimination', 'Employee Benefits', 'Employees Rights', 'ERISA', 'FLSA Overtime Claim', 'Human Resources Law', 'Labor', 'Outsourcing', 'Qui Tam False Claims Act', 'Sexual Harassment', 'Whistleblower', 'Workers Compensation', 'Wrongful Termination'
      ]},
      {category: 'Environmental', practices: [
        'Agricultural Law', 'Animal Law', 'Energy', 'Environmental Law', 'Equine Law', 'Forestry & Fisheries', 'Natural Resources', 'Oil & Gas'
      ]},
      {category: 'Estate Planning', practices: [
        'Estate & Trust', 'Inheritance Law', 'Personal Property', 'Probate', 'Will'
      ]},
      {category: 'Ethics', practices: [
        'Malpractice', 'Professional Liability', 'Professional Malpractice'
      ]},
      {category: 'Family Law', practices: [
        'Adoption', 'Collaborative Law', 'Domestic Violence', 'Elder Law', 'Juvenile Law', 'Paternity', 'Pre-nuptial Agreement'
      ]},
      {category: 'General Practice', practices: []},
      {category: 'Government', practices: [
        'Administrative Law', 'Case Law', 'Election & Political Law', 'Federal Law', 'Government Contracts', 'Military Law', 'Municipal & State Law', 'Public Law', 'Regulatory Law', 'US Federal Courts', 'Veteran Benefits'
      ]},
      {category: 'Health Care & Social', practices: [
        'Defective Drugs', 'Failure to Diagnose', 'Health Care', 'Informed Consent', 'Medical Law', 'Medical Malpractice', 'Medicare & Medicaid', 'Medication Erros', 'Pharmaceutical Law', 'Social Security', 'Social Security Disability', 'Social Services Law', 'Surgical Errors'
      ]},
      {category: 'Immigration', practices: [
        'Extradition', 'Green Cards', 'Naturalization & Citizenship', 'Visa', 'Work Permit'
      ]},
      {category: 'Insurance', practices: [
        'Bad Faith Insurance', 'Insurance Defense', 'Insurance Fraud', 'Medical Insurance'
      ]},
      {category: 'Intellectual Property', practices: [
        'Copyright', 'Domain Names', 'Entertainement Law', 'Licensing Law', 'Patents', 'Trade Secrets', 'Trademark'
      ]},
    ],
    practices3: [
      {category: 'International Law', practices: [
        'Customs Law', 'European Community Law', 'Import & Export', 'International Arbitration', 'International Investments', 'International Trade', 'Islamic Law', 'Offshore Services'
      ]},
      {category: 'Leisure', practices: [
        'Art & Culture', 'Gaming', 'Hospitality Law', 'Sports & Recreation', 'Tourism & Travel'
      ]},
      {category: 'Litigation', practices: [
        'Alternative Dispute Resolution', 'Appellate Practice', 'Arbitration', 'Business Litigation', 'Civil Litigation', 'Class Actions', 'Commercial Litigation', 'Corporate Litigation', 'Financial Litigation', 'Mediation', 'Pharmaceutical Litigation', 'Product Liability Litigation'
      ]},
      { category: 'Motor Vehicles', practices: [
        'Auto Dealer Fraud', 'Automotive', 'Bus Accidents', 'Car Accident', 'Lemon Law', 'Motor Vehicle Accidents', 'Motorcycle Accident', 'Railroad Accidents', 'Rollover Accident', 'Traffic Ticket', 'Transportation', 'Truck Accident',
      ]},
      { category: 'Nonprofit Organizations', practices: []},
      { category: 'Personal Injury', practices: [
        'Accident', 'Animal Bites', 'Asbestos Mesothelioma', 'Back & Neck Injury', 'Bicycle Accident', 'Birth Injury', 'Brain Injury', 'Burn Injuries', 'Catastrophic Injuries', 'Construction Accidents', 'Construction Injuries', 'Defamation, Libel & Slander', 'Defective Products', 'FELA Railroad Injuries', 'Food Poisoning', 'Industrial Injuries', 'Mass Tort', 'Negligence', 'Nursing Home Abuse', 'Pedestrian Accident', 'Premises Liability', 'Product Liability', 'Slip & Fall', 'Spinal Cord Injury', 'Torts', 'Toxic Mold', 'Toxic Torts', 'Workplace Injuries', 'Wrongful Death',
      ]},
      { category: 'Real Estate', practices: [
        'Construction Law', 'Eminent Domain', 'Foreclosure', 'Homeowners Association', 'Land Use & Zoning', 'Landlord & Tenant Law', 'Property Law', 'Property Management',
      ]},
      { category: 'Science & Technology', practices: [
        'Biotechnology', 'Chemical Law', 'Computer & Software', 'Data Protection', 'Information Technology', 'Research & Development', 'Telecommunications Law',
      ]},
      {category: 'Tax', practices: [
        'Corporate Taxation', 'Tax Planning'
      ]}
    ],
  }),
  computed: {
    ...mapGetters(['areaOfPractices'])
  }
}
</script>
