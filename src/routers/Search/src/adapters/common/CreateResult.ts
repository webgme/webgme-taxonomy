export enum Status {
  Created = "Created!",
  Submitted = "Submitted creation request!",
}

export class CreateResult {
  status: Status;

  constructor(status: Status) {
    this.status = status;
  }
}
