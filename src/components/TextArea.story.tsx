import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TextArea from './TextArea';

const stories = storiesOf('TextArea', module);

stories.add(
  'Default configuration',
  () => <TextArea content="Default, is me" />,
  { info: { inline: true } }
);
