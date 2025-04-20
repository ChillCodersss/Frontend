// src/services/auth.ts
export const storeToken = (token: string): void => {
    localStorage.setItem("jwtToken", token);
  };
  
  export const getToken = (): string | null => {
    return localStorage.getItem("jwtToken");
  };
  
  export const removeToken = (): void => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userInfo"); // Clear user info too if stored
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