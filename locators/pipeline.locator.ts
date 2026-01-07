import { T } from "@faker-js/faker/dist/airline-DF6RqYmq";
import { checkPrime } from "crypto";
import { NOTIMP } from "dns";

export const PipelineLocator = {

  Searchbar: {
    role: 'textbox', name: 'Search New Loans',
  },

  NoDataText: {
    name: 'No data',
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

NPWFilterOption: {
    role: 'menu', name: 'NPW',
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

  Open_loan_Drawer: {
    locator:"//html/body/div[1]/div/div/div/div/div/div/div/div/div[2]/table/tbody/tr[2]/td[1]/span",
  },

  LoanDrawer_opened: {
    role: 'button', name: 'View Detail'
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
  },
   ChangeStatus: {
    locator: "//html/body/div/div/div/div/div/div/div/div/div/div[2]/table/tbody/tr[2]/td[3]/div/div/span/span[2]"
  },

  NPWOption: {
    text: "NPW",
  },

  ConfirmStatusChange: {
    text: "Confirm Status Change",
  },

  CancelButton: {
    role: "button",
    name: "Cancel",
  },
   PopupConfirmButton: {
    role: "button",
    name: "Confirm"
  },

  PopupCancelButton: {
    role: "button",
    name: "Cancel"
  },

  PopupNPWText: {
    dialogNPWText: "NPW"
  },

  PopupDialog: {
    role: "dialog"
  },
    NPWPopupconfirmButton: {
    role: "button",
    name: "Confirm"
  },

} as const;