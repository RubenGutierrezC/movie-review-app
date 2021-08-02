// signIn API
export interface signInDto {
  username: string;
  password: string;
}

export interface signInResponse {
  accessToken: string;
}

// signUp API
export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
}

//validateUser API
export interface ValidateUserDto {
  username: string;
  validationCode: string;
}
