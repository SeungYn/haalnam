import { StoryFn } from '@storybook/react';
import { Time } from './Time';

export default {
  title: 'components/home/time',
  component: Time,
};

const Template: StoryFn<typeof Time> = (args) => <Time {...args} />;

export const Default = Template.bind({});
Default.args = {
  hours: 1,
  minutes: 1,
  seconds: 1,
  milliseconds: 1,
};
