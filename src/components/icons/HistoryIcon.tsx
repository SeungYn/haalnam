import { AiOutlineHistory } from 'react-icons/ai';
import { IconProp } from './types';
import { getIconSize } from '@/utils/size';

type Prop = IconProp;

export default function HistoryIcon({ size }: Prop) {
  return (
    <AiOutlineHistory style={{ fontSize: getIconSize(size) }} color='white' />
  );
}
