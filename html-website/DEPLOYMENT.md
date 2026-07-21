# Deployment Guide - Avan Makerspace Website

This guide provides step-by-step instructions for deploying your static HTML website to various hosting platforms.

## Quick Start Checklist

- [ ] All content updated in HTML files
- [ ] Logo added to `images/` folder
- [ ] WhatsApp number updated in footer
- [ ] Email address verified throughout site
- [ ] Links tested and working
- [ ] Images loading correctly locally

## Deployment Options (Easiest to Most Complex)

---

## 1. **Vercel (Recommended - Free & Easy)**

### Steps:
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub/GitLab/Bitbucket or email
3. Click "New Project"
4. Connect your repository
5. Under "Root Directory", select `html-website`
6. Click "Deploy"
7. Your site is live in seconds!

### Advantages:
- ✅ Free with generous limits
- ✅ Auto-deploys on git push
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ One-click rollbacks
- ✅ Preview URLs for branches

### Custom Domain:
1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS setup instructions

---

## 2. **Netlify (Free & Easy)**

### Steps:
1. Go to [netlify.com](https://netlify.com)
2. Click "Sign up"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: Leave empty
   - **Publish directory**: `html-website`
5. Click "Deploy site"

### Advantages:
- ✅ Free with excellent features
- ✅ Easy form handling
- ✅ Functions for serverless
- ✅ Analytics included
- ✅ Git integration built-in

### Custom Domain:
1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS instructions

---

## 3. **GitHub Pages (Free)**

### Steps:
1. Create a GitHub repository
2. Push your code including `html-website` folder
3. Go to repository Settings
4. Scroll to "GitHub Pages"
5. Select source branch and folder (`html-website`)
6. Click Save
7. Site is live at `username.github.io/repository-name`

### Advantages:
- ✅ Free
- ✅ No build process needed
- ✅ Integrated with Git

### Custom Domain:
1. Add `CNAME` file to `html-website` with your domain
2. Update DNS records as instructed
3. Verify in GitHub settings

---

## 4. **AWS S3 + CloudFront**

### Steps:
1. Create S3 bucket (match your domain name)
2. Upload all files from `html-website` folder
3. Enable "Static website hosting" in bucket settings
4. Create CloudFront distribution pointing to S3
5. Update DNS records to CloudFront URL

### Advantages:
- ✅ Highly scalable
- ✅ Global CDN
- ✅ Pay-as-you-go pricing

### Cost:
- S3: ~$0.023 per GB stored, $0.0004 per 10K requests
- CloudFront: ~$0.085 per GB served
- Typically $1-5/month for small websites

---

## 5. **Traditional Web Hosting (Shared/VPS)**

### Steps via FTP:
1. Get FTP credentials from hosting provider
2. Use FTP client (FileZilla, Transmit, etc.)
3. Connect to server
4. Upload `html-website` folder contents
5. Set folder as public directory/document root

### Steps via cPanel:
1. Log in to cPanel
2. Open File Manager
3. Navigate to public_html
4. Upload `html-website` contents
5. Set `index.html` as default page

### Popular Providers:
- Bluehost ($2.95/month)
- SiteGround ($2.99/month)
- HostGator ($2.75/month)
- GoDaddy (variable pricing)

---

## 6. **Docker Container (Advanced)**

### Dockerfile:
```dockerfile
FROM nginx:alpine
COPY html-website /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Deploy to Docker Hub:
```bash
docker build -t your-username/avan-website:latest .
docker push your-username/avan-website:latest
```

### Deploy to cloud (AWS ECS, Google Cloud Run, Azure Container Instances):
- Follow platform-specific instructions
- Use the Docker image created above

---

## Setting Up a Custom Domain

### Step 1: Purchase Domain
- GoDaddy, Namecheap, Google Domains, etc.
- Cost: $10-15/year typically

### Step 2: Point Domain to Hosting
1. Get nameservers from your hosting provider
2. Update nameservers at registrar
3. Wait 24-48 hours for DNS propagation
4. Test at `dig yourdomain.com`

### Step 3: Set Up SSL Certificate
- Most platforms provide free SSL (Let's Encrypt)
- Enable HTTPS in platform settings
- Redirect HTTP to HTTPS

### DNS Records You Might Need:
```
Type    Name    Value
A       @       [Your hosting IP]
CNAME   www     yourdomain.com
TXT     @       [SPF/verification records]
```

---

## Testing Before Deployment

### Local Testing:
```bash
# Start local server
python -m http.server 8000

# Visit in browser
http://localhost:8000
```

### Checklist:
- [ ] Homepage loads
- [ ] Navigation links work
- [ ] Images display correctly
- [ ] Mobile menu responsive
- [ ] Forms don't break (they need backend)
- [ ] Carousels animate
- [ ] Counters work (on scroll)
- [ ] Footer visible on all pages
- [ ] WhatsApp widget appears
- [ ] No console errors (F12)

---

## Post-Deployment Setup

### 1. Connect Email Subscription Form
The newsletter form on footer needs backend processing:

**Option A: Mailchimp (Free)**
1. Create Mailchimp account
2. Get your form action URL
3. Replace in HTML: `<form action="YOUR_MAILCHIMP_URL">`

**Option B: Formspree (Free)**
1. Go to formspree.io
2. Create form for your email
3. Use provided code

**Option C: Custom Backend**
- Use your own server/API
- Process emails with Node.js, Python, PHP, etc.

### 2. Add Google Analytics
1. Create Google Analytics account
2. Get tracking code
3. Add to `<head>` of all pages before `</head>`

### 3. Set Up Google Search Console
1. Go to search.google.com/search-console
2. Add property
3. Verify ownership
4. Submit sitemap

### 4. Create Sitemap
Add `sitemap.xml` to root:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/pages/programs.html</loc>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 5. Set Up Redirects
If migrating from another site:
```
Old URL → New URL
/old-about.html → /pages/about.html
/programs.php → /pages/programs.html
```

---

## Performance Optimization

### Enable Compression:
Add to `.htaccess` (Apache):
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### Browser Caching:
Add to `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access 1 month"
  ExpiresByType text/javascript "access 1 month"
  ExpiresByType image/jpeg "access 1 year"
  ExpiresByType image/png "access 1 year"
</IfModule>
```

### Image Optimization:
- Use TinyPNG to compress images
- Convert to WebP format
- Use `<picture>` tag for fallbacks

---

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set security headers
- [ ] Keep backup copies
- [ ] Monitor for broken links
- [ ] Regular content backups
- [ ] Set up automated emails alerts

### Security Headers (Add to web server):
```
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
```

---

## Monitoring & Maintenance

### Monthly Tasks:
- [ ] Check for broken links
- [ ] Review analytics
- [ ] Update content as needed
- [ ] Test on mobile devices
- [ ] Backup website files

### Tools:
- **Uptime Monitoring**: Uptime Robot (free)
- **Link Checker**: Broken Link Checker (free)
- **Performance**: Google PageSpeed Insights (free)
- **Analytics**: Google Analytics (free)

---

## Troubleshooting

### Page shows 404?
- Ensure file paths are correct
- Check file extensions match
- Verify folder structure matches local

### Links not working?
- Check relative vs absolute paths
- Ensure all `href` attributes point to correct files
- Test on actual domain, not IP address

### Images not loading?
- Verify image files were uploaded
- Check file paths in HTML match uploaded structure
- Ensure `images/` folder exists

### Styling broken?
- Verify `css/styles.css` uploaded correctly
- Check link tag points to correct path
- Clear browser cache (Ctrl+Shift+Del)

### JavaScript not working?
- Verify `js/main.js` uploaded
- Check console for errors (F12)
- Ensure script tag path is correct

---

## Getting Help

- **Vercel Support**: support@vercel.com
- **Netlify Support**: support@netlify.com
- **Stack Overflow**: Tag your question appropriately
- **MDN Web Docs**: For HTML/CSS/JS questions

---

## Next Steps After Deployment

1. ✅ Share the live URL
2. ✅ Add to social media profiles
3. ✅ Submit to search engines
4. ✅ Set up email collection
5. ✅ Monitor traffic and engagement
6. ✅ Gather user feedback
7. ✅ Plan content updates

---

**Deployment Date:** ___________
**Live URL:** ___________________
**Domain:** _____________________
**Hosting Provider:** ____________

---

For more information, see README.md
