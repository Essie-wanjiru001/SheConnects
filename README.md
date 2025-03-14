# SheConnects

A platform for empowering women through education and career opportunities.

## Description

SheConnects is a web application that connects women with educational and professional opportunities including scholarships, internships, and networking events. The platform aims to bridge the gender gap in education and careers by providing easy access to valuable resources and opportunities.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18.x or higher)
- MySQL (version 8.0 or higher)
- Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Essie-wanjiru001/SheConnects.git
cd SheConnects
```

### 2. Set Up Backend

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file and configure environment variables
cp .env.example .env

# Update .env with your database credentials
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=sheconnects
JWT_SECRET=your_secret_key
```

### 3. Set Up Database

```bash
# Create database
mysql -u root -p
CREATE DATABASE sheconnects;
USE sheconnects;

# Import database schema
mysql -u root -p sheconnects < database/schema.sql
```

### 4. Set Up Frontend

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file for frontend
cp .env.example .env

# Update REACT_APP_API_URL in .env
REACT_APP_API_URL=http://localhost:8000
```

## Running the Application

### Start Backend Server

```bash
# In Backend directory
npm start
```

The backend server will start on http://localhost:8000

### Start Frontend Development Server

```bash
# In frontend directory
npm start
```

The frontend application will start on http://localhost:3000

## Admin Access

To access the admin dashboard:
1. Navigate to `/admin/login`
2. Login with admin credentials:
   - Email: admin@sheconnects.com
   - Password: SheconnectsAdmin@123

## Admin Setup (Internal Use Only)

To create or update an admin user, use the admin management scripts (not included in repository for security):

1. Create `.env.production` with required credentials
2. Run the appropriate script:
   ```bash
   # For local development
   node scripts/createAdmin.js <email> <password> <name>
   
   # For production
   node scripts/updateProdAdmin.js
   ```

Note: Admin management scripts are kept private and not included in the repository.

## Project Structure

```
SheConnects/
├── Backend/             # Backend server code
│   ├── config/         # Database and other configurations
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── routes/        # API routes
│   └── server.js      # Server entry point
├── frontend/           # Frontend React application
│   ├── public/        # Static files
│   ├── src/           # Source files
│   │   ├── components/# React components
│   │   ├── services/  # API services
│   │   ├── styles/    # Global styles
│   │   └── App.js     # Main component
│   └── package.json   # Frontend dependencies
└── README.md          # Project documentation
```

## API Documentation

The API endpoints are available at:
- Scholarships: `/api/scholarships`
- Internships: `/api/internships`
- Events: `/api/events`
- Users: `/api/users`

## Deployment

The application is deployed at:
- Frontend: https://sheconnects-esther-wanjirus-projects.vercel.app/
- Backend: https://sheconnects-api.onrender.com

## Technologies Used

- Frontend: React, Styled-Components
- Backend: Node.js, Express
- Database: MySQL
- Authentication: JWT
- Deployment: Vercel (frontend), Render (backend)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Contact

Esther Wanjiru - essiewanjiru001@gmail.com
Project Link: https://github.com/Essie-wanjiru001/SheConnects