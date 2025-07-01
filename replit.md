# Company Spark - Hackathon Platform

## Overview

Company Spark is a comprehensive hackathon management platform built to ignite innovation within organizations. The application enables seamless project creation, authentication, and collaboration for participants through a modern React-based frontend with Firebase integration for real-time data management and authentication.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: TailwindCSS with Radix UI components for consistent, accessible design system
- **State Management**: React Context API for authentication state, local storage for data persistence
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Express Server**: Node.js/Express backend setup for API routes (currently minimal implementation)
- **Database**: Dual approach with Firebase Firestore for production and Drizzle ORM with PostgreSQL capability
- **Authentication**: Firebase Authentication with Google OAuth and email/password options
- **Real-time Features**: Firestore real-time listeners for live project updates

### Data Storage Solutions
- **Primary Database**: Firebase Firestore for user projects, upvotes, and real-time collaboration
- **Fallback Database**: PostgreSQL with Drizzle ORM (configured but not actively used)
- **Local Storage**: Browser localStorage for offline functionality and data persistence
- **File Storage**: Base64 image encoding for project images (stored in Firestore documents)

## Key Components

### Authentication System
- **Firebase Auth**: Primary authentication provider with Google OAuth integration
- **Local Auth Fallback**: Custom authentication service using localStorage when Firebase is unavailable
- **User Management**: Secure user sessions with proper logout functionality

### Project Management
- **CRUD Operations**: Full create, read, update, delete functionality for projects
- **Visibility Controls**: Private/public project status management
- **Real-time Updates**: Live synchronization of project changes across users
- **Image Upload**: Compressed image handling with automatic resizing

### Voting System
- **Community Upvoting**: Users can upvote public projects
- **Vote Tracking**: Prevents duplicate votes per user per project
- **Real-time Counters**: Live vote count updates

### Content Management
- **JSON Configuration**: Externalized content configuration for easy customization
- **Responsive Design**: Mobile-first approach with proper viewport handling
- **Accessibility**: ARIA-compliant components using Radix UI primitives

## Data Flow

1. **User Authentication**: Firebase Auth → Context Provider → Component State
2. **Project Operations**: React Components → Firebase SDK → Firestore → Real-time Listeners
3. **Local Fallback**: Components → Local Storage → State Updates
4. **Image Processing**: File Upload → Compression → Base64 Encoding → Firestore Storage

## External Dependencies

### Core Dependencies
- **Firebase**: Authentication, Firestore database, real-time synchronization
- **Radix UI**: Accessible component primitives
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for type-safe data handling
- **TanStack Query**: Server state management and caching

### Development Tools
- **Drizzle**: Database ORM and migrations (PostgreSQL support)
- **ESBuild**: Fast JavaScript bundling
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first styling

## Deployment Strategy

### Firebase Hosting
- **Static Site**: Pre-configured for Firebase hosting with proper rewrites
- **CDN Distribution**: Global content delivery through Firebase hosting
- **Cache Headers**: Optimized caching for static assets

### Environment Configuration
- **Firebase Config**: Environment variables for API keys and project settings
- **Database URLs**: Configurable database connections for different environments
- **Feature Flags**: Environment-based feature enabling/disabling

### Security Considerations
- **Firestore Rules**: Proper security rules for user data isolation
- **Authentication Flow**: Secure token-based authentication
- **Input Validation**: Client and server-side validation using Zod schemas

## Changelog
- July 01, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.