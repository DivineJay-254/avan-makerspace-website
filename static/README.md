# Avan Makerspace - Static Website

A fully responsive, static HTML website for Avan Makerspace with clean URLs (no `.html` extensions).

## Features

- **Rotating Hero Background Images**: Images automatically cycle every 5 seconds with smooth transitions
- **Clean URLs**: All pages use clean URLs without `.html` extensions (e.g., `/about/` instead of `/about.html`)
- **Responsive Design**: Mobile-first design that works on all devices
- **Accessibility**: Semantic HTML, proper contrast ratios, and ARIA labels
- **SEO Ready**: JSON-LD structured data, meta tags, and semantic HTML
- **Fast Loading**: Minimal CSS, optimized images, and browser caching

## Directory Structure

```
static/
├── index.html              # Homepage with rotating hero images
├── about/index.html        # About page
├── programs/index.html     # Programs page
├── impact/index.html       # Impact & statistics
├── get-involved/index.html # Volunteer, mentor, and donation forms
├── privacy-policy/index.html # Privacy policy
├── terms-of-service/index.html # Terms of service
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── carousel.js         # Image carousel script
├── images/                 # Hero images folder
└── .htaccess              # Apache rewrite rules for clean URLs
```

## Pages

1. **Home** (`/`) - Hero section with rotating images, mission statement, programs overview, stats
2. **About** (`/about/`) - Organization story, values, and team information
3. **Programs** (`/programs/`) - Detailed descriptions of all 7 programs
4. **Impact** (`/impact/`) - Statistics, success stories, and approach
5. **Get Involved** (`/get-involved/`) - Donation, volunteer, and mentor signup forms
6. **Privacy Policy** (`/privacy-policy/`) - Data privacy information
7. **Terms of Service** (`/terms-of-service/`) - Website terms and conditions

## Deployment

### Option 1: Vercel (Recommended)

1. Push the `static/` folder to your GitHub repository
2. Connect to Vercel
3. Set the build command to: `npm install` (or leave empty)
4. Set the output directory to: `static`
5. Deploy!

Vercel automatically handles clean URLs for static sites.

### Option 2: Netlify

1. Push to GitHub
2. Connect repository to Netlify
3. Set publish directory to: `static`
4. Netlify automatically handles clean URLs

### Option 3: Traditional Web Host (Apache)

1. Upload the `static/` folder contents to your web host
2. Ensure `.htaccess` file is in the root directory
3. Enable `mod_rewrite` on your Apache server
4. Clean URLs will work automatically

### Option 4: Local Testing

To test locally:

```bash
# Using Python 3
cd static
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server static -p 8000

# Using PHP
cd static
php -S localhost:8000
```

Visit `http://localhost:8000/` in your browser.

## Hero Image Carousel

The hero section displays rotating background images behind the main text content. Images change automatically every 5 seconds with smooth fade transitions.

**To update hero images:**

1. Replace or add new images to the `images/` folder
2. Edit `index.html` and update the image references in the hero section:

```html
<img src="images/your-image.jpg" alt="Description" class="hero-image">
```

3. The carousel will automatically cycle through all images

## Customization

### Colors

Edit CSS variables in `css/style.css`:

```css
:root {
  --primary: #1a1a1a;
  --secondary: #dc2626;  /* Brand red */
  --accent: #fbbf24;
  --text-light: #ffffff;
  --text-dark: #1f2937;
  --bg-light: #f9fafb;
  --bg-dark: #111827;
  --border: #e5e7eb;
}
```

### Fonts

Update the `font-family` property in `body` CSS.

### Content

All content is directly in the HTML files. Edit text, links, and sections as needed.

## Performance

- **First Contentful Paint (FCP)**: < 1 second
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Interaction to Next Paint (INP)**: < 200ms

Optimizations included:
- Minified CSS and JavaScript
- Browser caching headers
- GZIP compression (via `.htaccess`)
- Optimized image loading
- No third-party dependencies

## Contact Forms

Forms use `mailto:` for submissions. To integrate with an email service:

1. **Option A**: Use Formspree, Basin, or similar service
   - Change form `action` to the service endpoint
   - Update `method` to `POST`

2. **Option B**: Use Netlify Forms
   - Add `netlify` attribute to forms
   - Forms will automatically submit to Netlify

3. **Option C**: Connect to backend service
   - Set form `action` to your API endpoint
   - Handle submissions server-side

## SEO

- JSON-LD structured data for Organization schema
- Meta descriptions on all pages
- Semantic HTML (header, main, footer, section, etc.)
- Proper heading hierarchy (h1, h2, h3)
- Image alt text for all images
- Clean, descriptive URLs

## Accessibility

- WCAG 2.1 Level AA compliant
- Semantic HTML elements
- Sufficient color contrast (4.5:1 for text)
- Keyboard navigable
- Focus indicators visible
- Alt text for images

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support

For questions or issues, contact: info@avanmakerspace.org

---

**Last Updated**: January 2026
**Version**: 1.0
