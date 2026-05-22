import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { I18nService, DEFAULT_LANG } from './core/services/i18n.service';
import { ThemeService } from './core/services/theme.service';
import { PortfolioService } from './core/services/portfolio.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [I18nService, PortfolioService, ThemeService],
      useFactory:
        (i18n: I18nService, portfolio: PortfolioService, _theme: ThemeService) =>
        async () => {
          await i18n.setLang(DEFAULT_LANG);
          await portfolio.load();
        },
    },
  ],
};
