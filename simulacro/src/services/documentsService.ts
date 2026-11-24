import { randomUUID } from 'node:crypto';

export interface DocumentItem {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
}

export interface DocumentChanges {
  title?: string;
  description?: string;
}

// Array en memoria para almacenar los documentos temporalmente
const documents: DocumentItem[] = [];

export function list(page: number, limit: number) {
  const start = (page - 1) * limit;
  return {
    data: documents.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total: documents.length,
    },
  };
}

export function getById(id: string): DocumentItem | undefined {
  return documents.find((d) => d.id === id);
}

export function create(title: string, description?: string): DocumentItem {
  const newDoc: DocumentItem = {
    id: randomUUID(),
    title,
    ...(description ? { description } : {}),
    createdAt: new Date().toISOString(),
  };

  documents.push(newDoc);
  return newDoc;
}

export function update(id: string, changes: DocumentChanges): DocumentItem | undefined {
  const document = getById(id);
  if (!document) {
    return undefined;
  }

  if (changes.title !== undefined) {
    document.title = changes.title;
  }

  if (changes.description !== undefined) {
    document.description = changes.description;
  }

  return document;
}