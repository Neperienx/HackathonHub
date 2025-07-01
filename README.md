# Company Spark - Hackathon Platform

A comprehensive hackathon management platform built with React and Firebase, enabling seamless project creation, authentication, and collaboration for participants.

## Features

- **Firebase Authentication** - Google sign-in and email/password registration
- **Real-time Project Management** - Create, edit, and showcase projects
- **Voting System** - Community upvoting for public projects
- **Responsive Design** - Works on all devices with modern UI
- **Configurable Content** - JSON-based content management
- **Project Showcase** - Detailed project views with proper formatting

## Tech Stack

- React with TypeScript
- TailwindCSS for styling
- Firebase for authentication and data storage
- Vite for build tooling
- Wouter for routing

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Firebase project (for authentication and database)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd company-spark
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

### GitHub Pages

The project is configured to automatically deploy to GitHub Pages when you push to the main branch.

1. **Set up repository secrets:**
   - Go to your GitHub repository settings
   - Navigate to "Secrets and variables" → "Actions"
   - Add the following secrets:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_APP_ID`

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set source to "Deploy from a branch"
   - Select branch: `gh-pages`
   - Click Save

3. **Push to main branch:**
   - The GitHub Action will automatically build and deploy your site
   - Your site will be available at: `https://yourusername.github.io/repository-name`

### Firebase Hosting

The project also supports Firebase Hosting deployment:

```bash
npm run build
npx firebase deploy
```

## Configuration

### Content Management

Edit the JSON files in `client/src/data/` to customize:
- `homeConfig.json` - Landing page content
- `rulesConfig.json` - Rules and guidelines

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication with Google and Email/Password providers
3. Set up Firestore database
4. Add your domain to authorized domains in Authentication settings

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts (Auth)
│   │   ├── data/          # Configuration files
│   │   └── lib/           # Utilities and Firebase config
├── .github/workflows/     # GitHub Actions for deployment
└── firebase.json         # Firebase hosting configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details