export interface LoginResponse {
    message: string;
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }