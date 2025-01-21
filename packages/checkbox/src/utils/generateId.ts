// utils/generateId.ts
import { nanoid } from 'nanoid';

export const generateId = (prefix: string) => `${prefix}-${nanoid()}`;
