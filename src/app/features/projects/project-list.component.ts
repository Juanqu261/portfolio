import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { I18nService } from '../../core/services/i18n.service';
import { ProjectCardComponent } from './project-card.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="projects container" aria-labelledby="projects-title">
      <header class="projects-head">
        <h2 id="projects-title">{{ i18n.t('projects.title') }}</h2>
        <p class="muted">{{ i18n.t('projects.subtitle') }}</p>
      </header>

      <div class="projects-grid">
        @for (project of portfolio.visibleProjects(); track project.id) {
          <app-project-card [project]="project" />
        }
      </div>
    </section>
  `,
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly portfolio = inject(PortfolioService);
}
