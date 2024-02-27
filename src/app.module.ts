import { Module } from '@nestjs/common';
import { AppController } from './core/ui/api/app.controller';
import { AppService } from './core/application/app.service';
import { CreateUserController } from './core/ui/api/create-User.controller';
import { RegisterUserCommandHandler } from './core/application/User/register-User.command-handler';

@Module({
  imports: [],
  controllers: [AppController, CreateUserController],
  providers: [AppService, RegisterUserCommandHandler],
})
export class AppModule {}
