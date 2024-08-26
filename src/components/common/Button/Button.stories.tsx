import { StoryFn } from '@storybook/react';
import { Button } from './Button';

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
	size: 'large',
	children: '라지 사이즈',
	className: 'border border-red-400',
};

export const MediumButton = Template.bind({});
MediumButton.args = {
	size: 'medium',
	children: '미듐 사이즈',
	className: 'border border-red-400',
};

export const SmallButton = Template.bind({});
SmallButton.args = {
	size: 'small',
	children: '스몰 사이즈',
	className: 'border border-red-400',
};

const exportObj = {
	title: 'components/common/Button',
	component: Button,
};

export default exportObj;
