export interface IncomingData {
    email: string;
    password:string;
    passwordConfirmation: string;
    first_name: string;
    last_name: string;
    number: string
  }

export interface User {
    id: string;
    email: string;
    password:string;
  }

// Interface for the callback function
export interface UserCallback {
    (err: Error | null, user: Partial<User> | null): void;
}