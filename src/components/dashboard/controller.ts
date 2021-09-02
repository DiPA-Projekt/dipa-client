import { AbstractController } from '@leanup/lib';
import { DI } from '@leanup/lib';

import { OIDCService } from '../../services/oidc/service';

export class DashboardController extends AbstractController {
  private readonly oidcService = DI.get<OIDCService>('OIDCService');

  public login(): void {
    this.oidcService
      .login()
      .then(() => {})
      .catch((error: string) => {
        console.warn(error);
      })
      .finally(() => {});
  }

  public logout(): void {
    this.oidcService
      .logout()
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  }

  public renewToken(): void {
    this.oidcService
      .renewToken()
      .then(() => {
        this.getUser();
      })
      .catch(() => {})
      .finally(() => {});
  }

  public getUser(): void {
    console.info(this.oidcService.getUser());
  }
}
