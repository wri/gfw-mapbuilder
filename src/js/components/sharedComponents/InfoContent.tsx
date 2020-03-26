import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store';

const InfoContent: FunctionComponent<{}> = () => {
  const layerID = useSelector(
    (store: RootState) => store.appState.infoModalLayerID
  );
  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );

  const layer = allAvailableLayers.filter(
    (layer: any) => layer.id === layerID
  )[0];

  const RenderLayerContent = (): JSX.Element => {
    if (layer.metadata) {
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
        citation,
        title,
        subtitle
      } = metadata;

      return (
        <>
          <div className="header">
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
          </div>
          <table>
            <tbody>
              <tr>
                <td className="label">Function</td>
                <td
                  className="label-info"
                  dangerouslySetInnerHTML={{ __html: metadata.function }}
                />
              </tr>
              <tr>
                <td className="label">Resolution</td>
                <td
                  className="label-info"
                  dangerouslySetInnerHTML={{ __html: resolution }}
                />
              </tr>
              <tr>
                <td className="label">Tags</td>
                <td className="label-info">{tags}</td>
              </tr>
              <tr>
                <td className="label">Geographic Coverage</td>
                <td
                  className="label-info"
                  dangerouslySetInnerHTML={{ __html: geographic_coverage }}
                />
              </tr>
              <tr>
                <td className="label">Source</td>
                <td
                  className="label-info"
                  dangerouslySetInnerHTML={{ __html: source }}
                />
              </tr>
              <tr>
                <td className="label">Frequency</td>
                <td
                  className="label-info"
                  dangerouslySetInnerHTML={{ __html: frequency_of_updates }}
                />
              </tr>
              <tr>
                <td className="label">Date of Content</td>
                <td
                  className="label-info"
                  dangerouslySetInnerHTML={{ __html: date_of_content }}
                />
              </tr>
              <tr>
                <td className="label">Cautions</td>
                <td
                  className="label-info"
                  dangerouslySetInnerHTML={{ __html: cautions }}
                />
              </tr>
              <tr>
                <td className="label">License</td>
                <td
                  className="label-info"
                  dangerouslySetInnerHTML={{ __html: license }}
                />
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
          <div className="button-container">
            <button
              className="orange-button"
              onClick={(): void => console.log('download data!')}
            >
              Download Data
            </button>
          </div>
        </>
      );
    } else {
      console.log(
        "This layer doesn't have metadata to support this feature!",
        layer
      );
      return <></>;
    }
  };

  return (
    <div className="info-content-container">
      <RenderLayerContent />
    </div>
  );
};

export default InfoContent;
