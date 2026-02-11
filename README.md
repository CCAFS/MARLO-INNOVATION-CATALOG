# AICCRA Innovation Catalog

A comprehensive web application for cataloging and exploring agricultural innovations developed by The Alliance of Bioversity International and CIAT. This platform enables users to browse, search, filter, and interact with innovation data through an intuitive interface.

## Project Overview

### Purpose

The AICCRA Innovation Catalog serves as a centralized platform for discovering and exploring agricultural innovations. It provides stakeholders with tools to:

- Browse and search innovations with advanced filtering capabilities
- Visualize innovation distribution across African countries
- Explore innovation readiness scales and types
- View detailed innovation information including PDF reports
- Submit comments and reports on innovations
- Subscribe to newsletters for updates

### High-Level Description

This is a full-stack application consisting of:

- **Frontend**: A modern, static-first web application built with Astro and Vue.js
- **Backend**: A RESTful API built with NestJS that provides data access and business logic
- **Database**: PostgreSQL database managed through TypeORM

The application follows a microservices-ready architecture with clear separation between frontend and backend, enabling independent deployment and scaling.

## Architecture Overview

### Main Components

#### Frontend (`client/`)
- **Framework**: Astro 5.x with Vue 3 integration
- **UI Library**: PrimeVue 4.x with custom Aura theme
- **Styling**: TailwindCSS 4.x
- **Build Output**: Static site generation (SSG) with prerendering
- **Deployment**: Nginx container serving static files

#### Backend (`server/`)
- **Framework**: NestJS 11.x
- **Database ORM**: TypeORM 0.3.x
- **Database**: PostgreSQL (via `pg` driver)
- **API Documentation**: Swagger/OpenAPI
- **Deployment**: Supports both traditional Node.js servers and AWS Lambda

#### Infrastructure
- **Containerization**: Docker with multi-stage builds
- **Frontend Server**: Nginx Alpine
- **Backend Runtime**: Node.js 20 Alpine
- **Cloud Support**: AWS Lambda (serverless) and EC2 (traditional)

### High-Level Flow

```
User Request
    ↓
Frontend (Astro/Vue) - Static Site
    ↓
API Calls (REST)
    ↓
Backend (NestJS)
    ↓
TypeORM
    ↓
PostgreSQL Database
```

**Key Features:**
- Frontend is statically generated at build time for optimal performance
- Backend provides RESTful API endpoints for dynamic data
- API requests are made from Vue components using composables
- Cloudflare Turnstile integration for bot protection
- PDF generation and URL management for innovation reports

## Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | ^5.13.7 | Static site generator and framework |
| Vue | ^3.5.21 | Reactive UI components |
| PrimeVue | ^4.3.9 | Component library |
| TailwindCSS | ^4.1.13 | Utility-first CSS framework |
| PrimeIcons | ^7.0.0 | Icon library |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| NestJS | ^11.0.1 | Node.js framework |
| TypeORM | ^0.3.26 | Object-Relational Mapping |
| PostgreSQL | ^8.16.3 | Relational database |
| Swagger | ^11.0.2 | API documentation |
| Serverless Express | ^4.10.2 | AWS Lambda adapter |

### Infrastructure & Tools

- **Docker**: Containerization for both frontend and backend
- **Nginx**: Web server for static frontend assets
- **Node.js**: Runtime environment (v20)
- **TypeScript**: Type-safe development
- **Jest**: Testing framework
- **ESLint**: Code linting
- **Prettier**: Code formatting

### CI/CD

The project includes GitHub Actions workflows for continuous integration:
- Jenkins trigger workflows for automated builds
- Scheduled builds for regular deployments

## Project Structure

```
MARLO-INNOVATION-CATALOG/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/        # Reusable Astro/Vue components
│   │   ├── composables/       # Vue composables for API calls
│   │   │   ├── cloudflare-api/ # Cloudflare Turnstile integration
│   │   │   └── database-api/   # Backend API client
│   │   ├── content/            # Content configuration (vars, texts)
│   │   ├── entrypoints/        # Application entry points
│   │   ├── images/             # Image assets
│   │   ├── interfaces/         # TypeScript type definitions
│   │   ├── jsons/              # Static JSON data
│   │   ├── layouts/            # Page layouts
│   │   ├── pages/              # Route pages (Astro/Vue)
│   │   │   ├── index/          # Home page components
│   │   │   └── innovation/    # Innovation detail pages
│   │   ├── providers/          # Vue providers (PrimeVue setup)
│   │   ├── styles/             # Global styles
│   │   └── utils/              # Utility functions
│   ├── public/                 # Static public assets
│   ├── dist/                   # Build output (generated)
│   ├── astro.config.mjs        # Astro configuration
│   ├── Dockerfile              # Frontend container definition
│   └── package.json            # Frontend dependencies
│
├── server/                     # Backend application
│   ├── src/
│   │   ├── api/                # API routes and controllers
│   │   ├── common/             # Shared utilities
│   │   │   ├── filters/        # Exception filters
│   │   │   ├── logger/         # Logging service
│   │   │   └── middleware/      # Request middleware
│   │   ├── app.module.ts       # Root application module
│   │   ├── main.ts             # Application entry point (EC2)
│   │   ├── main-lambda-bootstrap.ts # Lambda bootstrap
│   │   └── main.routes.ts      # Route configuration
│   ├── test/                   # E2E tests
│   ├── dist/                   # Compiled output (generated)
│   ├── main-lambda.js          # Lambda handler entry point
│   ├── Dockerfile              # Backend container definition
│   └── package.json            # Backend dependencies
│
├── LICENSE                     # GNU GPL v3 License
└── README.md                   # This file
```

### Key Modules Explained

#### Frontend Modules

- **`composables/database-api/`**: Centralized API client for backend communication
  - `useApi.ts`: Main API functions (innovations, comments, reports, etc.)
  - `useApiRequest.ts`: HTTP request wrapper with retry logic

- **`composables/cloudflare-api/`**: Cloudflare Turnstile integration for bot protection

- **`pages/index/`**: Home page with innovation catalog
  - `Home.vue`: Main catalog view with filters and cards
  - `InnovationFilters.vue`: Filter sidebar component
  - `InnovationCards.vue`: Innovation card grid with pagination
  - `MapFilter.vue`: Interactive Africa map visualization
  - `ReadinessExplorer.vue`: Readiness scale visualization

- **`pages/innovation/`**: Innovation detail pages
  - `[id].astro`: Dynamic route for individual innovations
  - `CommentCards.vue`: User comments display

#### Backend Modules

- **`api/`**: API endpoints and controllers
- **`common/filters/`**: Global exception handling
- **`common/logger/`**: Structured JSON logging
- **`common/middleware/`**: Request logging middleware

## Environment Variables

### Frontend (`client/`)

Create a `.env` or `.env.local` file in the `client/` directory:

```bash
# Backend API base URL
PUBLIC_API=https://api.example.com

# Cloudflare Turnstile (bot protection)
PUBLIC_TURNSTILE_SITE_KEY=your_site_key
PUBLIC_TURNSTILE_SECRET_KEY=your_secret_key
```

**Note**: In Astro, environment variables prefixed with `PUBLIC_` are exposed to the client-side code.

### Backend (`server/`)

Create a `.env` or `.env.local` file in the `server/` directory:

#### Database Configuration

**Option 1: Connection String**
```bash
DATABASE_URL=postgres://user:password@host:5432/database_name
```

**Option 2: Individual Variables**
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=innovation_catalog
```

#### Optional Database Settings
```bash
# Auto-sync schema in development (use with caution)
DB_SYNCHRONIZE=false

# Enable SQL query logging
DB_LOGGING=false

# Enable SSL connections
DB_SSL=false
DB_SSL_REJECT_UNAUTHORIZED=false
```

#### Server Configuration
```bash
# Server port (default: 3000)
PORT=3000
```

## Local Development Setup

### Prerequisites

- **Node.js**: v20 or higher
- **npm**: v9 or higher (or compatible package manager)
- **PostgreSQL**: v12 or higher (for backend)
- **Docker** (optional): For containerized development

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd MARLO-INNOVATION-CATALOG
```

#### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

#### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

#### 4. Set Up Environment Variables

**Frontend:**
```bash
cd ../client
cp .env.example .env.local  # If example exists, or create manually
# Edit .env.local with your configuration
```

**Backend:**
```bash
cd ../server
cp .env.example .env.local  # If example exists, or create manually
# Edit .env.local with your database configuration
```

#### 5. Set Up Database

Ensure PostgreSQL is running and create a database:

```sql
CREATE DATABASE innovation_catalog;
```

Update your `.env.local` file in the `server/` directory with the correct database credentials.

### Running Locally

#### Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:4321` (Astro default port).

**Available Commands:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

#### Backend Development Server

```bash
cd server
npm run start:dev
```

The backend API will be available at `http://localhost:3000` (or the port specified in `PORT` env variable).

**Available Commands:**
- `npm run start` - Start production server
- `npm run start:dev` - Start development server with watch mode
- `npm run start:debug` - Start with debugger attached
- `npm run start:prod` - Start compiled production build
- `npm run build` - Compile TypeScript to JavaScript

#### API Documentation

Once the backend is running, access Swagger documentation at:
```
http://localhost:3000/api/docs
```

### Building for Production

#### Frontend Build

```bash
cd client
npm run build
```

The static site will be generated in `client/dist/` directory.

#### Backend Build

```bash
cd server
npm run build
```

The compiled JavaScript will be in `server/dist/` directory.

## Deployment Overview

### Docker Deployment

#### Frontend Container

The frontend uses a multi-stage Docker build:

1. **Build Stage**: Compiles the Astro application
2. **Test Stage**: Runs static analysis (optional)
3. **Production Stage**: Serves static files via Nginx

**Build Command:**
```bash
cd client
docker build -t innovation-catalog-frontend .
```

**Run Command:**
```bash
docker run -p 80:80 innovation-catalog-frontend
```

#### Backend Container

The backend Dockerfile supports two deployment targets:

**For AWS Lambda:**
```bash
cd server
docker build --target=lambda -t innovation-catalog-lambda .
```

**For EC2/Traditional Server:**
```bash
cd server
docker build --target=ec2 -t innovation-catalog-backend .
docker run -p 3000:3000 innovation-catalog-backend
```

### AWS Lambda Deployment

The backend is configured for AWS Lambda using `@vendia/serverless-express`:

1. Build the application: `npm run build`
2. Package with `main-lambda.js` as the handler
3. Deploy to AWS Lambda with the Lambda runtime interface
4. Configure API Gateway to route requests to the Lambda function

The Lambda handler is located at `server/main-lambda.js` and uses the bootstrap function from `main-lambda-bootstrap.ts`.

### Static Site Deployment

The frontend generates a static site that can be deployed to:

- **AWS S3 + CloudFront**: Static website hosting
- **Netlify**: Automatic deployments from Git
- **Vercel**: Zero-config deployments
- **GitHub Pages**: Free static hosting
- **Any static hosting service**: Upload the `dist/` folder

### CI/CD Pipeline

The project includes GitHub Actions workflows that trigger Jenkins builds:

- **Scheduled Builds**: Regular automated builds
- **Manual Triggers**: On-demand builds via workflow dispatch

Configure your Jenkins instance to receive webhook triggers from GitHub Actions.

## Testing

### Backend Testing

#### Unit Tests

```bash
cd server
npm run test
```

#### Watch Mode

```bash
npm run test:watch
```

#### Coverage Report

```bash
npm run test:cov
```

**Coverage Thresholds:**
- Branches: 70%
- Functions: 70%
- Lines: 50%
- Statements: 50%

#### End-to-End Tests

```bash
npm run test:e2e
```

### Frontend Testing

Currently, the frontend does not include automated tests. Consider adding:

- **Vitest**: For unit testing Vue components
- **Playwright**: For E2E testing
- **Astro Check**: Already configured via `npm run astro -- check`

## Security & Best Practices

### Security Considerations

1. **Environment Variables**: Never commit `.env` files. They are already in `.gitignore`
2. **API Keys**: Store sensitive keys in environment variables, not in code
3. **Cloudflare Turnstile**: Bot protection is implemented for form submissions
4. **HTTPS**: Always use HTTPS in production
5. **Database Credentials**: Use secure connection strings and avoid hardcoding passwords

### Code Quality

#### Linting

**Backend:**
```bash
cd server
npm run lint
```

The project uses ESLint with strict rules for TypeScript.

#### Formatting

**Backend:**
```bash
cd server
npm run format
```

Prettier is configured for consistent code formatting.

### Logging

The backend implements structured JSON logging via `AppLoggerService`:

- All requests are logged with middleware
- Errors are captured by global exception filter
- Logs include timestamps, levels, and context

### Database Best Practices

1. **Schema Management**: Use migrations instead of `DB_SYNCHRONIZE` in production
2. **Connection Pooling**: TypeORM handles connection pooling automatically
3. **SSL**: Enable SSL for production database connections
4. **Backups**: Implement regular database backups

### Performance Optimization

1. **Static Generation**: Frontend is pre-rendered for optimal load times
2. **Image Optimization**: Use Astro's built-in image optimization
3. **API Caching**: Consider implementing caching strategies for frequently accessed data
4. **Database Indexing**: Ensure proper indexes on frequently queried columns

## Additional Resources

### Documentation

- [Astro Documentation](https://docs.astro.build)
- [NestJS Documentation](https://docs.nestjs.com)
- [Vue 3 Documentation](https://vuejs.org)
- [PrimeVue Documentation](https://primevue.org)
- [TypeORM Documentation](https://typeorm.io)

### Support

For technical support, contact: **MARLOSupport@cgiar.org**

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

**Copyright (C) 2025 The Alliance of Bioversity International and CIAT**

---

## Contributing

When contributing to this project:

1. Follow the existing code style and formatting
2. Write tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting

## Project Status

This is an active project maintained by The Alliance of Bioversity International and CIAT. For questions, issues, or contributions, please contact the development team.
