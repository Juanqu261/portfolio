import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

import { I18nService } from '../../core/services/i18n.service';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly portfolio = inject(PortfolioService);
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly i18n = inject(I18nService);

  private readonly id = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('id') ?? '')),
    { initialValue: '' },
  );

  protected readonly project = computed(() => {
    const id = this.id();
    return id ? this.portfolio.getProject(id) : undefined;
  });

  private readonly readmePath = computed(
    () => this.project()?.readmePath ?? null,
  );

  protected readonly backLink = computed(() => ['/', this.i18n.lang()]);

  protected readonly readmeHtml = signal<SafeHtml | null>(null);
  protected readonly readmeLoading = signal(false);

  constructor() {
    let token = 0;
    effect(
      () => {
        const path = this.readmePath();
      const myToken = ++token;
      if (!path) {
        this.readmeHtml.set(null);
        this.readmeLoading.set(false);
        return;
      }
        this.readmeLoading.set(true);
        this.portfolio.getReadme(path).subscribe({
          next: async (md) => {
            if (myToken !== token) return; // a newer load superseded this one
            const html = await marked.parse(md, { async: true });
            const clean = DOMPurify.sanitize(html);
            this.readmeHtml.set(this.sanitizer.bypassSecurityTrustHtml(clean));
            this.readmeLoading.set(false);
          },
          error: () => {
            if (myToken !== token) return;
            this.readmeHtml.set(null);
            this.readmeLoading.set(false);
          },
        });
      },
      { allowSignalWrites: true },
    );
  }
}
