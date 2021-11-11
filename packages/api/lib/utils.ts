import { createHash } from 'crypto';
import { Item } from './types';

export const hashId = (prefix: string, id: string): string =>
  createHash('sha256').update(`${prefix}:${id}`).digest('hex');

export const sortItems = (items: Item[]): Item[] =>
  [...items].sort((a, b) => b.score - a.score);

export const getUniqueItems = (items: Item[]): Item[] =>
  items.filter(
    (file, index, self) =>
      self.findIndex((item) => item.url === file.url) === index
  );

export const sliceItems = (items: Item[]): Item[] => items.slice(0, 100);

export const isValidUrl = (url: string): boolean =>
  url.startsWith('http://') || url.startsWith('https://');
