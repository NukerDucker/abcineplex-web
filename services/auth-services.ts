const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface AuthUser {
  user_id: number;
  email: string;
  user_name: string;
  full_name: string;
  phone?: string;
  loyalty_points?: number;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: AuthUser;
  token?: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

// Token storage helpers
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function getStoredToken(): string | null {
  if (typeof globalThis.window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof globalThis.window === 'undefined') return null;
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

function storeAuth(token: string, user: AuthUser): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Sign in with email and password via backend API
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.detail || 'Login failed',
      };
    }

    const data: TokenResponse = await response.json();

    // Store token and user info
    storeAuth(data.access_token, data.user);

    return {
      success: true,
      user: data.user,
      token: data.access_token,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Register a new user via backend API
 */
export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        user_name: credentials.name.toLowerCase().replaceAll(/\s+/g, '_'),
        full_name: credentials.name,
        phone: credentials.phone || '',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.detail || 'Registration failed',
      };
    }

    const data: TokenResponse = await response.json();

    // Store token and user info
    storeAuth(data.access_token, data.user);

    return {
      success: true,
      user: data.user,
      token: data.access_token,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Sign out the current user
 */
export async function logout(): Promise<{ success: boolean; error?: string }> {
  try {
    const token = getStoredToken();

    if (token) {
      // Call backend logout (optional, since JWT is stateless)
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch(() => {
        // Ignore errors, we'll clear local auth anyway
      });
    }

    // Clear local storage
    clearAuth();

    return { success: true };
  } catch {
    // Still clear auth even if API call fails
    clearAuth();
    return { success: true };
  }
}

/**
 * Get the current user from backend
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = getStoredToken();

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Token might be expired
      clearAuth();
      return null;
    }

    const user: AuthUser = await response.json();

    // Update stored user info
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return user;
  } catch {
    return getStoredUser();
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getStoredToken();
}

/**
 * Get auth headers for API calls
 */
export function getAuthHeaders(): Record<string, string> {
  const token = getStoredToken();
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
}

// Note: Google OAuth would need to be implemented in the backend
// For now, these are placeholder functions
export async function signInWithGoogle(): Promise<{
  success: boolean;
  error?: string;
}> {
  return {
    success: false,
    error:
      'Google OAuth is not yet implemented with backend auth. Please use email/password login.',
  };
}

export async function signInWithOAuth(): Promise<{
  success: boolean;
  error?: string;
}> {
  return {
    success: false,
    error:
      'OAuth is not yet implemented with backend auth. Please use email/password login.',
  };
}
