import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private defaultPool: Pool;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.createDefaultPool();
  }

  private async createDefaultPool() {
    this.defaultPool = new Pool({
      connectionString: this.configService.getOrThrow('DATABASE_URL'),
    });
  }
}
