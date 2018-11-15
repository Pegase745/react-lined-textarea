import React from 'react';
import infoAddon from '@storybook/addon-info';
import { configure, setAddon, addDecorator } from '@storybook/react';

import Container from './Container';

addDecorator(story => <Container story={story} />);
setAddon(infoAddon);

function loadStories() {
  const req = require.context('../src/components', true, /\.story\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
