export class Invoice {
    id: number;
    clientId: number;
    amount: number;
    status: string;
  
    constructor(data: any) {
      this.id = data.id;
      this.clientId = data.clientId;
      this.amount = data.amount;
      this.status = data.status;
    }
  }
  