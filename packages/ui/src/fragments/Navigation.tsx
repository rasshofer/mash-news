import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useConfig } from '../services/config';

import './Navigation.scss';

export const Navigation: FC = () => {
  const config = useConfig();

  return (
    <div className="navigation">
      {config ? (
        <ul className="navigation__items">
          {config.topics.map((topic) => (
            <li key={topic.slug} className="navigation__item">
              <NavLink
                exact
                to={topic.slug === 'everything' ? '/' : `/${topic.slug}`}
                className="navigation__link"
                activeClassName="navigation__link--active"
              >
                {topic.emoji} {topic.title}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
