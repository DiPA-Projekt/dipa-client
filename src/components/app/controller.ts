import { User } from 'oidc-client';

import { AbstractController, DI } from '@leanup/lib';

import { OIDCService } from '../../services/oidc/service';

export class AppController extends AbstractController {
  private readonly oidcService: OIDCService = DI.get<OIDCService>('OIDCService');
  public user: User | null = null;

  public constructor() {
    super({});
    this.oidcService.$user.subscribe({
      next: (user: User | null) => {
        if (user === null) {
        } else {
        }
      },
    });
  }
}
