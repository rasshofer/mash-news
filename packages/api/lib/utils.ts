import { createHash } from 'crypto';
import { Item } from './types';

const MAX_AGE = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

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

export const isRelevant = (item: Item): boolean => {
  return Date.now() - item.date.getTime() <= MAX_AGE;
};

export const cleanUp = (input: string): string =>
  input
    .trim()
    .replace(/^\[OC\]/g, '')
    .replace(/\[OC\]$/g, '')
    .replace(/^\(OC\)/g, '')
    .replace(/\(OC\)$/g, '')
    .trim();
