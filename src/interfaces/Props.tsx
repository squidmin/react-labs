import { ReactElement } from 'react';

export interface Props<T> {
  options: T[];
  renderItem: (item: T) => ReactElement;
}
