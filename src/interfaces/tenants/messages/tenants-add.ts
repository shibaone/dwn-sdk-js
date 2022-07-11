import type { AuthCreateOptions, Authorizable, AuthVerificationResult } from '../../../core/types';
import type { TenantsAddSchema, TenantsAddDescriptor } from '../types';

import { authenticate, verifyAuth } from '../../../core/auth';
import { DIDResolver } from '../../../did/did-resolver';
import { Message } from '../../../core/message';

type CreateOptions = AuthCreateOptions & {
  tenant: string;
};

export class TenantsAdd extends Message implements Authorizable {
  protected message: TenantsAddSchema;

  constructor(message: TenantsAddSchema) {
    super(message);
  }

  static async create(options: CreateOptions): Promise<TenantsAdd> {
    const descriptor: TenantsAddDescriptor = {
      method : 'TenantsAdd',
      tenant : options.tenant
    };

    const auth = await authenticate({ descriptor }, options.signatureInput);
    const message: TenantsAddSchema = { descriptor, authorization: auth };

    return new TenantsAdd(message);
  }

  verifyAuth(didResolver: DIDResolver): Promise<AuthVerificationResult> {
    return verifyAuth(this.message, didResolver);
  }
}