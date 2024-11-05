import type { Readable as R, Writable as W } from 'stream-browserify';
import { Buffer as B } from 'buffer/* ';
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface Date {
  getJulian: any;
}

declare global {
  let Readable: typeof R;
  let Writable: typeof W;
  let Buffer: typeof B;
}
global.Buffer = B;
global.Readable = R;
global.Writable = W;
