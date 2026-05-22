import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  Project,
  ProjectRaw,
  localizeProject,
} from '../models/project.model';
import { I18nService } from './i18n.service';

interface ProjectsFile {
  projects: ProjectRaw[];
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly http = inject(HttpClient);
  private readonly i18n = inject(I18nService);

  private readonly raw = signal<ProjectRaw[]>([]);
  private loadPromise: Promise<void> | null = null;

  readonly projects = computed<Project[]>(() => {
    const lang = this.i18n.lang();
    return this.raw().map((p) => localizeProject(p, lang));
  });

  async load(): Promise<void> {
    if (this.loadPromise) return this.loadPromise;
    this.loadPromise = firstValueFrom(
      this.http.get<ProjectsFile>('assets/data/projects.json'),
    ).then((file) => {
      this.raw.set(file.projects);
    });
    return this.loadPromise;
  }

  getProject(id: string): Project | undefined {
    return this.projects().find((p) => p.id === id);
  }

  getReadme(path: string) {
    return this.http.get(path, { responseType: 'text' });
  }
}
