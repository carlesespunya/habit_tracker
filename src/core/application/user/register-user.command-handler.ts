import { Injectable } from '@nestjs/common';
import { RegisterUserCommand } from './register-User.command';
import { UserRepository } from 'src/core/domain/User/User.repository';
import { User } from 'src/core/domain/user/user';

@Injectable()
export class RegisterUserCommandHandler {
  constructor(private readonly repository: UserRepository) {}

  async handle(command: RegisterUserCommand): Promise<void> {
    if (this.repository.findById(command.id)) {
      throw new Error('User already exists');
    }

    const user = new User(command.id, command.fullname, command.Username);

    await this.repository.save(user);
  }
}
