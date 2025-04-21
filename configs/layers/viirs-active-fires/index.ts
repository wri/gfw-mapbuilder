export default {
  order: 7,
  layerGroupId: 'GROUP_LCD',
  dataLayer: {
    id: 'VIIRS_ACTIVE_FIRES',
    order: 7,
    type: 'remoteDataLayer',
    uuid: '6d316908-92c8-4f95-8598-f2a0c72786af',
    groupId: 'GROUP_LCD',
  },
  layer: {
    popup: {
      content: {
        id: [
          {
            fieldExpression: 'BRIGHTNESS',
            label: 'Brightness',
          },
          {
            fieldExpression: 'CONFIDENCE',
            label: 'Confidence',
          },
          {
            fieldExpression: 'LATITUDE',
            label: 'Latitude',
          },
          {
            fieldExpression: 'LONGITUDE',
            label: 'Longitude',
          },
          {
            fieldExpression: 'ACQ_DATE:DateString(hideTime:true)',
            label: 'Acquisition Date',
          },
          {
            fieldExpression: 'ACQ_TIME',
            label: 'Acquisition Time',
          },
        ],
        zh: [
          {
            fieldExpression: 'BRIGHTNESS',
            label: 'Brightness',
          },
          {
            fieldExpression: 'CONFIDENCE',
            label: 'Confidence',
          },
          {
            fieldExpression: 'LATITUDE',
            label: 'Latitude',
          },
          {
            fieldExpression: 'LONGITUDE',
            label: 'Longitude',
          },
          {
            fieldExpression: 'ACQ_DATE:DateString(hideTime:true)',
            label: 'Acquisition Date',
          },
          {
            fieldExpression: 'ACQ_TIME',
            label: 'Acquisition Time',
          },
        ],
        pt: [
          {
            fieldExpression: 'BRIGHTNESS',
            label: 'Brightness',
          },
          {
            fieldExpression: 'CONFIDENCE',
            label: 'Confidence',
          },
          {
            fieldExpression: 'LATITUDE',
            label: 'Latitude',
          },
          {
            fieldExpression: 'LONGITUDE',
            label: 'Longitude',
          },
          {
            fieldExpression: 'ACQ_DATE:DateString(hideTime:true)',
            label: 'Acquisition Date',
          },
          {
            fieldExpression: 'ACQ_TIME',
            label: 'Acquisition Time',
          },
        ],
        ka: [
          {
            fieldExpression: 'BRIGHTNESS',
            label: 'Brightness',
          },
          {
            fieldExpression: 'CONFIDENCE',
            label: 'Confidence',
          },
          {
            fieldExpression: 'LATITUDE',
            label: 'Latitude',
          },
          {
            fieldExpression: 'LONGITUDE',
            label: 'Longitude',
          },
          {
            fieldExpression: 'ACQ_DATE:DateString(hideTime:true)',
            label: 'Acquisition Date',
          },
          {
            fieldExpression: 'ACQ_TIME',
            label: 'Acquisition Time',
          },
        ],
        es: [
          {
            fieldExpression: 'BRIGHTNESS',
            label: 'Brightness',
          },
          {
            fieldExpression: 'CONFIDENCE',
            label: 'Confidence',
          },
          {
            fieldExpression: 'LATITUDE',
            label: 'Latitude',
          },
          {
            fieldExpression: 'LONGITUDE',
            label: 'Longitude',
          },
          {
            fieldExpression: 'ACQ_DATE:DateString(hideTime:true)',
            label: 'Acquisition Date',
          },
          {
            fieldExpression: 'ACQ_TIME',
            label: 'Acquisition Time',
          },
        ],
        fr: [
          {
            fieldExpression: 'BRIGHTNESS',
            label: 'Brightness',
          },
          {
            fieldExpression: 'CONFIDENCE',
            label: 'Confidence',
          },
          {
            fieldExpression: 'LATITUDE',
            label: 'Latitude',
          },
          {
            fieldExpression: 'LONGITUDE',
            label: 'Longitude',
          },
          {
            fieldExpression: 'ACQ_DATE:DateString(hideTime:true)',
            label: 'Acquisition Date',
          },
          {
            fieldExpression: 'ACQ_TIME',
            label: 'Acquisition Time',
          },
        ],
        en: [
          {
            fieldExpression: 'BRIGHTNESS',
            label: 'Brightness',
          },
          {
            fieldExpression: 'CONFIDENCE',
            label: 'Confidence',
          },
          {
            fieldExpression: 'LATITUDE',
            label: 'Latitude',
          },
          {
            fieldExpression: 'LONGITUDE',
            label: 'Longitude',
          },
          {
            fieldExpression: 'ACQ_DATE:DateString(hideTime:true)',
            label: 'Acquisition Date',
          },
          {
            fieldExpression: 'ACQ_TIME',
            label: 'Acquisition Time',
          },
        ],
      },
      title: {
        ka: 'VIIRS აქტიური ხანძრები',
        zh: 'VIIRS 活跃火点',
        id: 'Kebakaran Aktif VIIRS',
        pt: 'Incêndios ativos VIIRS',
        es: 'Incendios activos VIIRS',
        fr: 'Incendies actifs VIIRS',
        en: 'VIIRS Active Fires',
      },
    },
    sublabel: {
      ka: '(ყოველდღიური, 375 მ, გლობალური, NASA)',
      zh: '（每天，375m，全球，NASA）',
      id: '(harian, 375m, global, NASA)',
      pt: '(diário, 375 m, global, NASA)',
      es: '(Diaria, 375m, global, NASA)',
      fr: '(quotidiens, 375 m, mondial, NASA)',
      en: '(daily, 375m, global, NASA)',
    },
    label: {
      ka: 'VIIRS აქტიური ხანძრები',
      zh: 'VIIRS 活跃火点',
      id: 'Kebakaran Aktif VIIRS',
      pt: 'Incêndios ativos VIIRS',
      es: 'Incendios activos VIIRS',
      fr: 'Incendies actifs VIIRS',
      en: 'VIIRS Active Fires',
    },
    technicalName: 'viirs_fires',
    url: 'https://tiles.globalforestwatch.org/nasa_viirs_fire_alerts/latest/dynamic/{start_date}/{end_date}/VectorTileServer',
    type: 'Vector.Layer',
    id: 'VIIRS_ACTIVE_FIRES',
    metadata: {
      metadata: null,
      legendConfig: {
        items: [
          {
            color: '#472020',
            name: {
              en: 'High concentration',
              es: 'High concentration',
              fr: 'High concentration',
              id: 'High concentration',
              ka: 'High concentration',
              pt: 'High concentration',
            },
          },
          {
            color: '#a72524',
            name: {
              en: '',
              es: '',
              fr: '',
              id: '',
              ka: '',
              pt: '',
            },
          },
          {
            color: '#ffce0f',
            name: {
              en: '',
              es: '',
              fr: '',
              id: '',
              ka: '',
              pt: '',
            },
          },
          {
            color: '#ffcc02',
            name: {
              en: 'Low concentration',
              es: 'Low concentration',
              fr: 'Low concentration',
              id: 'Low concentration',
              ka: 'Low concentration',
              pt: 'Low concentration',
            },
          },
        ],
        source: '(daily, 375m, global, NASA)',
        notes: ['For more information about this layer {hyperlink}'],
        name: {
          ka: 'VIIRS აქტიური ხანძრები',
          zh: 'VIIRS 活跃火点',
          id: 'Kebakaran Aktif VIIRS',
          pt: 'Incêndios ativos VIIRS',
          es: 'Incendios activos VIIRS',
          fr: 'Incendies actifs VIIRS',
          en: 'VIIRS Active Fires',
        },
        type: 'gradient',
      },
      interactionConfig: {
        type: 'info',
        config: {
          url: 'https://data-api.globalforestwatch.org/dataset/nasa_viirs_fire_alerts/latest/features',
        },
      },
    },
  },
  isMetadataError: false,
  isError: false,
};
