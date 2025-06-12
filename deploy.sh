#!/bin/bash

# Build the client application
echo "Building the application..."
npm run build

# Deploy to Firebase
echo "Deploying to Firebase Hosting..."
npx firebase deploy

echo "Deployment complete!"