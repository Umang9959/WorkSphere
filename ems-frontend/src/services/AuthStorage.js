export const AUTH_STORAGE_KEY = 'ems_auth';

export const setAuth = (payload) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getAuth = () => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = () => Boolean(getAuthToken());

export const getAuthToken = () => {
  const auth = getAuth();
  return auth?.token || null;
};
