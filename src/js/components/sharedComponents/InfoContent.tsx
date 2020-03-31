import React, { FunctionComponent, useEffect, useState } from 'react';
// import convert from 'xml-js';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store';

import { downloadData } from '../../../../configs/modal.config';

const InfoContent: FunctionComponent<{}> = (): any => {
  const [customContent, setCustomContent] = useState({
    description: '',
    copyrightText: ''
  });

  const { infoModalLayerID: layerID, selectedLanguage } = useSelector(
    (store: RootState) => store.appState
  );
  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );

  const layer = allAvailableLayers.filter(
    (layer: any) => layer.id === layerID
  )[0];

  const getWebmapGroupContent = async (): Promise<any> => {
    // TODO [ ] IF metadata exists from ArcGIS, use it!
    //    const metadataURL = `${layer.url}/info/metadata`;
    //    const xmlResults = await fetch(metadataURL).then(res => res.text());
    //    const results = convert.xml2js(xmlResults);
    //
    // TODO [ ] ELSE, use the description and summary instead

    return await fetch(`${layer.url}/?f=pjson`)
      .then(res => res.json())
      .then(results => {
        return {
          description: results.description,
          copyrightText: results.copyrightText
        };
      });
  };

  useEffect(() => {
    const grabContent = async (): Promise<void> => {
      const contentResults = await getWebmapGroupContent();
      setCustomContent(contentResults);
    };

    if (layer.type === 'webmap') {
      grabContent();
    }
  }, []);

  const returnWebmapGroupContent = (): JSX.Element => {
    const { description, copyrightText } = customContent;

    return (
      <>
        <div className="header">
          <h2>{layer.title}</h2>
          {description.length || copyrightText.length ? (
            <>
              <table>
                <tbody>
                  <tr>
                    <td className="label">Description</td>
                    <td className="label-info">{description}</td>
                  </tr>
                  <tr>
                    <td className="label">License</td>
                    <td className="label-info">{copyrightText}</td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <>
              <h3>No information available</h3>
            </>
          )}
        </div>
      </>
    );
  };

  const returnOtherGroupContent = (): JSX.Element => {
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
      subtitle,
      download_data
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
        {download_data && (
          <div className="button-container">
            <a href={download_data} target="_blank" rel="noopener noreferrer">
              <button className="orange-button">
                {downloadData[selectedLanguage]
                  ? downloadData[selectedLanguage]
                  : 'Download Data'}
              </button>
            </a>
          </div>
        )}
      </>
    );
  };

  const RenderLayerContent = (): JSX.Element => {
    if (layer.type === 'webmap') {
      return returnWebmapGroupContent();
    } else {
      return returnOtherGroupContent();
    }
  };

  return (
    <div className="info-content-container">
      <RenderLayerContent />
    </div>
  );
};

export default InfoContent;
