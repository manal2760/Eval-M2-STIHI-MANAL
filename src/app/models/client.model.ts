export class Client {
    id: number;
    fullname: string;
    email: string;
  
    constructor(data: any) {
      this.id = data.id;
      this.fullname = data.fullname;
      this.email = data.email;
    }
  }
  