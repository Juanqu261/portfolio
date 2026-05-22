import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <p>© {{ year }} — {{ i18n.t('footer.builtWith') }}</p>
      </div>
    </footer>
  `,
  styles: [
    `
      .site-footer {
        border-top: 1px solid var(--border);
        padding: 2rem 0;
        margin-top: 4rem;
        color: var(--text-muted);
        font-size: 0.9rem;
      }
      .container {
        text-align: center;
      }
    `,
  ],
})
export class FooterComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly year = new Date().getFullYear();
}
