import { DI } from '@leanup/lib';

import { OIDCService } from '../services/oidc/service';

DI.register('OIDCService', () => new OIDCService(), {
  lazy: true,
});
