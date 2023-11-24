export interface IUserData {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  address: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    token: string;
  };
}
