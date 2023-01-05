import { Topic } from './types';
import { handler as reddit } from './reddit';
import { handler as hackernews } from './hackernews';

export const topics: Topic[] = [
  {
    emoji: '🔥',
    slug: 'hot',
    title: 'Hot',
    feeds: [
      reddit({
        mode: 'hot',
      }),
      hackernews({
        mode: 'top',
      }),
    ],
  },
  {
    emoji: '🖼️',
    slug: 'pictures',
    title: 'Pictures',
    feeds: [
      reddit({
        subreddit: 'pics',
      }),
    ],
  },
  {
    emoji: '📺️',
    slug: 'videos',
    title: 'Videos',
    feeds: [
      reddit({
        subreddit: 'videos',
      }),
    ],
  },
  {
    emoji: '👩‍💻',
    slug: 'technology',
    title: 'Technology',
    feeds: [
      reddit({
        subreddit: 'technology',
      }),
      reddit({
        subreddit: 'tech',
      }),
      reddit({
        subreddit: 'programming',
      }),
      reddit({
        subreddit: 'webdev',
      }),
      reddit({
        subreddit: 'engineering',
      }),
    ],
  },
  {
    emoji: '🔬',
    slug: 'science',
    title: 'Science',
    feeds: [
      reddit({
        subreddit: 'science',
      }),
    ],
  },
  {
    emoji: '🤑',
    slug: 'business-economy',
    title: 'Business & Economy',
    feeds: [
      reddit({
        subreddit: 'business',
      }),
      reddit({
        subreddit: 'economy',
      }),
      reddit({
        subreddit: 'startups',
      }),
    ],
  },
  {
    emoji: '🚀',
    slug: 'crypto',
    title: 'Crypto',
    feeds: [
      reddit({
        subreddit: 'cryptocurrency',
      }),
      reddit({
        subreddit: 'cryptomarkets',
      }),
      reddit({
        subreddit: 'bitcoinmarkets',
      }),
      reddit({
        subreddit: 'cryptocurrencytrading',
      }),
      reddit({
        subreddit: 'ethtrader',
      }),
      reddit({
        subreddit: 'cryptocurrencies',
      }),
      reddit({
        subreddit: 'altcoin',
      }),
      reddit({
        subreddit: 'ico',
      }),
      reddit({
        subreddit: 'bitcoin',
      }),
      reddit({
        subreddit: 'btc',
      }),
      reddit({
        subreddit: 'ethereum',
      }),
      reddit({
        subreddit: 'ripple',
      }),
      reddit({
        subreddit: 'litecoin',
      }),
      reddit({
        subreddit: 'monero',
      }),
      reddit({
        subreddit: 'stellar',
      }),
      reddit({
        subreddit: 'binance',
      }),
      reddit({
        subreddit: 'coinbase',
      }),
      reddit({
        subreddit: 'ledgerwallet',
      }),
      reddit({
        subreddit: 'defi',
      }),
      reddit({
        subreddit: 'nft',
      }),
      reddit({
        subreddit: 'opensea',
      }),
      reddit({
        subreddit: 'rarible',
      }),
      reddit({
        subreddit: 'foundation',
      }),
      reddit({
        subreddit: 'cryptoart',
      }),
      reddit({
        subreddit: 'decentraland',
      }),
    ],
  },
  {
    emoji: '📚️',
    slug: 'education',
    title: 'Education',
    feeds: [
      reddit({
        subreddit: 'education',
      }),
      reddit({
        subreddit: 'teaching',
      }),
      reddit({
        subreddit: 'universityofreddit',
      }),
      reddit({
        subreddit: 'todayastudent',
      }),
      reddit({
        subreddit: 'teachingmaterials',
      }),
      reddit({
        subreddit: 'facultylounge',
      }),
      reddit({
        subreddit: 'matheducation',
      }),
    ],
  },
  {
    emoji: '🎮️',
    slug: 'gaming',
    title: 'Gaming',
    feeds: [
      reddit({
        subreddit: 'gaming',
      }),
      reddit({
        subreddit: 'esports',
      }),
    ],
  },
  {
    emoji: '🏅',
    slug: 'sports',
    title: 'Sports',
    feeds: [
      reddit({
        subreddit: 'sports',
      }),
    ],
  },
  {
    emoji: '🏛️',
    slug: 'politics',
    title: 'Politics',
    feeds: [
      reddit({
        subreddit: 'politics',
      }),
    ],
  },
  {
    emoji: '🎭️',
    slug: 'arts-entertainment',
    title: 'Arts & Entertainment',
    feeds: [
      reddit({
        subreddit: 'art',
      }),
      reddit({
        subreddit: 'entertainment',
      }),
    ],
  },
];
