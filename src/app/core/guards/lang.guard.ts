import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { I18nService } from '../services/i18n.service';

export const langGuard: CanActivateFn = async (route) => {
  const i18n = inject(I18nService);
  const router = inject(Router);
  const lang = route.paramMap.get('lang');

  if (!i18n.isSupported(lang)) {
    return router.parseUrl('/en');
  }
  await i18n.setLang(lang);
  return true;
};
