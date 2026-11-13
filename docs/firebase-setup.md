# Firebase setup and deployment

The website is wired to Firebase, but it will not read or write live data until the Firebase project and Vercel environment variables below are configured. No demo records are bundled. Until then, the existing static pages remain visible, while CMS-only pages explain that Firebase is not configured and admin sign-in is unavailable.

## 1. Create and configure the Firebase project

1. Create a Firebase project for Avan Makerspace and register a Web app. Choose the Firestore location carefully; it cannot be changed after creation.
2. Enable **Authentication → Email/Password**. Do not enable public account creation. Create the single administrator account in the Firebase Console and mark its email as verified.
3. Create a **Cloud Firestore** database in production mode. Apply `firebase/firestore.rules` and `firebase/firestore.indexes.json` (or paste the rules in the Firebase Console). The browser receives no direct write access; Next.js server routes validate and authorize writes.
4. Enable **Cloud Storage** and set a bucket. Billing may be required for Storage on new Firebase projects; confirm the current requirement in Firebase Console before enabling uploads.
5. Configure **App Check** for the Web app with a reCAPTCHA v3 site key. Add the production domain and any preview domains to Firebase Authentication’s authorized domains. `localhost` can be used for local development.
6. In Firestore, enable TTL for the `_rate_limits.expiresAt` field. The app stores keyed hashes rather than raw IP addresses and uses these documents to expire request-throttle counters.

## 2. Configure Vercel environment variables

Add these in the connected Vercel project’s **Settings → Vars** for every environment that needs to run the CMS, then redeploy. `NEXT_PUBLIC_*` values are embedded in the client bundle at build time, so changing them requires a new deployment.

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Web app API key from Firebase project settings |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Web app auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Web app ID |
| `NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY` | reCAPTCHA v3 site key registered with App Check |
| `FIREBASE_CLIENT_EMAIL` | Service-account client email |
| `FIREBASE_PRIVATE_KEY` | Service-account private key; keep server-only and preserve newlines (the app also accepts escaped `\\n`) |
| `FIREBASE_STORAGE_BUCKET` | The project’s Cloud Storage bucket name |
| `FIREBASE_RATE_LIMIT_SECRET` | Random secret of at least 32 characters; used for HMAC-based throttling and deduplication |
| `FIREBASE_ADMIN_BOOTSTRAP_EMAIL` | The verified email of the one initial administrator |
| `FIREBASE_ADMIN_BOOTSTRAP_SECRET` | Temporary random secret of at least 32 characters for one-time setup |

Never commit a service-account key or put it in a `NEXT_PUBLIC_` variable. `.env.example` contains names only, not credentials.

## 3. Provision the single administrator

1. Create the administrator account in Firebase Authentication and verify its email. There is no public signup route.
2. Set `FIREBASE_ADMIN_BOOTSTRAP_EMAIL` and `FIREBASE_ADMIN_BOOTSTRAP_SECRET` to the same email and secret you will enter in the setup form.
3. Open `/admin/setup` on the configured deployment and submit the administrator email and temporary secret. The server verifies the email, uses a one-time Firestore lock, and sets the `admin` custom claim plus the private `users/{uid}` profile.
4. Remove both bootstrap variables from Vercel Vars and redeploy. The bootstrap endpoint will then be disabled. Sign in at `/admin/login`; sessions use an HttpOnly, Secure-in-production cookie. Password reset returns a generic response to avoid account enumeration.

If bootstrap is interrupted after the Firestore lock is written, retry with the same administrator email and secret. A different user cannot claim the pending lock.

## 4. Publish content

The admin dashboard is at `/admin`. It manages events, programs, projects, news posts, gallery items, impact metrics, contact messages, registrations, and public site settings. Draft and archived content is excluded from public queries; only documents with `status: "published"` are returned. Uploads are validated image files stored in Cloud Storage. Public image delivery checks the linked content record before issuing a short-lived signed URL; draft images are not served to visitors.

The `settings/public.cmsEnabled` setting switches legacy program, project, and impact sections to Firestore-only content. Keep it off until those existing entries have been recreated and published in the CMS; while it is off, existing static content is retained and published CMS additions are shown alongside it. Events, news, and gallery pages always use published Firestore records and show a truthful empty/setup state when there is no content.

Contact and event-registration submissions are validated and stored in Firestore. They require App Check in production, honeypot checks, rate limits, normalized emails, and duplicate registration prevention. Contact messages and registrations are private to the administrator. The site displays an on-page success confirmation; no email delivery provider is configured in this project.

## 5. Deploy rules and the website

The repository includes `firebase.json` to map the Firestore and Storage rules. You can deploy those files from the Firebase Console or with the Firebase CLI in your own development environment. Review the rules before applying them to an existing Firebase project; they intentionally deny direct client writes and direct Storage access.

The existing GitHub repository and Vercel project remain the deployment target. Push this feature branch and merge its review into `main` through the repository’s normal workflow. Vercel then deploys the merged branch. After Vercel variables and Firebase services are configured, smoke-test sign-in, one CMS publish/unpublish cycle, one media upload, one contact submission, and one event registration. Without those external values, backend acceptance tests cannot pass and the affected flows remain intentionally unavailable.
