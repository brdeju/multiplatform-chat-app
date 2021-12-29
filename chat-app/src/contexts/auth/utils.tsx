import * as SecureStore from 'expo-secure-store'
import { AuthData } from './types';

const AUTH_DATA = 'auth_data';

export async function getItem(key: string): Promise<AuthData | null> {
  const value = await SecureStore.getItemAsync(key)
  return value ? JSON.parse(value) : null
}

export async function setItem(key: string, value: AuthData): Promise<void> {
  return SecureStore.setItemAsync(key, JSON.stringify(value))
}

export async function removeItem(key: string): Promise<void> {
  return SecureStore.deleteItemAsync(key)
}

export const getAuthData = () => getItem(AUTH_DATA)
export const removeAuthData = () => removeItem(AUTH_DATA)
export const setAuthData = (value: AuthData) => setItem(AUTH_DATA, value)
