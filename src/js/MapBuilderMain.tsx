import * as React from 'react';
import App from './components/App';

export class MapBuilderMain extends React.Component<any, {}> {
  render(): any {
    console.log(this.props);
    return <App {...this.props} />;
  }
}
