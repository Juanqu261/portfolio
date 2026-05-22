import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import type { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  protected readonly i18n = inject(I18nService);

  readonly project = input.required<Project>();

  protected readonly topHighlights = computed(() =>
    this.project().highlights.slice(0, 2),
  );

  protected readonly detailLink = computed(() => [
    '/',
    this.i18n.lang(),
    'projects',
    this.project().id,
  ]);
}
