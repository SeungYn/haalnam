import { StoryFn } from '@storybook/react';
import { Time } from './Time';

const Template: StoryFn<typeof Time> = (args) => <Time {...args} />;

export const Default = Template.bind({});
Default.args = {
	hours: 1,
	minutes: 1,
	seconds: 1,
	milliseconds: 1,
};

const exportObj = {
	title: 'components/home/time',
	component: Time,
};

export default exportObj;
