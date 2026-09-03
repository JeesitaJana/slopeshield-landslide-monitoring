export interface FirebaseRuntimeConfig {
  apiKey: string
  authDomain: string
  projectId: string
}

export const getFirebaseRuntimeConfig = (): FirebaseRuntimeConfig => ({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
})

export const isFirebaseConfigured = (): boolean => {
  const config = getFirebaseRuntimeConfig()
  return Boolean(config.apiKey && config.authDomain && config.projectId)
}
