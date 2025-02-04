const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();

interface BusinessData {
  'Business Name': string;
  'Display Picture Link': string;
  Bio: string;
  About: string;
  Services: string;
  Location: string;
  Address: string;
  Link: string;
  'Email Id': string;
  'Phone Number': string;
  'Business Category': string;
  'Category Tags': string;
}

interface AuditLog {
  BusinessName: string;
  Action: string;
  Status: string;
  Message?: string;
  Timestamp: string;
}

async function updateBusinessData() {
  // Ensure that USER_ID is defined in the .env file
  const userId = process.env.USER_ID;
  if (!userId) {
    throw new Error("USER_ID is not defined in the environment variables");
  }
  console.log(`USER_ID loaded from .env: ${userId}`);

  // Verify if the userId exists in the database
  console.log('Checking if user exists...');
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userExists) {
    throw new Error(`User with ID ${userId} does not exist`);
  }
  console.log(`User with ID ${userId} exists.`);

  // Read the Excel file
  console.log('Reading Excel file...');
  const workbook = XLSX.readFile('Business Profiles Data.xlsx');
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data: BusinessData[] = XLSX.utils.sheet_to_json(sheet);
  console.log(`Loaded ${data.length} business profiles from the Excel file.`);

  // Initialize an array to hold the audit log entries
  const auditLogs: AuditLog[] = [];

  // Loop through data and upsert each business record
  for (const row of data) {
    const {
      'Business Name': name,
      'Display Picture Link': image,
      Bio: description,
      About: about,
      Services: services = '', // Default to empty string if not present
      Location: location,
      Address: address,
      Link: websiteUrl,
      'Email Id': email,
      'Phone Number': contactNumber = '', // Default to empty string if missing
      'Business Category': category,
      'Category Tags': categoryTags = '', // Default to empty string if not present
    } = row;

    // Ensure that services and categoryTags are not undefined and split them if present
    const categoryTagsArray = categoryTags ? categoryTags.split(',').map(tag => tag.trim()) : [];
    const servicesArray = services ? services.split(',').map((service: string) => ({
      category: service.trim(),
      categoryName: service.trim(),
      price: "0",  // Default price
    })) : [];

    console.log(`Processing business: ${name}`);

    try {
      const existingBusiness = await prisma.business.findUnique({
        where: { userId: userId },
      });

      let action = '';
      let status = '';
      let message = '';

      if (existingBusiness) {
        // Update the existing business
        console.log(`Business with name "${name}" found. Updating record...`);
        await prisma.business.update({
          where: { userId: userId },
          data: {
            image,
            description,
            location,
            websiteUrl,
            email,
            contactNumber,
            category,
            categoryTags: categoryTagsArray,
            services: {
              create: servicesArray,
            },
          },
        });
        action = 'Update';
        status = 'Success';
        message = 'Business updated successfully';
        console.log(`Business "${name}" updated successfully.`);
      } else {
        // Insert the new business
        console.log(`No existing business found for user ID "${userId}". Inserting new record...`);
        await prisma.business.create({
          data: {
            userId: userId,  // Directly assign userId
            name,
            image,
            description,
            location,
            websiteUrl,
            email,
            contactNumber,
            category,
            categoryTags: categoryTagsArray,
            services: {
              create: servicesArray,
            },
          },
        });
        action = 'Insert';
        status = 'Success';
        message = 'Business created successfully';
        console.log(`Business "${name}" inserted successfully.`);
      }

      // Log the action in the audit log
      auditLogs.push({
        BusinessName: name,
        Action: action,
        Status: status,
        Timestamp: new Date().toISOString(),
      });
      console.log(`Audit log entry for "${name}": ${action} - ${status}`);
    } catch (error: any) { // Ensure that error is typed as 'any'
      // If there is an error, log the failure
      console.error(`Error processing business "${name}": ${error.message}`);
      auditLogs.push({
        BusinessName: name,
        Action: 'Error',
        Status: 'Failure',
        Message: error.message,  // Include the error message
        Timestamp: new Date().toISOString(),
      });
    }
  }

  // Write the audit log to a new Excel file
  console.log('Writing audit log to Excel file...');
  const auditWorkbook = XLSX.utils.book_new();
  const auditSheet = XLSX.utils.json_to_sheet(auditLogs);
  XLSX.utils.book_append_sheet(auditWorkbook, auditSheet, 'Audit Log');
  
  // Save the audit log Excel file
  XLSX.writeFile(auditWorkbook, 'Audit_Log.xlsx');
  console.log('Audit log saved to "Audit_Log.xlsx".');
}

updateBusinessData()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Disconnected from database.');
  });
