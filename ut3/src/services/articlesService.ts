// Services layer: business logic and data. Plain TypeScript — it never
// imports Express nor touches req/res/next, so it can be tested without HTTP.

import { randomUUID } from 'node:crypto';

export interface Article {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface ArticleChanges {
  title?: string;
  description?: string;
}

// The in-memory array now lives here, not in the routes.
const articles: Article[] = [
  {
    id: 'aviso-1',
    title: 'Sin descripción',
    description: 'Reunión el lunes a las 10.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'aviso-2',
    title: 'Reunión de profesores',
    description: 'Reunión el martes a las 12.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'aviso-3',
    title: 'Examen de DWES',
    description: 'wddw',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'aviso-4',
    title: 'Sin descripción',
    description: 'Actividad el miércoles.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'aviso-5',
    title: 'Horario de biblioteca',
    description: 'Nuevo horario de biblioteca.',
    createdAt: new Date().toISOString(),
  },
];

export function list(page: number, limit: number,) {

  const filteredArticles= articles.filter(
(article) => article.description === 'Sin descripción',
);

  const start = (page - 1) * limit;
  return {
    data: articles.slice(start, start + limit),
    pagination: { page, limit, total: filteredArticles.length,},

  };
}

export function getById(id: string): Article | undefined {
  return articles.find((article) => article.id === id);
}

export function create(title: string, description: string): Article {
  const article: Article = {
    id: randomUUID(),
    title,
    description,
    createdAt: new Date().toISOString(),
  };
  articles.push(article);
  return article;
}

export function update(id: string, changes: ArticleChanges): Article | undefined {
  const article = getById(id);
  if (!article) {
    return undefined;
  }
  if (changes.title !== undefined) {
    article.title = changes.title;
  }
  if (changes.description !== undefined) {
    article.description = changes.description;
  }
  return article;
}
