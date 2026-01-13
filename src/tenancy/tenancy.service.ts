import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { Tenants } from './tenants.interface';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class TenancyService implements OnModuleInit {
  private tenants: Tenants;

  onModuleInit() {
    const tenants: Tenants = JSON.parse(
      readFileSync(join(__dirname, './tenants.json'), 'utf8'),
    );

    this.tenants = tenants;
  }

  validateTenantId(tenantId: string) {
    if (!tenantId || !this.tenants[tenantId]) {
      throw new BadRequestException(`Tenant ${tenantId} not found`);
    }
  }

  getTenants() {
    return this.tenants;
  }
}
