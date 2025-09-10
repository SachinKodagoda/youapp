# YouApp - Mobile Web Application

A modern mobile web application built with Next.js 13 that replicates a dating/social app design with user authentication, profile management, and interest selection features.

## 🎯 Project Overview

This project was developed as a technical interview assessment to demonstrate:

- Next.js 13 App Router implementation
- Modern React architecture patterns
- Tailwind CSS custom configuration
- API integration and authentication
- MongoDB database integration
- Mobile-first responsive design

## � Live Demo

**🚀 [View Live Application](https://youapp-nine.vercel.app/login)**

The application is deployed on Vercel and fully functional. You can create an account or explore the features directly.

## �🎨 Design Reference

The application is based on the Figma design: [YouApp Test Design](https://www.figma.com/file/VnqmoYfwdTzN8qvvDZn6GC/YouApp-Test?node-id=0%3A1&=p7hNpbhefNuFtLs7-0)

## 🚀 Features

### Authentication

- User registration with email/username
- Secure login system
- JWT-based authentication
- Password encryption with bcrypt
- Session management

### Profile Management

- Complete user profile setup
- Personal information (name, birthday, gender)
- Physical measurements (height, weight)
- Profile image upload via EdgeStore
- Automatic horoscope and zodiac calculation
- Editable profile cards

### Interest System

- Multi-select interest categories
- Visual interest tags
- Custom interest addition
- Profile interest display

### Technical Features

- Server-side authentication middleware
- Form validation with Zod schemas
- Responsive mobile-first design
- Loading states and error handling
- Toast notifications
- Debounced username availability checking

## 🛠 Tech Stack

### Frontend

- **Next.js 13** - App Router for modern React development
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management with validation
- **Zod** - Schema validation
- **Lucide React** - Icon library
- **React Hot Toast** - Notification system

### Backend

- **Next.js API Routes** - Server-side API endpoints
- **MongoDB** - NoSQL database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### Additional Tools

- **EdgeStore** - File upload and storage
- **date-fns** - Date manipulation
- **clsx** - Conditional CSS classes
- **ESLint & Prettier** - Code formatting and linting

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/           # Authentication pages (grouped routing)
│   │   ├── login/
│   │   └── register/
│   ├── api/              # API routes
│   │   ├── login/
│   │   ├── register/
│   │   ├── get-profile/
│   │   ├── update-profile/
│   │   └── check-availability/
│   ├── interest/         # Interest selection page
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
│   ├── about-form/       # Profile form components
│   ├── elements/         # Basic UI elements
│   └── [various cards and forms]
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── services/             # API service layer
├── types/                # TypeScript type definitions
├── utils/                # Helper functions
└── constants/            # App constants
```

## 🏗 Architecture Patterns

### React Architecture

- **Custom Hooks**: Business logic separated into reusable hooks
- **Component Composition**: Modular, reusable components
- **Server Components**: Next.js 13 server components for performance
- **Grouped Routing**: Organized routes with Next.js 13 app directory

### Design Patterns

- **Service Layer**: Centralized API communication
- **Schema-First**: Zod schemas for validation and type safety
- **Middleware Pattern**: Authentication middleware for protected routes
- **Provider Pattern**: Context providers for global state

### Code Organization

- **Feature-based Structure**: Components grouped by functionality
- **Type Safety**: Comprehensive TypeScript implementation
- **Separation of Concerns**: Clear separation between UI, logic, and data

## 🔧 API Integration

The application integrates with the YouApp API endpoints:

### Authentication Endpoints

- `POST /api/login` - User authentication
- `POST /api/register` - User registration

### Profile Endpoints

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Additional Features

- Username availability checking
- Zodiac/Horoscope calculation based on birthday
- File upload for profile images

**Note**: The application includes fallback mock API implementations in case the external API is unavailable.

## 🎨 Tailwind CSS Configuration

Custom Tailwind configuration includes:

- Extended font sizes for precise design matching
- Custom gradient backgrounds
- Mobile-first responsive utilities
- Component-specific styling patterns

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd youapp
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Required environment variables:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `EDGE_STORE_ACCESS_KEY` - EdgeStore access key
- `EDGE_STORE_SECRET_KEY` - EdgeStore secret key

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication Flow

1. User registers with email, username, and password
2. Password is hashed using bcrypt
3. JWT token is generated upon successful login
4. Token is stored in HTTP-only cookies
5. Middleware validates token for protected routes
6. User session is maintained across page refreshes

## 📱 Mobile-First Design

The application is designed with mobile-first principles:

- Responsive layouts for all screen sizes
- Touch-friendly interactive elements
- Optimized performance for mobile devices
- Progressive enhancement for larger screens

## 🧪 Validation & Error Handling

- **Zod Schemas**: Runtime type checking and validation
- **Form Validation**: Real-time validation with React Hook Form
- **Error Boundaries**: Graceful error handling
- **Toast Notifications**: User-friendly error and success messages

## 🔮 Horoscope & Zodiac Calculation

Automatic calculation based on user's birthday using the provided spreadsheet reference:

- Horoscope signs based on birth date ranges
- Zodiac animals based on birth year
- Dynamic display in user profile

## 📸 Image Upload

Profile image upload functionality using EdgeStore:

- Drag and drop interface
- Image preview before upload
- Automatic image optimization
- Secure cloud storage

## 🎯 Key Implementation Highlights

1. **Next.js 13 App Router**: Modern routing with server components
2. **Type Safety**: End-to-end TypeScript implementation
3. **Custom Hooks**: Reusable business logic separation
4. **Responsive Design**: Mobile-first Tailwind CSS implementation
5. **Form Handling**: Robust form validation and submission
6. **Authentication**: Secure JWT-based auth system
7. **Database Integration**: MongoDB with proper schema design
8. **Error Handling**: Comprehensive error states and user feedback

## 🔄 Future Enhancements

- Real-time messaging functionality
- Advanced matching algorithms
- Push notifications
- Social media integration
- Advanced photo galleries
- Location-based features

## 📝 Development Notes

This project demonstrates modern web development practices including:

- Clean architecture principles
- Performance optimization
- Security best practices
- Accessibility considerations
- SEO optimization with Next.js
- Progressive Web App capabilities

---

**Created for**: YouApp Technical Interview Assessment
**Development Time**: 7 days
**Author**: Duminda Kodagoda
