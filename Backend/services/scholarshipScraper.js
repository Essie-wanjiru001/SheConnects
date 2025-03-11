const axios = require('axios');
const { pool } = require('../config/database');
const cheerio = require('cheerio');

class ScholarshipScraper {
  static async fetchScholarships() {
    try {
      // Fetch from multiple sources
      const scholarships = [
        ...(await this.fetchFromStudyportals()),
        ...(await this.fetchFromScholarshipsAds()),
        ...(await this.fetchFromOpportunityDesk())
      ];

      await this.saveScholarships(scholarships);
      console.log(`✅ Successfully scraped ${scholarships.length} scholarships`);
    } catch (error) {
      console.error('❌ Scraping Error:', error.message);
      throw error;
    }
  }

  static async fetchFromStudyportals() {
    try {
      const response = await axios.get('https://www.scholarshipportal.com/scholarships/kenya');
      const $ = cheerio.load(response.data);
      const scholarships = [];

      $('.scholarship-item').each((_, element) => {
        scholarships.push({
          name: $(element).find('.title').text().trim(),
          description: $(element).find('.description').text().trim(),
          application_deadline: this.parseDeadline($(element).find('.deadline').text()),
          type: $(element).find('.degree-level').text().trim(),
          eligibility: $(element).find('.eligibility').text().trim(),
          apply_link: $(element).find('.apply-link').attr('href'),
          image: $(element).find('.scholarship-image').attr('src') || '/uploads/scholarships/default.jpg',
          created_at: new Date(),
          updated_at: new Date()
        });
      });

      return scholarships;
    } catch (error) {
      console.error('❌ Studyportals scraping failed:', error.message);
      return [];
    }
  }

  static async fetchFromScholarshipsAds() {
    try {
      const response = await axios.get('https://www.scholarshipsads.com/kenya-scholarships/');
      const $ = cheerio.load(response.data);
      const scholarships = [];

      $('.scholarship-post').each((_, element) => {
        scholarships.push({
          name: $(element).find('h2').text().trim(),
          description: $(element).find('.entry-content p').first().text().trim(),
          application_deadline: this.parseDeadline($(element).find('.deadline').text()),
          type: this.getDegreeLevel($(element).find('.scholarship-type').text()),
          eligibility: $(element).find('.eligibility-criteria').text().trim(),
          apply_link: $(element).find('.apply-button').attr('href'),
          image: $(element).find('.featured-image').attr('src') || '/uploads/scholarships/default.jpg',
          created_at: new Date(),
          updated_at: new Date()
        });
      });

      return scholarships;
    } catch (error) {
      console.error('❌ ScholarshipsAds scraping failed:', error.message);
      return [];
    }
  }

  static parseDeadline(dateString) {
    try {
      return new Date(dateString);
    } catch {
      return new Date();
    }
  }

  static getDegreeLevel(text) {
    const levels = {
      'undergraduate': ['bachelor', 'undergraduate', 'BS', 'BA'],
      'masters': ['master', 'MS', 'MA', 'graduate'],
      'phd': ['phd', 'doctorate', 'doctoral']
    };

    text = text.toLowerCase();
    for (const [level, keywords] of Object.entries(levels)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        return level;
      }
    }
    return 'all';
  }

  static async saveScholarships(scholarships) {
    const query = `
      INSERT INTO scholarships 
      (name, description, application_deadline, type, eligibility, apply_link, image, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      description = VALUES(description),
      application_deadline = VALUES(application_deadline),
      updated_at = VALUES(updated_at)
    `;

    for (const scholarship of scholarships) {
      try {
        const [result] = await pool.query(query, [
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
        console.log(`✅ Saved scholarship: ${scholarship.name}`);
      } catch (error) {
        console.error(`❌ Failed to save scholarship: ${scholarship.name}`, error);
      }
    }
  }
}

module.exports = ScholarshipScraper;