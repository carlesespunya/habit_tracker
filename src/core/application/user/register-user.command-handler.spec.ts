import { RegisterUserCommand } from './register-User.command';
import { RegisterUserCommandHandler } from './register-User.command-handler';
import { UserInMemoryRepository } from 'src/core/test/User/User.in-memory.repository';
import { User } from 'src/core/domain/user/user';
import { UserMother } from 'src/core/test/User/User.mother';

describe('RegisterUserCommandHandler', () => {
  it('should register if theres no duplicate', () => {
    // Given
    const resporoty = new UserInMemoryRepository();
    const id = '1';
    const username = 'test';
    const fullname = 'test';

    // When
    const user: User = new UserMother()
      .setId(id)
      .setUsername(username)
      .setFullname(fullname)
      .build();
    const command = new RegisterUserCommand(id, username, fullname);
    const handler = new RegisterUserCommandHandler(resporoty);

    handler.handle(command);

    // Then
    expect(resporoty.isUserSaved(user)).toBe(true);
  });

  it('should throw an error if the User already exists', () => {
    // Given
    // When
    //  Then
  });

  it('should throw an error if the User is not valid', () => {
    // Given
    // When
    //  Then
  });
});
