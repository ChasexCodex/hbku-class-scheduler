const required = (name?: string) => {
  if (!name) {
    throw new Error(`Missing required environment variable ${name}`)
  }

  return name
}

const optional = (name?: string, def?: string) => {
  return name || def
}

const configData = {
  env: optional(process.env.NEXT_PUBLIC_APP_ENV, 'production'),
  firebase: {
    apiKey: required(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
    authDomain: required(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
    databaseUrl: required(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL),
    projectId: required(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    storageBucket: required(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: required(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  },
  coursesApi: required(process.env.NEXT_PUBLIC_HOWDY_COURSES_URL),
}

type ConfigKey = keyof typeof configData
type ConfigData = typeof configData

const config = <T extends ConfigKey>(key: T, def?: any): ConfigData[T] => {
  const value = configData[key]
  if (value === undefined) {
    if (def === undefined) {
      throw new Error(`Config key ${key} is not defined`)
    }
    return def
  }
  return value as ConfigData[T]
}

export default config