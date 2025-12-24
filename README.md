# Payaana Website Redesign

A modern, responsive travel website built with Next.js 14, TypeScript, Tailwind CSS, and Sanity CMS.

## Features

- 🎨 Modern UI/UX design with Payaana brand colors
- 📱 Fully responsive design
- 🎯 Package and destination management via Sanity CMS
- 🔍 Search and filter functionality for packages
- 📸 Image gallery with lightbox
- 📝 Contact and package inquiry forms
- ⚡ Optimized performance with Next.js Image component

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity CMS
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Sanity account and project

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Sanity project ID and dataset:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Sanity CMS Setup

1. Install Sanity CLI globally:
   ```bash
   npm install -g @sanity/cli
   ```

2. Login to Sanity:
   ```bash
   sanity login
   ```

3. Initialize Sanity in the project:
   ```bash
   sanity init
   ```

4. Access Sanity Studio at `/studio` route (after setting up)

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   ├── sections/          # Page sections
│   └── forms/             # Form components
├── lib/                    # Utility functions
│   └── sanity/            # Sanity client and queries
├── sanity/                 # Sanity CMS configuration
│   └── schemas/           # Content schemas
└── public/                 # Static assets
```

## Content Management

The website uses Sanity CMS for managing:
- **Packages**: Travel packages with details, pricing, itinerary
- **Destinations**: Destination information and images

Access the Sanity Studio to manage content after setup.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy

The site will be live automatically!

## License

Copyright © 2024 Payaana. All rights reserved.

