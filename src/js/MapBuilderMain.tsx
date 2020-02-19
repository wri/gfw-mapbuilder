import * as React from 'react';
import App from './components/App';
import { AppSettings } from './store/appSettings/types';

export class MapBuilderMain extends React.Component<AppSettings | {}, {}> {
  render(): React.ReactElement {
    return <App {...this.props} />;
  }
}
