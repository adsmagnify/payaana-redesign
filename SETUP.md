# Payaana Website Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity CMS

1. Create a Sanity account at https://www.sanity.io
2. Create a new project in Sanity
3. Copy your Project ID and Dataset name
4. Create `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=q2w6jxdi
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Deploy Sanity Schema

1. Install Sanity CLI globally:

```bash
npm install -g @sanity/cli
```

2. Login to Sanity:

```bash
sanity login
```

3. Initialize Sanity (if not already done):

```bash
sanity init
```

4. The schemas are already configured in `sanity/schemas/`:

   - `package.ts` - For travel packages
   - `destination.ts` - For destinations

5. Deploy schemas to Sanity:

```bash
sanity deploy
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Sanity Studio

Access Sanity Studio at `/studio` route after setting up:

- http://localhost:3000/studio (in development)
- https://your-domain.com/studio (in production)

## Content Management

### Adding Packages

1. Go to Sanity Studio
2. Click "Package" in the sidebar
3. Click "Create new"
4. Fill in:
   - Title
   - Slug (auto-generated from title)
   - Main Image
   - Description
   - Price
   - Duration (e.g., "5 Days / 4 Nights")
   - Destination (select from existing destinations)
   - Highlights (array of strings)
   - Itinerary (array of day objects with title and description)

### Adding Destinations

1. Go to Sanity Studio
2. Click "Destination" in the sidebar
3. Click "Create new"
4. Fill in:
   - Name
   - Slug (auto-generated from name)
   - Main Image
   - Description
   - Location

## Features

- ✅ Responsive design (mobile-first)
- ✅ Package search and filtering
- ✅ Image gallery with lightbox
- ✅ Contact and inquiry forms
- ✅ Sanity CMS integration
- ✅ ISR (Incremental Static Regeneration)
- ✅ Loading states
- ✅ SEO-friendly structure

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy

### Other Platforms

The site can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette. The Payaana pink color is defined as `payaana-pink` in the theme.

### Content

All dynamic content is managed through Sanity CMS. Static content can be edited in:

- `app/about/page.tsx` - About page
- `components/sections/Testimonials.tsx` - Testimonials
- `components/layout/Footer.tsx` - Footer content

## Troubleshooting

### Sanity Connection Issues

- Verify your Project ID and Dataset in `.env.local`
- Check that your Sanity project is set to public or has proper CORS settings
- Ensure you've deployed the schemas to Sanity

### Build Errors

- Run `npm install` to ensure all dependencies are installed
- Check that all environment variables are set
- Verify TypeScript types are correct

## Next Steps

1. Add your content to Sanity CMS
2. Upload images to Sanity
3. Customize colors and styling as needed
4. Set up form submission endpoints (currently forms are placeholder)
5. Add analytics (Google Analytics, etc.)
6. Set up SEO meta tags
7. Configure domain and deploy
