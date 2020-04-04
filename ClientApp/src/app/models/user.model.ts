export interface KeyValuePair { 
    id: number; 
    name: string; 
  }

export class User {
    id: number;
    loginid: any;
    username: string;
    email: string;
    address: string;
    sexId :any;
    city: string;
    phone: string;
    password:any;
}

export class userLogin{
    loginid: string;
    password: string;
}


export class EditUser {
    id: any;
    loginid: any;
    username: string;
    email: string;
    phone: string;
    timeSpent: string;
    score: string;
   
   
    

}