import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store';

const InfoContent: FunctionComponent<{}> = () => {
  const layerID = useSelector(
    (store: RootState) => store.appState.renderInfoModal
  );
  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );

  const layer = allAvailableLayers.filter(
    (layer: any) => layer.id === layerID
  )[0];

  const RenderLayerContent = (): JSX.Element => {
    if (!layer.metadata) {
      console.log(
        "This layer doesn't have metadata to support this feature!",
        layer
      );
      return <></>;
    }

    const { metadata } = layer.metadata as any;
    const {
      resolution,
      tags,
      geographic_coverage,
      source,
      frequency_of_updates,
      date_of_content,
      cautions,
      license,
      overview,
      citation
    } = metadata;

    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>Function</td>
              <td dangerouslySetInnerHTML={{ __html: metadata.function }} />
            </tr>
            <tr>
              <td>Resolution</td>
              <td dangerouslySetInnerHTML={{ __html: resolution }} />
            </tr>
            <tr>
              <td>Tags</td>
              <td>{tags}</td>
            </tr>
            <tr>
              <td>Geographic Coverage</td>
              <td dangerouslySetInnerHTML={{ __html: geographic_coverage }} />
            </tr>
            <tr>
              <td>Source</td>
              <td dangerouslySetInnerHTML={{ __html: source }} />
            </tr>
            <tr>
              <td>Frequency</td>
              <td dangerouslySetInnerHTML={{ __html: frequency_of_updates }} />
            </tr>
            <tr>
              <td>Date of Content</td>
              <td dangerouslySetInnerHTML={{ __html: date_of_content }} />
            </tr>
            <tr>
              <td>Cautions</td>
              <td dangerouslySetInnerHTML={{ __html: cautions }} />
            </tr>
            <tr>
              <td>License</td>
              <td dangerouslySetInnerHTML={{ __html: license }} />
            </tr>
          </tbody>
        </table>
        <div className="overview-container">
          <h3>Overview</h3>
          <div dangerouslySetInnerHTML={{ __html: overview }} />
        </div>
        <div className="citation-container">
          <h4>Citation</h4>
          <div dangerouslySetInnerHTML={{ __html: citation }} />
        </div>
      </>
    );
  };

  return (
    <div>
      <RenderLayerContent />
    </div>
  );
};

export default InfoContent;
