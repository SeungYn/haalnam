import { getIconSize } from '@/utils/size';
import { IoIosArrowDown } from 'react-icons/io';
import { IconProp } from './types';

type Prop = IconProp;

export function DownArrowIcon({ size, style, ...rest }: Prop) {
  return (
    <IoIosArrowDown
      style={{ fontSize: getIconSize(size), ...style }}
      {...rest}
      color='white'
    />
  );
}
