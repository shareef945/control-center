export interface AuthLoginRequestBody {
  password: string;
  username: string;
  client_id: string;
}

export interface tokenPayload {
  userId: string;
  client: string;
}

export interface RefreshTokenBody {
  accessToken: string;
  refreshToken: string;
}

export interface NewPIN {
  newPin: string;
  client_id: string;
  user_id?: string;
}

export interface RegisterInterestBody {
  email: string;
}

  