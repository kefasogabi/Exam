export interface KeyValuePair { 
    id: number; 
    name: string; 
  }

export class RegisterViewModel{
    id: any;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    sexId :any;
    address: string;
    password:any;
}

export class ChangePassword{
    oldPassword: string;
    newPassword: string;
}

export class Login{
    email: string;
    password: string;
}