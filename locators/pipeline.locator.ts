import { T } from "@faker-js/faker/dist/airline-DF6RqYmq";
import { checkPrime } from "crypto";
import { NOTIMP } from "dns";

export const PipelineLocator = {

  Searchbar: {
    role: 'textbox', name: 'Search New Loans',
  },

  NoDataText: {
    locator: 'text=No data',
  },
  AddLoanButton: {
    role: 'button', name: 'add icon',
  },

  AddLoanText: {
    locator: 'text=Add New Loan',
  },
  SaveChangesButton: {
    role: 'button', name: 'Save Changes',
  },
  DealName: {
    name: 'dealName',
  },
  PostalcodeID: {
    name: 'postCode',
  },
  ValuePounds: {
    name: '#invite-admin_valuePounds',
  },
  Property: {
    name: '#invite-admin_property',
  },
  GrossLoanPounds: {
    name: '#invite-admin_grossLoanPounds',
  },
  Security: {
    name: '#invite-admin_proposedSecurity',
  },
  PricingPercentPerMonth: {
    name: '#invite-admin_pricingPercentPerMonth',
  },
  Sponsor: {
    name: '#invite-admin_sponsor',
  },
  Contact: {
    name: '#invite-admin_contact',
  },
  Company: {
    name: '#invite-admin_company',
  },

  AssetType: {
    name: '#invite-admin_assetType',
  },

  NewEnquiry: {
    name: 'New Enquiry',
  },

  NameLoanColumn: {
    name: 'Name of loan',
  },

  CohortInvestToggle: {
    name: 'switch',
  },
  InvvestorTab: {
    name: 'InvestorContact UsProperties',
  },
  PipelineTab: {
    name: 'PipelineUnderwritingLive',
  },

  checkbox_MCQ: {
    role: 'checkbox', name: 'Filter by MCQ',
  },

  LoanNameExpand: {
    locator: '//table//tr[2]/td[1]/span',
  },

  potentialMCQMarked: {
    locator: '.anticon.anticon-check > svg',
  },
  StatusFilter: {
    role: 'button', name: 'filter',
  },
  newEnquiryStatus: {
    role: 'menuitem', name: 'New Enquiry',
  },
  TermsAcceptedStatus: {
    role: 'menuitem', name: 'Terms Accepted',
  },
  UnderwritingProcessStatus: {
    role: 'menuitem', name: 'Underwriting Process',
  },
  NPW_STATUS: {
    role: 'menuitem', name: 'NPW',
  },

  Reset: {
    role: 'button', name: 'Reset',
  },
  OK_Button: {
    role: 'button', name: 'OK',
  },

  NewEnquiryStatus_grid: {
    name: 'New Enquiry',
  },

  EyeIconButton: {
    role: 'button', name: 'eye',
  },

  EditLoanButton: {
    role: 'button', name: 'Edit Loan',
  },
  EditIconButton: {
    role: 'button', name: 'edit',
  },
  NameEditName: {
    name: 'Edit Loan',
  },
  DiscardButton: {
    locator: '[data-test-id="discard-btn"]',
  },
  LogoImage: {
    role: 'img', name: 'logo',
  },
  MainSectionBanner: {
    role: 'banner',
    name: 'Main Section',
  },
  DealNameInput: {
    locator: 'dealName',
  },
  DealNameCell: {
    role: 'cell',
  },
  AddCommentButton: {
  role: 'button',
  name: 'Add',
},

CommentPopupHeading: {
  role: 'heading',
  name: 'Add New Comment',
},

CommentTypeDropdown: {
  locator: '#comment-form_commentType',
},

CommentTypeOption: {
  role: 'option',
  name: 'KYC',
},

CommentTextEditor: {
  locator: '.ql-editor',
},

CommentTextFallback: {
  locator: '#comment-form_comment >> p',
},

SaveCommentButton: {
  locator: 'save-btn',

},
  LoanType:{
    locator:'#invite-admin_loanType',
  },

  propertyAddress:{
    locator:'#invite-admin_property'
  }
} as const;