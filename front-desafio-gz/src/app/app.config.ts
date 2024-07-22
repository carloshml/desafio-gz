import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withJsonpSupport } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';  
  

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, 
  provideAnimationsAsync(),
  provideHttpClient(withFetch(), withJsonpSupport()), provideCharts(withDefaultRegisterables())]
};
