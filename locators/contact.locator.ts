
export const ContactLocator = {
   Contactbtn: { role: 'link', name: 'Contacts' },
   FirstNameInput: { testId: 'firstName' },
   LastNameInput: { testId: 'lastName' },
   UpdateContactbtn: { role: 'button', name: 'Update Contact' },
   DeleteContactbtn: { role: 'button', name: 'Delete' },
   AddContactbtn: { role: 'button', name: 'Add Contact' },
   SearchContactInput: { role: 'textbox', name: 'Search Contacts' },
   ContactList: { role: 'listbox', name: 'Contact List' },
   editIcon: { role: 'button', name: 'Edit' },
   OpenAddContactModal: { role: 'button', name: 'add icon Add New Contact' },
   AddContactsTab: { role: 'link', name: 'Contacts' },
   DeleteContactYesBtn: { locator: '.ant-btn.css-5uvb3z.ant-btn-default.ant-btn-dangerous' },
   
} as const;