# Avan Makerspace website

The public website is maintained as plain HTML, CSS, JavaScript, and images in `static/`. It has no application server, framework runtime, or database dependency.

## cPanel deployment

The root `.cpanel.yml` copies `static/` directly to `~/public_html/`. No Node.js installation or build step is needed. cPanel still needs repository access to fetch the source before it can run those deployment tasks.

## Contact

Support and volunteer calls to action use `mailto:` links. This site does not collect or store submissions; connect a hosted form service if online form submissions are needed.
