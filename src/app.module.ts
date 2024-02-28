import { Module } from '@nestjs/common';
import { CreateUserController } from './core/ui/api/create-User.controller';
import { RegisterUserCommandHandler } from './core/application/User/register-User.command-handler';

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [RegisterUserCommandHandler],
})
export class AppModule {}
