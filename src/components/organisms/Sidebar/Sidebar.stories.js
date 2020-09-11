import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import Sidebar from './Sidebar';

storiesOf('Organisms/Sidebar', module)
  .addDecorator(StoryRouter())
  .add('Note', () => <Sidebar pageType="note" />)
  .add('Twitter', () => <Sidebar pageType="twitter" />)
  .add('Articles', () => <Sidebar pageType="article" />);
