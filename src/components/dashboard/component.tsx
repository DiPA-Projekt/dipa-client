import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { GenericComponent } from '@leanup/lib';

import { DashboardController } from './controller';

class DashboardComponent extends Component<RouteComponentProps<any>, {}> implements GenericComponent {
  public ctrl: DashboardController = new DashboardController({});

  public state = {};

  public render(): JSX.Element {
    return <></>;
  }
}

export const DashboardComponentWithRouter = withRouter(DashboardComponent);
