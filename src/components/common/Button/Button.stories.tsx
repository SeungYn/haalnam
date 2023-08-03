import { StoryFn } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'components/common/Button',
  component: Button,
};

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'large',
  children: '라지 사이즈',
  className: 'border border-red-400',
};

export const mediumButton = Template.bind({});
mediumButton.args = {
  size: 'medium',
  children: '미듐 사이즈',
  className: 'border border-red-400',
};

export const smallButton = Template.bind({});
smallButton.args = {
  size: 'small',
  children: '스몰 사이즈',
  className: 'border border-red-400',
};
