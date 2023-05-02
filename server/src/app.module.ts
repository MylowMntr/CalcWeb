import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Calculation } from './calculation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'PASMONMOTDEPASSE',
      database: 'calculator',
      entities: [Calculation],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Calculation]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}