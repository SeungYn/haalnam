import { StoryFn } from '@storybook/react';
import { TimeMoney } from './TimeMoney';

const Template: StoryFn<typeof TimeMoney> = (args) => <TimeMoney {...args} />;

export const Default = Template.bind({});

Default.args = {
	time: 123123,
};

const exportObj = {
	title: 'components/home/time/TimeMoney',
	component: TimeMoney,
};
export default exportObj;
