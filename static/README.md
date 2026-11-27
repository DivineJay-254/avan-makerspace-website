# Avan Makerspace static website

The public site is plain HTML, CSS, JavaScript, images, and Apache configuration in this directory. cPanel deploys these files directly; it does not need Node.js, npm, a build step, Next.js, or a server runtime.

## Deploy with cPanel

The repository's `.cpanel.yml` copies the contents of this directory into `~/public_html/`. The `.htaccess` file provides directory index routing, compression, caching, and response headers. cPanel must still be able to fetch the Git repository before it can run deployment tasks.

## Pages

- `/` — Home
- `/about/` — About Avan
- `/programs/` — Programs
- `/impact/` — Impact
- `/get-involved/` — Giving, volunteering, mentorship, and partnerships
- `/privacy-policy/` — Privacy policy
- `/terms-of-service/` — Terms of service

## Forms and contact

The site does not process or store form submissions. Calls to action use `mailto:` links that open the visitor's email application. A hosted form service can be connected later by changing these links.

## Local preview

Serve this directory with any static web server. For example, Python's built-in HTTP server can serve it without installing project dependencies.
