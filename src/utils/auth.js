const TOKEN_KEY = 'token'
const USER_KEY = 'user'
const LEGACY_TOKEN_KEYS = ['authToken', 'accessToken']

function getStorage() {
  return typeof window === 'undefined' ? null : window.localStorage
}

function getSessionStorage() {
  return typeof window === 'undefined' ? null : window.sessionStorage
}

export function getAuthToken() {
  const persistentStorage = getStorage()
  const sessionStorage = getSessionStorage()

  return (
    persistentStorage?.getItem(TOKEN_KEY) ||
    LEGACY_TOKEN_KEYS.map(key => persistentStorage?.getItem(key)).find(
      Boolean
    ) ||
    sessionStorage?.getItem(TOKEN_KEY) ||
    LEGACY_TOKEN_KEYS.map(key => sessionStorage?.getItem(key)).find(Boolean) ||
    null
  )
}

export function getAuthUser() {
  const user =
    getStorage()?.getItem(USER_KEY) || getSessionStorage()?.getItem(USER_KEY)

  if (!user) {
    return null
  }

  try {
    return JSON.parse(user)
  } catch {
    clearAuthSession()
    return null
  }
}

export function saveAuthSession(token, user, rememberMe = true) {
  const storage = rememberMe ? getStorage() : getSessionStorage()
  const otherStorage = rememberMe ? getSessionStorage() : getStorage()

  if (!storage || !otherStorage) {
    throw new Error('Browser storage is unavailable.')
  }

  for (const key of [TOKEN_KEY, USER_KEY, ...LEGACY_TOKEN_KEYS]) {
    otherStorage.removeItem(key)
    storage.removeItem(key)
  }

  storage.setItem(TOKEN_KEY, token)
  storage.setItem(USER_KEY, JSON.stringify(user))
}

export function saveAuthUser(user) {
  const persistentStorage = getStorage()
  const sessionStorage = getSessionStorage()
  const storage =
    persistentStorage?.getItem(TOKEN_KEY) ||
    LEGACY_TOKEN_KEYS.some(key => persistentStorage?.getItem(key))
      ? persistentStorage
      : sessionStorage

  if (!storage) {
    throw new Error('Browser storage is unavailable.')
  }

  const otherStorage =
    storage === persistentStorage ? sessionStorage : persistentStorage
  otherStorage?.removeItem(USER_KEY)
  storage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuthSession() {
  for (const storage of [getStorage(), getSessionStorage()]) {
    if (!storage) {
      continue
    }

    for (const key of [TOKEN_KEY, USER_KEY, ...LEGACY_TOKEN_KEYS]) {
      storage.removeItem(key)
    }
  }
}
