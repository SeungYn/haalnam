import { Size } from '@/types';
import { IconBaseProps } from 'react-icons';

export type IconProp = {
	size?: Size;
	className?: string;
	accent?: boolean;
} & IconBaseProps;
