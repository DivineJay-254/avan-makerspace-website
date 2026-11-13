'use client'

import { getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  getToken,
  type AppCheck,
} from 'firebase/app-check'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const requiredClientConfig = Object.values(config)

export function isFirebaseClientConfigured() {
  return requiredClientConfig.every((value) => Boolean(value))
}

function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseClientConfigured()) {
    throw new Error('Firebase client configuration is missing.')
  }

  return getApps().find((app) => app.name === 'avan-makerspace')
    ?? initializeApp(config, 'avan-makerspace')
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp())
}

type FirebaseGlobal = typeof globalThis & { __avanAppCheck?: AppCheck }

export async function getAppCheckToken(): Promise<string | undefined> {
  const siteKey = process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY

  if (!siteKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Firebase App Check is not configured.')
    }
    return undefined
  }

  const globalWithAppCheck = globalThis as FirebaseGlobal
  const appCheck = globalWithAppCheck.__avanAppCheck
    ?? initializeAppCheck(getFirebaseApp(), {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    })

  globalWithAppCheck.__avanAppCheck = appCheck
  const result = await getToken(appCheck, true)
  return result.token
}
