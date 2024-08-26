import { getIconSize } from '@/utils/size';
import {
	IoIosArrowDown,
	IoIosArrowBack,
	IoIosArrowForward,
} from 'react-icons/io';
import {
	IoSearch,
	IoPersonOutline,
	IoPerson,
	IoListOutline,
	IoList,
	IoHomeOutline,
	IoHome,
	IoTimeOutline,
	IoTime,
	IoCameraOutline,
	IoLogoInstagram,
	IoHappyOutline,
	IoReloadCircleOutline,
	IoAddCircle,
	IoCalendarClearOutline,
	IoCalendarClear,
	IoPencilOutline,
	IoEllipsisHorizontalSharp,
	IoTrash,
	IoAdd,
	IoTimerOutline,
	IoReaderOutline,
} from 'react-icons/io5';
import { IconProp } from './types';
import { LuDot } from 'react-icons/lu';
import { TbFaceIdError } from 'react-icons/tb';

type Prop = IconProp;

export function DownArrowIcon({ size = '', style, ...rest }: Prop) {
	return (
		<IoIosArrowDown
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
			color="white"
		/>
	);
}

/**
 * accent있는 아이콘은 네비게이션 아이콘
 */

export function IoPlanIcon({
	size = '',
	style,
	accent = false,
	...rest
}: Prop) {
	if (accent)
		return (
			<IoCalendarClear
				style={{ fontSize: getIconSize(size), ...style }}
				{...rest}
				color="white"
			/>
		);
	return (
		<IoCalendarClearOutline
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
			color="white"
		/>
	);
}

export function IoListIcon({
	size = '',
	style,
	accent = false,
	...rest
}: Prop) {
	if (accent)
		return (
			<IoList
				style={{ fontSize: getIconSize(size), ...style }}
				{...rest}
				color="white"
			/>
		);
	return (
		<IoListOutline
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
			color="white"
		/>
	);
}

export function IoTimeIcon({
	size = '',
	style,
	accent = false,
	...rest
}: Prop) {
	if (accent)
		return (
			<IoTime
				style={{ fontSize: getIconSize(size), ...style }}
				{...rest}
				color="white"
			/>
		);
	return (
		<IoTimeOutline
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
			color="white"
		/>
	);
}

export function IoPersonIcon({
	size = '',
	style,
	accent = false,
	...rest
}: Prop) {
	if (accent)
		return (
			<IoPerson
				style={{ fontSize: getIconSize(size), ...style }}
				{...rest}
				color="white"
			/>
		);
	return (
		<IoPersonOutline
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
			color="white"
		/>
	);
}

export function IoHomeIcon({
	size = '',
	style,
	accent = false,
	...rest
}: Prop) {
	if (accent)
		return (
			<IoHome
				style={{ fontSize: getIconSize(size), ...style }}
				{...rest}
				color="white"
			/>
		);
	return (
		<IoHomeOutline
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
			color="white"
		/>
	);
}

export function IoSearchIcon({ size = '', style, ...rest }: Prop) {
	return (
		<IoSearch
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
			color="white"
		/>
	);
}

export function IoLogoInstagramIcon({ size = '', style, ...rest }: Prop) {
	return (
		<IoLogoInstagram
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
			color="white"
		/>
	);
}

export function LuDotIcon({ size = '', style, color, ...rest }: Prop) {
	return (
		<LuDot
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
			color={color ? color : 'white'}
		/>
	);
}

export function IoIosArrowBackIcon({ size = '', style, color, ...rest }: Prop) {
	return (
		<IoIosArrowBack
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
		/>
	);
}

export function IoCameraOutlineIcon({
	size = '',
	style,
	color,
	...rest
}: Prop) {
	return (
		<IoCameraOutline
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
		/>
	);
}
export function IoIosArrowForwardIcon({
	size = '',
	style,
	color,
	...rest
}: Prop) {
	return (
		<IoIosArrowForward
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
		/>
	);
}

export function TbFaceIdErrorIcon({ size = '', style, color, ...rest }: Prop) {
	return (
		<TbFaceIdError
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
		/>
	);
}

export function IoHappyOutlineIcon({ size = '', style, color, ...rest }: Prop) {
	return (
		<IoHappyOutline
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
		/>
	);
}

export function IoReloadCircleOutlineIcon({
	size = '',
	style,
	color,
	...rest
}: Prop) {
	return (
		<IoReloadCircleOutline
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
		/>
	);
}

export function IoAddCircleIcon({ size = '', style, color, ...rest }: Prop) {
	return (
		<IoAddCircle style={{ fontSize: getIconSize(size), ...style }} {...rest} />
	);
}

export function IoPencilOutlineIcon({
	size = '',
	style,
	color,
	...rest
}: Prop) {
	return (
		<IoPencilOutline
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
		/>
	);
}

export function IoEllipsisHorizontalSharpIcon({
	size = '',
	style,
	color,
	...rest
}: Prop) {
	return (
		<IoEllipsisHorizontalSharp
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
		/>
	);
}

export function IoTrashIcon({ size = '', style, color, ...rest }: Prop) {
	return (
		<IoTrash style={{ fontSize: getIconSize(size), ...style }} {...rest} />
	);
}

export function IoAddIcon({ size = '', style, color, ...rest }: Prop) {
	return <IoAdd style={{ fontSize: getIconSize(size), ...style }} {...rest} />;
}

export function IoTimerOutlineIcon({ size = '', style, color, ...rest }: Prop) {
	return (
		<IoTimerOutline
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
		/>
	);
}

export function IoReaderOutlineIcon({
	size = '',
	style,
	color,
	...rest
}: Prop) {
	return (
		<IoReaderOutline
			style={{ fontSize: getIconSize(size), ...style }}
			{...rest}
		/>
	);
}
