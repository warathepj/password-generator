const SESSION_KEY = "auth_session";

export interface AuthSession {
  isAuthenticated: boolean;
  timestamp: number;
}

export const createSession = (): void => {
  const session: AuthSession = {
    isAuthenticated: true,
    timestamp: Date.now(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getSession = (): AuthSession | null => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

export const isValidSession = (): boolean => {
  const session = getSession();
  return !!session?.isAuthenticated && Date.now() - session.timestamp < 3600000; // 1 hour
};

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
};