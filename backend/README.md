# SME Crowdfund VN Backend Documentation

## Overview
SME Crowdfund VN is a crowdfunding platform designed specifically for small and medium enterprises (SMEs) in Vietnam. This backend service is built using Node.js and Express, providing a robust API for managing user authentication, crowdfunding campaigns, and payment processing.

## Features
- **User Authentication**: Secure login and registration for users.
- **Campaign Management**: Create, retrieve, and manage crowdfunding campaigns.
- **Payment Processing**: Integration with various payment gateways for seamless transactions.
- **Notifications**: Real-time notifications for users regarding their campaigns and investments.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- PostgreSQL (or any other database supported by Prisma)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/sme-crowdfund-vn.git
   ```
2. Navigate to the backend directory:
   ```
   cd sme-crowdfund-vn/backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Configuration
- Update the database connection settings in the `prisma/schema.prisma` file.
- Set environment variables in a `.env` file for sensitive information (e.g., database URL, JWT secret).

### Running the Application
To start the backend server, run:
```
npm run start
```
For development mode with hot reloading, use:
```
npm run dev
```

### API Documentation
Refer to the `src/routes/api.ts` file for the list of available API endpoints and their usage.

## Testing
To run the tests for the backend, use:
```
npm run test
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.