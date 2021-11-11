import { FC } from 'react';
import { Item } from '../services/topics';

import './Grid.scss';

export type GridProps = {
  items: Item[];
};

export const Grid: FC<GridProps> = ({ items }) => {
  return (
    <div className="grid">
      {items.map((item) => (
        <a
          href={item.url}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={`grid__item grid__item--${
            item.image ? 'with' : 'without'
          }-visual`}
        >
          {item.image ? (
            <div className="grid__visual">
              <img
                src={item.image.url}
                alt=""
                className="grid__image"
                loading="lazy"
              />
            </div>
          ) : null}
          <div className="grid__title">{item.title}</div>
        </a>
      ))}
    </div>
  );
};
