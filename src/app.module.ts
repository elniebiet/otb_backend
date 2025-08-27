import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GeneralModule } from './otb_general/otb_general.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5003,
      username: 'otb_admin',
      password: 'tcB555CsVK6TG9b',
      database: 'otb_main_db',
      autoLoadEntities: true, // Automatically load entities
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Note: set to false in production
      logging: false, // logging for debugging
    }),
    AuthModule,
    GeneralModule,
  ],
})
export class AppModule {}
