import { writeFileSync } from 'fs';
import { resolve } from 'path';
import mkdirp from 'mkdirp';
import { topics } from '../lib/topics';
import { Item, PublicTopic } from '../lib/types';
import { getUniqueItems, sliceItems, sortItems } from '../lib/utils';

const DIST_DIR = resolve(__dirname, '..', 'dist');
const TOPICS_DIR = resolve(DIST_DIR, 'topics');
const EVERYTHING_TOPIC = {
  emoji: '📰',
  slug: 'everything',
  title: 'Everything',
} as const;

(async () => {
  await mkdirp(DIST_DIR);
  await mkdirp(TOPICS_DIR);

  const everything: Item[] = [];

  for (const { slug, emoji, title, feeds } of topics) {
    const items = (
      await Promise.all(feeds.map(async (feed) => await feed()))
    ).flat();

    writeFileSync(
      resolve(TOPICS_DIR, `${slug}.json`),
      JSON.stringify({
        slug,
        emoji,
        title,
        items: sliceItems(sortItems(getUniqueItems(items))),
        built: new Date(),
      })
    );

    console.log(
      `Imported ${items.length} item${
        items.length === 1 ? '' : 's'
      } for "${title}"`
    );

    everything.push(...items);
  }

  writeFileSync(
    resolve(TOPICS_DIR, 'everything.json'),
    JSON.stringify({
      ...EVERYTHING_TOPIC,
      items: sliceItems(sortItems(getUniqueItems(everything))),
      built: new Date(),
    })
  );

  console.log(
    `Consolidated ${everything.length} item${
      everything.length === 1 ? '' : 's'
    } for "Everything"`
  );

  const index: PublicTopic[] = [
    EVERYTHING_TOPIC,
    ...topics.map(({ emoji, slug, title }) => ({
      emoji,
      slug,
      title,
    })),
  ];

  writeFileSync(
    resolve(DIST_DIR, 'config.json'),
    JSON.stringify({
      built: new Date(),
      topics: index,
    })
  );

  console.log('Wrote config entrypoint');
})();
