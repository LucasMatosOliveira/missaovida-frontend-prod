import { proxy } from 'valtio';

const authState = proxy({
  token: null as string | null
});

const setToken = (newToken: string) => {
  authState.token = newToken;
};

const clearToken = () => {
  authState.token = null;
};

export { authState, setToken, clearToken };