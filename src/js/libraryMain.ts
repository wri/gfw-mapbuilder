// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// // import { Provider } from 'react-redux';
// import App from './components/App';
// // import '../../configs/dojoConfig';
// // import store from './store/index';

// // ReactDOM.render(
// //   <Provider store={store}>
// //     <App namme='luke' />
// //   </Provider>,
// //   document.getElementById('lib-main')
// // );
// export default class MapBuilder {
//     config: object;
//     constructor(config: object) {
//         this.config = config;
//         this.init();
//     }

//     init(): any {
//         console.log(this.config);
//         // return <App config={this.config} />;
//         // return <App />;
//     }

//     // render(): any {
//     //     '<p>Hey</p>'
//     //     // return {
//     //     //     <p>Hey</p>;
//     //     // }
//     // }

// }

// // export { MapBuilder }

export default class MapBuilder {
  config: object;
  constructor(config: object) {
    this.config = config;
    console.log('ccc', this.config);
  }
}
// return MapBuilder;

// export function MapBuilder:any () => {
//         // config: object;
//         // constructor(config: object) {
//         //     this.config = config;
//         //     console.log('ccc', this.config);
//         // }

// }
// export const render = () => (
//   // Some other JSX

// );
