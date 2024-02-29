import {Props} from "../interfaces/Props";
import { ReactElement } from 'react';

export function List<T>({options, renderItem}: Props<T>): ReactElement {
  return (
    <ul>
      {options.map(option => renderItem(option))}
    </ul>
  );
}
