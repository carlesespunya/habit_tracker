export class User {
  private createdAt: Date;
  private lastUpdatedAt: Date;

  constructor(
    readonly id: string,
    readonly username: string,
    readonly fullname: string,
  ) {
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
  }
}
