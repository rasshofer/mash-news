import axios from 'axios';
import axiosRetry from 'axios-retry';
import { decode } from 'he';
import { Handler, Item } from './types';
import { hashId, isValidUrl } from './utils';

axiosRetry(axios, {
  retries: 3,
});

const LIMIT = 100;

type RedditItem = {
  data: {
    title: string;
    permalink: string;
    downs: number;
    ups: number;
    score: number;
    created: number;
    thumbnail: 'self' | string;
    secure_media?: {
      type: string;
      oembed: {
        provider_url: string;
        version: string;
        type: string;
        title: string;
        html: string;
        author_name: string;
        provider_name: string;
        thumbnail_url: string;
      };
    };
    preview?: {
      images: [
        {
          source: {
            url: string;
            width: number;
            height: number;
          };
          resolutions: {
            url: string;
            width: number;
            height: number;
          }[];
        }
      ];
    };
    url: string;
    post_hint?: 'image' | 'link' | 'self' | 'hosted:video' | 'rich:video';
    is_video?: boolean;
  };
};

export type RedditResult = {
  data: {
    children: RedditItem[];
  };
};

export type RedditProps = {
  mode?: 'hot' | 'new' | 'random' | 'rising';
  subreddit?: string;
};

const getContentType = (item: RedditItem): Item['type'] => {
  if (
    item.data.is_video ||
    (item.data.post_hint && item.data.post_hint.endsWith(':video'))
  ) {
    return 'video';
  }
  if (item.data.post_hint === 'image') {
    return 'image';
  }
  return 'article';
};

export const handler =
  ({ mode, subreddit }: RedditProps): Handler =>
  async () => {
    try {
      const { data } = await axios.get<RedditResult>(
        mode
          ? `https://www.reddit.com/${mode}/.json?limit=${LIMIT}`
          : `https://www.reddit.com/r/${subreddit}/.json?limit=${LIMIT}`
      );

      return data.data.children
        .map((item): Item => {
          const image = decode(
            item.data.preview?.images[0].source.url ??
              (item.data.thumbnail !== 'self' ? item.data.thumbnail : '')
          );

          return {
            id: hashId('reddit', item.data.permalink),
            type: getContentType(item),
            url: decode(item.data.url),
            title: decode(item.data.title),
            image:
              image && isValidUrl(image)
                ? {
                    url: image,
                  }
                : undefined,
            score: item.data.score || 0,
            date: new Date(item.data.created * 1000),
            source: 'reddit',
          };
        })
        .filter((item) => isValidUrl(item.url));
    } catch (e) {
      console.error(
        `Error while importing "${mode ?? subreddit}" from Reddit: ${e.message}`
      );
      return [];
    }
  };
