import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralService } from './otb_general.service';
import { OTB_Settings } from './settings.entity';
import { GeneralController } from './otb_general.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OTB_Settings, ]),
    AuthModule,
  ],
  providers: [ GeneralService],
  controllers: [GeneralController],
//   exports: [JwtStrategy, PassportModule] 
})
export class GeneralModule {}
