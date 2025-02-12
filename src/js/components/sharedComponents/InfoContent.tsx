/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useEffect, useState } from 'react';
import convert from 'xml-js';
import { useSelector } from 'react-redux';
import { RootState } from '../../../js/store';
import { infoContent } from '../../../../configs/translations/modal.tanslations';

import { METADATA_CONFIG } from '../../../../configs/metadata/metadata-config';

function createMarkup(content: any) {
  return { __html: content };
}

interface MetadataContent {
  title?: string;
  functionOrPurpose?: string;
  geographicCoverage?: string;
  tags?: string;
  overview?: string;
}

const returnMetadataContent = (xmlResults: any) => {
  const content: MetadataContent = {};
  const results = convert.xml2js(xmlResults);
  const element = results.elements[0].elements.find((element: any) => element.name === 'dataIdInfo');
  const elementNames = element.elements.map((element: any) => element.name);

  content.title = element.elements
    .find((element: any) => element.name === 'idCitation')
    .elements.find((subElement: any) => subElement.name === 'resTitle').elements[0].text;
  content.overview = element.elements.find((element: any) => element.name === 'idAbs').elements[0].text;
  content.functionOrPurpose = element.elements.find((element: any) => element.name === 'idPurp').elements[0].text;

  if (elementNames.includes('dataExt')) {
    content.geographicCoverage = element.elements
      .find((element: any) => element.name === 'dataExt')
      .elements.find((subElement: any) => subElement.name === 'exDesc').elements[0].text;
  }

  return content;
};

const getMetadata = async (layer: any, sharinghost: RootState['appSettings']['sharinghost']): Promise<any> => {
  let content: any;
  if (layer.portalItemID) {
    const metadataURL = `${sharinghost}/sharing/rest/content/items/${layer.portalItemID}/info/metadata/metadata.xml`;
    const layerMetadataURL = `${layer.url}/info/metadata`;
    const xmlResults = await fetch(metadataURL).then((res) => res.text());
    const layerXMLResults = await fetch(layerMetadataURL).then((res) => res.text());
    const metadataExists = !xmlResults.includes('Error');
    const layerMetadataExists = !layerXMLResults.includes('Error') && !layerXMLResults.includes('invalid request');
    if (metadataExists) {
      return (content = returnMetadataContent(xmlResults));
    } else if (!metadataExists && layerMetadataExists) {
      return (content = returnMetadataContent(layerXMLResults));
    }
  }
  return content;
};

//Extracting INFO from WebMaps
const getWebmapGroupContent = async (
  layer: any,
  sharinghost: RootState['appSettings']['sharinghost']
): Promise<MetadataContent> => {
  let content: any;
  const metadataURL = `${sharinghost}/sharing/rest/content/items/${layer.portalItemID}/info/metadata/metadata.xml`;
  const xmlResults = await fetch(metadataURL).then((res) => res.text());

  const metadataExists = !xmlResults.includes('Error');

  if (metadataExists) {
    // * IF metadata exists from ArcGIS, use it!

    content = returnMetadataContent(xmlResults);
  } else {
    // * if portalItemID exists, fetch info w/ it

    if (layer.portalItemID) {
      const results = await fetch(`${sharinghost}/sharing/rest/content/items/${layer.portalItemID}/?f=pjson`)
        .then((res) => res.json())
        .then((results) => {
          return {
            description: results.description,
            copyrightText: results.copyrightText,
            tags: results.tags,
          };
        });

      content = results;
    } else {
      // * ELSE, fetch info via layer URL

      const results = await fetch(`${layer.url}/?f=pjson`)
        .then((res) => res.json())
        .then((results) => {
          return {
            description: results.description,
            copyrightText: results.copyrightText,
          };
        });

      content = results;
    }
  }

  return content as MetadataContent;
};

//Extracting info from Service Layers with technicalName
const getServiceGroupContent = async (technicalName: string): Promise<any> => {
  const baseURL = 'https://production-api.globalforestwatch.org/v1/gfw-metadata';
  const metaURL = `${baseURL}/${technicalName}`;

  return await fetch(metaURL)
    .then((res) => res.json())
    .then((results) => {
      return results;
    });
};

/* const testM = {
  en: {
    map_service: '',

    agol_id: '',

    carto_table: '',
    amazon_link: '',
    other: '',
  },
}; */

/* const metadata = {
  layerId: 'TREE_COVER_LOSS',

  en: {
    title: 'Tree cover loss',
    subtitle: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
    download_data: 'https://storage.googleapis.com/earthenginepartners-hansen/GFC-2023-v1.11/download.html',
    lean_more: 'http://science.sciencemag.org/content/342/6160/850',
    content: [
      {
        label: 'Function',
        value: '<p>Identifies areas of gross tree cover loss</p>',
      },

      {
        label: 'Resolution',
        value: '<p>30 × 30 meters</p>',
      },
      {
        label: 'Tags',
        value: 'Forest Change',
      },

      {
        label: 'Geographic coverage',
        value: '<p>Global land area (excluding Antarctica and other Arctic islands).</p>',
      },
      {
        label: 'Source',
        value:
          '<p>Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “High-Resolution Global Maps of 21st-Century Forest Cover Change.” <em>Science</em> 342 (15 November): 850–53. Data available from: <a href="http://earthenginepartners.appspot.com/science-2013-global-forest">earthenginepartners.appspot.com/science-2013-global-forest</a>.</p>',
      },
      {
        label: 'Frequency',
        value: '<p>Annual</p>',
      },

      {
        label: 'Date of content',
        value: '<p>2001-2023</p>',
      },
      {
        label: 'Cautions',
        value:
          '<p>" and 97 percent confident that it occurred within a year before or after. Users of the data can smooth out such uncertainty by examining the average over multiple years. Read our <a href="http://blog.globalforestwatch.org/data/how-accurate-is-accurate-enough-examining-the-glad-global-tree-cover-change-data-part-1.html">blog series</a> on the accuracy of this data for more information."</p>',
      },
      {
        label: 'License',
        value: '<p><a href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></p>',
      },
      { label: 'Overview', value: '<p>on the accuracy of this data for more information.</p>' },

      {
        label: 'Citation',
        value:
          '<p> Data available on-line from:http://earthenginepartners.appspot.com/science-2013-global-forest. Accessed through Global Forest Watch on [date]. www.globalforestwatch.org <br>"</p>',
      },
    ],
  },
}; */

/* const metadataInfo = {
  TREE_COVER_LOSS: metadata,
}; */

const InfoContent: FunctionComponent<{}> = (): any => {
  const [content, setContent] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const sharinghost = useSelector((state: RootState) => state.appSettings.sharinghost);
  const { infoModalLayerID: layerID, selectedLanguage } = useSelector((store: RootState) => store.appState);
  const { allAvailableLayers } = useSelector((store: RootState) => store.mapviewState);
  const layer = allAvailableLayers.filter((layer: any) => layer.id === layerID)[0];

  const {
    functionLabel,
    resolutionLabel,
    geographicCoverageLabel,
    sourceLabel,
    frequencyLabel,
    contentDateLabel,
    contentDateRangeLabel,
    citationLabel,
    cautionLabel,
    licenseLabel,
    downloadDataLabel,
    descriptionLabel,
    noInfoLabel,
    overviewLabel,
  } = infoContent[selectedLanguage];

  useEffect(() => {
    /* const getWebmapContent = async (): Promise<void> => {
      const results = await getWebmapGroupContent(layer, sharinghost);

      setContent(results);
      setDataLoading(false);
    }; */
    const checkForURLParams = () => {
      const url = new URL(window.location.href);
      const params = url.searchParams;
      const appid = params.get('appid');
      //const s = appid;
      if (appid) return true;
      return false;
    };

    const getMetadataFromLayer = () => {
      if (!layer?.metadata) {
        setContent(null);
        setDataLoading(false);
        return;
      }

      const metadataContent = layer?.metadata[selectedLanguage];
      if (!metadataContent) {
        setContent(null);
      } else {
        setContent(metadataContent);
      }

      setDataLoading(false);
    };

    const getCoreLayerMetadata = async () => {
      const findById = METADATA_CONFIG[layer.id][selectedLanguage];
      //const results = layer.metadata?.metadata;
      checkForURLParams();
      setContent(findById);
      setDataLoading(false);
    };
    const getServiceContent = async (): Promise<void> => {
      const hasAppID = checkForURLParams();
      if (hasAppID) {
        getMetadataFromLayer();
        /* setContent(null);
        setDataLoading(false); */
        return;
      }
      getCoreLayerMetadata();
      /* if (!layer?.metadata) {
        setContent(null);
        setDataLoading(false);
        return;
      }

      const metadataContent = layer?.metadata[selectedLanguage];
      if (!metadataContent) {
        setContent(null);
      } else {
        setContent(metadataContent);
      }
 */
      //setDataLoading(false);
      /* if (layer.technicalName) {
        // * if layer has technical name
        // * grab metadata from GFW metadata API
        const results = await getServiceGroupContent(layer.technicalName);
        setContent(results);
        setDataLoading(false);
      } else {
        // * else conditionally grab metadata from 2 locations
        //const findById = metadataInfo[layer.id];
        const results = await getMetadata(layer, sharinghost);
        //setContent(findById);
        setContent(results);
        setDataLoading(false);
      } */
    };

    /* const getRemoteContent = (): void => {
      const findById = METADATA_CONFIG[layer.id]['es'];
      const results = layer.metadata?.metadata;
      checkForURLParams();
      setContent(findById);
      setDataLoading(false);
    }; */

    getServiceContent();
    /* if (layer.type === 'webmap') {
      getWebmapContent();
    } else if (layer.origin === 'service') {
      getServiceContent();
    } else {
      getRemoteContent();
    } */
  }, []);

  /* const returnWebmapGroupContent = (): JSX.Element | undefined => {
    if (content.title) {
      // * return metadata
      const { title, functionOrPurpose, geographicCoverage, overview } = content;
      return (
        <div className="header metadata">
          <h2>{title}</h2>
          <>
            <table>
              <tbody>
                {functionOrPurpose && (
                  <tr>
                    <td className="label">{functionLabel}</td>
                    <td className="label-info">{functionOrPurpose}</td>
                  </tr>
                )}
                {geographicCoverage && (
                  <tr>
                    <td className="label">{geographicCoverageLabel}</td>
                    <td className="label-info">{geographicCoverage}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
          {overview && (
            <div className="overview-container">
              <h3>{overviewLabel}</h3>
              <div dangerouslySetInnerHTML={{ __html: overview }} />
            </div>
          )}
        </div>
      );
    } else if (content.description || content.copyrightText || content.tags) {
      // * return description & summary/copyright & tags

      return (
        <>
          <div className="header">
            <h2>{layer.title}</h2>
            <>
              <table>
                <tbody>
                  {content.description && (
                    <tr>
                      <td className="label">{descriptionLabel}</td>
                      <td className="label-info" dangerouslySetInnerHTML={createMarkup(content.description)}></td>
                    </tr>
                  )}
                  {content.copyrightText && (
                    <tr>
                      <td className="label">{licenseLabel}</td>
                      <td className="label-info">{content.copyrightText}</td>
                    </tr>
                  )}
                  {content.tags && (
                    <tr>
                      <td className="label">tags</td>
                      <td className="label-info">{content.tags}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          </div>
        </>
      );
    } else {
      console.warn('potential edge case in returnWebmapGroupContent()', layer);

      return (
        <>
          <div className="header">
            <h2>{layer.title}</h2>
            <h3>{noInfoLabel}</h3>
          </div>
        </>
      );
    }
  }; */

  /* const returnOtherGroupContent = (): JSX.Element | undefined => {
    if (content && content.function) {
      // * if metadata cam from GFW metadata API
      const {
        resolution,
        tags,
        geographic_coverage,
        source,
        frequency_of_updates,
        content_date_range,
        cautions,
        license,
        overview,
        citation,
        title,
        subtitle,
        download_data,
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
                <td className="label">{functionLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: content.function }} />
              </tr>
              <tr>
                <td className="label">{resolutionLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: resolution }} />
              </tr>
              <tr>
                <td className="label">Tags</td>
                <td className="label-info">{tags}</td>
              </tr>
              <tr>
                <td className="label">{geographicCoverageLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: geographic_coverage }} />
              </tr>
              <tr>
                <td className="label">{sourceLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: source }} />
              </tr>
              <tr>
                <td className="label">{frequencyLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: frequency_of_updates }} />
              </tr>
              {!content?.title.includes('Air Quality') && (
                <tr>
                  <td className="label">{contentDateLabel}</td>
                  <td
                    className="label-info"
                    dangerouslySetInnerHTML={{ __html: content?.content_date ?? content?.date_of_content }}
                  />
                </tr>
              )}

              {content?.title.includes('Air Quality') && (
                <tr>
                  <td className="label">{contentDateRangeLabel}</td>
                  <td
                    className="label-info"
                    dangerouslySetInnerHTML={{
                      __html: `${content_date_range?.min} - ${content_date_range?.max}`,
                    }}
                  />
                </tr>
              )}
              <tr>
                <td className="label">{cautionLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: cautions }} />
              </tr>
              <tr>
                <td className="label">{licenseLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: license }} />
              </tr>
            </tbody>
          </table>
          <div className="overview-container">
            <h3>{overviewLabel}</h3>
            <div dangerouslySetInnerHTML={{ __html: overview }} />
          </div>
          {citation && (
            <div className="citation-container">
              <h4>{citationLabel}</h4>

              <div dangerouslySetInnerHTML={{ __html: citation }} />
            </div>
          )}
          {download_data && (
            <div className="button-container">
              <a href={download_data} target="_blank" rel="noopener noreferrer">
                <button className="orange-button">{downloadDataLabel}</button>
              </a>
            </div>
          )}
        </>
      );
    } else if (content && content.functionOrPurpose) {
      // * if content came from metadata from GFW/ArcGIS endpoint

      const { title, functionOrPurpose, overview } = content;

      return (
        <div>
          <div className="header">
            <h2>{title}</h2>
            <table>
              <tbody>
                {functionOrPurpose && (
                  <tr>
                    <td className="label">{functionLabel}</td>
                    <td className="label-info" dangerouslySetInnerHTML={{ __html: functionOrPurpose }} />
                  </tr>
                )}
              </tbody>
            </table>
            {overview && (
              <div className="overview-container">
                <h3>{overviewLabel}</h3>
                <div dangerouslySetInnerHTML={{ __html: overview }} />
              </div>
            )}
          </div>
        </div>
      );
    } else if (content && content?.data) {
      const {
        key_restrictions,
        learn_more,
        other,
        update_frequency,
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
        download_data,
      } = content.data.metadata;

      return (
        <div className="info-modal">
          <div className="header">
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
          </div>
          <table>
            <tbody>
              <tr>
                <td className="label">{functionLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: content.data.metadata.function }} />
              </tr>
              <tr>
                <td className="label">{resolutionLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: resolution }} />
              </tr>
              <tr>
                <td className="label">Tags</td>
                <td className="label-info">{tags}</td>
              </tr>
              <tr>
                <td className="label">{geographicCoverageLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: geographic_coverage }} />
              </tr>
              <tr>
                <td className="label">{sourceLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: source }} />
              </tr>

              <tr>
                <td className="label">{frequencyLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: update_frequency }} />
              </tr>
              <tr>
                <td className="label">{contentDateLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: date_of_content }} />
              </tr>
              <tr>
                <td className="label">{citationLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: cautions }} />
              </tr>
              <tr>
                <td className="label">{licenseLabel}</td>
                <td className="label-info" dangerouslySetInnerHTML={{ __html: license }} />
              </tr>
            </tbody>
          </table>
          <div className="overview-container">
            <h3>{overviewLabel}</h3>
            <div dangerouslySetInnerHTML={{ __html: overview }} />
          </div>
          {citation && (
            <div className="citation-container">
              <h4>{citationLabel}</h4>

              <div dangerouslySetInnerHTML={{ __html: citation }} />
            </div>
          )}
          {download_data && (
            <div className="button-container">
              <a href={download_data} target="_blank" rel="noopener noreferrer">
                <button className="orange-button">{downloadDataLabel}</button>
              </a>
            </div>
          )}
        </div>
      );
    } else {
      console.warn('potential edge case in returnOtherGroupContent()', layer);
      return (
        <>
          <div className="header">
            <h2>{layer.title}</h2>
            <h3>{noInfoLabel}</h3>
          </div>
        </>
      );
    }
  }; */

  const RenderContent = (props: any) => {
    if (!props.content?.content)
      return (
        <div>
          <h2>Metadata not available</h2>
        </div>
      );
    // * if metadata cam from GFW metadata API
    const { title, subtitle, download_data, content, overview, citation } = props.content;
    const cc = props;
    return (
      <>
        <div className="header">
          <h2>{title || ''}</h2>
          <h3>{subtitle || ''}</h3>
        </div>
        <table>
          <tbody>
            {content?.map((item: any, index) => {
              return (
                <tr key={index}>
                  <td className="label">{item.label}</td>
                  <td className="label-info" dangerouslySetInnerHTML={{ __html: item.value }} />
                </tr>
              );
            })}
          </tbody>
        </table>

        {overview?.value && (
          <div className="overview-container">
            <h3>{overview.label}</h3>
            <div dangerouslySetInnerHTML={{ __html: overview.value }} />
          </div>
        )}

        {citation?.value && (
          <div className="citation-container">
            <h4>{citation.label}</h4>

            <div dangerouslySetInnerHTML={{ __html: citation.value }} />
          </div>
        )}

        {download_data && (
          <div className="button-container">
            <a href={download_data} target="_blank" rel="noopener noreferrer">
              <button className="orange-button">{downloadDataLabel}</button>
            </a>
          </div>
        )}
      </>
    );
  };

  const RenderLayerContent = (): any => {
    /* if (layer.type === 'webmap') {
      return returnWebmapGroupContent();
    } else if (layer.origin === 'service') {
      return returnOtherGroupContent();
    } else {
      return returnOtherGroupContent();
    } */
  };

  return <div className="info-content-container">{!dataLoading && <RenderContent content={content} />}</div>;
  //return <div className="info-content-container">{!dataLoading && <RenderLayerContent />}</div>;
};

export default InfoContent;
