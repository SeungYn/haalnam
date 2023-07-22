import { AiOutlineHome } from 'react-icons/ai';
import { IconProp } from './types';
import { getIconSize } from '@/utils/size';

type Prop = IconProp;

export default function HomeIcon({ size }: Prop) {
  return (
    <AiOutlineHome style={{ fontSize: getIconSize(size) }} color='white' />
  );
}
