export const storeToken = (token: string): void => {
  localStorage.setItem("jwtToken", token);
};

export const getUserInfo = (): {
  id: number;
  userName: string;
  role: string;
} | null => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return null;
};

export const getToken = (): string | null => {
  return localStorage.getItem("jwtToken");
};

export const removeToken = (): void => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userInfo");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const storeUserInfo = (userInfo: {
  id: number;
  userName: string;
  role: string;
}): void => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};
