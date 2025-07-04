export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface UserProfile {
  cv_file: string | null;
  cv_url: string | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
  userprofile: UserProfile | null;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchCurrentUser: () => Promise<User | null>;
  updateUserCvProfile: (newProfile: UserProfile | null) => void;
}