import analysisKeys from 'constants/AnalysisConstants';

//- Embedded Icons
const drawIcon = '<svg class="svg-icon"><use xlink:href="#icon-draw-upload" /></svg>';

const strings = { en: {}, fr: {}, es: {}, pt: {}, id:{}, zh:{} };
//- NOTE: English
//- Layers
// strings.en.LAND_COVER_LABEL = 'Land cover';
// strings.en.ACTIVE_FIRES_LABEL = 'Active fires';
// strings.en.ACTIVE_FIRES_SUB_LABEL = '(daily, 1km, global, NASA)';
// strings.en.TREE_COVER_LABEL = 'Tree cover';
// strings.en.TREE_COVER_SUB_LABEL = '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)';
// strings.en.GAIN_LABEL = 'Tree cover gain';
// strings.en.GAIN_SUB_LABEL = '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)';
// strings.en.LOSS_LABEL = 'Tree cover loss';
// strings.en.LOSS_SUB_LABEL = '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)';
// strings.en.IFL_LABEL = 'Intact forest loss';
// strings.en.CARBON_LABEL = 'Above ground biomass';
//- Header
strings.en.NAV_ABOUT = 'About';
strings.en.NAV_DOWNLOAD = 'Download Data';
strings.en.NAV_MAP_THEMES = 'Map Themes';
strings.en.NAV_MY_GFW = 'Log in to my GFW';
strings.en.NAV_LANGUAGE = 'Select Language';
//- Documents
strings.en.DOCS_INSTRUCTIONS = 'Select an area of interest to see if there are any related documents';
strings.en.DOCS_NOT_AVAILABLE = 'There are no documents available for this area';
strings.en.DOCS_TYPE = 'Type';
strings.en.DOCS_AUTHOR = 'Author';
strings.en.DOCS_YEAR = 'Year';
strings.en.DOCS_PDF = 'PDF';
//- Info Window
strings.en.INFO_WINDOW_INSTRUCTION_HEADER = 'Select a shape on the map';
strings.en.INFO_WINDOW_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map'
];
//- Analysis
strings.en.ANALYSIS_INSTRUCTION_HEADER = 'Analyze a shape on the map';
strings.en.ANALYSIS_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.en.ANALYSIS_OR = 'Or';
strings.en.ANALYSIS_DRAW_HEADER = 'Analyze your own shape';
//- ${drawIcon} references a variable above, do not translate
strings.en.ANALYSIS_DRAW_INSTRUCTIONS = [
  `Choose the draw tool ${drawIcon} in the toolbox`,
  'Draw a shape anywhere on the map',
  'Select the shape to run the analysis'
];
strings.en.ANALYSIS_DRAW_BUTTON = 'Start drawing';
strings.en.ANALYSIS_INSTRUCTION_ADDITIONAL = `Add additional shapes in the future by visiting the draw tool ${drawIcon}`;
strings.en.ANALYSIS_SHAPEFILE_UPLOAD = 'or drop a custom shapefile here';
strings.en.ANALYSIS_SELECT_TYPE_LABEL = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.en.ANALYSIS_TC_CHART_NAME = 'Tree cover loss in Hectares';
strings.en.ANALYSIS_LCC_CHART_NAME = 'Land Cover Composition';
strings.en.ANALYSIS_IFL_LABELS = ['Intact Forest'];
strings.en.ANALYSIS_FIRES_PRE = 'There are';
strings.en.ANALYSIS_FIRES_ACTIVE = 'active fires';
strings.en.ANALYSIS_FIRES_POST = 'in the last 7 days';
strings.en.ANALYSIS_TOTAL_LOSS_LABEL = 'Total tree cover loss';
strings.en.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2014):';
strings.en.ANALYSIS_TOTAL_GAIN_LABEL = 'Total tree cover gained';
strings.en.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.en.ANALYSIS_SLOPE_OPTION = 'Option #';
strings.en.SLOPE_SELECT_LABEL = 'Choose slope percent:';
strings.en.ANALYSIS_RESTORATION_LC_LABELS = [
  'No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'
];
strings.en.ANALYSIS_RESTORATION_ERROR = 'Area not meeting criteria for potential/No data';
strings.en.ANALYSIS_GROUP_RESTORATION = 'Restoration potential for';
strings.en.ANALYSIS_GROUP_SLOPE = 'Potential according to';
strings.en.ANALYSIS_GROUP_OTHER = 'Other analysis';
//- Group and value should not be modified
strings.en.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Slope',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  }
];

//- Modals
strings.en.CANOPY_MODAL_TEXT = 'Adjust the minimum canopy density for tree cover and tree cover loss';
strings.en.DENSITY_FIRST = 'Displaying';
strings.en.DENSITY_SECOND = 'canopy density.';
strings.en.SEARCH_WIDGET_TITLE = 'Search for feature:';

//- Miscellaneous
strings.en.PRINT_BUTTON_LABEL = 'Choose a print template';
strings.en.PRINT_REPORT = 'Print Report';
strings.en.SUBSCRIBE = 'Subscribe';
strings.en.LAYERS = 'Layers';
strings.en.DATA = 'Data';
strings.en.ANALYZE = 'Analyze';
strings.en.DOCS = 'Docs';
strings.en.NARRATIVE = 'Narrative';
strings.en.MORE = 'More';
strings.en.DELETE = 'Delete';
strings.en.DOCUMENTS = 'Documents';

strings.en.SELECT_ALL = 'Select all';
strings.en.CLEAR_ALL = 'Clear all';
strings.en.LEGEND = 'Legend';
strings.en.SEARCH = 'Search'; // Also Used for tools, but was used else where first
strings.en.TOOL_ZOOM_IN = 'Zoom In';
strings.en.TOOL_ZOOM_OUT = 'Zoom Out';
strings.en.TOOL_SHARE = 'Share';
strings.en.TOOL_PRINT = 'Print';
strings.en.TOOL_ANALYSIS = 'Analysis';
strings.en.TOOL_TOGGLE = 'Toggle Panel';
strings.en.TOOL_RESET = 'Reset';



//- NOTE: French
//- Header
strings.fr.NAV_ABOUT = 'A Propos';
strings.fr.NAV_DOWNLOAD = 'Téléchargez les Données';
strings.fr.NAV_MAP_THEMES = 'Thèmes';
strings.fr.NAV_MY_GFW = 'Se connecter à GFW';
strings.fr.NAV_LANGUAGE = 'Choisir Langue';
//- Documents
strings.fr.DOCS_INSTRUCTIONS = 'Choisisez une région d\'intérêt pour voir les documents associés';
strings.fr.DOCS_NOT_AVAILABLE = 'pas de documents disponibles pour cette région';
strings.fr.DOCS_TYPE = 'Type';
strings.fr.DOCS_AUTHOR = 'Auteur';
strings.fr.DOCS_YEAR = 'Année';
strings.fr.DOCS_PDF = 'PDF';
//- Info Window
strings.fr.INFO_WINDOW_INSTRUCTION_HEADER = 'Sélectionnez un polygone sur la carte';
strings.fr.INFO_WINDOW_INSTRUCTION_LIST = [
  'Utiliser l\'onglet Couches pour activer une couche de données',
  'Sélectionnez un polygone sur la carte'
];
//- Analysis
strings.fr.ANALYSIS_INSTRUCTION_HEADER = 'Analysez un polygone sur la carte';
strings.fr.ANALYSIS_INSTRUCTION_LIST = [
  'Utilisez l\'onglet Couches pour activer une couche de données',
  'Sélectionnez une entité sur la carte',
  'Cliquez sur l\'onglet analyse'
];
strings.fr.ANALYSIS_OR = 'Ou';
strings.fr.ANALYSIS_DRAW_HEADER = 'Analysez votre propre polygone';
//- ${drawIcon} references a variable above, do not translate
strings.fr.ANALYSIS_DRAW_INSTRUCTIONS = [
  `Utiliser l\'outil dessin ${drawIcon} dans la boîte à outil`,
  'Tracez un polygone sur la carte',
  'Cliquez sur le polygone pour lancer l\'analyse'
];
strings.fr.ANALYSIS_DRAW_BUTTON = 'Débutez le dessin';
strings.fr.ANALYSIS_INSTRUCTION_ADDITIONAL = `Ajouter des polygones supplémentaires grâce à l\'outil dessin ${drawIcon}`;
strings.fr.ANALYSIS_SHAPEFILE_UPLOAD = 'ou glissez un shapefile ici';
strings.fr.ANALYSIS_SELECT_TYPE_LABEL = 'Choisissez le type d\'analyse:';
//- Chart Labels in the Analysis
strings.fr.ANALYSIS_TC_CHART_NAME = 'Perte de couvert arboré en Hectares';
strings.fr.ANALYSIS_LCC_CHART_NAME = 'Occupation du sol';
strings.fr.ANALYSIS_IFL_LABELS = ['Forêts intactes'];
strings.fr.ANALYSIS_FIRES_PRE = 'Il y a';
strings.fr.ANALYSIS_FIRES_ACTIVE = 'feux actifs';
strings.fr.ANALYSIS_FIRES_POST = 'ces 7 derniers jours';
strings.fr.ANALYSIS_TOTAL_LOSS_LABEL = 'Total Perte en couvert arboré';
strings.fr.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2014):';
strings.fr.ANALYSIS_TOTAL_GAIN_LABEL = 'Total Gain en couvert arboré';
strings.fr.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.fr.ANALYSIS_SLOPE_OPTION = 'Option #';
strings.fr.SLOPE_SELECT_LABEL = 'Choisissez la pente (%):';
strings.fr.ANALYSIS_RESTORATION_LC_LABELS = [
  'Pas de données', 'Forêts', 'Prairies', 'Cultures', 'Milieux humides et eaux de surface', 'Lieux habités', 'Sols nus'
];
strings.fr.ANALYSIS_RESTORATION_ERROR = 'Région ne correspondant pas aux critères/Pas de données';
strings.fr.ANALYSIS_GROUP_RESTORATION = 'Potentiel de restauration pour';
strings.fr.ANALYSIS_GROUP_SLOPE = 'Potentiel selon';
strings.fr.ANALYSIS_GROUP_OTHER = 'Autre analyse';
//- Group and value should not be modified
strings.fr.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Pente',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Perte de couvert arboré',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total perte/gain de couvert arboré',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Perte en occupation du sol',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Perte en biomasse',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Perte en forêts intactes',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Feux actifs',
    value: analysisKeys.FIRES,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Occupation du sol',
    value: analysisKeys.LCC,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  }
];

//- Modals
strings.fr.CANOPY_MODAL_TEXT = 'Ajuster la densité minimum de la canopée pour le couvert arboré et la perte en couvert arboré';
strings.fr.DENSITY_FIRST = 'Affichage';
strings.fr.DENSITY_SECOND = 'Densité de la canopée.';
strings.fr.SEARCH_WIDGET_TITLE = 'Recherche de polygones:';

//- Miscellaneous
strings.fr.PRINT_BUTTON_LABEL = 'Choisissez un gabarit d\'impression';
strings.fr.PRINT_REPORT = 'Imprimer le Rapport';
strings.fr.SUBSCRIBE = 'S\'abonner';
strings.fr.LAYERS = 'Couches';
strings.fr.DATA = 'Données';
strings.fr.ANALYZE = 'Analyser';
strings.fr.DOCS = 'Documents';
strings.fr.NARRATIVE = 'Texte';
strings.fr.MORE = 'Plus';
strings.fr.DELETE = 'Supprimer';
strings.fr.DOCUMENTS = 'Documents';

strings.fr.SELECT_ALL = 'Tout sélectionner';
strings.fr.CLEAR_ALL = 'Tout effacer';
strings.fr.LEGEND = 'Légende';
strings.fr.SEARCH = 'Chercher'; // Also Used for tools, but was used else where first
strings.fr.TOOL_ZOOM_IN = 'Zoom avant';
strings.fr.TOOL_ZOOM_OUT = 'Zoom arrière';
strings.fr.TOOL_SHARE = 'Partager';
strings.fr.TOOL_PRINT = 'Imprimer';
strings.fr.TOOL_ANALYSIS = 'Analyse';
strings.fr.TOOL_TOGGLE = 'Basculer panneau';
strings.fr.TOOL_RESET = 'Réinitialiser';

//- NOTE: Spanish
//- Header
strings.es.NAV_ABOUT = 'Acerca de';
strings.es.NAV_DOWNLOAD = 'Descargar Datos';
strings.es.NAV_MAP_THEMES = 'Temas';
strings.es.NAV_MY_GFW = 'Entrar a mi GFW';
strings.es.NAV_LANGUAGE = 'Seleccionar idioma';
//- Documents
strings.es.DOCS_INSTRUCTIONS = 'Seleccionar una área de interés para ver si haya algún documento relacionado';
strings.es.DOCS_NOT_AVAILABLE = 'No hay documentos disponibles para esta área';
strings.es.DOCS_TYPE = 'Tipo';
strings.es.DOCS_AUTHOR = 'Autor';
strings.es.DOCS_YEAR = 'Año';
strings.es.DOCS_PDF = 'PDF';
//- Info Window
strings.es.INFO_WINDOW_INSTRUCTION_HEADER = 'Seleccionar un polígono en el mapa';
strings.es.INFO_WINDOW_INSTRUCTION_LIST = [
  'Usar la pestaña de capas para encender una capa',
  'Seleccionar un polígono en el mapa'
];
//- Analysis
strings.es.ANALYSIS_INSTRUCTION_HEADER = 'Analizar un polígono  en el mapa';
strings.es.ANALYSIS_INSTRUCTION_LIST = [
  'Usar la pestaña de capas para encender una capa',
  'Seleccionar un polígono en el mapa',
  'Hacer clic en la pestaña de analizar'
];
strings.es.ANALYSIS_OR = 'O';
strings.es.ANALYSIS_DRAW_HEADER = 'Analizar su propio polígono';
//- ${drawIcon} references a variable above, do not translate
strings.es.ANALYSIS_DRAW_INSTRUCTIONS = [
  `Escoger la herramienta de dibujo ${drawIcon} en la caja de herramientas`,
  'Dibujar un polígono en cualquier lugar del mapa',
  'Seleccionar el polígono para hacer el análisis'
];
strings.es.ANALYSIS_DRAW_BUTTON = 'Empezar a dibujar';
strings.es.ANALYSIS_INSTRUCTION_ADDITIONAL = `Añadir polígonos adicionales en el futuro usando la herramienta de dibujo ${drawIcon}`;
strings.es.ANALYSIS_SHAPEFILE_UPLOAD = 'o dejar un shapefile aquí';
strings.es.ANALYSIS_SELECT_TYPE_LABEL = 'Seleccionar Análisis:';
//- Chart Labels in the Analysis
strings.es.ANALYSIS_TC_CHART_NAME = 'Pérdida de la cobertura arbórea (ha)';
strings.es.ANALYSIS_LCC_CHART_NAME = 'Composición de la cobertura del suelo';
strings.es.ANALYSIS_IFL_LABELS = ['Bosque Intacto'];
strings.es.ANALYSIS_FIRES_PRE = 'Hay';
strings.es.ANALYSIS_FIRES_ACTIVE = 'incendios activos';
strings.es.ANALYSIS_FIRES_POST = 'en los últimos 7 días';
strings.es.ANALYSIS_TOTAL_LOSS_LABEL = 'Pérdida total de la cobertura arbórea';
strings.es.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2014):';
strings.es.ANALYSIS_TOTAL_GAIN_LABEL = 'Ganancia total de la cobertura arbórea';
strings.es.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.es.ANALYSIS_SLOPE_OPTION = 'Opción #';
strings.es.SLOPE_SELECT_LABEL = 'Escoger porcentaje del pendiente:';
strings.es.ANALYSIS_RESTORATION_LC_LABELS = [
  'Sin Datos', 'Bosque', 'Pradera', 'Cultivos', 'Humedales y Cuerpos de Agua', 'Asentamientos Humanos', 'Suelo Desnudo'
];
strings.es.ANALYSIS_RESTORATION_ERROR = 'Área no coincide con los criterios/ Sin Datos';
strings.es.ANALYSIS_GROUP_RESTORATION = 'Potencial de restauración para';
strings.es.ANALYSIS_GROUP_SLOPE = 'Potencial según';
strings.es.ANALYSIS_GROUP_OTHER = 'Otro análisis';
//- Group and value should not be modified
strings.es.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Pendiente',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Pérdida de la cobertura arbórea',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Pérdida/ ganancia total de la cobertura arbórea',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Pérdida de la cobertura del suelo',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Pérdida de biomasa',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Paisajes Forestales Intactos',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Incendios activos',
    value: analysisKeys.FIRES,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Composición de la cobertura del suelo',
    value: analysisKeys.LCC,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  }
];

//- Modals
strings.es.CANOPY_MODAL_TEXT = 'Ajustar el mínimo densidad del follaje para la cobertura arbórea y la pérdida de la cobertura arbórea';
strings.es.DENSITY_FIRST = 'Mostrando';
strings.es.DENSITY_SECOND = 'densidad de follaje.';
strings.es.SEARCH_WIDGET_TITLE = 'Buscar polígono:';

//- Miscellaneous
strings.es.PRINT_BUTTON_LABEL = 'Elegir diseño de página';
strings.es.PRINT_REPORT = 'Imprimir Informe';
strings.es.SUBSCRIBE = 'Subscribirse';
strings.es.LAYERS = 'Capas';
strings.es.DATA = 'Datos';
strings.es.ANALYZE = 'Análisis';
strings.es.DOCS = 'Documentos';
strings.es.NARRATIVE = 'Narrativa';
strings.es.MORE = 'Más';
strings.es.DELETE = 'Eliminar';
strings.es.DOCUMENTS = 'Documentos';

strings.es.SELECT_ALL = 'Seleccionar Todo';
strings.es.CLEAR_ALL = 'Borrar Todo';
strings.es.LEGEND = 'Leyenda';
strings.es.SEARCH = 'Buscar'; // Also Used for tools, but was used else where first
strings.es.TOOL_ZOOM_IN = 'Acercar';
strings.es.TOOL_ZOOM_OUT = 'Alejar';
strings.es.TOOL_SHARE = 'Compartir';
strings.es.TOOL_PRINT = 'Imprimir';
strings.es.TOOL_ANALYSIS = 'Análisis';
strings.es.TOOL_TOGGLE = 'Alternar Pane';
strings.es.TOOL_RESET = 'Reajustar';

//- NOTE: Portugese
//- Header
strings.pt.NAV_ABOUT = 'About';
strings.pt.NAV_DOWNLOAD = 'Download Data';
strings.pt.NAV_MAP_THEMES = 'Map Themes';
strings.pt.NAV_MY_GFW = 'Log in to my GFW';
strings.pt.NAV_LANGUAGE = 'Select Language';
//- Documents
strings.pt.DOCS_INSTRUCTIONS = 'Select an area of interest to see if there are any related documents';
strings.pt.DOCS_NOT_AVAILABLE = 'There are no documents available for this area';
strings.pt.DOCS_TYPE = 'Type';
strings.pt.DOCS_AUTHOR = 'Author';
strings.pt.DOCS_YEAR = 'Year';
strings.pt.DOCS_PDF = 'PDF';
//- Info Window
strings.pt.INFO_WINDOW_INSTRUCTION_HEADER = 'Select a shape on the map';
strings.pt.INFO_WINDOW_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map'
];
//- Analysis
strings.pt.ANALYSIS_INSTRUCTION_HEADER = 'Analyze a shape on the map';
strings.pt.ANALYSIS_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.pt.ANALYSIS_OR = 'Or';
strings.pt.ANALYSIS_DRAW_HEADER = 'Analyze your own shape';
//- ${drawIcon} references a variable above, do not translate
strings.pt.ANALYSIS_DRAW_INSTRUCTIONS = [
  `Choose the draw tool ${drawIcon} in the toolbox`,
  'Draw a shape anywhere on the map',
  'Select the shape to run the analysis'
];
strings.pt.ANALYSIS_DRAW_BUTTON = 'Start drawing';
strings.pt.ANALYSIS_INSTRUCTION_ADDITIONAL = `Add additional shapes in the future by visiting the draw tool ${drawIcon}`;
strings.pt.ANALYSIS_SHAPEFILE_UPLOAD = 'or drop a custom shapefile here';
strings.pt.ANALYSIS_SELECT_TYPE_LABEL = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.pt.ANALYSIS_TC_CHART_NAME = 'Tree cover loss in Hectares';
strings.pt.ANALYSIS_LCC_CHART_NAME = 'Land Cover Composition';
strings.pt.ANALYSIS_IFL_LABELS = ['Intact Forest'];
strings.pt.ANALYSIS_FIRES_PRE = 'There are';
strings.pt.ANALYSIS_FIRES_ACTIVE = 'active fires';
strings.pt.ANALYSIS_FIRES_POST = 'in the last 7 days';
strings.pt.ANALYSIS_TOTAL_LOSS_LABEL = 'Total tree cover loss';
strings.pt.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2014):';
strings.pt.ANALYSIS_TOTAL_GAIN_LABEL = 'Total tree cover gained';
strings.pt.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.pt.ANALYSIS_SLOPE_OPTION = 'Option #';
strings.pt.SLOPE_SELECT_LABEL = 'Choose slope percent:';
strings.pt.ANALYSIS_RESTORATION_LC_LABELS = [
  'No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'
];
strings.pt.ANALYSIS_RESTORATION_ERROR = 'Area not meeting criteria for potential/No data';
strings.pt.ANALYSIS_GROUP_RESTORATION = 'Restoration potential for';
strings.pt.ANALYSIS_GROUP_SLOPE = 'Potential according to';
strings.pt.ANALYSIS_GROUP_OTHER = 'Other analysis';
//- Group and value should not be modified
strings.pt.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Slope',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  }
];

//- Modals
strings.pt.CANOPY_MODAL_TEXT = 'Adjust the minimum canopy density for tree cover and tree cover loss';
strings.pt.DENSITY_FIRST = 'Displaying';
strings.pt.DENSITY_SECOND = 'canopy density.';
strings.pt.SEARCH_WIDGET_TITLE = 'Search for feature:';

//- Miscellaneous
strings.pt.PRINT_BUTTON_LABEL = 'Choose a print template';
strings.pt.PRINT_REPORT = 'Print Report';
strings.pt.SUBSCRIBE = 'Subscribe';
strings.pt.LAYERS = 'Layers';
strings.pt.DATA = 'Data';
strings.pt.ANALYZE = 'Analyze';
strings.pt.DOCS = 'Docs';
strings.pt.NARRATIVE = 'Narrative';
strings.pt.MORE = 'More';
strings.pt.DELETE = 'Delete';
strings.pt.DOCUMENTS = 'Documents';

strings.pt.SELECT_ALL = 'select all';
strings.pt.CLEAR_ALL = 'clear all';
strings.pt.LEGEND = 'Legend';
strings.pt.SEARCH = 'Search'; // Also Used for tools, but was used else where first
strings.pt.TOOL_ZOOM_IN = 'Zoom In';
strings.pt.TOOL_ZOOM_OUT = 'Zoom Out';
strings.pt.TOOL_SHARE = 'Share';
strings.pt.TOOL_PRINT = 'Print';
strings.pt.TOOL_ANALYSIS = 'Analysis';
strings.pt.TOOL_TOGGLE = 'Toggle Panel';
strings.pt.TOOL_RESET = 'Reset';

//- NOTE: Bahasa Indonesia
//- Header
strings.id.NAV_ABOUT = 'About';
strings.id.NAV_DOWNLOAD = 'Download Data';
strings.id.NAV_MAP_THEMES = 'Map Themes';
strings.id.NAV_MY_GFW = 'Log in to my GFW';
strings.id.NAV_LANGUAGE = 'Select Language';
//- Documents
strings.id.DOCS_INSTRUCTIONS = 'Select an area of interest to see if there are any related documents';
strings.id.DOCS_NOT_AVAILABLE = 'There are no documents available for this area';
strings.id.DOCS_TYPE = 'Type';
strings.id.DOCS_AUTHOR = 'Author';
strings.id.DOCS_YEAR = 'Year';
strings.id.DOCS_PDF = 'PDF';
//- Info Window
strings.id.INFO_WINDOW_INSTRUCTION_HEADER = 'Select a shape on the map';
strings.id.INFO_WINDOW_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map'
];
//- Analysis
strings.id.ANALYSIS_INSTRUCTION_HEADER = 'Analyze a shape on the map';
strings.id.ANALYSIS_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.id.ANALYSIS_OR = 'Or';
strings.id.ANALYSIS_DRAW_HEADER = 'Analyze your own shape';
//- ${drawIcon} references a variable above, do not translate
strings.id.ANALYSIS_DRAW_INSTRUCTIONS = [
  `Choose the draw tool ${drawIcon} in the toolbox`,
  'Draw a shape anywhere on the map',
  'Select the shape to run the analysis'
];
strings.id.ANALYSIS_DRAW_BUTTON = 'Start drawing';
strings.id.ANALYSIS_INSTRUCTION_ADDITIONAL = `Add additional shapes in the future by visiting the draw tool ${drawIcon}`;
strings.id.ANALYSIS_SHAPEFILE_UPLOAD = 'or drop a custom shapefile here';
strings.id.ANALYSIS_SELECT_TYPE_LABEL = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.id.ANALYSIS_TC_CHART_NAME = 'Tree cover loss in Hectares';
strings.id.ANALYSIS_LCC_CHART_NAME = 'Land Cover Composition';
strings.id.ANALYSIS_IFL_LABELS = ['Intact Forest'];
strings.id.ANALYSIS_FIRES_PRE = 'There are';
strings.id.ANALYSIS_FIRES_ACTIVE = 'active fires';
strings.id.ANALYSIS_FIRES_POST = 'in the last 7 days';
strings.id.ANALYSIS_TOTAL_LOSS_LABEL = 'Total tree cover loss';
strings.id.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2014):';
strings.id.ANALYSIS_TOTAL_GAIN_LABEL = 'Total tree cover gained';
strings.id.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.id.ANALYSIS_SLOPE_OPTION = 'Option #';
strings.id.SLOPE_SELECT_LABEL = 'Choose slope percent:';
strings.id.ANALYSIS_RESTORATION_LC_LABELS = [
  'No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'
];
strings.id.ANALYSIS_RESTORATION_ERROR = 'Area not meeting criteria for potential/No data';
strings.id.ANALYSIS_GROUP_RESTORATION = 'Restoration potential for';
strings.id.ANALYSIS_GROUP_SLOPE = 'Potential according to';
strings.id.ANALYSIS_GROUP_OTHER = 'Other analysis';
//- Group and value should not be modified
strings.id.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Slope',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  }
];

//- Modals
strings.id.CANOPY_MODAL_TEXT = 'Adjust the minimum canopy density for tree cover and tree cover loss';
strings.id.DENSITY_FIRST = 'Displaying';
strings.id.DENSITY_SECOND = 'canopy density.';
strings.id.SEARCH_WIDGET_TITLE = 'Search for feature:';

//- Miscellaneous
strings.id.PRINT_BUTTON_LABEL = 'Choose a print template';
strings.id.PRINT_REPORT = 'Print Report';
strings.id.SUBSCRIBE = 'Subscribe';
strings.id.LAYERS = 'Layers';
strings.id.DATA = 'Data';
strings.id.ANALYZE = 'Analyze';
strings.id.DOCS = 'Docs';
strings.id.NARRATIVE = 'Narrative';
strings.id.MORE = 'More';
strings.id.DELETE = 'Delete';
strings.id.DOCUMENTS = 'Documents';

strings.id.SELECT_ALL = 'select all';
strings.id.CLEAR_ALL = 'clear all';
strings.id.LEGEND = 'Legend';
strings.id.SEARCH = 'Search'; // Also Used for tools, but was used else where first
strings.id.TOOL_ZOOM_IN = 'Zoom In';
strings.id.TOOL_ZOOM_OUT = 'Zoom Out';
strings.id.TOOL_SHARE = 'Share';
strings.id.TOOL_PRINT = 'Print';
strings.id.TOOL_ANALYSIS = 'Analysis';
strings.id.TOOL_TOGGLE = 'Toggle Panel';
strings.id.TOOL_RESET = 'Reset';

//- NOTE: Mandarin
//- Header
strings.zh.NAV_ABOUT = '关于';
strings.zh.NAV_DOWNLOAD = '下载数据';
strings.zh.NAV_MAP_THEMES = '地图图集';
strings.zh.NAV_MY_GFW = '登录我的GFW';
strings.zh.NAV_LANGUAGE = '选择语言';
//- Documents
strings.zh.DOCS_INSTRUCTIONS = '选择感兴趣区域来查看相关文件';
strings.zh.DOCS_NOT_AVAILABLE = '此区域没有相关文件';
strings.zh.DOCS_TYPE = '类别';
strings.zh.DOCS_AUTHOR = '作者';
strings.zh.DOCS_YEAR = '年份';
strings.zh.DOCS_PDF = 'PDF';
//- Info Window
strings.zh.INFO_WINDOW_INSTRUCTION_HEADER = '在地图上选择图形';
strings.zh.INFO_WINDOW_INSTRUCTION_LIST = [
  '使用图层键来打开图层',
  '在地图上选择图形'
];
//- Analysis
strings.zh.ANALYSIS_INSTRUCTION_HEADER = '分析地图上的图形';
strings.zh.ANALYSIS_INSTRUCTION_LIST = [
  '使用图层键来打开图层',
  '在地图上选择一个图形',
  '点击分析键'
];
strings.zh.ANALYSIS_OR = '或者';
strings.zh.ANALYSIS_DRAW_HEADER = '分析自定义图形';
//- ${drawIcon} references a variable above, do not translate
strings.zh.ANALYSIS_DRAW_INSTRUCTIONS = [
  `在工具箱里选择一个绘画工具 ${drawIcon}`,
  '在地图上任意地方画一个图形',
  '选择进行分析的图形'
];
strings.zh.ANALYSIS_DRAW_BUTTON = '开始绘画';
strings.zh.ANALYSIS_INSTRUCTION_ADDITIONAL = `使用绘画工具来添加更多图形 ${drawIcon}`;
strings.zh.ANALYSIS_SHAPEFILE_UPLOAD = '或者在这里添加自定义地理信息系统文件（shapefile）';
strings.zh.ANALYSIS_SELECT_TYPE_LABEL = '选择分析方式：';
//- Chart Labels in the Analysis
strings.zh.ANALYSIS_TC_CHART_NAME = '森林覆盖损失（单位：公顷）';
strings.zh.ANALYSIS_LCC_CHART_NAME = '土地覆盖组成'; 
strings.zh.ANALYSIS_IFL_LABELS = ['原生森林'];  
strings.zh.ANALYSIS_FIRES_PRE = '共计';
strings.zh.ANALYSIS_FIRES_ACTIVE = '活跃火点';
strings.zh.ANALYSIS_FIRES_POST = '在过去7天里';
strings.zh.ANALYSIS_TOTAL_LOSS_LABEL = '总森林覆盖损失';
strings.zh.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2014):';
strings.zh.ANALYSIS_TOTAL_GAIN_LABEL = '总森林覆盖增加';
strings.zh.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.zh.ANALYSIS_SLOPE_OPTION = '选项 #';
strings.zh.SLOPE_SELECT_LABEL = '选择倾斜度：';
strings.zh.ANALYSIS_RESTORATION_LC_LABELS = [
  '无数据', '林地', '草地', '农田', '湿地和水体', '建筑', '裸地'
];
strings.zh.ANALYSIS_RESTORATION_ERROR = '无数据 或者 区域不满足条件';
strings.zh.ANALYSIS_GROUP_RESTORATION = '在生态修复可能性的层面';
strings.zh.ANALYSIS_GROUP_SLOPE = '可能性原因';
strings.zh.ANALYSIS_GROUP_OTHER = '其他分析';
//- Group and value should not be modified
strings.zh.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: '倾斜度',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: '森林覆盖损失',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: '总森林覆盖损失或增加',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: '土地覆盖损失',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: '生物量损失',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: '原生林损失',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: '活跃火点',
    value: analysisKeys.FIRES,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: '土地覆盖组成',
    value: analysisKeys.LCC,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  }
];

//- Modals
strings.zh.CANOPY_MODAL_TEXT = '对森林覆盖和森林覆盖损失图层调试最低林冠覆盖密度';
strings.zh.DENSITY_FIRST = '显示中';
strings.zh.DENSITY_SECOND = '林冠覆盖密度';
strings.zh.SEARCH_WIDGET_TITLE = '搜寻特征：';

//- Miscellaneous
strings.zh.PRINT_BUTTON_LABEL = '选择打印模板';
strings.zh.PRINT_REPORT = '打印报告';
strings.zh.SUBSCRIBE = '订阅';
strings.zh.SEARCH = '搜寻';
strings.zh.LAYERS = '图层';
strings.zh.DATA = '数据';
strings.zh.ANALYZE = '分析';
strings.zh.DOCS = '文本文件';
strings.zh.NARRATIVE = '说明';
strings.zh.MORE = '更多';
strings.zh.DELETE = '删除';
strings.zh.DOCUMENTS = '文件';

strings.zh.SELECT_ALL = '全选';
strings.zh.CLEAR_ALL = '全部清除';
strings.zh.LEGEND = '图例';
strings.zh.SEARCH = '搜索'; // Also Used for tools, but was used else where first
strings.zh.TOOL_ZOOM_IN = '放大';
strings.zh.TOOL_ZOOM_OUT = '缩小';
strings.zh.TOOL_SHARE = '分享';
strings.zh.TOOL_PRINT = '打印';
strings.zh.TOOL_ANALYSIS = '分析';
strings.zh.TOOL_TOGGLE = '控制面板';
strings.zh.TOOL_RESET = '重置';

export { strings as default };
