import type { Request, Response, NextFunction } from 'express';
import * as noticesService from '../services/noticesService.js';
import { AppError } from '../errors/AppError.js';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError.js';

// Ejercicio 7: adaptado de documentsController.list (Los Gallos).
// req.query recibe page, limit y search de la URL. El servicio filtra y pagina.
export function list(req: Request, res: Response, next: NextFunction): void {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 2);
    const search = String(req.query.search ?? '');

    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1) {
      throw new AppError(400, 'Invalid pagination', 'BAD_REQUEST');
    }

    res.json(noticesService.list(page, limit, search));
  } catch (err) {
    next(err);
  }
}

// Ejercicio 8: adaptado de documentsController.getById.
// Si no existe el aviso, propagamos ResourceNotFoundError al errorHandler.
export function getById(req: Request, res: Response, next: NextFunction): void {
  try {
    const noticeId = String(req.params.noticeId);
    const notice = noticesService.getById(noticeId);

    if (!notice) {
      throw new ResourceNotFoundError(
        404,
        `Notice with id '${noticeId}' not found`,
        'RESOURCE_NOT_FOUND',
        noticeId,
      );
    }

    res.json({ data: notice });
  } catch (err) {
    next(err);
  }
}

// Ejercicio 8: adaptado de documentsController.create.
// description es opcional: si falta se guarda '' y si llega debe ser string.
export function create(req: Request, res: Response, next: NextFunction): void {
  try {
    const { title, description } = req.body ?? {};

    if (typeof title !== 'string' || title.trim().length === 0) {
      throw new AppError(400, 'Title must be a non-empty string', 'INVALID_TITLE');
    }

    if (description !== undefined && typeof description !== 'string') {
      throw new AppError(400, 'Description must be a string', 'INVALID_DESCRIPTION');
    }

    const notice = noticesService.create(
      title.trim(),
      description === undefined ? '' : description.trim(),
    );
    res.status(201).json({ data: notice });
  } catch (err) {
    next(err);
  }
}

// Ejercicio 8: adaptado de documentsController.update (PATCH parcial).
// Validamos todos los campos ANTES de modificar cualquier dato en el servicio.
export function update(req: Request, res: Response, next: NextFunction): void {
  try {
    const noticeId = String(req.params.noticeId);
    const { title, description } = req.body ?? {};

    if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
      throw new AppError(400, 'Title must be a non-empty string', 'INVALID_TITLE');
    }

    if (description !== undefined && typeof description !== 'string') {
      throw new AppError(400, 'Description must be a string', 'INVALID_DESCRIPTION');
    }

    const notice = noticesService.update(noticeId, {
      title: title !== undefined ? title.trim() : undefined,
      description: description !== undefined ? description.trim() : undefined,
    });

    if (!notice) {
      throw new ResourceNotFoundError(
        404,
        `Notice with id '${noticeId}' not found`,
        'RESOURCE_NOT_FOUND',
        noticeId,
      );
    }

    res.json({ data: notice });
  } catch (err) {
    next(err);
  }
}
