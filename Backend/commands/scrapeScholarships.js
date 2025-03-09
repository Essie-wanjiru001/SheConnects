require('dotenv').config();
const ScholarshipScraper = require('../services/scholarshipScraper');

async function runScraper() {
  try {
    console.log('Starting scholarship fetch...');
    await ScholarshipScraper.fetchScholarships();
    console.log('Scholarship fetch completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Scholarship fetch failed:', error);
    process.exit(1);
  }
}

runScraper();