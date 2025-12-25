export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  isLoggedIn: boolean;
}

const USER_STORAGE_KEY = 'bware_user';

/**
 * Get user data from localStorage
 */
export function getUser(): UserData | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const userData = localStorage.getItem(USER_STORAGE_KEY);
    if (!userData) {
      return null;
    }
    return JSON.parse(userData) as UserData;
  } catch (error) {
    console.error('Error reading user from localStorage:', error);
    return null;
  }
}

/**
 * Save user data to localStorage
 */
export function setUser(userData: UserData): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
}

/**
 * Clear user data from localStorage (logout)
 */
export function clearUser(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing user from localStorage:', error);
  }
}

/**
 * Check if user is logged in
 */
export function isLoggedIn(): boolean {
  const user = getUser();
  return user !== null && user.isLoggedIn === true;
}

/**
 * Get user's display name (first name or full name)
 */
export function getUserDisplayName(): string | null {
  const user = getUser();
  if (!user) {
    return null;
  }
  return user.firstName || `${user.firstName} ${user.lastName}`;
}



