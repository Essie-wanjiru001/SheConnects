# SheConnects

![SheConnects Logo](https://github.com/user-attachments/assets/5fa6e832-5210-4a99-b373-ebf0792e4a7f)

A comprehensive platform dedicated to empowering women in Kenya through educational and career opportunities. SheConnects bridges the gap between talented women and transformative opportunities in education and professional development.

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [User Guide](#user-guide)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [Contact](#contact)

## Overview

SheConnects serves as a centralized platform that:
- Connects women with educational scholarships
- Facilitates access to internship opportunities
- Enables networking through events and forums
- Provides mentorship programs
- Offers comprehensive learning resources

## Key Features

### For Users
- **Scholarship Management**
  - Browse available scholarships
  - Filter by education level and field
  - Online application submission
  - Application status tracking

- **Career Development**
  - Internship opportunities
  - Job listings
  - Resume building tools
  - Interview preparation resources

- **Learning Resources**
  - Educational guides
  - Online courses
  - Skills development workshops
  - Professional development materials

- **Networking**
  - Events calendar
  - Discussion forums
  - Mentorship connections
  - Success stories

### For Administrators
- Comprehensive dashboard
- User management system
- Content management tools
- Analytics and reporting

## Tech Stack

### Frontend
- React.js with Styled Components
- React Router for navigation
- Context API for state management
- Responsive design with mobile support
- Font Awesome icons

### Backend
- Node.js & Express.js
- MySQL database
- JWT authentication
- RESTful API architecture

### Development & Deployment
- Git version control
- npm package management
- Vercel (Frontend hosting)
- Render (Backend hosting)

## Getting Started

### Prerequisites
- Node.js >= 18.x
- MySQL >= 8.0
- Git
- npm or yarn

### Development Environment Setup

1. **Install Required Software**
```bash
# Install Node.js from
https://nodejs.org/

# Install MySQL from
https://dev.mysql.com/downloads/mysql/

# Install Git from
https://git-scm.com/downloads
```

### Installation Steps

1. **Clone Repository**
```bash
git clone https://github.com/Essie-wanjiru001/SheConnects.git
cd SheConnects
```

2. **Backend Setup**
```bash
cd Backend
npm install

copy .env.example .env
```

Configure your `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=sheconnects
JWT_SECRET=your_secret_key
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

3. **Database Setup**
```bash
net start mysql80
mysql -u root -p
CREATE DATABASE sheconnects;
mysql -u root -p sheconnects < schema.sql
```

4. **Frontend Setup**
```bash
cd ../frontend
npm install
```

### Running the Application

1. **Start Backend Server**
```bash
cd Backend
node server.js
```

2. **Start Frontend Development Server**
```bash
cd frontend
npm start
```

3. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

### Running Tests

1. **Backend Tests**
```bash
cd Backend
npm test
```


### Common Issues and Solutions

1. **MySQL Connection Issues**
```bash
# Check if MySQL is running
net start mysql80

# Reset MySQL password if needed
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```

3. **Node Module Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## Project Structure
```
SheConnects/
├── Backend/
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static assets
│   └── src/
│       ├── components/  # React components
│       ├── contexts/    # Context providers
│       ├── services/    # API services
│       ├── styles/      # Global styles
│       └── App.js       # Root component
└── README.md
```

## User Guide

### Navigation
- Home: Overview and featured opportunities
- Scholarships: Browse and apply for scholarships
- Careers: Explore internships and jobs
- Events: View upcoming networking opportunities

### Key Features Usage
1. **Scholarship Applications**
   - Create user profile
   - Browse available scholarships
   - Submit required documents
   - Track application status

2. **Career Development**
   - Update professional profile
   - Search opportunities
   - Access career resources
   - Connect with mentors


## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## Deployment

- Frontend: [SheConnects Web App](https://sheconnects-teal.vercel.app/)
- Backend API: [SheConnects API](https://sheconnects-api.onrender.com)

## Contact

- **Developer**: Esther Wanjiru
- **Email**: essiewanjiru001@gmail.com
- **GitHub**: [Essie-wanjiru001](https://github.com/Essie-wanjiru001)
- **Project Repository**: [SheConnects](https://github.com/Essie-wanjiru001/SheConnects)

---

Built with ❤️ for women's empowerment in Kenya