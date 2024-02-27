import { RegisterUserCommand } from 'src/core/application/User/register-User.command';
import { RegisterUserCommandHandler } from 'src/core/application/User/register-User.command-handler';
import { Controller, Post, Request } from '@nestjs/common';

@Controller()
export class CreateUserController {
  constructor(private commandHandler: RegisterUserCommandHandler) {}

  @Post('users')
  handle(@Request() request: any): void {
    const command = new RegisterUserCommand(
      request.body.id,
      request.body.fullname,
      request.body.Username,
    );

    this.commandHandler.handle(command);
  }
}
