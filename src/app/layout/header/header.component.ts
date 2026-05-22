import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { I18nService } from '../../core/services/i18n.service';
import { ThemeService } from '../../core/services/theme.service';
import type { Lang } from '../../core/models/project.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  protected readonly i18n = inject(I18nService);
  protected readonly theme = inject(ThemeService);

  protected readonly lang = this.i18n.lang;

  /** Other language for the toggle button (swap target). */
  protected readonly otherLang = computed<Lang>(() =>
    this.i18n.lang() === 'en' ? 'es' : 'en',
  );

  /** Current URL minus the leading /:lang segment. */
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly homeLink = computed(() => ['/', this.i18n.lang()]);

  protected async switchLang(): Promise<void> {
    const target = this.otherLang();
    const url = this.currentUrl();
    // Replace the leading /:lang segment, regardless of what follows
    // (path separator, query string, fragment, or end-of-string).
    const replaced = url.replace(/^\/(en|es)(?=[/?#]|$)/, `/${target}`);
    const next = replaced.startsWith('/') ? replaced : `/${target}`;
    await this.router.navigateByUrl(next);
  }
}
