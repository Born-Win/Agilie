import { Module } from '@nestjs/common';
import { User } from './models';

@Module({
  controllers: [],
  providers: [
    {
      provide: 'USER',
      useValue: User
    }
  ]
})
export class UserModule {}
