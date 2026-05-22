import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { AboutComponent } from '../about/about.component';
import { ProjectListComponent } from '../projects/project-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutComponent, ProjectListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly i18n = inject(I18nService);
}
