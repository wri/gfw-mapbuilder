import Sublayer from 'esri/layers/support/Sublayer';

import { mapController } from 'js/controllers/mapController';

import { Attachment, URLProperties } from 'js/interfaces/Attachment';

export const getDocuments = async (
  urlProperties: URLProperties
): Promise<Array<Attachment> | null> => {
  const { sublayerID, specificFeatureID, layerID } = urlProperties;
  let endPoint = '';
  const layer = mapController._map?.findLayerById(layerID);

  if ((layer as any).sublayers.length && specificFeatureID) {
    const sublayer = (layer as any).sublayers.items.filter(
      (s: Sublayer) => s.id === sublayerID
    );

    endPoint = `${sublayer[0].url}/${specificFeatureID}/attachments?f=pjson`;
  } else {
    return null;
  }

  const attachments = await fetch(endPoint)
    .then(response => response.json())
    .then((results: { attachmentInfos: Array<Attachment> }) => {
      const { attachmentInfos } = results;
      if (attachmentInfos) {
        return attachmentInfos.map((attachment: Attachment) => {
          attachment.url = endPoint.replace(
            'attachments?f=pjson',
            `attachments/${results.attachmentInfos[0].id}`
          );
          return attachment;
        });
      }
    })
    .catch(e => console.log('error in getDocuments()', e));

  if (attachments && attachments.length) {
    return attachments;
  } else {
    return null;
  }
};
