import { User } from 'src/core/domain/User/User';

export class UserMother {
  private id: string = 'User-id';
  private Username: string = 'Username';
  private fullname: string = 'fullname';

  setId(id: string): UserMother {
    this.id = id;
    return this;
  }

  setUsername(Username: string): UserMother {
    this.Username = Username;
    return this;
  }

  setFullname(fullname: string): UserMother {
    this.fullname = fullname;
    return this;
  }

  build(): User {
    return new User(this.id, this.Username, this.fullname);
  }
}
