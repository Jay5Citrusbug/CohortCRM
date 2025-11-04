import { faker } from '@faker-js/faker';

// Define list before use
const assetTypes = [
 'Office',
  'PBSA',
  'Cars',
  'Commercial',
  'Development',
  'Hotel',
  'Land',
  'School',
  'Care homes',
  'Mixed-Use',
  'Private jet',
  'Warehouse'
];

const securityTypes = [
  'First charge',
  'Second charge',
  'Pref equity'
];
// Create reusable Faker data object
export const Loan_FakerData = {
  randomDealName: `Automation Loan ${faker.string.alphanumeric(6)}`,
  randomPostalCode: faker.location.zipCode({ format: '#####' }), // US ZIP
  randomValue: faker.number.int({ min: 1, max: 100 }).toString(),
  randomProperty: faker.location.city(),
  randomSponsor: faker.person.firstName(),
  randomContact: faker.person.firstName(),
  randomCompany: faker.company.name(),
  randomAssetType: faker.helpers.arrayElement(assetTypes),
  randomSecurity: faker.helpers.arrayElement(securityTypes),
};

// Optional: Log selected asset type for visibility
console.log(`🏢 Selected Asset Type: ${Loan_FakerData.randomAssetType}`);
