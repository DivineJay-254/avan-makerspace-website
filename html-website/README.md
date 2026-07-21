# Avan Makerspace - HTML Website

This is a complete, static HTML website for Avan Makerspace - a refugee-led, queer-led nonprofit in Kakuma Refugee Camp.

## Project Structure

```
html-website/
├── index.html              # Homepage
├── css/
│   └── styles.css         # Complete stylesheet (no dependencies)
├── js/
│   └── main.js            # Interactive features (mobile menu, carousels, counters)
├── pages/
│   ├── about.html         # About Us page
│   ├── programs.html      # Programs showcase with AvanTech & I Am Art details
│   ├── impact.html        # Impact stories
│   ├── approach.html      # Our approach
│   ├── context.html       # Context about Kakuma
│   └── get-involved.html  # Ways to support
└── images/
    └── avan-logo.png      # Branding assets (to be added)
```

## Features

### ✨ Fully Responsive
- Mobile-first design
- Optimized for all screen sizes
- Touch-friendly navigation

### 🎨 Interactive Elements
- **Mobile Navigation** - Hamburger menu for mobile devices
- **Image Carousels** - Auto-rotating galleries with smooth transitions
- **Animated Counters** - Numbers that animate on scroll
- **Smooth Scrolling** - Navigation links with smooth scroll behavior
- **WhatsApp Widget** - Fixed chat button for quick contact

### 🎯 Optimized Performance
- No JavaScript frameworks required
- No build process needed
- Pure HTML, CSS, and vanilla JavaScript
- Fast loading times
- SEO-friendly structure

### 📱 Accessibility
- Semantic HTML5
- ARIA labels
- Keyboard navigation
- Screen reader friendly
- Color contrast compliant

## Getting Started

### 1. **Download the Files**
   - Download the entire `html-website` folder
   - Ensure all files maintain their folder structure

### 2. **Add Your Logo**
   - Replace `images/avan-logo.png` with your actual logo
   - Update the image path in the HTML files if needed

### 3. **Customize Content**
   - Edit the HTML files to add your specific content
   - Update email address (`info@avanmakerspace.org`)
   - Update WhatsApp number in the widget
   - Add team member information in `pages/about.html`
   - Add impact stories in `pages/impact.html`

### 4. **Test Locally**
   - Simply open `index.html` in a web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js
     npx http-server
     ```

## Deployment Options

### GitHub Pages (Free)
1. Push the `html-website` folder to GitHub
2. Go to repository Settings → Pages
3. Select the branch and folder
4. Your site is live at `username.github.io/repository`

### Vercel (Free)
1. Connect your GitHub repository
2. Select the `html-website` folder as root
3. Deploy with one click

### Netlify (Free)
1. Drag and drop the `html-website` folder
2. Or connect your GitHub repository
3. Your site is live immediately

### Traditional Hosting
1. FTP/SFTP the files to your server
2. Ensure the folder structure is maintained
3. Point your domain to the hosting

### AWS S3 + CloudFront
1. Create an S3 bucket
2. Upload all files maintaining structure
3. Set up CloudFront distribution
4. Configure your domain

## Customization Guide

### Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
  --primary: #001F3F;      /* Navy blue */
  --secondary: #17A2B8;    /* Teal */
  --accent: #FF8C00;       /* Orange */
  --background: #ffffff;   /* White */
  --foreground: #001F3F;   /* Dark navy */
}
```

### Fonts
Update font families in the CSS:
```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Images
- Update carousel images in the HTML
- Use the image paths from Vercel Blob Storage (provided URLs)
- Or upload new images and update the `src` attributes

### Content
- Edit text directly in the HTML files
- Maintain the HTML structure for styling to work correctly
- Update links in navigation to point to correct pages

### Forms
- The newsletter form needs backend processing
- Connect it to a service like Mailchimp, Typeform, or Formspree
- Update the `<form>` action attribute

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Optimize Images**
   - Compress images before uploading
   - Use WebP format where supported
   - Provide fallbacks to PNG/JPG

2. **Caching**
   - Configure browser caching on your server
   - Set cache headers for static assets

3. **CDN**
   - Use a CDN to serve images globally
   - Improves load times for international users

## SEO Optimization

The website includes:
- Meta descriptions
- Proper heading hierarchy
- Semantic HTML
- Mobile optimization
- Fast loading times

### Enhance SEO:
1. Add Google Analytics (add tracking code to all pages)
2. Submit sitemap to Google Search Console
3. Create `sitemap.xml` for your domain
4. Add structured data (Schema.org markup)

## Maintenance

### Regular Updates
- Update content regularly
- Keep links current
- Refresh images seasonally
- Update team member information

### Monitoring
- Check for broken links monthly
- Monitor site performance
- Review analytics
- Test on different devices

## Support & Troubleshooting

### Images not loading?
- Check file paths are correct relative to current page
- Ensure external URLs are still valid
- Verify image files exist in `images/` folder

### Mobile menu not working?
- Check browser console for JavaScript errors
- Ensure `js/main.js` is loading correctly
- Clear browser cache and reload

### Styling issues?
- Verify `css/styles.css` is loading
- Check for CSS conflicts in browser DevTools
- Ensure HTML class names match CSS selectors

### Form not submitting?
- Forms require backend processing
- Connect to a form service (Formspree, Mailchimp, etc.)
- Update form action and method attributes

## File Sizes & Performance

- Total CSS: ~35KB
- Total JavaScript: ~3KB
- HTML pages: ~15-20KB each
- Optimized for < 100KB total with images

## Future Enhancements

Consider adding:
- Blog section for impact stories
- Event calendar
- Volunteer application form
- Donation integration
- Multi-language support
- Dark mode toggle
- Search functionality

## License & Attribution

This website is built for Avan Makerspace. All content and design are the property of Avan Makerspace.

---

**Questions?** Contact: info@avanmakerspace.org

**Last Updated:** July 2026
