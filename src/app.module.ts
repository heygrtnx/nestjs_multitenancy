import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenancyModule } from './tenancy/tenancy.module';
import { TenancyMiddleware } from './tenancy/tenancy.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TenancyModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenancyMiddleware).forRoutes('*');
  }
}
