import { FC, ReactNode } from 'react';

import './Skeleton.scss';

export type SkeletonProps = {
  header: ReactNode;
  nav: ReactNode;
  main: ReactNode;
  footer?: ReactNode;
};

export const Skeleton: FC<SkeletonProps> = ({ header, nav, main, footer }) => {
  return (
    <div className="skeleton">
      <div className="skeleton__header">{header}</div>
      <div className="skeleton__nav">{nav}</div>
      <div className="skeleton__main">{main}</div>
      {footer ? <div className="skeleton__footer">{footer}</div> : null}
    </div>
  );
};
