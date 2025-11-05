  export const PipelineLocator = {
  
    Searchbar: {
      role: 'textbox',name: 'Search New Loans',
    },

    NoDataText: {
      locator: 'text=No data',
    },
    AddLoanButton: {
      role: 'button',name: 'add icon',
    },

    AddLoanText: {
      locator: 'text=Add New Loan',
    },
    SaveChangesButton: {
      role: 'button',name: 'Save Changes',
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
      name: 'SecurityPlease select a',
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

} as const;