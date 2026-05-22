export type Lang = 'en' | 'es';

export interface ExtraLinkRaw {
  url: string;
  label: Record<Lang, string>;
}

export interface ExtraLink {
  url: string;
  label: string;
}

export interface ProjectRaw {
  id: string;
  name: string;
  github: string;
  demo: string | null;
  description: Record<Lang, string>;
  techStack: string[];
  highlights: Record<Lang, string[]>;
  yearCompleted: number;
  readmePath: Record<Lang, string> | null;
  sourceLanguage: Lang;
  extraLinks?: ExtraLinkRaw[];
}

export interface Project {
  id: string;
  name: string;
  github: string;
  demo: string | null;
  description: string;
  techStack: string[];
  highlights: string[];
  yearCompleted: number;
  readmePath: string | null;
  sourceLanguage: Lang;
  extraLinks: ExtraLink[];
}

export function localizeProject(raw: ProjectRaw, lang: Lang): Project {
  return {
    id: raw.id,
    name: raw.name,
    github: raw.github,
    demo: raw.demo,
    description: raw.description[lang] ?? raw.description.en,
    techStack: raw.techStack,
    highlights: raw.highlights[lang] ?? raw.highlights.en,
    yearCompleted: raw.yearCompleted,
    readmePath: raw.readmePath
      ? raw.readmePath[lang] ?? raw.readmePath[raw.sourceLanguage] ?? null
      : null,
    sourceLanguage: raw.sourceLanguage,
    extraLinks: (raw.extraLinks ?? []).map((link) => ({
      url: link.url,
      label: link.label[lang] ?? link.label.en,
    })),
  };
}
