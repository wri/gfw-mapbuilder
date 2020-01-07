import * as React from "react";
import { Mapview } from "./mapview/Mapview";
import { Hello } from "./Hello";
import "arcgis-js-api/themes/light/main.scss";
import "../../css/index.scss";
export function App() {
  return (
    <>
      <div>Hi</div>
      <Mapview />
    </>
  );
}
