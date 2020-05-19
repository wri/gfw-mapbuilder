interface InitExtentConfig {
  x: string | number;
  y: string | number;
  z: string | number;
}

interface Result {
  center: number[] | null;
  zoom: number | null;
}
export function parseExtentConfig(initialExtent: InitExtentConfig): Result {
  const result: Result = {
    center: null,
    zoom: null
  };

  //Check if both x/y values exist
  if (initialExtent.hasOwnProperty('x') && initialExtent.hasOwnProperty('y')) {
    // Check if both values are non empty strings
    if (
      typeof initialExtent.x === 'string' &&
      initialExtent.x.length !== 0 &&
      typeof initialExtent.y === 'string' &&
      initialExtent.y.length !== 0
    ) {
      result.center = [];
      result.center[0] = Number(initialExtent.x);
      result.center[1] = Number(initialExtent.y);
    } else if (
      typeof initialExtent.x === 'number' &&
      typeof initialExtent.y === 'number'
    ) {
      result.center = [];
      result.center[0] = Number(initialExtent.x);
      result.center[1] = Number(initialExtent.y);
    }
  }

  //Same checks for Z value (existance and empty string)
  if (initialExtent.hasOwnProperty('z')) {
    if (typeof initialExtent.z === 'string' && initialExtent.z.length !== 0) {
      result.zoom = Number(initialExtent.z);
    } else if (typeof initialExtent.z === 'number') {
      result.zoom = Number(initialExtent.z);
    }
  }

  return result;
}
