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
  date: Date;
  source: string;
};

export type Handler = () => Promise<Item[]>;

export type Topic = {
  emoji: string;
  slug: string;
  title: string;
  feeds: Handler[];
};

export type PublicTopic = Omit<Topic, 'feeds'>;
