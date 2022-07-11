import type { AuthCreateOptions, Authorizable, AuthVerificationResult } from '../../../core/types';
import type { TenantsRemoveSchema, TenantsRemoveDescriptor } from '../types';

import { authenticate, verifyAuth } from '../../../core/auth';
import { DIDResolver } from '../../../did/did-resolver';
import { Message } from '../../../core/message';

type CreateOptions = AuthCreateOptions & {
  tenant: string;
};

export class TenantsRemove extends Message implements Authorizable {
  protected message: TenantsRemoveSchema;

  constructor(message: TenantsRemoveSchema) {
    super(message);
  }

  static async create(options: CreateOptions): Promise<TenantsRemove> {
    const descriptor: TenantsRemoveDescriptor = {
      method : 'TenantsRemove',
      tenant : options.tenant
    };

    const auth = await authenticate({ descriptor }, options.signatureInput);
    const message: TenantsRemoveSchema = { descriptor, authorization: auth };

    return new TenantsRemove(message);
  }

  verifyAuth(didResolver: DIDResolver): Promise<AuthVerificationResult> {
    return verifyAuth(this.message, didResolver);
  }
}