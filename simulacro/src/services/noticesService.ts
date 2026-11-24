
import { randomUUID } from 'node:crypto';

export interface Notice {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface NoticeChanges {
  title?: string;
  description?: string;
}

const notices: Notice[] = [
  {
    id: 'aviso-1',
    title: 'Reunión de alumnos',
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
    description: 'Examen el viernes.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'aviso-4',
    title: 'Actividad del centro',
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

export function list(page: number, limit: number, search = '') {
  const filtered = notices.filter((notice) =>
    notice.title.toLowerCase().includes(search.toLowerCase()),
  );

  const start = (page - 1) * limit;

  return {
    data: filtered.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total: filtered.length,
    },
  };
}

export function getById(id: string): Notice | undefined {
  return notices.find((notice) => notice.id === id);
}

export function create(title: string, description: string): Notice {
  const newNotice: Notice = {
    id: randomUUID(),
    title,
    description,
    createdAt: new Date().toISOString(),
  };

  notices.push(newNotice);
  return newNotice;
}

export function update(id: string, changes: NoticeChanges): Notice | undefined {
  const notice = getById(id);

  if (!notice) {
    return undefined;
  }

  if (changes.title !== undefined) {
    notice.title = changes.title;
  }

  if (changes.description !== undefined) {
    notice.description = changes.description;
  }

  return notice;
}
