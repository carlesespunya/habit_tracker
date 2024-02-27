import { User } from 'src/core/domain/User/User';
import { UserRepository } from 'src/core/domain/User/User.repository';

export class UserInMemoryRepository implements UserRepository {
  private Users: User[] = [];

  async save(User: User): Promise<void> {
    this.Users.push(User);
  }

  async findById(id: string): Promise<User | null> {
    return this.Users.find((u) => u.id === id) || null;
  }

  withUsers(Users: User[]): UserInMemoryRepository {
    this.Users = Users;
    return this;
  }

  isUserSaved(User: User): boolean {
    return this.Users.some(
      (u) =>
        u.id === User.id &&
        u.Username === User.Username &&
        u.fullname === User.fullname,
    );
  }
}
