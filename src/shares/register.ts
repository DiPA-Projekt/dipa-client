import { User } from 'oidc-client';

import { Configuration, TimelinesApi } from '@dipa-projekt/dipa-openapi';
import { DI } from '@leanup/lib/helpers/injector';

import { OIDCService } from '../services/oidc/service';

const oidcService = new OIDCService();

const API_CONFIG = new Configuration({
  basePath: 'http://localhost:8080/api/v1',
  accessToken: (): string => {
    return oidcService.getUser()?.access_token || '';
  },
});

setTimeout(() => {
  console.log(oidcService.getUser());
  timelinesApi.getTimelines().subscribe({
    next: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.warn(error);
    },
  });
}, 2000);

const timelinesApi = new TimelinesApi(API_CONFIG);

DI.register('OIDCService', oidcService);
DI.register('TimelinesApi', timelinesApi);
