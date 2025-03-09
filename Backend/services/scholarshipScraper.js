const axios = require('axios');
const db = require('../config/database');

class ScholarshipScraper {
  static async fetchScholarships() {
    const mockScholarships = [
      {
        title: "Kenya Women in STEM Scholarship",
        description: "Full scholarship for Kenyan women pursuing STEM degrees",
        deadline: "2025-08-15",
        degree_level: "Undergraduate",
        eligibility: "Female Kenyan students in STEM fields, minimum B grade",
        link: "https://example.com/kenya-stem",
        image: "/uploads/scholarships/stem-scholarship.jpg" // Added image field
      },
      {
        title: "African Leadership Masters Fellowship",
        description: "Full funding for Masters studies in Business or Technology",
        deadline: "2025-09-30",
        degree_level: "Masters",
        eligibility: "Kenyan residents with Bachelor's degree, 2 years work experience",
        link: "https://example.com/masters-fellowship",
        image: "/uploads/scholarships/masters-fellowship.jpg" // Added image field
      }
    ];

    try {
      const scholarships = mockScholarships.map(item => ({
        name: item.title,
        description: item.description,
        application_deadline: new Date(item.deadline),
        type: item.degree_level,
        eligibility: item.eligibility,
        apply_link: item.link,
        image: item.image, // Added image field
        created_at: new Date(),
        updated_at: new Date()
      }));

      await this.saveScholarships(scholarships);
      console.log(`✅ Successfully added ${scholarships.length} scholarships`);
      
    } catch (error) {
      console.error('❌ API Error:', error.message);
      throw error;
    }
  }

  static async saveScholarships(scholarships) {
    const query = `
      INSERT INTO scholarships 
      (name, description, application_deadline, type, eligibility, apply_link, image, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const scholarship of scholarships) {
      try {
        await db.execute(query, [
          scholarship.name,
          scholarship.description,
          scholarship.application_deadline,
          scholarship.type,
          scholarship.eligibility,
          scholarship.apply_link,
          scholarship.image,
          scholarship.created_at,
          scholarship.updated_at
        ]);
      } catch (error) {
        console.error(`❌ Failed to save scholarship: ${scholarship.name}`, error);
      }
    }
  }
}

module.exports = ScholarshipScraper;