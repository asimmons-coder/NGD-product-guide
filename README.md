# Novice Group Product Guide

A patient-facing skincare product recommendation guide for Novice Group Dermatology.

## Features

- **Evidence-based ratings**: Gold Standard, Recommended, Use With Caution, Insufficient Evidence, Not Recommended
- **Trending products section**: Highlights what patients are currently asking about
- **Search & filter**: By product name, skin concern, category, or rating
- **Shareable links**: Direct links to individual products (e.g., `/guide#pdrn-salmon-dna`)
- **Product request form**: Let patients ask about products not yet reviewed
- **Mobile-responsive**: Works great on phones and tablets
- **Brand-matched design**: Matches Novice Group's warm, sophisticated aesthetic

## Quick Start

```bash
# Install dependencies
npm install

# Run locally
npm start

# Build for production
npm run build
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Connect to Vercel
3. Deploy (auto-detects Create React App)

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Adding/Editing Products

Products are defined in `src/App.jsx` in the `products` array. Each product has:

```javascript
{
  id: 'unique-slug',           // Used for URLs
  name: 'Product Name',
  category: 'Serum',           // Moisturizer, Serum, Sunscreen, Retinoid, Exfoliant, Device
  rating: 'recommended',       // gold, recommended, caution, insufficient, not-recommended
  ratingLabel: 'Recommended',
  evidence: 'Strong',          // Extensive, Strong, Moderate, Limited, None
  concerns: ['Acne', 'Anti-Aging'],  // Skin concerns this addresses
  trending: false,             // Show in Trending section?
  overview: 'What the product is...',
  verdict: 'Our professional opinion...',
  lastReviewed: '2025-01-28'   // YYYY-MM-DD format
}
```

## Customization

### Colors
Edit CSS variables in `src/App.css`:
- `--color-bg`: Page background
- `--color-accent`: Primary brand color
- Rating colors: `--color-gold`, `--color-green`, etc.

### Fonts
Currently using Playfair Display (headings) + Source Sans 3 (body).
Change in `public/index.html` Google Fonts link and `src/App.css` variables.

## Future Enhancements

- [ ] Connect form submissions to email/Airtable
- [ ] Admin panel for adding products without code
- [ ] Patient accounts to save favorites
- [ ] Integration with appointment booking
