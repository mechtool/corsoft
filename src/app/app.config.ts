import {ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import {HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:3000'
          }),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimations(),
  ]
};
