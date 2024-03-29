import { RegisterUserCommand } from './register-user.command'
import { Inject, Injectable } from '@nestjs/common'
import { UserRepository } from '../../domain/user/user.repository'
import { User } from '../../domain/user/user'
import { UserAlreadyExistsError } from './user-already-exists.error'

@Injectable()
export class RegisterUserCommandHandler {
  constructor(
    @Inject(UserRepository) private readonly repository: UserRepository,
  ) {}

  handle(command: RegisterUserCommand) {
    this.validate(command)

    const user = new User(command.id, command.username, command.fullname)

    this.repository.save(user)
  }

  private validate(command: RegisterUserCommand) {
    if (this.repository.findByUsername(command.username))
      throw UserAlreadyExistsError.withUsername(command.username)
  }
}
