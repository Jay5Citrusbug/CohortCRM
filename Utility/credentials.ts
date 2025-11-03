import { faker } from '@faker-js/faker';


export const credentials = {

    email: process.env.COHORT_EMAIL,
    password: process.env.COHORT_PASS,
  };

// utilis/credentials/credentials.ts
// Example for dynamic test data using faker

export const DynamicCredentials = {
  randomEmail: faker.internet.email(),
  randomPassword: faker.internet.password({ length: 10, memorable: true }),
};
  