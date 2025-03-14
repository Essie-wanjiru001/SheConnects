const { pool } = require('../config/database');
const Scholarship = require('../models/scholarship');

// Mock the database pool
jest.mock('../config/database', () => ({
  pool: {
    query: jest.fn()
  }
}));

describe('Scholarship Model Tests', () => {
  beforeEach(() => {
    // Clear mock data before each test
    jest.clearAllMocks();
  });

  describe('createScholarship', () => {
    const mockScholarshipData = {
      name: 'Test Scholarship',
      image: '/test-image.jpg',
      description: 'Test Description',
      eligibility: 'Test Eligibility',
      application_deadline: '2025-12-31',
      apply_link: 'https://test-link.com',
      type: 'Undergraduate'
    };

    test('should create a scholarship successfully', async () => {
      const mockInsertId = 1;
      // Fix: Adjust mock structure to match MySQL2 response format
      pool.query.mockResolvedValueOnce([{ insertId: mockInsertId }]);

      const result = await Scholarship.createScholarship(mockScholarshipData);

      expect(result).toBe(mockInsertId);
      expect(pool.query).toHaveBeenCalledTimes(1);
    });

    test('should throw error when creation fails', async () => {
      const mockError = new Error('Database error');
      pool.query.mockRejectedValueOnce(mockError);

      await expect(Scholarship.createScholarship(mockScholarshipData))
        .rejects
        .toThrow('Failed to create scholarship');
    });
  });

  describe('getScholarshipById', () => {
    test('should return scholarship when found', async () => {
      const mockScholarship = {
        id: 1,
        name: 'Test Scholarship',
        description: 'Test Description'
      };
      pool.query.mockResolvedValueOnce([[mockScholarship]]);

      const result = await Scholarship.getScholarshipById(1);

      expect(result).toEqual(mockScholarship);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT'),
        [1]
      );
    });

    test('should return undefined when scholarship not found', async () => {
      pool.query.mockResolvedValueOnce([[]]);

      const result = await Scholarship.getScholarshipById(999);

      expect(result).toBeUndefined();
    });
  });

  describe('deleteScholarship', () => {
    test('should soft delete scholarship successfully', async () => {
      // Mock scholarship exists with image
      pool.query.mockResolvedValueOnce([[{ image: '/test-image.jpg' }]]);
      // Mock update successful
      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const result = await Scholarship.deleteScholarship(1);

      expect(result).toEqual({
        success: true,
        imagePath: '/test-image.jpg'
      });
      expect(pool.query).toHaveBeenCalledTimes(2);
    });

    test('should return false when scholarship not found', async () => {
      pool.query.mockResolvedValueOnce([[]]);

      const result = await Scholarship.deleteScholarship(999);

      expect(result).toBeFalse();
    });
  });

  describe('getTopThreeScholarships', () => {
    test('should return top three active scholarships', async () => {
      const mockScholarships = [
        { id: 1, name: 'Scholarship 1' },
        { id: 2, name: 'Scholarship 2' },
        { id: 3, name: 'Scholarship 3' }
      ];
      pool.query.mockResolvedValueOnce([mockScholarships]);

      const result = await Scholarship.getTopThreeScholarships();

      expect(result).toEqual(mockScholarships);
      expect(result).toHaveLength(3);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('LIMIT 3')
      );
    });

    test('should handle empty results', async () => {
      pool.query.mockResolvedValueOnce([[]]);

      const result = await Scholarship.getTopThreeScholarships();

      expect(result).toEqual([]);
    });
  });
});