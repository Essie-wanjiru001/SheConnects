const { pool } = require('../config/database');
const Internship = require('../models/internship');

// Mock the database pool
jest.mock('../config/database', () => ({
  pool: {
    query: jest.fn()
  }
}));

describe('Internship Model Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createInternship', () => {
    const mockInternshipData = {
      title: 'Software Engineer Intern',
      company: 'Tech Corp',
      description: 'Exciting internship opportunity',
      location: 'Nairobi',
      deadline: '2025-12-31',
      type: 'Full-time',
      duration: '3 months',
      isPaid: true,
      apply_link: 'https://example.com/apply'
    };

    test('should create internship successfully', async () => {
      const mockInsertId = 1;
      pool.query.mockResolvedValueOnce([{ insertId: mockInsertId }]);

      const result = await Internship.createInternship(mockInternshipData);

      expect(result).toBe(mockInsertId);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO internships'),
        expect.arrayContaining([
          mockInternshipData.title,
          mockInternshipData.company,
          mockInternshipData.description
        ])
      );
    });

    test('should throw error when creation fails', async () => {
      pool.query.mockRejectedValueOnce(new Error('Database error'));

      await expect(Internship.createInternship(mockInternshipData))
        .rejects
        .toThrow('Failed to create internship');
    });
  });

  describe('getAllInternships', () => {
    test('should return all active internships', async () => {
      const mockInternships = [
        { id: 1, title: 'Internship 1' },
        { id: 2, title: 'Internship 2' }
      ];
      pool.query.mockResolvedValueOnce([mockInternships]);

      const result = await Internship.getAllInternships();

      expect(result).toEqual(mockInternships);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('WHERE is_active = 1')
      );
    });

    test('should handle empty results', async () => {
      pool.query.mockResolvedValueOnce([[]]);
      const result = await Internship.getAllInternships();
      expect(result).toEqual([]);
    });
  });

  describe('getInternshipById', () => {
    test('should return internship when found', async () => {
      const mockInternship = {
        id: 1,
        title: 'Software Engineer Intern'
      };
      pool.query.mockResolvedValueOnce([[mockInternship]]);

      const result = await Internship.getInternshipById(1);

      expect(result).toEqual(mockInternship);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('WHERE id = ?'),
        [1]
      );
    });

    test('should return undefined when internship not found', async () => {
      pool.query.mockResolvedValueOnce([[]]);
      const result = await Internship.getInternshipById(999);
      expect(result).toBeUndefined();
    });
  });

  describe('updateInternship', () => {
    const updateData = {
      title: 'Updated Internship',
      company: 'New Company'
    };

    test('should update internship successfully', async () => {
      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const result = await Internship.updateInternship(1, updateData);

      expect(result).toBe(true);
      expect(pool.query).toHaveBeenCalledWith(
        'UPDATE internships SET ? WHERE id = ? AND is_active = 1',
        [updateData, 1]
      );
    });

    test('should return false when internship not found', async () => {
      pool.query.mockResolvedValueOnce([{ affectedRows: 0 }]);
      const result = await Internship.updateInternship(999, updateData);
      expect(result).toBe(false);
    });
  });

  describe('deleteInternship', () => {
    test('should soft delete internship successfully', async () => {
      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const result = await Internship.deleteInternship(1);

      expect(result).toBe(true);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE internships SET is_active = 0'),
        [1]
      );
    });

    test('should return false when internship not found', async () => {
      pool.query.mockResolvedValueOnce([{ affectedRows: 0 }]);
      const result = await Internship.deleteInternship(999);
      expect(result).toBe(false);
    });
  });

  describe('searchInternships', () => {
    test('should search internships with multiple parameters', async () => {
      const searchParams = {
        search: 'software',
        type: 'Full-time'
      };
      const mockResults = [
        { id: 1, title: 'Software Engineer Intern' }
      ];
      pool.query.mockResolvedValueOnce([mockResults]);

      const result = await Internship.searchInternships(searchParams);

      expect(result).toEqual(mockResults);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('WHERE is_active = 1'),
        expect.arrayContaining(['%software%'])
      );
    });

    test('should return empty array when no matches found', async () => {
      pool.query.mockResolvedValueOnce([[]]);
      const result = await Internship.searchInternships({ search: 'nonexistent' });
      expect(result).toEqual([]);
    });
  });
});