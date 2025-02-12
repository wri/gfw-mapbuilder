import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../js/store';
import { infoContent } from '../../../../configs/translations/modal.tanslations';

import { METADATA_CONFIG } from '../../../../configs/metadata/metadata-config';
import { LAYER_IDS } from '../../../../configs/layer-config';

import { LayerMetadata } from '../../../shared-types/metadata';

const APP_ID = 'appid';
const checkForURLParams = () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const appid = params.get(APP_ID);
  if (appid) return true;
  return false;
};

const InfoContent = () => {
  const [content, setContent] = useState<LayerMetadata | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const { infoModalLayerID: layerID, selectedLanguage } = useSelector((store: RootState) => store.appState);
  const { allAvailableLayers } = useSelector((store: RootState) => store.mapviewState);
  const layer = allAvailableLayers.filter((layer: any) => layer.id === layerID)[0];

  const { downloadDataLabel } = infoContent[selectedLanguage];

  const getMetadataFromLayer = () => {
    // for layers configured by user, check if layer has custom metadata
    if (!layer?.metadata) {
      setContent(null);
    } else {
      const metadataContent = layer?.metadata[selectedLanguage];
      if (metadataContent) {
        setContent(metadataContent);
      }
    }
    // check if layer id exist in the core layer ids
    if (layer?.id in LAYER_IDS) {
      const findById = METADATA_CONFIG[layer.id][selectedLanguage];
      setContent(findById);
    }

    setDataLoading(false);
  };

  const getCoreLayerMetadata = async () => {
    const findById = METADATA_CONFIG[layer.id][selectedLanguage];
    setContent(findById);
    setDataLoading(false);
  };

  const funcCallback = useCallback(() => {
    const hasAppID = checkForURLParams();
    if (hasAppID) {
      getMetadataFromLayer();

      return;
    }
    getCoreLayerMetadata();
  }, []);

  useEffect(() => {
    funcCallback();
  }, [funcCallback]);

  interface Props {
    content: LayerMetadata | null;
  }

  const RenderContent = (props: Props) => {
    if (!props.content?.content)
      return (
        <div>
          <h2>Metadata not available</h2>
        </div>
      );
    const { title, subtitle, download_data, content, overview, citation } = props.content;
    return (
      <>
        <div className="header">
          <h2>{title || ''}</h2>
          <h3>{subtitle || ''}</h3>
        </div>
        <table>
          <tbody>
            {content?.map((item, index) => {
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

  return <div className="info-content-container">{!dataLoading && <RenderContent content={content} />}</div>;
  //return <div className="info-content-container">{!dataLoading && <RenderLayerContent />}</div>;
};

export default InfoContent;
