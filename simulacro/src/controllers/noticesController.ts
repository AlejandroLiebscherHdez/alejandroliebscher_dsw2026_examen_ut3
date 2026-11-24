
import type { Request, Response, NextFunction } from 'express';
import * as noticesService from '../services/noticesService.js';
import { AppError } from '../errors/AppError.js';

export function list(req: Request, res: Response, next: NextFunction): void {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);
    const search = String(req.query.search ?? '');

    if (!Number.isInteger(page) || page < 1 ||
        !Number.isInteger(limit) || limit < 1) {
      throw new AppError(400, 'Invalid pagination', 'BAD_REQUEST');
    }

    res.json(noticesService.list(page, limit, search));
  } catch (err) {
    next(err);
  }
}

export function getById(req: Request, res: Response, next: NextFunction): void {
  try {
    const noticeId = String(req.params.noticeId);
    const notice = noticesService.getById(noticeId);

    if (!notice) {
      throw new AppError(404, 'Notice not found', 'NOT_FOUND');
    }

    res.json({ data: notice });
  } catch (err) {
    next(err);
  }
}

export function create(req: Request, res: Response, next: NextFunction): void {
  try {
    const { title, description } = req.body ?? {};

    if (typeof title !== 'string' || title.trim().length === 0 ||
        typeof description !== 'string' || description.trim().length === 0) {
      throw new AppError(400, 'Invalid notice data', 'BAD_REQUEST');
    }

    const notice = noticesService.create(title.trim(), description.trim());
    res.status(201).json({ data: notice });
  } catch (err) {
    next(err);
  }
}

export function update(req: Request, res: Response, next: NextFunction): void {
  try {
    const noticeId = String(req.params.noticeId);
    const { title, description } = req.body ?? {};

    if ((title !== undefined &&
         (typeof title !== 'string' || title.trim().length === 0)) ||
        (description !== undefined &&
         (typeof description !== 'string' || description.trim().length === 0))) {
      throw new AppError(400, 'Invalid notice data', 'BAD_REQUEST');
    }

    const notice = noticesService.update(noticeId, {
      title: title !== undefined ? title.trim() : undefined,
      description: description !== undefined ? description.trim() : undefined,
    });

    if (!notice) {
      throw new AppError(404, 'Notice not found', 'NOT_FOUND');
    }

    res.json({ data: notice });
  } catch (err) {
    next(err);
  }
}
