import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import convert from 'xml-js';

import { RootState } from 'js/store';

import { downloadData } from '../../../../configs/modal.config';

const getMetadata = async (layer: any): Promise<any> => {
  let content: any;
  const metadataURL = `https://www.arcgis.com/sharing/rest/content/items/${layer.portalItemID}/info/metadata/metadata.xml`;
  const layerMetadataURL = `${layer.url}/info/metadata`;
  const xmlResults = await fetch(metadataURL).then(res => res.text());
  const layerXMLResults = await fetch(layerMetadataURL).then(res => res.text());
  const metadataExists = !xmlResults.includes('Error');
  const layerMetadataExists =
    !layerXMLResults.includes('Error') &&
    !layerXMLResults.includes('invalid request');

  if (metadataExists) {
    const results = convert.xml2js(xmlResults);
    const element = results.elements[0].elements.find(
      (element: any) => element.name === 'dataIdInfo'
    );

    const title = element.elements
      .find((element: any) => element.name === 'idCitation')
      .elements.find((subElement: any) => subElement.name === 'resTitle')
      .elements[0].text;
    const overview = element.elements.find(
      (element: any) => element.name === 'idAbs'
    ).elements[0].text;
    const functionOrPurpose = element.elements.find(
      (element: any) => element.name === 'idPurp'
    ).elements[0].text;

    content = {
      title,
      functionOrPurpose,
      overview
    };
  } else if (layerMetadataExists) {
    const results = convert.xml2js(layerXMLResults);
    const element = results.elements[0].elements.find(
      (element: any) => element.name === 'dataIdInfo'
    );

    const title = element.elements
      .find((element: any) => element.name === 'idCitation')
      .elements.find((subElement: any) => subElement.name === 'resTitle')
      .elements[0].text;
    const overview = element.elements.find(
      (element: any) => element.name === 'idAbs'
    ).elements[0].text;
    const functionOrPurpose = element.elements.find(
      (element: any) => element.name === 'idPurp'
    ).elements[0].text;

    content = {
      title,
      functionOrPurpose,
      overview
    };
  } else {
    content = {
      error: 'Information Unavailable'
    };
  }

  return content;
};

//Extracting INFO from WebMaps
const getWebmapGroupContent = async (layer: any): Promise<any> => {
  let content: any;
  const metadataURL = `https://www.arcgis.com/sharing/rest/content/items/${layer.portalItemID}/info/metadata/metadata.xml`;
  // const metadataURL = `${layer.url}/info/metadata`;
  const xmlResults = await fetch(metadataURL).then(res => res.text());

  const metadataExists = !xmlResults.includes('Error');

  if (metadataExists) {
    // * IF metadata exists from ArcGIS, use it!
    const results = convert.xml2js(xmlResults);

    const element = results.elements[0].elements.find(
      (element: any) => element.name === 'dataIdInfo'
    );

    const elementNames = element.elements.map((element: any) => element.name);

    const title = element.elements
      .find((element: any) => element.name === 'idCitation')
      .elements.find((subElement: any) => subElement.name === 'resTitle')
      .elements[0].text;
    const overview = element.elements.find(
      (element: any) => element.name === 'idAbs'
    ).elements[0].text;
    const functionOrPurpose = element.elements.find(
      (element: any) => element.name === 'idPurp'
    ).elements[0].text;

    if (elementNames.includes('dataExt')) {
      const geographicCoverage = element.elements
        .find((element: any) => element.name === 'dataExt')
        .elements.find((subElement: any) => subElement.name === 'exDesc')
        .elements[0].text;

      content = {
        title,
        functionOrPurpose,
        geographicCoverage,
        overview
      };
    } else {
      content = {
        title,
        functionOrPurpose,
        overview
      };
    }
  } else {
    // * ELSE, use the description and summary instead
    content = await fetch(
      `https://www.arcgis.com/sharing/rest/content/items/${layer.portalItemID}/?f=pjson`
    )
      .then(res => res.json())
      .then(results => {
        return {
          description: results.description,
          copyrightText: results.copyrightText
        };
      });
  }

  return content;
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
  const [content, setContent] = useState<any>({});
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
      const results = await getWebmapGroupContent(layer);
      setContent(results);
      setDataLoading(false);
    };

    const getServiceContent = async (): Promise<void> => {
      if (layer.technicalName) {
        // * if layer has technical name
        // * grab metadata from GFW metadata API
        const results = await getServiceGroupContent(layer.technicalName);
        setContent(results);
        setDataLoading(false);
      } else {
        // * else grab metadata from Arcgis
        const results = await getMetadata(layer);
        setContent(results);
        setDataLoading(false);
      }
    };

    const getRemoteContent = (): void => {
      const results = layer.metadata.metadata;
      setContent(results);
      setDataLoading(false);
    };

    console.log('LAYER!!!', layer);
    if (layer.type === 'webmap') {
      getWebmapContent();
    } else if (layer.origin === 'service') {
      getServiceContent();
    } else {
      getRemoteContent();
    }
  }, []);

  const returnWebmapGroupContent = (): JSX.Element | undefined => {
    if (content.title) {
      // * return metadata
      const {
        title,
        functionOrPurpose,
        geographicCoverage,
        overview
      } = content;
      return (
        <div className="header metadata">
          <h2>{title}</h2>
          <>
            <table>
              <tbody>
                <tr>
                  <td className="label">Function</td>
                  <td className="label-info">{functionOrPurpose}</td>
                </tr>
                {geographicCoverage && (
                  <tr>
                    <td className="label">Geographic Coverage</td>
                    <td className="label-info">{geographicCoverage}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
          <div className="overview-container">
            <h3>Overview</h3>
            <div dangerouslySetInnerHTML={{ __html: overview }} />
          </div>
        </div>
      );
    } else if (content.copyrightText) {
      // * return description & summary
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
    } else {
      console.warn('edge case in returnWebmapGroupContent()');
      return undefined;
    }
  };

  const returnOtherGroupContent = (): JSX.Element | undefined => {
    if (content && content.function) {
      // * if metadata cam from GFW metadata API
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
    } else if (content && content.functionOrPurpose) {
      // * if content came from metadata from GFW/ArcGIS endpount

      const { title, functionOrPurpose, overview } = content;

      return (
        <>
          <div className="header">
            <h2>{title}</h2>
            <table>
              <tbody>
                <tr>
                  <td className="label">Function</td>
                  <td
                    className="label-info"
                    dangerouslySetInnerHTML={{ __html: functionOrPurpose }}
                  />
                </tr>
              </tbody>
            </table>
            <div className="overview-container">
              <h3>Overview</h3>
              <div dangerouslySetInnerHTML={{ __html: overview }} />
            </div>
          </div>
        </>
      );
    } else if (content.error) {
      return (
        <>
          <div className="header">
            <h2>{content.error}</h2>
          </div>
        </>
      );
    } else {
      console.warn('edge case in returnOtherGroupContent()');
      return undefined;
    }
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
