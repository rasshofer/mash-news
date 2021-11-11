import { FC } from 'react';

import './Logo.scss';

export type LogoProps = {
  url: string;
};

export const Logo: FC<LogoProps> = ({ url }) => {
  return <img src={url} className="logo" alt="" />;
};
