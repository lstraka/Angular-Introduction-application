export class User {

  id: number;
  firstname: string;
  lastname: string;
  birthDate: Date;
  email: string;
  phoneNumber: string;
  address: string;
  username: string;
  hobbies: Hobby[];
  roleId: number;
}

export class Hobby {
  name: string;
}

// "id": 1,
// "firstname": "Northrop",
// "lastname": "Forsdike",
// "birthDate": "1996-04-30 02:32:46",
// "email": "nforsdike0@businesswire.com",
// "phoneNumber": "575 610 6125",
// "address": "5 Pond Lane",
// "username": "nforsdike0",
// "hobbies": [
//   {
//     "name": "Toughjoyfax"
//   },
//   {
//     "name": "Job"
//   }
// ],
// "roleId": 1
// },
