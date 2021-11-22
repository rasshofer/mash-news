import { get } from './api';

export type Item = {
  id: string;
  type: 'article' | 'image' | 'video';
  url: string;
  title: string;
  image?: {
    url: string;
  };
  video?: {
    url: string;
  };
  score: number;
  date: string;
  source: 'reddit' | 'hackernews';
};

export type Topic = {
  emoji: string;
  slug: string;
  title: string;
  items: Item[];
  built: string;
};

export type ReducedTopic = Pick<Topic, 'emoji' | 'slug' | 'title'>;

export const fetchTopic = async (slug: string): Promise<Topic> =>
  get<Topic>(`/topics/${slug}.json`);
