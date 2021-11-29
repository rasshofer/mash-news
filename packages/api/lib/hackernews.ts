import axios from 'axios';
import axiosRetry from 'axios-retry';
import { decode } from 'he';
import { Handler, Item } from './types';
import { hashId, isValidUrl } from './utils';

axiosRetry(axios, {
  retries: 3,
});

const API_ENDPOINT = 'https://hacker-news.firebaseio.com/v0';

export type HackerNewsItemResult = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  text: string;
  time: number;
  title: string;
  url?: string;
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
};

export type HackerNewsResult = number[];

export type HackerNewsProps = {
  mode: 'new' | 'top' | 'best';
};

export const handler =
  ({ mode }: HackerNewsProps): Handler =>
  async () => {
    try {
      const { data: topStories } = await axios.get<HackerNewsResult>(
        `${API_ENDPOINT}/${mode}stories.json`
      );
      const items = await Promise.all(
        topStories.map(async (id) => {
          const { data } = await axios.get<HackerNewsItemResult>(
            `${API_ENDPOINT}/item/${id}.json`
          );
          return data;
        })
      );
      return items
        .map(
          (item): Item => ({
            id: hashId('hackernews', String(item.id)),
            type: 'article',
            url: item.url ?? `https://news.ycombinator.com/item?id=${item.id}`,
            title: decode(item.title),
            score: item.score || 0,
            date: new Date(item.time * 1000),
            source: 'hackernews',
          })
        )
        .filter((item) => isValidUrl(item.url));
    } catch (e) {
      console.error(
        `Error while importing "${mode}" from Hacker News: ${e.message}`
      );
      return [];
    }
  };
