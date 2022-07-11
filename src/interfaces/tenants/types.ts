import type { Authorization, BaseMessageSchema } from '../../core/types';

export type TenantsAddDescriptor = {
  method: 'TenantsAdd';
  tenant: string;
};

export type TenantsAddSchema = BaseMessageSchema & Authorization & {
  descriptor: TenantsAddDescriptor;
};

export type TenantsRemoveDescriptor = {
  method: 'TenantsRemove';
  tenant: string;
};

export type TenantsRemoveSchema = BaseMessageSchema & Authorization & {
  descriptor: TenantsRemoveDescriptor;
};

