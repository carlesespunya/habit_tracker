import { User } from '../../domain/user/user';

export class UserMother {
  private id: string = 'asdf';
  private username: string = 'username';
  private fullname: string = 'fullname';

  withId(id: string) {
    this.id = id;
    return this;
  }
  withUsername(username: string) {
    this.username = username;
    return this;
  }
  withFullname(fullname: string) {
    this.fullname = fullname;
    return this;
  }

  build(): User {
    return new User(this.id, this.username, this.fullname);
  }

  static create(): User {
    return new UserMother().build();
  }
}
