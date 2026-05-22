import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import type { Lang } from '../models/project.model';

export const SUPPORTED_LANGS: Lang[] = ['en', 'es'];
export const DEFAULT_LANG: Lang = 'en';

type Dict = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly http = inject(HttpClient);
  private readonly doc = inject(DOCUMENT);

  private readonly _lang = signal<Lang>(DEFAULT_LANG);
  private readonly dicts = new Map<Lang, Dict>();
  private readonly dictSignal = signal<Dict>({});

  readonly lang = this._lang.asReadonly();
  readonly dict = this.dictSignal.asReadonly();

  isSupported(value: string | null | undefined): value is Lang {
    return !!value && (SUPPORTED_LANGS as string[]).includes(value);
  }

  async setLang(lang: Lang): Promise<void> {
    if (!this.dicts.has(lang)) {
      const data = await firstValueFrom(
        this.http.get<Dict>(`assets/i18n/${lang}.json`),
      );
      this.dicts.set(lang, data);
    }
    this._lang.set(lang);
    this.dictSignal.set(this.dicts.get(lang) ?? {});
    this.doc.documentElement.setAttribute('lang', lang);
  }

  /** Returns a localized string for the given dot-path (e.g. "hero.title"). */
  t(path: string): string {
    const value = this.resolve(path, this.dictSignal());
    return typeof value === 'string' ? value : path;
  }

  /** Returns an array (e.g. about.skills.items) — empty if missing. */
  tList(path: string): string[] {
    const value = this.resolve(path, this.dictSignal());
    return Array.isArray(value) ? (value as string[]) : [];
  }

  /** Reactive helper to derive a localized value. */
  text(path: string) {
    return computed(() => {
      const value = this.resolve(path, this.dictSignal());
      return typeof value === 'string' ? value : path;
    });
  }

  private resolve(path: string, dict: Dict): unknown {
    return path.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, dict);
  }
}
