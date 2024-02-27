export class RegisterUserCommand {
  constructor(
    readonly id: string,
    readonly Username: string,
    readonly fullname: string,
  ) {}
}
