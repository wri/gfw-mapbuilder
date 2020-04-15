import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { mapController } from '../../controllers/mapController';

import { RootState } from 'js/store';

import { downloadData } from '../../../../configs/modal.config';

//Extracting INFO from WebMaps
const getWebmapGroupContent = async (layer: any): Promise<any> => {
  // TODO [ ] IF metadata exists from ArcGIS, use it!
  //    const metadataURL = `${layer.url}/info/metadata`;
  //    const xmlResults = await fetch(metadataURL).then(res => res.text());
  //    const results = convert.xml2js(xmlResults); // uses module 'xml-js'
  //
  // TODO [ ] ELSE, use the description and summary instead
  console.log('layer', layer);
  if (layer.url) {
    return await fetch(`${layer.url}/?f=pjson`)
      .then(res => res.json())
      .then(results => {
        return {
          description: results.description,
          copyrightText: results.copyrightText
        };
      });
  } else {
    // do something!
  }
};

//Extracting info from Service Layers with technicalName
const getServiceGroupContent = async (technicalName: string): Promise<any> => {
  // const technicalName = 'recent_satellite_imagery';
  const baseURL = 'https://gis-gfw.wri.org/metadata';
  const metaURL = `${baseURL}/${technicalName}`;
  return await fetch(metaURL)
    .then(res => res.json())
    .then(results => {
      return results;
    });
};

const InfoContent: FunctionComponent<{}> = (): any => {
  const [content, setContent] = useState<any>('');
  const [dataLoading, setDataLoading] = useState(true);

  const { infoModalLayerID: layerID, selectedLanguage } = useSelector(
    (store: RootState) => store.appState
  );
  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );

  const layer = allAvailableLayers.filter(
    (layer: any) => layer.id === layerID
  )[0];

  useEffect(() => {
    const getWebmapContent = async (): Promise<void> => {
      mapController.testGrabMetadata(layer.id);
      //
      const results = await getWebmapGroupContent(layer);
      setContent(results);
      setDataLoading(false);
    };

    const getServiceContent = async (): Promise<void> => {
      if (layer.technicalName) {
        const results = await getServiceGroupContent(layer.technicalName);
        setContent(results);
        setDataLoading(false);
      }
    };

    const getRemoteContent = (): void => {
      const results = layer.metadata.metadata;
      setContent(results);
      setDataLoading(false);
    };

    if (layer.type === 'webmap') {
      getWebmapContent();
    } else if (layer.origin === 'service') {
      getServiceContent();
    } else {
      getRemoteContent();
    }
  }, []);

  const returnWebmapGroupContent = (): JSX.Element => {
    const { description, copyrightText } = content;

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
    } = content;

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
                dangerouslySetInnerHTML={{ __html: content.function }}
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

  const RenderLayerContent = (): any => {
    if (layer.type === 'webmap') {
      return returnWebmapGroupContent();
    } else if (layer.origin === 'service') {
      return returnOtherGroupContent();
    } else {
      return returnOtherGroupContent();
    }
  };

  return (
    <div className="info-content-container">
      {!dataLoading && <RenderLayerContent />}
    </div>
  );
};

export default InfoContent;
