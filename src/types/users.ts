export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  phone?: string;
  company?: {
    name: string;
    catchPhrase?: string;
  };
  address?: {
    street: string;
    city: string;
    zipcode: string;
  };
}

// Types for our API responses
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface UsersApiError {
  message: string;
  code: string;
  status: number;
}
