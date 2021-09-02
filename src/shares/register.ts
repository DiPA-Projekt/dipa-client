// import { Configuration, ProjectApi, TimelinesApi } from '@dipa-projekt/dipa-openapi';
import { DI } from '@leanup/lib';

import { OIDCService } from '../services/oidc/service';

const oidcService = new OIDCService();

// const API_CONFIG = new Configuration({
//   basePath: 'http://localhost:8080/api/v1',
//   accessToken: (): string => {
//     return oidcService.getUser()?.access_token || '';
//   },
// });

DI.register('OIDCService', oidcService);
// DI.register('TimelinesApi', new TimelinesApi(API_CONFIG));
// DI.register('ProjectApi', new ProjectApi(API_CONFIG));

// setTimeout(() => {
//   console.log(oidcService.getUser());
//   DI.get<TimelinesApi>('TimelinesApi')
//     .getTimelines()
//     .subscribe({
//       next: (data) => {
//         console.log(data);
//       },
//       error: (error) => {
//         console.warn(error);
//       },
//     });
// }, 2000);
