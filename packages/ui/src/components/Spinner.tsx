import { FC } from 'react';

import './Spinner.scss';

export const Spinner: FC = () => {
  return (
    <div className="spinner">
      <div className="spinner__item spinner__item--1" />
      <div className="spinner__item spinner__item--2" />
      <div className="spinner__item spinner__item--3" />
    </div>
  );
};
