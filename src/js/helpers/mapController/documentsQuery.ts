import { mapController } from '../../controllers/mapController';
import { Attachment, URLProperties } from '../../types/Attachment';

export const getDocuments = async (urlProperties: URLProperties): Promise<Array<Attachment> | null> => {
  const { sublayerID, specificFeatureID, layerID } = urlProperties;

  let endPoint = '';

  const layer: any = mapController._map?.findLayerById(layerID);
  if (specificFeatureID) {
    if (layer.sublayers) {
      const sublayer = layer.sublayers.items.filter((s: __esri.Sublayer) => String(s.id) === String(sublayerID));
      endPoint = `${sublayer[0].url}/${specificFeatureID}/attachments?f=pjson`;
    } else {
      endPoint = `${layer.url}/0/${specificFeatureID}/attachments?f=pjson`;
    }
  } else {
    return null;
  }

  const attachments = await fetch(endPoint)
    .then((response) => response.json())
    .then((results: { attachmentInfos: Array<Attachment> }) => {
      const { attachmentInfos } = results;
      if (attachmentInfos) {
        return attachmentInfos.map((attachment: Attachment) => {
          attachment.url = endPoint.replace('attachments?f=pjson', `attachments/${attachment.id}`);
          return attachment;
        });
      }
    })
    .catch((e) => console.log('error in getDocuments()', e));

  if (attachments && attachments.length) {
    return attachments;
  } else {
    return null;
  }
};
