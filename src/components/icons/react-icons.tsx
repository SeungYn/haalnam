import { getIconSize } from '@/utils/size';
import {
	IoIosArrowDown,
	IoIosList,
	IoIosArrowBack,
	IoIosArrowForward,
} from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { IconProp } from './types';
import { LuDot } from 'react-icons/lu';

type Prop = IconProp;

export function DownArrowIcon({ size, style, ...rest }: Prop) {
	return (
		<IoIosArrowDown
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
			color="white"
		/>
	);
}

export function IoList({ size, style, ...rest }: Prop) {
	return (
		<IoIosList
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
			color="white"
		/>
	);
}

export function IoSearchIcon({ size, style, ...rest }: Prop) {
	return (
		<IoSearch
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
			color="white"
		/>
	);
}

export function LuDotIcon({ size, style, color, ...rest }: Prop) {
	return (
		<LuDot
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
			color={color ? color : 'white'}
		/>
	);
}

export function IoIosArrowBackIcon({ size, style, color, ...rest }: Prop) {
	return (
		<IoIosArrowBack
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
		/>
	);
}
export function IoIosArrowForwardIcon({ size, style, color, ...rest }: Prop) {
	return (
		<IoIosArrowForward
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
		/>
	);
}
