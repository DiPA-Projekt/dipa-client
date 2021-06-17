import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { Observable, Subscriber } from 'rxjs';

/**
 * OIDC-Client-Simples
 * - https://github.com/IdentityModel/oidc-client-js/blob/dev/samples/VanillaJS/public/oidc-client-sample.js
 * - https://github.com/DiPA-Projekt/dipa-hub/blob/develop/frontend/projects/dipa-frontend/src/environments/environment.ts
 *
 * - https://darutk.medium.com/diagrams-of-all-the-openid-connect-flows-6968e3990660
 * - https://www.keycloak.org/docs/4.8/server_admin/#keycloak-server-oidc-uri-endpoints
 * - https://robferguson.org/blog/2019/12/29/angular-openid-connect-keycloak/
 */

const keycloakConfig = {
  issuer: 'https://auth.dipa.online/auth/realms/DiPA',
  clientId: 'dipa-app',
  redirectUri: window.location.href,
  scope: 'openid profile email offline_access',
  responseType: 'code',
};

export class OIDCService {
  public userManager: UserManager;
  private user: User | null = null;
  public readonly $user: Observable<User | null>;
  private userObserver: Subscriber<User | null>;

  public get isAuthenticated(): boolean {
    return this.user !== null;
  }

  public constructor() {
    this.$user = new Observable<User | null>((observer) => {
      this.userObserver = observer;
    });
    this.$user.subscribe({
      next: (user) => {
        console.log(user);
      },
    });

    const settings: UserManagerSettings = {
      authority: keycloakConfig.issuer,
      client_id: keycloakConfig.clientId,
      redirect_uri: keycloakConfig.redirectUri,
      scope: keycloakConfig.scope,
      response_type: keycloakConfig.responseType,
      silent_redirect_uri: keycloakConfig.redirectUri,
      post_logout_redirect_uri: keycloakConfig.redirectUri,
      automaticSilentRenew: true,
      filterProtocolClaims: true,
      loadUserInfo: true,
    };
    this.userManager = new UserManager(settings);
    this.userManager
      .signinCallback()
      .then((user: User) => {
        this.setUser(user);
      })
      .catch((error: Error) => {
        if (error.message !== 'No state in response') {
          console.warn(error);
        } else {
          this.userManager
            .getUser()
            .then((user: User | null) => {
              this.setUser(user);
            })
            .catch((error: Error) => {
              console.warn(error);
            });
        }
      });
  }

  private setUser(user: User | null) {
    this.user = user;
    this.userObserver.next(this.user);
  }
  public getUser(): User | null {
    return this.user;
  }

  public loginPopup(): Promise<void> {
    return new Promise((resolve: Function, reject: Function) => {
      this.userManager
        .signinPopup()
        .then((user: User) => {
          this.setUser(user);
          resolve();
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }
  private loginRedirect(): Promise<void> {
    return this.userManager.signinRedirect();
  }
  public loginSilent(): Promise<void> {
    return new Promise((resolve: Function, reject: Function) => {
      this.userManager
        .signinSilent()
        .then((user: User) => {
          this.setUser(user);
          resolve();
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }
  public login(): Promise<void> {
    return this.loginPopup();
    // return this.loginRedirect();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    // return this.userManager.signoutPopup();
    return this.userManager.signoutRedirect();
  }
}
