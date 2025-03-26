export interface User {
  name: string;
  authority: string;
  phoneNumber: string;
}

export interface SignUp {
  password_confirm: string;
  phoneNumber: string;
  password: string;
  name: string;
  code: string;
  type: Type;
}

export type Type = 'SIGNUP' | 'UPDATE_PASSWORD';
