import React from 'react';
// import { inject } from 'mobx-react';

import { Badge } from '@storybook/components';
import { controlOrMetaKey, optionOrAlt } from '../../../components/src/treeview/utils';
import Nav from '../components/nav/nav';

import { Consumer } from '../core/context';

export const mapper = ({ state, manager }) => {
  const {
    uiOptions: { name, url },
    notifications,
    ui: { isFullscreen, showPanel, showNav, panelPosition },
  } = state;

  return {
    title: name,
    url,
    notifications,
    stories: state.storiesHash,
    menu: [
      {
        id: 'about',
        title: 'About your storybook',
        action: () => manager.navigate('/settings/about'),
        detail: <Badge>Update</Badge>,
        icon: '',
      },
      {
        id: 'F',
        title: 'Go Fullscreen',
        action: () => manager.toggleFullscreen(),
        detail: 'F',
        icon: isFullscreen ? 'check' : '',
      },
      {
        id: 'S',
        title: 'Toggle Panel',
        action: () => manager.togglePanel(),
        detail: 'D',
        icon: showPanel ? 'check' : '',
      },
      {
        id: 'D',
        title: 'Toggle Panel Position',
        action: () => manager.togglePanelPosition(),
        detail: 'G',
        icon: panelPosition === 'bottom' ? 'bottombar' : 'sidebaralt',
      },
      {
        id: 'A',
        title: 'Toggle Navigation',
        action: () => manager.toggleNav(),
        detail: 'S',
        icon: showNav ? 'check' : '',
      },
      {
        id: '/',
        title: 'Search',
        action: () => console.log('search'),
        detail: '/',
        icon: 'search',
      },
      {
        id: 'up',
        title: 'Previous component',
        action: () => manager.jumpToComponent(-1),
        detail: `${optionOrAlt()} ↑`,
        icon: '',
      },
      {
        id: 'down',
        title: 'Next component',
        action: () => manager.jumpToComponent(1),
        detail: `${optionOrAlt()} ↓`,
        icon: '',
      },
      {
        id: 'prev',
        title: 'Previous story',
        action: () => manager.jumpToStory(-1),
        detail: `${optionOrAlt()} ←`,
        icon: '',
      },
      {
        id: 'next',
        title: 'Next story',
        action: () => manager.jumpToStory(1),
        detail: `${optionOrAlt()} →`,
        icon: '',
      },
      {
        id: 'shortcuts',
        title: 'Customize Storybook Hotkeys',
        action: () => manager.navigate('/settings/shortcuts'),
        detail: `⇧ ${controlOrMetaKey()} ,`,
        icon: 'wrench',
      },
    ],
  };
};

// export default inject(({ store, manager }) => mapper({ store, manager }))(Nav);

export default props => (
  <Consumer>
    {({ state, manager }) => {
      console.log('Render NAV');
      const customProps = mapper({ state, manager });
      return <Nav {...props} {...customProps} />;
    }}
  </Consumer>
);
