//   await page.getByRole('textbox', { name: 'Search New Loans' }).click();
//   await page.getByRole('textbox', { name: 'Search New Loans' }).fill('Test by QA Team');
//   await page.getByText('No data').nth(1).click();


  export const PipelineLocator = {
  
    Searchbar: {
      role: 'textbox',
      name: 'Search New Loans',
    },

    NoDataText: {
      locator: 'text=No data',
    },

} as const;