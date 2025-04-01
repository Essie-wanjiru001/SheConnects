const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = req.path.includes('feedback') ? 'uploads/feedback' : 'uploads/profiles';
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const prefix = req.path.includes('feedback') ? 'feedback-' : 'profile-';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${prefix}${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  let allowedTypes;
  
  if (req.path.includes('feedback')) {
    allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
  } else {
    allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  }

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const errorMessage = req.path.includes('feedback')
      ? 'Invalid file type. Only JPEG, PNG, JPG, PDF, DOC and DOCX are allowed.'
      : 'Invalid file type. Only JPEG, PNG and JPG are allowed.';
    cb(new Error(errorMessage));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit for all uploads
  },
  fileFilter: fileFilter
});

module.exports = upload;