import analysisKeys from 'constants/AnalysisConstants';

//- Embedded Icons
const drawIcon = '<svg class="svg-icon"><use xlink:href="#icon-draw-upload" /></svg>';

const strings = { en: {}, fr: {}, es: {}, pt: {}, id: {}, zh: {}, ka: {} };
//- NOTE: English
//- Supported Languages
strings.en.LANG_EN = 'English';
strings.en.LANG_FR = 'French';
strings.en.LANG_ES = 'Spanish';
strings.en.LANG_PT = 'Portugese';
strings.en.LANG_ID = 'Indonesian';
strings.en.LANG_ZH = 'Mandarin';
strings.en.LANG_KA = 'Georgian';
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
strings.en.DOCS_NAME = 'Name';
strings.en.DOCS_SIZE = 'Size';
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
strings.en.ANALYSIS_SHAPEFILE_INSTRUCTIONS = 'Only polygon data is supported and should use a spatial reference of WGS84. The recommended maximum size is 5MB, anything more than that may not work as expected. Esri shapefiles must be zipped (.zip) and GeoJSON files must be in .json files.';
strings.en.ANALYSIS_SELECT_TYPE_LABEL = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.en.ANALYSIS_TC_CHART_NAME = 'Tree cover loss in Hectares';
strings.en.ANALYSIS_LCC_CHART_NAME = 'Land Cover Composition';
strings.en.ANALYSIS_IFL_LABELS = ['Intact Forest'];
strings.en.ANALYSIS_MANGROVE_LABELS = ['Global Mangroves'];
strings.en.ANALYSIS_FIRES_PRE = 'There are';
strings.en.ANALYSIS_FIRES_ACTIVE = 'active fires';
strings.en.ANALYSIS_FIRES_POST_LIST = [
  'in the last 7 days',
  'in the last 72 hours',
  'in the last 48 hours',
  'in the last 24 hours'
];
strings.en.ANALYSIS_TOTAL_LOSS_LABEL = 'Total tree cover loss';
strings.en.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2015):';
strings.en.ANALYSIS_TOTAL_GAIN_LABEL = 'Total tree cover gained';
strings.en.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.en.ANALYSIS_SLOPE_OPTION = 'Option #';
strings.en.SLOPE_SELECT_LABEL = 'Choose slope percent:';
strings.en.ANALYSIS_RESTORATION_ERROR = 'Area not meeting criteria for potential/No data';
strings.en.ANALYSIS_GROUP_RESTORATION = 'Restoration potential for';
strings.en.ANALYSIS_GROUP_SLOPE = 'Potential according to';
strings.en.ANALYSIS_GROUP_OTHER = 'Other analysis';
strings.en.ANALYSIS_GLAD_ALERT_NAME = 'GLAD Alerts';
strings.en.ANALYSIS_TERRA_I_ALERT_NAME = 'Terra-I Alerts';
strings.en.ANALYSIS_SAD_ALERT_NAMES = {
  degrad: 'Degradation',
  defor: 'Deforestation'
};
//- Group and value should not be modified
strings.en.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Slope',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Aboveground Live Woody Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Global mangrove loss',
    value: analysisKeys.MANGROVE_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'SAD alerts',
    value: analysisKeys.SAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'GLAD alerts',
    value: analysisKeys.GLAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Terra-I alerts',
    value: analysisKeys.TERRA_I_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'VIIRS fires',
    value: analysisKeys.VIIRS_FIRES,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'MODIS fires',
    value: analysisKeys.MODIS_FIRES,
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
strings.en.SEARCH_CLICK_FOR_MORE = 'Please click on the selected feature for more info.';
//- Layer Info Modal
strings.en.NO_INFO = 'No Information Available';
strings.en.OVERVIEW = 'Overview';
strings.en.CITATION = 'Citation';
//- Case does not matter, css makes them all uppercase
strings.en.FUNCTION = 'function';
strings.en.RESOLUTION = 'resolution';
strings.en.GEO_COVERAGE = 'geographic coverage';
strings.en.SOURCE = 'source';
strings.en.FREQUENCY = 'frequency';
strings.en.CONTENT_DATE = 'date of content';
strings.en.CAUTIONS = 'cautions';
strings.en.LICENSE = 'license';
strings.en.LEARN_MORE = 'learn More';
strings.en.DOWNLOAD_DATA = 'download data';
strings.en.DESCRIPTION = 'description';

//- Miscellaneous
strings.en.PRINT_BUTTON_LABEL = 'Choose a print output';
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

strings.en.BASEMAP = 'Basemap';
strings.en.SELECT_ALL = 'Select all';
strings.en.CLEAR_ALL = 'Clear all';
strings.en.LEGEND = 'Legend';
strings.en.TIMELINE = 'Timeline';
strings.en.TIMELINE_START = 'Start: ';
strings.en.TIMELINE_END = 'End: ';
strings.en.SEARCH = 'Search'; // Also Used for tools, but was used else where first
strings.en.TOOL_ZOOM_IN = 'Zoom In';
strings.en.TOOL_ZOOM_OUT = 'Zoom Out';
strings.en.TOOL_SHARE = 'Share';
strings.en.TOOL_PRINT = 'Print';
strings.en.TOOL_ANALYSIS = 'Analysis';
strings.en.TOOL_TOGGLE = 'Toggle Panel';
strings.en.TOOL_RESET = 'Reset';

strings.en.ANALYSIS_CARBON_EMISSION = 'Gross carbon emissions';
strings.en.ANALYSIS_CARBON_LOSS = 'Tree cover loss';
strings.en.ANALYSIS_SLOPE_CHART_HEADER = 'Slope';
strings.en.ANALYSIS_LAND_COVER_CHART_HEADER = 'Land Cover';
strings.en.ANALYSIS_POPULATION_CHART_HEADER = 'Population Density';
strings.en.ANALYSIS_TREE_COVER_CHART_HEADER = '% Tree cover';
strings.en.ANALYSIS_RAINFALL_CHART_HEADER = 'Rainfall';
strings.en.MONTHS_LIST = [
  { name: 'January', abbr: 'Jan'},
  { name: 'February', abbr: 'Feb'},
  { name: 'March', abbr: 'Mar'},
  { name: 'April', abbr: 'Apr'},
  { name: 'May', abbr: 'May'},
  { name: 'June', abbr: 'Jun'},
  { name: 'July', abbr: 'Jul'},
  { name: 'August', abbr: 'Aug'},
  { name: 'September', abbr: 'Sep'},
  { name: 'October', abbr: 'Oct'},
  { name: 'November', abbr: 'Nov'},
  { name: 'December', abbr: 'Dec'}
];

strings.en.REPORT_TABLE_TOTAL = 'Total';
strings.en.REPORT_SLOPE_TITLE = 'Slope Analysis';
strings.en.REPORT_SLOPE_TABLE_TYPE = 'Slope Potential Type';
strings.en.REPORT_SLOPE_TABLE_VALUE = 'Hectares';
strings.en.REPORT_RESTORATION_TABLE_TYPE = 'Category';
strings.en.REPORT_RESTORATION_TABLE_VALUE = 'Hectares';

//- Error Messages
strings.en.ANALYSIS_ERROR_TC_LOSS_GAIN = 'An error occurred while fetching tree cover loss/gain analysis. Please select another analysis.';
strings.en.ANALYSIS_ERROR_TC_LOSS = 'An error occurred while fetching tree cover loss analysis. Please select another analysis.';
strings.en.ANALYSIS_ERROR_LAND_COVER_LOSS = 'An error occurred while fetching land cover loss analysis. Please select another analysis.';
strings.en.ANALYSIS_ERROR_LAND_COVER_COMPOSITION = 'An error occurred while fetching land cover composition analysis. Please select another analysis.';
strings.en.ANALYSIS_ERROR_INTACT_LOSS = 'An error occurred while fetching intact loss analysis. Please select another analysis.';
strings.en.ANALYSIS_ERROR_SAD = 'An error occurred while fetching SAD analysis. Please select another analysis.';
strings.en.ANALYSIS_ERROR_GLAD = 'An error occurred while fetching GLAD analysis. Please select another analysis.';
strings.en.ANALYSIS_ERROR_TERRA_I = 'An error occurred while fetching TERRA I analysis. Please select another analysis.';
strings.en.ANALYSIS_ERROR_BIO_LOSS = 'An error occurred while fetching biomass loss analysis. Please select another analysis.';
strings.en.ANALYSIS_ERROR_FIRE_COUNT = 'An error occurred while fetching fire count analysis. Please select another analysis.';

//- NOTE: Georgian
//- Supported Languages
strings.ka.LANG_EN = 'English';
strings.ka.LANG_FR = 'French';
strings.ka.LANG_ES = 'Spanish';
strings.ka.LANG_PT = 'Portugese';
strings.ka.LANG_ID = 'Indonesian';
strings.ka.LANG_ZH = 'Mandarin';
strings.ka.LANG_KA = 'ქართული';

//- Header
strings.ka.NAV_ABOUT = 'პროექტის შესახებ';
strings.ka.NAV_DOWNLOAD = 'მონაცემების გადმოწერა';
strings.ka.NAV_MAP_THEMES = 'რუკის თემები';
strings.ka.NAV_MY_GFW = 'GFW პროფილში შესვლა';
strings.ka.NAV_LANGUAGE = 'ენის არჩევა';
//- Documents

strings.ka.DOCS_INSTRUCTIONS = 'შეარჩიეთ საინტერესო ტერიტორია, და ნახეთ არის თუ არა მასთან დაკავშირებული დოკუმენტები';
strings.ka.DOCS_NOT_AVAILABLE = 'ამ ტერიტორიისთვის დოკუმენტები არ იძებნება';
strings.ka.DOCS_TYPE = 'ტიპი';
strings.ka.DOCS_AUTHOR = 'ავტორი';
strings.ka.DOCS_YEAR = 'წელი';
strings.ka.DOCS_PDF = 'PDF';
strings.ka.DOCS_NAME = 'სახელი';
strings.ka.DOCS_SIZE = 'ზომა';
//- Info Window
strings.ka.INFO_WINDOW_INSTRUCTION_HEADER = 'აარჩიეთ პოლიგონი რუკაზე';
strings.ka.INFO_WINDOW_INSTRUCTION_LIST = [
  'მონაცემების ფენის ჩასართავად გამოიყენეთ ფენების მენიუ',
  'აარჩიეთ ფიგურა რუკაზე'
];
//- Analysis
strings.ka.ANALYSIS_INSTRUCTION_HEADER = 'ჩაატარეთ ფიგურის ანალიზი რუკაზე';
strings.ka.ANALYSIS_INSTRUCTION_LIST = [
  'მონაცემების ფენის ჩასართავად გამოიყენეთ ფენების მენიუ',
  'აარჩიეთ ფიგურა რუკაზე',
  'დააჭირეთ ანალიზისი მენიუს'
];
strings.ka.ANALYSIS_OR = 'ან';
strings.ka.ANALYSIS_DRAW_HEADER = 'ჩაატარეთ თქვენი ფიგურის ანალიზი';
//- ${drawIcon} references a variable above, do not translate
strings.ka.ANALYSIS_DRAW_INSTRUCTIONS = [
  `შეარჩიეთ სახაზავი ინსტრუმენტი ${drawIcon} ტულბოქსიდან`,
  'რუკაზე ნებისმიერი ფიგურა დახაზეთ',
  'ანალიზის ჩასატარებლად შეარჩიეთ ფიგურა'
];
strings.ka.ANALYSIS_DRAW_BUTTON = 'დაიწყეთ ხაზვა';
strings.ka.ANALYSIS_INSTRUCTION_ADDITIONAL = `მომავალში დაამატეთ დამატებითი ფიგურები სახაზავი ინსტრუმენტის ${drawIcon} მეშვეობით`;
strings.ka.ANALYSIS_SHAPEFILE_UPLOAD = 'ან შემოიტანეთ სხვა შეიპფაილი';
strings.ka.ANALYSIS_SHAPEFILE_INSTRUCTIONS = 'უნდა იყოს გამოყენებული მხოლოდ პოლიგონების მონაცემები WGS84 სივრცული რეფერენსებით. რეკომენდირებული მაქსიმალური ზომაა 5 მბ, უფრო დიდმა ფაილმა შეიძლება ვერ იმუშაოს კორექტულად.  Esri შეიპფაილები უნდა იყოს დაზიპული (.zip) ხოლო GeoJSON ფაილები უნდა იყოს  .json ფორმატით.';
strings.ka.ANALYSIS_SELECT_TYPE_LABEL = 'აარჩიეთ ანალიზის ტიპი:';
//- Chart Labels in the Analysis
strings.ka.ANALYSIS_TC_CHART_NAME = 'ხის საფარის კარგვა ჰექტრებში ';
strings.ka.ANALYSIS_LCC_CHART_NAME = 'მიწის საფარის შემადგენლობა';
strings.ka.ANALYSIS_IFL_LABELS = ['ხელუხლებელი ტყე'];
strings.ka.ANALYSIS_MANGROVE_LABELS = ['გლობალური მანგროვები'];
strings.ka.ANALYSIS_FIRES_PRE = 'არიან';
strings.ka.ANALYSIS_FIRES_ACTIVE = 'აქტიური ხანძრები';
strings.ka.ANALYSIS_FIRES_POST_LIST = [
  'ბოლო 7 დღის განმავლობაში',
  'ბოლო 72 საათის განმავლობაში',
  'ბოლო 48 საათის განმავლობაში',
  'ბოლო 24 საათის განმავლობაში'
];
strings.ka.ANALYSIS_TOTAL_LOSS_LABEL = 'საერთო ხის საფარის კარგვა';
strings.ka.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2015):';
strings.ka.ANALYSIS_TOTAL_GAIN_LABEL = 'საერთო ხის საფარის მატება';
strings.ka.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.ka.ANALYSIS_SLOPE_OPTION = 'ვარიანტი #';
strings.ka.SLOPE_SELECT_LABEL = 'შეარჩიეთ ფერდობის დახრილობის პროცენტი:';
strings.ka.ANALYSIS_RESTORATION_ERROR = 'ტერიტორია არ აკმაყოფილებს პოტენციალის კრიტერიუმებს/ მონაცემები არ არსებობს';
strings.ka.ANALYSIS_GROUP_RESTORATION = 'აღდგენის პოტენციალი';
strings.ka.ANALYSIS_GROUP_SLOPE = 'პოტენციალი ფერდობის მიხედვით';
strings.ka.ANALYSIS_GROUP_OTHER = 'სხვა ანალიზი';
strings.ka.ANALYSIS_GLAD_ALERT_NAME = 'GLAD შეტყობინებები';
strings.ka.ANALYSIS_TERRA_I_ALERT_NAME = 'Terra-I შეტყობინებები';
strings.ka.ANALYSIS_SAD_ALERT_NAMES = {
  degrad: 'დეგრადაცია',
  defor: 'გაუტყეურება'
};
//- Group and value should not be modified
strings.ka.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'ფერდობი',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'ხის საფარის კარგვა/ მატება',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'ხის საფარის კარგვა',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'მიწის საფარის კარგვა',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'მიწისზედა ცოცხალი ტყის ბიომასის კარგვა',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'ხელუხლებელი ტყის კარგვა',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'გლობალური მანგროვების კარგვა',
    value: analysisKeys.MANGROVE_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'SAD შეტყობინებები',
    value: analysisKeys.SAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'GLAD შეტყობინებები',
    value: analysisKeys.GLAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Terra-I შეტყობინებები',
    value: analysisKeys.TERRA_I_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'აქტიური ხანძრები',
    value: analysisKeys.FIRES,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'მიწის საფარის შემადგენლობა',
    value: analysisKeys.LCC,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  }
];

//- Modals
strings.ka.CANOPY_MODAL_TEXT = 'დააზუსტეთ მინიმალური ვარჯის სიხშირე, რომ დაინახოთ ხის საფარი და ხის საფარის კარგვა';
strings.ka.DENSITY_FIRST = 'წარმოდგენილია';
strings.ka.DENSITY_SECOND = 'ვარჯის სიმჭიდროვე.';
strings.ka.SEARCH_WIDGET_TITLE = 'პარამეტრის ძიება:';
strings.ka.SEARCH_CLICK_FOR_MORE = 'გთხოვთ დააჭიროთ შერჩეულ პარამეტრს მეტი ინფოსთვის.';
//- Layer Info Modal
strings.ka.NO_INFO = 'ინფორმაცია არ არსებობს';
strings.ka.OVERVIEW = 'მიმოხილვა';
strings.ka.CITATION = 'ციტატა';
//- Case does not matter, css makes them all uppercase
strings.ka.FUNCTION = 'ფუნქცია';
strings.ka.RESOLUTION = 'რეზოლუცია';
strings.ka.GEO_COVERAGE = 'გეოგრაფიული არეალი';
strings.ka.SOURCE = 'წყარო';
strings.ka.FREQUENCY = 'სიხშირე';
strings.ka.CONTENT_DATE = 'მონაცემების თარიღი';
strings.ka.CAUTIONS = 'გაფრთხილება';
strings.ka.LICENSE = 'ლიცენზია';
strings.ka.LEARN_MORE = 'მეტი ინფო';
strings.ka.DOWNLOAD_DATA = 'მონაცემების ჩამოტვირთვა';
strings.ka.DESCRIPTION = 'აღწერა';

//- Miscellaneous
strings.ka.PRINT_BUTTON_LABEL = 'აარჩიეთ ბეჭდვის ფორმატი';
strings.ka.PRINT_REPORT = 'ანგარიშის ბეჭდვა';
strings.ka.SUBSCRIBE = 'გამოწერა';
strings.ka.LAYERS = 'ფენები';
strings.ka.DATA = 'მონაცემები';
strings.ka.ANALYZE = 'ანალიზი';
strings.ka.DOCS = 'დოკუმენტები';
strings.ka.NARRATIVE = 'ტექსტი/ ნარატივი';
strings.ka.MORE = 'დამატებით';
strings.ka.DELETE = 'წაშლა';
strings.ka.DOCUMENTS = 'დოკუმენტები';

strings.ka.BASEMAP = 'საბაზო რუკა';
strings.ka.SELECT_ALL = 'ყველაფრის მონიშვნა';
strings.ka.CLEAR_ALL = 'ყველაფრის წაშლა';
strings.ka.LEGEND = 'ლეგენდა';
strings.ka.TIMELINE = 'დროის სკალა';
strings.ka.TIMELINE_START = 'დასაწყისი: ';
strings.ka.TIMELINE_END = 'დასასრული: ';
strings.ka.SEARCH = 'გადიდება'; // Also Used for tools, but was used else where first
strings.ka.TOOL_ZOOM_IN = 'გადიდება';
strings.ka.TOOL_ZOOM_OUT = 'შემცირება';
strings.ka.TOOL_SHARE = 'გაზიარება';
strings.ka.TOOL_PRINT = 'ბეჭვდა';
strings.ka.TOOL_ANALYSIS = 'ანალიზი';
strings.ka.TOOL_TOGGLE = 'Toggle Panel (გადართვის პანელი)';
strings.ka.TOOL_RESET = 'გადატვირთვა';

strings.ka.ANALYSIS_CARBON_EMISSION = 'კარბონის მთლიანი ემისიები';
strings.ka.ANALYSIS_CARBON_LOSS = 'კარბონის კარგვა';
strings.ka.ANALYSIS_SLOPE_CHART_HEADER = 'ფერდობი';
strings.ka.ANALYSIS_LAND_COVER_CHART_HEADER = 'მიწის საფარი';
strings.ka.ANALYSIS_POPULATION_CHART_HEADER = 'მოსახლეობის სიმჭიდროვე';
strings.ka.ANALYSIS_TREE_COVER_CHART_HEADER = '% ხის საფარი';
strings.ka.ANALYSIS_RAINFALL_CHART_HEADER = 'ნალექები';
strings.ka.MONTHS_LIST = [
  { name: 'იანვარი', abbr: 'იან'},
  { name: 'თებერვალი', abbr: 'თებ'},
  { name: 'მარტი', abbr: 'მარ'},
  { name: 'აპრილი', abbr: 'აპრ'},
  { name: 'მაისი', abbr: 'მაი'},
  { name: 'ივნისი', abbr: 'ივნ'},
  { name: 'ივლისი', abbr: 'ივლ'},
  { name: 'აგვისტო', abbr: 'აგვ'},
  { name: 'სექტემბერი', abbr: 'სექ'},
  { name: 'ოქტომბერი', abbr: 'ოქტ'},
  { name: 'ნოემბერი', abbr: 'ნოე'},
  { name: 'დეკემბერი', abbr: 'დეკ'}
];

strings.ka.REPORT_TABLE_TOTAL = 'მთლიანად';
strings.ka.REPORT_SLOPE_TITLE = 'ფერდობის ანალიზი';
strings.ka.REPORT_SLOPE_TABLE_TYPE = 'ფერდობის პოტენციური ტიპი';
strings.ka.REPORT_SLOPE_TABLE_VALUE = 'ჰექტარი';
strings.ka.REPORT_RESTORATION_TABLE_TYPE = 'კატეგორია';
strings.ka.REPORT_RESTORATION_TABLE_VALUE = 'ჰექტარი';

//- Error Messages
strings.ka.ANALYSIS_ERROR_TC_LOSS_GAIN = 'An error occurred while fetching tree cover loss/gain analysis. Please select another analysis.';
strings.ka.ANALYSIS_ERROR_TC_LOSS = 'An error occurred while fetching tree cover loss analysis. Please select another analysis.';
strings.ka.ANALYSIS_ERROR_LAND_COVER_LOSS = 'An error occurred while fetching land cover loss analysis. Please select another analysis.';
strings.ka.ANALYSIS_ERROR_LAND_COVER_COMPOSITION = 'An error occurred while fetching land cover composition analysis. Please select another analysis.';
strings.ka.ANALYSIS_ERROR_INTACT_LOSS = 'An error occurred while fetching intact loss analysis. Please select another analysis.';
strings.ka.ANALYSIS_ERROR_SAD = 'An error occurred while fetching SAD analysis. Please select another analysis.';
strings.ka.ANALYSIS_ERROR_GLAD = 'An error occurred while fetching GLAD analysis. Please select another analysis.';
strings.ka.ANALYSIS_ERROR_TERRA_I = 'An error occurred while fetching TERRA I analysis. Please select another analysis.';
strings.ka.ANALYSIS_ERROR_BIO_LOSS = 'An error occurred while fetching biomass loss analysis. Please select another analysis.';
strings.ka.ANALYSIS_ERROR_FIRE_COUNT = 'An error occurred while fetching fire count analysis. Please select another analysis.';

//- NOTE: French
//- Supported Languages
strings.fr.LANG_EN = 'Anglais';
strings.fr.LANG_FR = 'Français';
strings.fr.LANG_ES = 'Espagnol';
strings.fr.LANG_PT = 'Portugais';
strings.fr.LANG_ID = 'Indonesien';
strings.fr.LANG_ZH = 'Mandarin';
strings.fr.LANG_KA = 'Georgian';

//- Header
strings.fr.NAV_ABOUT = 'A Propos';
strings.fr.NAV_DOWNLOAD = 'Téléchargez les Données';
strings.fr.NAV_MAP_THEMES = 'Thèmes';
strings.fr.NAV_MY_GFW = 'Se connecter à GFW';
strings.fr.NAV_LANGUAGE = 'Choisir Langue';
//- Documents
strings.fr.DOCS_INSTRUCTIONS = 'Choisisez une région d\'intérêt pour voir les documents associés';
strings.fr.DOCS_NOT_AVAILABLE = 'Pas de documents disponibles pour cette région';
strings.fr.DOCS_TYPE = 'Type';
strings.fr.DOCS_AUTHOR = 'Auteur';
strings.fr.DOCS_YEAR = 'Année';
strings.fr.DOCS_PDF = 'PDF';
strings.fr.DOCS_NAME = 'Nom du fichier';
strings.fr.DOCS_SIZE = 'Taille';
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
strings.fr.ANALYSIS_SHAPEFILE_INSTRUCTIONS = 'Fonctionne uniquement avec des données de type polygone avec la réérence spatiale WGS84. La taille maximale est de 5MB. Les fichiers shapefiles doivent être compressés(.zip) et les fichiers GeoJSON sous le format .json.';
strings.fr.ANALYSIS_SELECT_TYPE_LABEL = 'Choisissez le type d\'analyse:';
//- Chart Labels in the Analysis
strings.fr.ANALYSIS_TC_CHART_NAME = 'Perte de couvert arboré en Hectares';
strings.fr.ANALYSIS_LCC_CHART_NAME = 'Occupation du sol';
strings.fr.ANALYSIS_IFL_LABELS = ['Forêts intactes'];
strings.fr.ANALYSIS_MANGROVE_LABELS = ['Mangroves'];
strings.fr.ANALYSIS_FIRES_PRE = 'Il y a';
strings.fr.ANALYSIS_FIRES_ACTIVE = 'feux actifs';
strings.fr.ANALYSIS_FIRES_POST_LIST = [
  'in the last 7 days',
  'in the last 72 hours',
  'in the last 48 hours',
  'in the last 24 hours'
];
strings.fr.ANALYSIS_TOTAL_LOSS_LABEL = 'Total Perte en couvert arboré';
strings.fr.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2015):';
strings.fr.ANALYSIS_TOTAL_GAIN_LABEL = 'Total Gain en couvert arboré';
strings.fr.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.fr.ANALYSIS_SLOPE_OPTION = 'Option #';
strings.fr.SLOPE_SELECT_LABEL = 'Choisissez la pente (%):';
strings.fr.ANALYSIS_RESTORATION_ERROR = 'Région ne correspondant pas aux critères/Pas de données';
strings.fr.ANALYSIS_GROUP_RESTORATION = 'Potentiel de restauration pour';
strings.fr.ANALYSIS_GROUP_SLOPE = 'Potentiel selon';
strings.fr.ANALYSIS_GROUP_OTHER = 'Autre analyse';
strings.fr.ANALYSIS_GLAD_ALERT_NAME = 'Alertes Glad';
strings.fr.ANALYSIS_TERRA_I_ALERT_NAME = 'Alertes Terra-I';
strings.fr.ANALYSIS_SAD_ALERT_NAMES = {
  degrad: 'Dégradation',
  defor: 'Déforestation'
};
//- Group and value should not be modified
strings.fr.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Pente',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Total perte/gain de couvert arboré',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Perte de couvert arboré',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Perte en occupation du sol',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Perte en biomasse aérienne', //'Perte en biomasse',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Perte en forêts intactes',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Perte en mangrove',
    value: analysisKeys.MANGROVE_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Alertes SAD',
    value: analysisKeys.SAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Alertes GLAD',
    value: analysisKeys.GLAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Alertes Terra-I',
    value: analysisKeys.TERRA_I_ALERTS,
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
strings.fr.SEARCH_CLICK_FOR_MORE = 'Cliquez sur la géométrie sélectionnée pour plus d\'info.';
//- Layer Info Modal
strings.fr.NO_INFO = 'Pas d\'informations disponibles';
strings.fr.OVERVIEW = 'Vue d\'ensemble';
strings.fr.CITATION = 'Référence';
//- Case does not matter, css makes them all uppercase
strings.fr.FUNCTION = 'Fonction';
strings.fr.RESOLUTION = 'résolution';
strings.fr.GEO_COVERAGE = 'couverture géographique';
strings.fr.SOURCE = 'source';
strings.fr.FREQUENCY = 'fréquence';
strings.fr.CONTENT_DATE = 'date d\'acquisition';
strings.fr.CAUTIONS = 'Avertissements';
strings.fr.LICENSE = 'licence';
strings.fr.LEARN_MORE = 'En savoir plus';
strings.fr.DOWNLOAD_DATA = 'Téléchargez les données';
strings.fr.DESCRIPTION = 'description';

//- Miscellaneous
strings.fr.PRINT_BUTTON_LABEL = 'Choisissez un format d\'impression';
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

strings.fr.BASEMAP = 'Basemap';
strings.fr.SELECT_ALL = 'Tout sélectionner';
strings.fr.CLEAR_ALL = 'Tout effacer';
strings.fr.LEGEND = 'Légende';
strings.fr.TIMELINE = 'Timeline';
strings.fr.TIMELINE_START = 'début: ';
strings.fr.TIMELINE_END = 'Fin: ';
strings.fr.SEARCH = 'Chercher'; // Also Used for tools, but was used else where first
strings.fr.TOOL_ZOOM_IN = 'Zoom avant';
strings.fr.TOOL_ZOOM_OUT = 'Zoom arrière';
strings.fr.TOOL_SHARE = 'Partager';
strings.fr.TOOL_PRINT = 'Imprimer';
strings.fr.TOOL_ANALYSIS = 'Analyse';
strings.fr.TOOL_TOGGLE = 'Basculer panneau';
strings.fr.TOOL_RESET = 'Réinitialiser';

strings.fr.ANALYSIS_CARBON_EMISSION = 'Emissions de carbone brutes';
strings.fr.ANALYSIS_CARBON_LOSS = 'Perte en couvert arboré';
strings.fr.ANALYSIS_SLOPE_CHART_HEADER = 'Slope';
strings.fr.ANALYSIS_LAND_COVER_CHART_HEADER = 'Land Cover';
strings.fr.ANALYSIS_POPULATION_CHART_HEADER = 'Population Density';
strings.fr.ANALYSIS_TREE_COVER_CHART_HEADER = '% Tree cover';
strings.fr.ANALYSIS_RAINFALL_CHART_HEADER = 'Rainfall';
strings.fr.MONTHS_LIST = [
  { name: 'Janvier', abbr: 'Janv'},
  { name: 'Février', abbr: 'Févr'},
  { name: 'Mars', abbr: 'Mars'},
  { name: 'Avril', abbr: 'Avr'},
  { name: 'Mai', abbr: 'Mai'},
  { name: 'Juin', abbr: 'Juin'},
  { name: 'Juilller', abbr: 'Juil'},
  { name: 'Août', abbr: 'Août'},
  { name: 'Septembre', abbr: 'Sept'},
  { name: 'Octobre', abbr: 'Oct'},
  { name: 'Novembre', abbr: 'Nov'},
  { name: 'Décembre', abbr: 'Déc'}
];

strings.fr.REPORT_TABLE_TOTAL = 'Total';
strings.fr.REPORT_SLOPE_TITLE = 'Slope Analysis';
strings.fr.REPORT_SLOPE_TABLE_TYPE = 'Slope Potential Type';
strings.fr.REPORT_SLOPE_TABLE_VALUE = 'Hectares';
strings.fr.REPORT_RESTORATION_TABLE_TYPE = 'Category';
strings.fr.REPORT_RESTORATION_TABLE_VALUE = 'Hectares';

//- Error Messages
strings.fr.ANALYSIS_ERROR_TC_LOSS_GAIN = 'An error occurred while fetching tree cover loss/gain analysis. Please select another analysis.';
strings.fr.ANALYSIS_ERROR_TC_LOSS = 'An error occurred while fetching tree cover loss analysis. Please select another analysis.';
strings.fr.ANALYSIS_ERROR_LAND_COVER_LOSS = 'An error occurred while fetching land cover loss analysis. Please select another analysis.';
strings.fr.ANALYSIS_ERROR_LAND_COVER_COMPOSITION = 'An error occurred while fetching land cover composition analysis. Please select another analysis.';
strings.fr.ANALYSIS_ERROR_INTACT_LOSS = 'An error occurred while fetching intact loss analysis. Please select another analysis.';
strings.fr.ANALYSIS_ERROR_SAD = 'An error occurred while fetching SAD analysis. Please select another analysis.';
strings.fr.ANALYSIS_ERROR_GLAD = 'An error occurred while fetching GLAD analysis. Please select another analysis.';
strings.fr.ANALYSIS_ERROR_TERRA_I = 'An error occurred while fetching TERRA I analysis. Please select another analysis.';
strings.fr.ANALYSIS_ERROR_BIO_LOSS = 'An error occurred while fetching biomass loss analysis. Please select another analysis.';
strings.fr.ANALYSIS_ERROR_FIRE_COUNT = 'An error occurred while fetching fire count analysis. Please select another analysis.';


//- NOTE: Spanish
//- Supported Languages
strings.es.LANG_EN = 'Inglés';
strings.es.LANG_FR = 'Francés';
strings.es.LANG_ES = 'Español';
strings.es.LANG_PT = 'Portugese';
strings.es.LANG_ID = 'Portugués';
strings.es.LANG_ZH = 'Mandarín';
strings.es.LANG_KA = 'Georgian';

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
strings.es.DOCS_NAME = 'Name';
strings.es.DOCS_SIZE = 'Size';
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
strings.es.ANALYSIS_SHAPEFILE_INSTRUCTIONS = 'Solo están permitido datos en formato de polígono, con el Sistema de Referencia de Coordinados WGS84. Se recomienda un tamaño máximo de 5MB, más grande de 5MB puede no funcionar como era de esperar. Shapefiles de ESRI necesitan estar en formato .zip, y archivos de GeoJSON necesitan estar en formato .json.';
strings.es.ANALYSIS_SELECT_TYPE_LABEL = 'Seleccionar Análisis:';
//- Chart Labels in the Analysis
strings.es.ANALYSIS_TC_CHART_NAME = 'Pérdida de la cobertura arbórea (ha)';
strings.es.ANALYSIS_LCC_CHART_NAME = 'Composición de la cobertura del suelo';
strings.es.ANALYSIS_IFL_LABELS = ['Bosque Intacto'];
strings.es.ANALYSIS_MANGROVE_LABELS = ['Global Mangroves'];
strings.es.ANALYSIS_FIRES_PRE = 'Hay';
strings.es.ANALYSIS_FIRES_ACTIVE = 'incendios activos';
strings.es.ANALYSIS_FIRES_POST_LIST = [
  'in the last 7 days',
  'in the last 72 hours',
  'in the last 48 hours',
  'in the last 24 hours'
];
strings.es.ANALYSIS_TOTAL_LOSS_LABEL = 'Pérdida total de la cobertura arbórea';
strings.es.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2015):';
strings.es.ANALYSIS_TOTAL_GAIN_LABEL = 'Ganancia total de la cobertura arbórea';
strings.es.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.es.ANALYSIS_SLOPE_OPTION = 'Opción #';
strings.es.SLOPE_SELECT_LABEL = 'Escoger porcentaje del pendiente:';
strings.es.ANALYSIS_RESTORATION_ERROR = 'Área no coincide con los criterios/ Sin Datos';
strings.es.ANALYSIS_GROUP_RESTORATION = 'Potencial de restauración para';
strings.es.ANALYSIS_GROUP_SLOPE = 'Potencial según';
strings.es.ANALYSIS_GROUP_OTHER = 'Otro análisis';
strings.es.ANALYSIS_GLAD_ALERT_NAME = 'Alertas Glad';
strings.es.ANALYSIS_TERRA_I_ALERT_NAME = 'Alertas Terra-I';
strings.es.ANALYSIS_SAD_ALERT_NAMES = {
  degrad: 'Degradación',
  defor: 'Deforestación'
};
//- Group and value should not be modified
strings.es.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Pendiente',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Pérdida/ ganancia total de la cobertura arbórea',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Pérdida de la cobertura arbórea',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Pérdida de la cobertura del suelo',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Pérdida de biomasa leñosa encima del suelo', //'Pérdida de biomasa',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Paisajes Forestales Intactos',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Global mangrove loss',
    value: analysisKeys.MANGROVE_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'SAD alerts',
    value: analysisKeys.SAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'GLAD alerts',
    value: analysisKeys.GLAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Terra-I alerts',
    value: analysisKeys.TERRA_I_ALERTS,
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
strings.es.SEARCH_CLICK_FOR_MORE = 'Haz clic en el elemento seleccionado para más información';
//- Layer Info Modal
strings.es.NO_INFO = 'No hay información disponible';
strings.es.OVERVIEW = 'Resumen';
strings.es.CITATION = 'Citación';
//- Case does not matter, css makes them all uppercase
strings.es.FUNCTION = 'Función';
strings.es.RESOLUTION = 'Resolución';
strings.es.GEO_COVERAGE = 'Cobertura geográfica';
strings.es.SOURCE = 'Fuente';
strings.es.FREQUENCY = 'Frecuencia';
strings.es.CONTENT_DATE = 'Fecha del contenido';
strings.es.CAUTIONS = 'Precauciones';
strings.es.LICENSE = 'Licencia';
strings.es.LEARN_MORE = 'Conozca más';
strings.es.DOWNLOAD_DATA = 'Descarga información';
strings.es.DESCRIPTION = 'Descripción';

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

strings.es.BASEMAP = 'Mapa base';
strings.es.SELECT_ALL = 'Seleccionar Todo';
strings.es.CLEAR_ALL = 'Borrar Todo';
strings.es.LEGEND = 'Leyenda';
strings.es.TIMELINE = 'Línea de tiempo';
strings.es.TIMELINE_START = 'Empezar: ';
strings.es.TIMELINE_END = 'Parar: ';
strings.es.SEARCH = 'Buscar'; // Also Used for tools, but was used else where first
strings.es.TOOL_ZOOM_IN = 'Acercar';
strings.es.TOOL_ZOOM_OUT = 'Alejar';
strings.es.TOOL_SHARE = 'Compartir';
strings.es.TOOL_PRINT = 'Imprimir';
strings.es.TOOL_ANALYSIS = 'Análisis';
strings.es.TOOL_TOGGLE = 'Alternar Pane';
strings.es.TOOL_RESET = 'Reajustar';

strings.es.ANALYSIS_CARBON_EMISSION = 'Emisiones de dióxido de carbono';
strings.es.ANALYSIS_CARBON_LOSS = 'Pérdida de cobertura arbórea';
strings.es.ANALYSIS_SLOPE_CHART_HEADER = 'Slope';
strings.es.ANALYSIS_LAND_COVER_CHART_HEADER = 'Land Cover';
strings.es.ANALYSIS_POPULATION_CHART_HEADER = 'Population Density';
strings.es.ANALYSIS_TREE_COVER_CHART_HEADER = '% Tree cover';
strings.es.ANALYSIS_RAINFALL_CHART_HEADER = 'Rainfall';
strings.es.MONTHS_LIST = [
  { name: 'Enero', abbr: 'Ene'},
  { name: 'Febrero', abbr: 'Feb'},
  { name: 'Marzo', abbr: 'Mar'},
  { name: 'Abril', abbr: 'Abr'},
  { name: 'Mayo', abbr: 'May'},
  { name: 'Junio', abbr: 'Jun'},
  { name: 'Julio', abbr: 'Jul'},
  { name: 'Agosto', abbr: 'Ago'},
  { name: 'Septiembre', abbr: 'Sep'},
  { name: 'Octubre', abbr: 'Oct'},
  { name: 'Noviembre', abbr: 'Nov'},
  { name: 'Diciembre', abbr: 'Dic'}
];

strings.es.REPORT_TABLE_TOTAL = 'Total';
strings.es.REPORT_SLOPE_TITLE = 'Slope Analysis';
strings.es.REPORT_SLOPE_TABLE_TYPE = 'Slope Potential Type';
strings.es.REPORT_SLOPE_TABLE_VALUE = 'Hectares';
strings.es.REPORT_RESTORATION_TABLE_TYPE = 'Category';
strings.es.REPORT_RESTORATION_TABLE_VALUE = 'Hectares';

//- Error Messages
strings.es.ANALYSIS_ERROR_TC_LOSS_GAIN = 'An error occurred while fetching tree cover loss/gain analysis. Please select another analysis.';
strings.es.ANALYSIS_ERROR_TC_LOSS = 'An error occurred while fetching tree cover loss analysis. Please select another analysis.';
strings.es.ANALYSIS_ERROR_LAND_COVER_LOSS = 'An error occurred while fetching land cover loss analysis. Please select another analysis.';
strings.es.ANALYSIS_ERROR_LAND_COVER_COMPOSITION = 'An error occurred while fetching land cover composition analysis. Please select another analysis.';
strings.es.ANALYSIS_ERROR_INTACT_LOSS = 'An error occurred while fetching intact loss analysis. Please select another analysis.';
strings.es.ANALYSIS_ERROR_SAD = 'An error occurred while fetching SAD analysis. Please select another analysis.';
strings.es.ANALYSIS_ERROR_GLAD = 'An error occurred while fetching GLAD analysis. Please select another analysis.';
strings.es.ANALYSIS_ERROR_TERRA_I = 'An error occurred while fetching TERRA I analysis. Please select another analysis.';
strings.es.ANALYSIS_ERROR_BIO_LOSS = 'An error occurred while fetching biomass loss analysis. Please select another analysis.';
strings.es.ANALYSIS_ERROR_FIRE_COUNT = 'An error occurred while fetching fire count analysis. Please select another analysis.';

//- NOTE: Portugese
//- Supported Languages
strings.pt.LANG_EN = 'Inglês';
strings.pt.LANG_FR = 'Francês';
strings.pt.LANG_ES = 'Espanhol';
strings.pt.LANG_PT = 'Português';
strings.pt.LANG_ID = 'Indonésio';
strings.pt.LANG_ZH = 'Mandarim';
strings.pt.LANG_KA = 'Georgian';

//- Header
strings.pt.NAV_ABOUT = 'Sobre';
strings.pt.NAV_DOWNLOAD = 'Baixar Dados';
strings.pt.NAV_MAP_THEMES = 'Temas do Mapa';
strings.pt.NAV_MY_GFW = 'Fazer Login no MEU GFW';
strings.pt.NAV_LANGUAGE = 'Selecionar Idioma';
//- Documents
strings.pt.DOCS_INSTRUCTIONS = 'Selecione área de interesse para verificar a existência de documentos relacionados';
strings.pt.DOCS_NOT_AVAILABLE = 'Não existem documentos disponíveis para esta área';
strings.pt.DOCS_TYPE = 'Tipo';
strings.pt.DOCS_AUTHOR = 'Autor';
strings.pt.DOCS_YEAR = 'Ano';
strings.pt.DOCS_PDF = 'PDF';
strings.pt.DOCS_NAME = 'Nome';
strings.pt.DOCS_SIZE = 'Tamanho';
//- Info Window
strings.pt.INFO_WINDOW_INSTRUCTION_HEADER = 'Selecione uma área no mapa';
strings.pt.INFO_WINDOW_INSTRUCTION_LIST = [
  'Use a guia camadas para ativar os dados da camada',
  'Selecione uma área no mapa'
];
//- Analysis
strings.pt.ANALYSIS_INSTRUCTION_HEADER = 'Analise a área selecionada no mapa';
strings.pt.ANALYSIS_INSTRUCTION_LIST = [
  'Use a guia camadas para ativar os dados da camada',
  'Selecione uma área no mapa',
  'Clique na guia de Análise'
];
strings.pt.ANALYSIS_OR = 'Ou';
strings.pt.ANALYSIS_DRAW_HEADER = 'Use sua propria área de Análise';
//- ${drawIcon} references a variable above, do not translate
strings.pt.ANALYSIS_DRAW_INSTRUCTIONS = [
  `Escolha a ferramenta de desenho ${drawIcon} na caixa de ferramentas`,
  'Desenhe uma área de interesse no mapa',
  'Selecione a área na qual irá executar a análise'
];
strings.pt.ANALYSIS_DRAW_BUTTON = 'Comece a desenhar';
strings.pt.ANALYSIS_INSTRUCTION_ADDITIONAL = `Adicionar formas adicionais no futuro, visitando a ferramenta de desenho ${drawIcon}`;
strings.pt.ANALYSIS_SHAPEFILE_UPLOAD = 'ou soltar aqui um shapefile personalizado';
strings.pt.ANALYSIS_SHAPEFILE_INSTRUCTIONS = 'Somente geometria de polígono é suportada, devendo-se usar WGS81 como sistema de referência espacial. O tamanho máximo recomendado é de 5 MB, arquivos com tamanho maior que o recomendado podem não funcionar corretamente. ESRI shapefiles devem estar compactados (.zip) e arquivos GeoJSON devem estar no formato .json.';
strings.pt.ANALYSIS_SELECT_TYPE_LABEL = 'Selecione Análise:';
//- Chart Labels in the Analysis
strings.pt.ANALYSIS_TC_CHART_NAME = 'Perda de cobertura florestal em hectares';
strings.pt.ANALYSIS_LCC_CHART_NAME = 'Composicao da cobertura do solo';
strings.pt.ANALYSIS_IFL_LABELS = ['Floresta Intacta'];
strings.pt.ANALYSIS_MANGROVE_LABELS = ['Mangues Global'];
strings.pt.ANALYSIS_FIRES_PRE = 'Existem';
strings.pt.ANALYSIS_FIRES_ACTIVE = 'Focos de incêndio ativos';
strings.pt.ANALYSIS_FIRES_POST_LIST = [
  'in the last 7 days',
  'in the last 72 hours',
  'in the last 48 hours',
  'in the last 24 hours'
];
strings.pt.ANALYSIS_TOTAL_LOSS_LABEL = 'Perda de cobertura florestal total';
strings.pt.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2015):';
strings.pt.ANALYSIS_TOTAL_GAIN_LABEL = 'Ganho de cobertura florestal total';
strings.pt.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.pt.ANALYSIS_SLOPE_OPTION = 'Opção #';
strings.pt.SLOPE_SELECT_LABEL = 'Escolha o gradiente de inclinação:';
strings.pt.ANALYSIS_RESTORATION_ERROR = 'Área não satisfaz critérios de potencial/sem dados';
strings.pt.ANALYSIS_GROUP_RESTORATION = 'Potencial de restauração para';
strings.pt.ANALYSIS_GROUP_SLOPE = 'Potencial de acordo com';
strings.pt.ANALYSIS_GROUP_OTHER = 'Outras análises';
strings.pt.ANALYSIS_GLAD_ALERT_NAME = 'Alertas Glad';
strings.pt.ANALYSIS_TERRA_I_ALERT_NAME = 'Alertas Terra-I';
strings.pt.ANALYSIS_SAD_ALERT_NAMES = {
  degrad: 'Degradação',
  defor: 'Desmatamento'
};
//- Group and value should not be modified
strings.pt.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Declividade',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Perda/ganho de cobertura florestal total',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Perda de cobertura florestal',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Perda de cobertura do solo',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Perda de Biomassa de madeira viva acima do solo',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Perda de floresta intacta',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Perda de Mangues Global',
    value: analysisKeys.MANGROVE_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Alertas SAD',
    value: analysisKeys.SAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Alertas GLAD',
    value: analysisKeys.GLAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Alertas Terra-I',
    value: analysisKeys.TERRA_I_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Focos de incêndio ativos',
    value: analysisKeys.FIRES,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Composicao da cobertura do solo',
    value: analysisKeys.LCC,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  }
];

//- Modals
strings.pt.CANOPY_MODAL_TEXT = 'Ajuste a densidade mínima de dossel para cobertura florestal e perda de cobertura florestal';
strings.pt.DENSITY_FIRST = 'Exibindo';
strings.pt.DENSITY_SECOND = 'densidade de dossel';
strings.pt.SEARCH_WIDGET_TITLE = 'Buscar recurso:';
strings.pt.SEARCH_CLICK_FOR_MORE = 'Por favor clique no recurso selecionado para mais informações.';
//- Layer Info Modal
strings.pt.NO_INFO = 'Sem informação disponível.';
strings.pt.OVERVIEW = 'Visão geral';
strings.pt.CITATION = 'Citação';
//- Case does not matter, css makes them all uppercase
strings.pt.FUNCTION = 'função';
strings.pt.RESOLUTION = 'resolução';
strings.pt.GEO_COVERAGE = 'cobertura geográfica';
strings.pt.SOURCE = 'fonte';
strings.pt.FREQUENCY = 'frequência';
strings.pt.CONTENT_DATE = 'data do conteúdo';
strings.pt.CAUTIONS = 'precauções';
strings.pt.LICENSE = 'licença';
strings.pt.LEARN_MORE = 'Saiba mais';
strings.pt.DOWNLOAD_DATA = 'Baixar dados';
strings.pt.DESCRIPTION = 'Descrição';

//- Miscellaneous
strings.pt.PRINT_BUTTON_LABEL = 'Escolher saída de impressão.';
strings.pt.PRINT_REPORT = 'Imprimir Relatório';
strings.pt.SUBSCRIBE = 'Inscrever-se';
strings.pt.LAYERS = 'Camadas';
strings.pt.DATA = 'Dados';
strings.pt.ANALYZE = 'Analisar';
strings.pt.DOCS = 'Docs';
strings.pt.NARRATIVE = 'Narrativa';
strings.pt.MORE = 'Mais';
strings.pt.DELETE = 'Excluir';
strings.pt.DOCUMENTS = 'Documentos';

strings.pt.BASEMAP = 'Mapa Base';
strings.pt.SELECT_ALL = 'Selecionar tudo';
strings.pt.CLEAR_ALL = 'Limpar tudo';
strings.pt.LEGEND = 'Legenda';
strings.pt.TIMELINE = 'Cronologia';
strings.pt.TIMELINE_START = 'Início: ';
strings.pt.TIMELINE_END = 'Fim: ';
strings.pt.SEARCH = 'Pesquisa:'; // Also Used for tools, but was used else where first
strings.pt.TOOL_ZOOM_IN = 'Aumentar o Zoom';
strings.pt.TOOL_ZOOM_OUT = 'Diminuir o Zoom';
strings.pt.TOOL_SHARE = 'Compartilhar';
strings.pt.TOOL_PRINT = 'Imprimir';
strings.pt.TOOL_ANALYSIS = 'Análise';
strings.pt.TOOL_TOGGLE = 'Alternar Painel';
strings.pt.TOOL_RESET = 'Reiniciar';

strings.pt.ANALYSIS_CARBON_EMISSION = 'Taxa de emissões de carbono';
strings.pt.ANALYSIS_CARBON_LOSS = 'Perda de cobertura florestal';
strings.pt.ANALYSIS_SLOPE_CHART_HEADER = 'Slope';
strings.pt.ANALYSIS_LAND_COVER_CHART_HEADER = 'Land Cover';
strings.pt.ANALYSIS_POPULATION_CHART_HEADER = 'Population Density';
strings.pt.ANALYSIS_TREE_COVER_CHART_HEADER = '% Tree cover';
strings.pt.ANALYSIS_RAINFALL_CHART_HEADER = 'Rainfall';
strings.pt.MONTHS_LIST = [
  { name: 'Janeiro', abbr: 'Jan'},
  { name: 'Fevereiro', abbr: 'Feb'},
  { name: 'Março', abbr: 'Mar'},
  { name: 'Abril', abbr: 'Abr'},
  { name: 'Maio', abbr: 'Mai'},
  { name: 'Junho', abbr: 'Jun'},
  { name: 'Julho', abbr: 'Jul'},
  { name: 'Agosto', abbr: 'Ago'},
  { name: 'Setembro', abbr: 'Set'},
  { name: 'Outubro', abbr: 'Out'},
  { name: 'Novembro', abbr: 'Nov'},
  { name: 'Dezembro', abbr: 'Dez'}
];

strings.pt.REPORT_TABLE_TOTAL = 'Total';
strings.pt.REPORT_SLOPE_TITLE = 'Slope Analysis';
strings.pt.REPORT_SLOPE_TABLE_TYPE = 'Slope Potential Type';
strings.pt.REPORT_SLOPE_TABLE_VALUE = 'Hectares';
strings.pt.REPORT_RESTORATION_TABLE_TYPE = 'Category';
strings.pt.REPORT_RESTORATION_TABLE_VALUE = 'Hectares';

//- Error Messages
strings.pt.ANALYSIS_ERROR_TC_LOSS_GAIN = 'An error occurred while fetching tree cover loss/gain analysis. Please select another analysis.';
strings.pt.ANALYSIS_ERROR_TC_LOSS = 'An error occurred while fetching tree cover loss analysis. Please select another analysis.';
strings.pt.ANALYSIS_ERROR_LAND_COVER_LOSS = 'An error occurred while fetching land cover loss analysis. Please select another analysis.';
strings.pt.ANALYSIS_ERROR_LAND_COVER_COMPOSITION = 'An error occurred while fetching land cover composition analysis. Please select another analysis.';
strings.pt.ANALYSIS_ERROR_INTACT_LOSS = 'An error occurred while fetching intact loss analysis. Please select another analysis.';
strings.pt.ANALYSIS_ERROR_SAD = 'An error occurred while fetching SAD analysis. Please select another analysis.';
strings.pt.ANALYSIS_ERROR_GLAD = 'An error occurred while fetching GLAD analysis. Please select another analysis.';
strings.pt.ANALYSIS_ERROR_TERRA_I = 'An error occurred while fetching TERRA I analysis. Please select another analysis.';
strings.pt.ANALYSIS_ERROR_BIO_LOSS = 'An error occurred while fetching biomass loss analysis. Please select another analysis.';
strings.pt.ANALYSIS_ERROR_FIRE_COUNT = 'An error occurred while fetching fire count analysis. Please select another analysis.';

//- NOTE: Bahasa Indonesia
//- Supported Languages
strings.id.LANG_EN = 'English';
strings.id.LANG_FR = 'French';
strings.id.LANG_ES = 'Spanish';
strings.id.LANG_PT = 'Portugese';
strings.id.LANG_ID = 'Indonesian';
strings.id.LANG_ZH = 'Mandarin';
strings.id.LANG_KA = 'Georgian';

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
strings.id.DOCS_NAME = 'Name';
strings.id.DOCS_SIZE = 'Size';
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
strings.id.ANALYSIS_SHAPEFILE_INSTRUCTIONS = 'Only polygon data is supported and should use a spatial reference of WGS84. The recommended maximum size is 5MB, anything more than that may not work as expected. Esri shapefiles must be zipped (.zip) and GeoJSON files must be in .json files.';
strings.id.ANALYSIS_SELECT_TYPE_LABEL = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.id.ANALYSIS_TC_CHART_NAME = 'Tree cover loss in Hectares';
strings.id.ANALYSIS_LCC_CHART_NAME = 'Land Cover Composition';
strings.id.ANALYSIS_IFL_LABELS = ['Intact Forest'];
strings.id.ANALYSIS_MANGROVE_LABELS = ['Global Mangroves'];
strings.id.ANALYSIS_FIRES_PRE = 'There are';
strings.id.ANALYSIS_FIRES_ACTIVE = 'active fires';
strings.id.ANALYSIS_FIRES_POST_LIST = [
  'in the last 7 days',
  'in the last 72 hours',
  'in the last 48 hours',
  'in the last 24 hours'
];
strings.id.ANALYSIS_TOTAL_LOSS_LABEL = 'Total tree cover loss';
strings.id.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2015):';
strings.id.ANALYSIS_TOTAL_GAIN_LABEL = 'Total tree cover gained';
strings.id.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.id.ANALYSIS_SLOPE_OPTION = 'Option #';
strings.id.SLOPE_SELECT_LABEL = 'Choose slope percent:';
strings.id.ANALYSIS_RESTORATION_ERROR = 'Area not meeting criteria for potential/No data';
strings.id.ANALYSIS_GROUP_RESTORATION = 'Restoration potential for';
strings.id.ANALYSIS_GROUP_SLOPE = 'Potential according to';
strings.id.ANALYSIS_GROUP_OTHER = 'Other analysis';
strings.id.ANALYSIS_GLAD_ALERT_NAME = 'GLAD Alerts';
strings.id.ANALYSIS_TERRA_I_ALERT_NAME = 'Terra-I Alerts';
strings.id.ANALYSIS_SAD_ALERT_NAMES = {
  degrad: 'Degradation',
  defor: 'Deforestation'
};
//- Group and value should not be modified
strings.id.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Slope',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Aboveground Live Woody Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Global mangrove loss',
    value: analysisKeys.MANGROVE_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'SAD alerts',
    value: analysisKeys.SAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'GLAD alerts',
    value: analysisKeys.GLAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Terra-I alerts',
    value: analysisKeys.TERRA_I_ALERTS,
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
strings.id.SEARCH_CLICK_FOR_MORE = 'Please click on the selected feature for more info.';
//- Layer Info Modal
strings.id.NO_INFO = 'No Information Available';
strings.id.OVERVIEW = 'Overview';
strings.id.CITATION = 'Citation';
//- Case does not matter, css makes them all uppercase
strings.id.FUNCTION = 'function';
strings.id.RESOLUTION = 'resolution';
strings.id.GEO_COVERAGE = 'geographic coverage';
strings.id.SOURCE = 'source';
strings.id.FREQUENCY = 'frequency';
strings.id.CONTENT_DATE = 'date of content';
strings.id.CAUTIONS = 'cautions';
strings.id.LICENSE = 'license';
strings.id.LEARN_MORE = 'learn More';
strings.id.DOWNLOAD_DATA = 'download data';
strings.id.DESCRIPTION = 'description';

//- Miscellaneous
strings.id.PRINT_BUTTON_LABEL = 'Choose a print output';
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

strings.id.BASEMAP = 'Basemap';
strings.id.SELECT_ALL = 'select all';
strings.id.CLEAR_ALL = 'clear all';
strings.id.LEGEND = 'Legend';
strings.id.TIMELINE = 'Timeline';
strings.id.TIMELINE_START = 'Start: ';
strings.id.TIMELINE_END = 'End: ';
strings.id.SEARCH = 'Search'; // Also Used for tools, but was used else where first
strings.id.TOOL_ZOOM_IN = 'Zoom In';
strings.id.TOOL_ZOOM_OUT = 'Zoom Out';
strings.id.TOOL_SHARE = 'Share';
strings.id.TOOL_PRINT = 'Print';
strings.id.TOOL_ANALYSIS = 'Analysis';
strings.id.TOOL_TOGGLE = 'Toggle Panel';
strings.id.TOOL_RESET = 'Reset';

strings.id.ANALYSIS_CARBON_EMISSION = 'Gross carbon emissions';
strings.id.ANALYSIS_CARBON_LOSS = 'Tree cover loss';
strings.id.ANALYSIS_SLOPE_CHART_HEADER = 'Slope';
strings.id.ANALYSIS_LAND_COVER_CHART_HEADER = 'Land Cover';
strings.id.ANALYSIS_POPULATION_CHART_HEADER = 'Population Density';
strings.id.ANALYSIS_TREE_COVER_CHART_HEADER = '% Tree cover';
strings.id.ANALYSIS_RAINFALL_CHART_HEADER = 'Rainfall';
strings.id.MONTHS_LIST = [
  { name: 'January', abbr: 'Jan'},
  { name: 'February', abbr: 'Feb'},
  { name: 'March', abbr: 'Mar'},
  { name: 'April', abbr: 'Apr'},
  { name: 'May', abbr: 'May'},
  { name: 'June', abbr: 'Jun'},
  { name: 'July', abbr: 'Jul'},
  { name: 'August', abbr: 'Aug'},
  { name: 'September', abbr: 'Sep'},
  { name: 'October', abbr: 'Oct'},
  { name: 'November', abbr: 'Nov'},
  { name: 'December', abbr: 'Dec'}
];

strings.id.REPORT_TABLE_TOTAL = 'Total';
strings.id.REPORT_SLOPE_TITLE = 'Slope Analysis';
strings.id.REPORT_SLOPE_TABLE_TYPE = 'Slope Potential Type';
strings.id.REPORT_SLOPE_TABLE_VALUE = 'Hectares';
strings.id.REPORT_RESTORATION_TABLE_TYPE = 'Category';
strings.id.REPORT_RESTORATION_TABLE_VALUE = 'Hectares';

//- Error Messages
strings.id.ANALYSIS_ERROR_TC_LOSS_GAIN = 'An error occurred while fetching tree cover loss/gain analysis. Please select another analysis.';
strings.id.ANALYSIS_ERROR_TC_LOSS = 'An error occurred while fetching tree cover loss analysis. Please select another analysis.';
strings.id.ANALYSIS_ERROR_LAND_COVER_LOSS = 'An error occurred while fetching land cover loss analysis. Please select another analysis.';
strings.id.ANALYSIS_ERROR_LAND_COVER_COMPOSITION = 'An error occurred while fetching land cover composition analysis. Please select another analysis.';
strings.id.ANALYSIS_ERROR_INTACT_LOSS = 'An error occurred while fetching intact loss analysis. Please select another analysis.';
strings.id.ANALYSIS_ERROR_SAD = 'An error occurred while fetching SAD analysis. Please select another analysis.';
strings.id.ANALYSIS_ERROR_GLAD = 'An error occurred while fetching GLAD analysis. Please select another analysis.';
strings.id.ANALYSIS_ERROR_TERRA_I = 'An error occurred while fetching TERRA I analysis. Please select another analysis.';
strings.id.ANALYSIS_ERROR_BIO_LOSS = 'An error occurred while fetching biomass loss analysis. Please select another analysis.';
strings.id.ANALYSIS_ERROR_FIRE_COUNT = 'An error occurred while fetching fire count analysis. Please select another analysis.';

//- NOTE: Mandarin
//- Supported Languages
strings.zh.LANG_EN = 'English';
strings.zh.LANG_FR = 'French';
strings.zh.LANG_ES = 'Spanish';
strings.zh.LANG_PT = 'Portugese';
strings.zh.LANG_ID = 'Indonesian';
strings.zh.LANG_ZH = 'Mandarin';
strings.zh.LANG_KA = 'Georgian';

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
strings.zh.DOCS_NAME = 'Name';
strings.zh.DOCS_SIZE = 'Size';
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
strings.zh.ANALYSIS_SHAPEFILE_INSTRUCTIONS = '本网站仅支持空间参考系统为WGS84的图形数据文件。建议文件大小应小于5MB。ESRI文件必须为压缩文件（.zip）,GeoJSON 文件必须为后缀.json的文件。';
strings.zh.ANALYSIS_SELECT_TYPE_LABEL = '选择分析方式：';
//- Chart Labels in the Analysis
strings.zh.ANALYSIS_TC_CHART_NAME = '森林覆盖损失（单位：公顷）';
strings.zh.ANALYSIS_LCC_CHART_NAME = '土地覆盖组成';
strings.zh.ANALYSIS_IFL_LABELS = ['原生森林'];
strings.zh.ANALYSIS_MANGROVE_LABELS = ['Global Mangroves'];
strings.zh.ANALYSIS_FIRES_PRE = '共计';
strings.zh.ANALYSIS_FIRES_ACTIVE = '活跃火点';
strings.zh.ANALYSIS_FIRES_POST_LIST = [
  'in the last 7 days',
  'in the last 72 hours',
  'in the last 48 hours',
  'in the last 24 hours'
];
strings.zh.ANALYSIS_TOTAL_LOSS_LABEL = '总森林覆盖损失';
strings.zh.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2015):';
strings.zh.ANALYSIS_TOTAL_GAIN_LABEL = '总森林覆盖增加';
strings.zh.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.zh.ANALYSIS_SLOPE_OPTION = '选项 #';
strings.zh.SLOPE_SELECT_LABEL = '选择倾斜度：';
strings.zh.ANALYSIS_RESTORATION_ERROR = '无数据 或者 区域不满足条件';
strings.zh.ANALYSIS_GROUP_RESTORATION = '在生态修复可能性的层面';
strings.zh.ANALYSIS_GROUP_SLOPE = '可能性原因';
strings.zh.ANALYSIS_GROUP_OTHER = '其他分析';
strings.zh.ANALYSIS_GLAD_ALERT_NAME = 'GLAD Alerts';
strings.zh.ANALYSIS_TERRA_I_ALERT_NAME = 'Terra-I Alerts';
strings.zh.ANALYSIS_SAD_ALERT_NAMES = {
  degrad: 'Degradation',
  defor: 'Deforestation'
};
//- Group and value should not be modified
strings.zh.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: '倾斜度',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: '总森林覆盖损失或增加',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: '森林覆盖损失',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: '土地覆盖损失',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: '地上活性木质生物量损失',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: '原生林损失',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Global mangrove loss',
    value: analysisKeys.MANGROVE_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'SAD alerts',
    value: analysisKeys.SAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'GLAD alerts',
    value: analysisKeys.GLAD_ALERTS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Terra-I alerts',
    value: analysisKeys.TERRA_I_ALERTS,
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
strings.zh.SEARCH_CLICK_FOR_MORE = '请点击选中图形来获取更多信息';
//- Layer Info Modal
strings.zh.NO_INFO = '没有相关信息';
strings.zh.OVERVIEW = '概述';
strings.zh.CITATION = '引用';
//- Case does not matter, css makes them all uppercase
strings.zh.FUNCTION = '功能';
strings.zh.RESOLUTION = '清晰度';
strings.zh.GEO_COVERAGE = '空间覆盖范围';
strings.zh.SOURCE = '来源';
strings.zh.FREQUENCY = '更新频率';
strings.zh.CONTENT_DATE = '内容日期';
strings.zh.CAUTIONS = '注意';
strings.zh.LICENSE = '数据分享执照';
strings.zh.LEARN_MORE = '了解更多';
strings.zh.DOWNLOAD_DATA = '下载数据';
strings.zh.DESCRIPTION = '说明';

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

strings.zh.BASEMAP = '底图';
strings.zh.SELECT_ALL = '全选';
strings.zh.CLEAR_ALL = '全部清除';
strings.zh.LEGEND = '图例';
strings.zh.TIMELINE = '时间范围';
strings.zh.TIMELINE_START = '开始：';
strings.zh.TIMELINE_END = '结束：';
strings.zh.SEARCH = '搜索'; // Also Used for tools, but was used else where first
strings.zh.TOOL_ZOOM_IN = '放大';
strings.zh.TOOL_ZOOM_OUT = '缩小';
strings.zh.TOOL_SHARE = '分享';
strings.zh.TOOL_PRINT = '打印';
strings.zh.TOOL_ANALYSIS = '分析';
strings.zh.TOOL_TOGGLE = '控制面板';
strings.zh.TOOL_RESET = '重置';

strings.zh.ANALYSIS_CARBON_EMISSION = 'Gross carbon emissions';
strings.zh.ANALYSIS_CARBON_LOSS = 'Tree cover loss';
strings.zh.ANALYSIS_SLOPE_CHART_HEADER = 'Slope';
strings.zh.ANALYSIS_LAND_COVER_CHART_HEADER = 'Land Cover';
strings.zh.ANALYSIS_POPULATION_CHART_HEADER = 'Population Density';
strings.zh.ANALYSIS_TREE_COVER_CHART_HEADER = '% Tree cover';
strings.zh.ANALYSIS_RAINFALL_CHART_HEADER = 'Rainfall';
strings.zh.MONTHS_LIST = [
  { name: 'January', abbr: 'Jan'},
  { name: 'February', abbr: 'Feb'},
  { name: 'March', abbr: 'Mar'},
  { name: 'April', abbr: 'Apr'},
  { name: 'May', abbr: 'May'},
  { name: 'June', abbr: 'Jun'},
  { name: 'July', abbr: 'Jul'},
  { name: 'August', abbr: 'Aug'},
  { name: 'September', abbr: 'Sep'},
  { name: 'October', abbr: 'Oct'},
  { name: 'November', abbr: 'Nov'},
  { name: 'December', abbr: 'Dec'}
];

strings.zh.REPORT_TABLE_TOTAL = 'Total';
strings.zh.REPORT_SLOPE_TITLE = 'Slope Analysis';
strings.zh.REPORT_SLOPE_TABLE_TYPE = 'Slope Potential Type';
strings.zh.REPORT_SLOPE_TABLE_VALUE = 'Hectares';
strings.zh.REPORT_RESTORATION_TABLE_TYPE = 'Category';
strings.zh.REPORT_RESTORATION_TABLE_VALUE = 'Hectares';

//- Error Messages
strings.zh.ANALYSIS_ERROR_TC_LOSS_GAIN = 'An error occurred while fetching tree cover loss/gain analysis. Please select another analysis.';
strings.zh.ANALYSIS_ERROR_TC_LOSS = 'An error occurred while fetching tree cover loss analysis. Please select another analysis.';
strings.zh.ANALYSIS_ERROR_LAND_COVER_LOSS = 'An error occurred while fetching land cover loss analysis. Please select another analysis.';
strings.zh.ANALYSIS_ERROR_LAND_COVER_COMPOSITION = 'An error occurred while fetching land cover composition analysis. Please select another analysis.';
strings.zh.ANALYSIS_ERROR_INTACT_LOSS = 'An error occurred while fetching intact loss analysis. Please select another analysis.';
strings.zh.ANALYSIS_ERROR_SAD = 'An error occurred while fetching SAD analysis. Please select another analysis.';
strings.zh.ANALYSIS_ERROR_GLAD = 'An error occurred while fetching GLAD analysis. Please select another analysis.';
strings.zh.ANALYSIS_ERROR_SLOPE = 'An error occurred while fetching slope analysis. Please select another analysis.';
strings.zh.ANALYSIS_ERROR_TERRA_I = 'An error occurred while fetching TERRA I analysis. Please select another analysis.';
strings.zh.ANALYSIS_ERROR_BIO_LOSS = 'An error occurred while fetching biomass loss analysis. Please select another analysis.';
strings.zh.ANALYSIS_ERROR_FIRE_COUNT = 'An error occurred while fetching fire count analysis. Please select another analysis.';

export { strings as default };
