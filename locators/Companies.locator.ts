
export const CompaniesLocator = {
   Name: { testId: 'name' },
   UpdateCompanybtn: { role: 'button', name: 'Update Company' },
   DeleteCompanybtn: { role: 'button', name: 'Delete' },
   AddCompanybtn: { role: 'button', name: 'Add Company' },
   SearchCompanyInput: { role: 'textbox', name: 'Search Companies' },
   CompaniesList: { role: 'listbox', name: 'Companies List' },
   editIcon: { role: 'button', name: 'Edit' },
   OpenAddCompanyModal: { role: 'button', name: 'add icon Add New Company' },
   AddCompaniesTab: { role: 'link', name: 'Companies' },
   DeleteCompanyYesBtn: { locator: '.ant-btn.css-5uvb3z.ant-btn-default.ant-btn-dangerous' },
   firstCompanyInList: { locator: '//table/tbody/tr[2]/td[1]' },
   No_data: 'No data',
   Companydelete_header:"Delete Company"
} as const;