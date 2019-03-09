<template lang="html">
  <div>
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
              <h2 class="my-0"><strong>Update Profile</strong></h2>
            </div>
          </div>
          <div class="row w3-padding-48">
            <div class="col-12 col-md-10 offset-md-1">
              <div class="container">
                <!-- General -->
                <div class="card rounded-0 widget--borderless w3-shadow-small mb-4">
                    <div class="card-header w3-white text-center border-bottom-0">
                        <h5 class="my-0">General information</h5>
                    </div>
                    <div class="card-body pt-1">
                      <div class="row">
                        <div class="col-12 col-md-4">
                          <div class="form-group">
                            <label for="" class="font-weight-medium">First name</label>
                            <input type="text" class="form-control w3-light-grey rounded-pill widget--borderless" placeholder="First name" v-model.trim="general.firstname">
                          </div>
                        </div>
                        <div class="col-12 col-md-4">
                          <div class="form-group">
                            <label for="" class="font-weight-medium">Last name</label>
                            <input type="text" class="form-control w3-light-grey rounded-pill widget--borderless" placeholder="Last name" v-model.trim="general.lastname">
                          </div>
                        </div>
                        <div class="col-12 col-md-4">
                          <div class="form-group">
                            <label for="" class="font-weight-medium">Middle name</label>
                            <input type="text" class="form-control w3-light-grey rounded-pill widget--borderless" placeholder="Middle name" v-model.trim="general.middlename">
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="" class="font-weight-medium">Lawyer's position/title</label><br>
                        <div class="form-check form-check-inline" v-for="lawyerPosition in lawyerPositions" :key="lawyerPosition">
                          <input class="form-check-input" type="radio" :name="lawyerPosition" :id="lawyerPosition" :value="lawyerPosition" v-model.trim="general.honorary" required>
                          <label class="form-check-label text-capitalize" :for="lawyerPosition">{{lawyerPosition}}</label>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-6 col-md-8">
                          <div class="form-group">
                            <label for="status" class="font-weight-medium">Office (*)</label>
                            <select class="custom-select w3-light-grey rounded-pill widget--borderless font-size-14 py-2" id="status" v-model.trim="general.office" required>
                              <option :value="office.id" v-for="office in offices" class="py-2">
                                <span class="font-weight-medium mr-2">{{office.address.country}},</span>
                                &nbsp;{{office.address.city}}
                              </option>
                            </select>
                          </div>
                        </div>
                        <div class="col-6 col-md-4">
                          <label for="" class="font-weight-medium">Year joined this office</label>
                          <input type="number" class="form-control w3-light-grey rounded-pill widget--borderless" placeholder="2019" v-model.trim.number="general.yearJoined">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="" class="font-weight-medium">Title of Listing</label>
                        <input type="text" class="form-control w3-light-grey rounded-pill widget--borderless" placeholder="Title of Listing" v-model.trim="general.title">
                      </div>
                      <div class="form-group">
                          <label for="" class="font-weight-medium">Email address</label>
                          <input type="text" class="form-control w3-light-grey rounded-pill widget--borderless" placeholder="Email address" v-model.trim="general.email">
                      </div>
                      <div class="form-group">
                          <label for="" class="font-weight-medium">Website link</label>
                          <input type="url" class="form-control w3-light-grey rounded-pill widget--borderless" placeholder="Website link" v-model.trim="general.website">
                      </div>
                      <div class="row">
                        <div class="col-12 col-md-6">
                          <div class="form-group d-flex flex-row align-items-center">
                            <span class="font-weight-medium mr-2">Open Hour :</span>
                            <input type="text" class="form-control rounded-0" placeholder="09h00" value="" style="width:90px" v-model.trim="general.officeOpen"> <span class="mx-2">to</span>
                            <input type="text" class="form-control rounded-0" placeholder="18h00" value="" style="width:90px" v-model.trim="general.officeClose">
                          </div>
                        </div>
                        <div class="col-12 col-md-6 d-flex flex-row justify-content-md-end">
                          <div class="form-group d-flex flex-row align-items-center">
                            <span class="font-weight-medium mr-2">Fee price :</span>
                            <input type="text" class="form-control rounded-0" placeholder="0.00" value="" style="width:90px" v-model.trim="general.fee_price">
                            <span class="mx-2"></span>
                            <select class="custom-select w3-light-grey rounded-pill widget--borderless font-size-14" id="status" v-model.trim="general.fee_currency" required style="width:120px">
                              <option value="usd" selected>USD</option>
                              <option value="euro">EURO</option>
                              <option value="sterling">STERLING</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                          <label for="" class="font-weight-medium">Overview (max. 120 characters)</label>
                          <textarea name="" id="" cols="8" rows="3" class="form-control w3-light-grey rounded-0 widget--borderless" placeholder="Overview" maxlength="120" v-model.trim="general.overview"></textarea>
                      </div>
                      <legend class="font-size-14 mb-3 font-weight-medium">Photo</legend>
                      <div class="row align-items-center d-flex flex-row no-gutters pl-3">
                        <div class="col-2">
                          <img :src="imageUrl" alt="" class="rounded-circle" style="height:70px;width:70px">
                        </div>
                        <div class="col-10">
                          <button class="btn btn-sm w3-light-grey" @click="onPickPhoto">Choose picture</button>
                          <input type="file"
                          style="display: none;"
                          ref="photoInput"
                          accept="image/*"
                          @change="onPhotoPicked"
                          required>
                        </div>
                      </div>
                    </div>
                </div>
                <!-- Address -->
                <div class="card rounded-0 widget--borderless w3-shadow-small mb-4">
                    <div class="card-header w3-white text-center border-bottom-0">
                        <h5 class="my-0">Address information</h5>
                    </div>
                    <div class="card-body pt-1">
                      <div class="row no-gutters">
                          <div class="col-5 pr-2">
                              <div class="form-group">
                                  <label for="" class="font-weight-medium">Country</label>
                                  <input type="search" class="form-control w3-light-grey rounded-pill widget--borderless" id="country-input"
                                      placeholder="Type country" />
                              </div>
                          </div>
                          <div class="col-5 px-2">
                              <div class="form-group">
                                  <label for="" class="font-weight-medium">City</label>
                                  <input type="search" class="form-control w3-light-grey rounded-pill widget--borderless" id="city-input" placeholder="Type city" />
                              </div>
                          </div>
                          <div class="col-2">
                              <div class="form-group">
                                  <label for="" class="font-weight-medium">Zip Code</label>
                                  <input type="search" class="form-control w3-light-grey rounded-pill widget--borderless" id="state-input" placeholder="Zip Code" v-model.trim="address.zip" />
                              </div>
                          </div>
                      </div>
                      <div class="form-group">
                          <label for="" class="font-weight-medium">Street Address of the office</label>
                          <textarea name="" id="" cols="8" rows="2" class="form-control w3-light-grey rounded-0 widget--borderless" placeholder="Address" v-model.trim="address.streetAddress"></textarea>
                      </div>
                      <div class="row">
                          <div class="col-6">
                              <div class="form-group">
                                  <label for="" class="font-weight-medium">Phone No.</label>
                                  <input type="search" class="form-control w3-light-grey rounded-pill widget--borderless" id="country-input" placeholder="i.e. (123) 123-4678 or +12 (34) 567-1234" v-model.trim="address.phone" />
                              </div>
                          </div>
                          <div class="col-6">
                              <div class="form-group">
                                  <label for="" class="font-weight-medium">800 Number - Free calls only</label>
                                  <input type="search" class="form-control w3-light-grey rounded-pill widget--borderless" id="city-input" placeholder="i.e. 8000" v-model.trim="address.free_phone" />
                              </div>
                          </div>
                      </div>
                      <div class="form-group">
                          <label for="" class="font-weight-medium">VAT Number (Will be printed on your invoice)</label>
                          <input type="search" class="form-control w3-light-grey rounded-pill widget--borderless w-50" id="city-input" placeholder="VAT Number" v-model.trim="address.vat_number" />
                      </div>
                    </div>
                </div>
                <!-- Useful -->
                <div class="card rounded-0 widget--borderless w3-shadow-small mb-4">
                  <div class="card-header w3-white text-center border-bottom-0">
                    <h5 class="my-0">Useful information</h5>
                  </div>
                  <div class="card-body pt-1">
                    <div class="form-group">
                        <label for="" class="font-weight-medium">Languages Spoken</label>
                        <textarea name="" id="" cols="8" rows="1" class="form-control w3-light-grey rounded-0 widget--borderless" placeholder="i.e. English, French, Germain..." v-model.trim="useful.languages"></textarea>
                    </div>
                    <h6>Free Consultation</h6>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="freeConsultation" v-model="useful.free_consulation">
                        <label class="form-check-label" for="freeConsultation">The lawyer/expert provides free initial consultations</label>
                    </div>
                    <h6>Contingency Fee Cases</h6>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="contingencyFee" v-model="useful.contingencyFee">
                        <label class="form-check-label" for="contingencyFee">The lawyer/expert takes cases on contingency fee</label>
                    </div>
                    <h6>Credit Card Payment</h6>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="creditCard" v-model="useful.creditCardAccepted">
                        <label class="form-check-label" for="creditCard">The lawyer/expert accepts payments by credit card</label>
                    </div>
                    <!--  -->
                  </div>
                </div>
                <!-- Education & Career -->
                <div class="card rounded-0 widget--borderless w3-shadow-small mb-4">
                    <div class="card-header w3-white text-center border-bottom-0">
                        <h5 class="my-0">Education & Career</h5>
                    </div>
                    <div class="card-body pt-1">
                      <div class="form-group">
                          <label for="" class="font-weight-medium">Bar admissions (max. 2500 characters)</label>
                          <textarea name="" id="" cols="8" rows="8" class="form-control w3-light-grey rounded-0 widget--borderless" placeholder="Bar admissions" v-model.trim="career.barAdmissions"></textarea>
                      </div>
                      <div class="form-group">
                          <label for="" class="font-weight-medium">Education</label>
                          <textarea name="" id="" cols="8" rows="8" class="form-control w3-light-grey rounded-0 widget--borderless" placeholder="Education" v-model.trim="career.education"></textarea>
                      </div>
                      <div class="form-group">
                          <label for="" class="font-weight-medium">Profesional Experiences</label>
                          <textarea name="" id="" cols="8" rows="8" class="form-control w3-light-grey rounded-0 widget--borderless" placeholder="Profesional Experiences" v-model.trim="career.professionalExperiences"></textarea>
                      </div>
                    </div>
                </div>
                <!-- Area of practices -->
                <div class="card rounded-0 widget--borderless w3-shadow-small mb-4">
                    <div class="card-header w3-white text-center border-bottom-0">
                        <h6 class="my-0">Areas of Practice</h6>
                    </div>
                    <div class="card-body pt-1">
                      <div class="form-group">
                          <label for="" class="font-weight-medium">Practice Description</label>
                          <textarea name="" id="" cols="8" rows="10" class="form-control w3-light-grey rounded-0 widget--borderless" placeholder="Practice Description" v-model.trim="areaOfPractices.practice"></textarea>
                      </div>
                      <div class="form-group">
                        <h6 class="mt-4 mb-3">Select your Areas of Practice (max. 50)</h6>
                        <div class="row">
                          <div class="col-12 col-sm-6 col-md-4">
                            <div v-for="practice in practices1" :key="practice.category">
                              <div class="form-group form-check my-1">
                                <input type="checkbox" class="form-check-input"  :value="practice.category" :id="practice.category" v-model="areaOfPractices.areaOfPractices">
                                <label class="form-check-label font-weight-medium" :for="practice.category">{{practice.category}}</label>
                              </div>
                              <ul class="list-unstyled ml-4">
                                <li v-for="area in practice.practices" :key="area">
                                  <div class="form-group form-check my-1">
                                    <input type="checkbox" class="form-check-input" :value="area" :id="area" v-model="areaOfPractices.areaOfPractices">
                                    <label class="form-check-label" :for="area">{{area}}</label>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="col-12 col-sm-6 col-md-4">
                            <div v-for="practice in practices2" :key="practice.category">
                              <div class="form-group form-check my-1">
                                <input type="checkbox" class="form-check-input"  :value="practice.category" :id="practice.category" v-model="areaOfPractices.areaOfPractices">
                                <label class="form-check-label font-weight-medium" :for="practice.category">{{practice.category}}</label>
                              </div>
                              <ul class="list-unstyled ml-4">
                                <li v-for="area in practice.practices" :key="area">
                                  <div class="form-group form-check my-1">
                                    <input type="checkbox" class="form-check-input" :value="area" :id="area" v-model="areaOfPractices.areaOfPractices">
                                    <label class="form-check-label" :for="area">{{area}}</label>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="col-12 col-sm-6 col-md-4">
                            <div v-for="practice in practices3" :key="practice.category">
                              <div class="form-group form-check my-1">
                                <input type="checkbox" class="form-check-input" :value="practice.category" :id="practice.category" v-model="areaOfPractices.areaOfPractices">
                                <label class="form-check-label font-weight-medium" :for="practice.category">{{practice.category}}</label>
                              </div>
                              <ul class="list-unstyled ml-4">
                                <li v-for="area in practice.practices" :key="area">
                                  <div class="form-group form-check my-1">
                                    <input type="checkbox" class="form-check-input"  :value="area" :id="area" v-model="areaOfPractices.areaOfPractices">
                                    <label class="form-check-label" :for="area">{{area}}</label>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                          <label for="" class="font-weight-medium">Additional Practice Areas</label>
                          <textarea name="" id="" cols="8" rows="3" class="form-control w3-light-grey rounded-0 widget--borderless" placeholder="Additional Practice Areas" v-model.trim="areaOfPractices.additionalPracticeAreas"></textarea>
                      </div>
                    </div>
                </div>
                <!-- Social Networl -->
                <div class="card rounded-0 widget--borderless w3-shadow-small mb-4">
                    <div class="card-header w3-white text-center border-bottom-0">
                        <h5 class="my-0">Social network</h5>
                    </div>
                    <div class="card-body pt-1">
                      <div class="form-group">
                          <label for="" class="font-weight-medium">Facebook Link</label>
                          <input type="text" class="form-control w3-light-grey rounded-pill widget--borderless" placeholder="Facebook Link" v-model.trim="socials.facebook">
                      </div>
                      <div class="form-group">
                          <label for="" class="font-weight-medium">Google+ Link</label>
                          <input type="text" class="form-control w3-light-grey rounded-pill widget--borderless" placeholder="Google+ Link" v-model.trim="socials.googleplus">
                      </div>
                      <div class="form-group">
                          <label for="" class="font-weight-medium">Twitter Link</label>
                          <input type="text" class="form-control w3-light-grey rounded-pill widget--borderless" placeholder="Twitter Link" v-model.trim="socials.twitter">
                      </div>
                      <div class="form-group">
                          <label for="" class="font-weight-medium">Youtube Link</label>
                          <input type="text" class="form-control w3-light-grey rounded-pill widget--borderless" placeholder="Youtube Link" v-model.trim="socials.youtube">
                      </div>
                    </div>
                </div>
                <!--  -->
                <div class="card rounded-0 widget--borderless w3-shadow-small text-left d-flex flex-row">
                  <div class="card-body">
                    <button type="button" name="button" class="btn btn-primary w3-light-grey font-weight-medium rounded-0 text-uppercase mr-4" data-toggle="modal" data-target="#addProfileModal">Save</button>
                    <button @click="$router.back()" type="button" name="button" class="btn btn-danger w3-light-grey font-weight-medium rounded-0 text-uppercase">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MainTile>
      </transition>
    </main>
    <!-- Modal -->
    <div class="modal fade" id="addProfileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add profile confirmation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Do you want to add this profile ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn w3-light-grey font-weight-medium" data-dismiss="modal">Close</button>
            <button type="button" class="btn w3-light-grey font-weight-medium" @click="onAddProfile">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const appId = 'pl1JBGLSZ0E3';
const apiKey = 'e0fa3416080782e74c75e6da5a1c2df9';

export default {
  data: () => ({
    general: {
      firstname: '',
      lastname: '',
      middlename: '',
      honorary: '',
      company: '',
      office: '',
      title: '',
      position: '',
      email: '',
      website: '',
      fee_price: '',
      fee_currency: 'usd',
      overview: '',
      yearJoined: '',
    },
    address: {
      country: '',
      city: '',
      zip: '',
      streetAddress: '',
      phone: '',
      free_phone: '',
      vat_number: '',
    },
    useful: {
      languages: '',
      free_consulation: '',
      contingencyFee: '',
      creditCardAccepted: '',
    },
    career: {
      barAdmissions: '',
      education: '',
      professionalExperiences: '',
    },
    areaOfPractices: {
      practice: '',
      areaOfPractices: [],
      additionalPracticeAreas: '',
    },
    socials: {
      facebook: '',
      googleplus: '',
      twitter: '',
      youtube: '',
    },
    //
    selectedOffice: null,
    //
    lawyerPositions: ['chairman', 'senior partner', 'partner', 'associate', 'lawyer', 'counsel', 'of counsel'],
    //
    image: null,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    //
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
    ...mapGetters(['loading', 'error', 'user', 'offices'])
  },
  watch: {
    'general.office' (value) {
      if (value) {
        this.selectedOffice = this.$store.getters.office(value);
        // console.log(this.selectedOffice);
      }
    },
    selectedOffice (value) {
      if (value != null) {
        this.address.country = value.address.country;
        this.address.city = value.address.city;
        this.address.zip = value.address.zip;
        this.address.streetAddress = value.address.streetAddress;
        //
        $('#country-input').val(value.address.country);
        $('#city-input').val(value.address.city);
      }
    }
  },
  methods: {
    onAddProfile() {
      if (!this.general.office) return;
      const data = {
        image: this.image,
        general: {
          firstname: this.general.firstname,
          lastname: this.general.lastname,
          middlename: this.general.middlename,
          honorary: this.general.honorary,
          company: this.general.company,
          office: this.general.office,
          title: this.general.title,
          position: this.general.position,
          email: this.general.email,
          website: this.general.website,
          fee_price: this.general.fee_price,
          fee_currency: this.general.fee_currency,
          overview: this.general.overview,
          yearJoined: this.general.yearJoined,
        },
        address: {
          country: this.address.country,
          city: this.address.city,
          zip: this.address.zip,
          streetAddress: this.address.streetAddress,
          phone: this.address.phone,
          free_phone: this.address.free_phone,
          vat_number: this.address.vat_number,
        },
        useful: {
          languages: this.useful.languages,
          free_consulation: this.useful.free_consulation,
          contingencyFee: this.useful.contingencyFee,
          creditCardAccepted: this.useful.creditCardAccepted,
        },
        career: {
          barAdmissions: this.career.barAdmissions,
          education: this.career.education,
          professionalExperiences: this.career.professionalExperiences,
        },
        areaOfPractices: {
          practice: this.areaOfPractices.practice,
          areaOfPractices: this.areaOfPractices.areaOfPractices,
          additionalPracticeAreas: this.areaOfPractices.additionalPracticeAreas,
        },
        socials: {
          facebook: this.socials.facebook,
          googleplus: this.socials.googleplus,
          twitter: this.socials.twitter,
          youtube: this.socials.youtube,
        },
      };
      this.$store.dispatch('addListingProfile', data);
      //
      $('#addProfileModal').modal('hide');
      //
      this.selectedOffice = null;
      //
      this.image = null;
      this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

      this.general = {
        firstname: '',
        lastname: '',
        middlename: '',
        honorary: '',
        company: '',
        office: '',
        title: '',
        position: '',
        email: '',
        website: '',
        fee_price: '',
        fee_currency: 'usd',
        overview: '',
        yearJoined: '',
      };
      this.address = {
        country: '',
        city: '',
        zip: '',
        streetAddress: '',
        phone: '',
        free_phone: '',
        vat_number: '',
      };
      this.useful = {
        languages: '',
        free_consulation: '',
        contingencyFee: '',
        creditCardAccepted: '',
      };
      this.career = {
        barAdmissions: '',
        education: '',
        professionalExperiences: '',
      };
      this.areaOfPractices = {
        practice: '',
        areaOfPractices: [],
        additionalPracticeAreas: '',
      };
      this.socials = {
        facebook: '',
        googleplus: '',
        twitter: '',
        youtube: '',
      };
      //
      this.$router.back();
    },
    onPhotoPicked(e) {
      const files = e.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        // return this.error = 'Invalid file. Please, try again...'
        return this.language == 'fr' ? this.error = "Image invalide. Veuillez réessayer..." : this.error = 'Invalid image. Please, try again...'
      }
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files[0])
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result;
      })
      this.image = files[0];
    },
    onPickPhoto () {
      this.$refs.photoInput.click();
    },
  },
  mounted() {
    var countryAutocomplete = places({
        appId: appId,
        apiKey: apiKey,
        container: document.querySelector('#country-input'),
        templates: {
            value: function (suggestion) {
                return suggestion.name;
            }
        }
    }).configure({
        type: 'country',
        aroundLatLngViaIP: false,
    });

    var cityAutocomplete = places({
        appId: appId,
        apiKey: apiKey,
        container: document.querySelector('#city-input'),
        templates: {
            value: function (suggestion) {
                return suggestion.name;
            }
        }
    }).configure({
        type: 'city',
        aroundLatLngViaIP: false,
    });
    countryAutocomplete.on('change', (e) => {
      this.address.country = e.suggestion.name;
    });
    cityAutocomplete.on('change', (e) => {
      this.address.city = e.suggestion.name;
    });
  },
  created() {
    this.image = null;
    this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

    if (!this.offices.length) {
      this.$store.dispatch('getListingOffices');
    }

    this.selectedOffice = null;
    //
    this.general = {
      firstname: '',
      lastname: '',
      middlename: '',
      honorary: '',
      company: '',
      office: '',
      title: '',
      position: '',
      email: '',
      website: '',
      fee_price: '',
      fee_currency: 'usd',
      overview: '',
      yearJoined: '',
    };
    this.address = {
      country: '',
      city: '',
      zip: '',
      streetAddress: '',
      phone: '',
      free_phone: '',
      vat_number: '',
    };
    this.useful = {
      languages: '',
      free_consulation: '',
      contingencyFee: '',
      creditCardAccepted: '',
    };
    this.career = {
      barAdmissions: '',
      education: '',
      professionalExperiences: '',
    };
    this.areaOfPractices = {
      practice: '',
      areaOfPractices: [],
      additionalPracticeAreas: '',
    };
    this.socials = {
      facebook: '',
      googleplus: '',
      twitter: '',
      youtube: '',
    };
  }
}
</script>

<style lang="scss" scoped>
</style>
