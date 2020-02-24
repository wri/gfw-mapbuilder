// import penIcon from '../src/images/penIcon.svg';
// import React, { FunctionComponent } from 'react';

const drawTool = 'DRAW_ICON_HERE';

// const drawTool: FunctionComponent = () => {
//   return <img src={penIcon} />;
// };

export const analysisContent = {
  en: {
    analyzeExistingShapeTitle: 'Analyze a shape on the map',
    analyzeExistingShapeDirections: [
      'Use the layers tab to turn on a data layer',
      'Select a shape on the map',
      'Click on the analyze tab'
    ],
    analyzeYourShapeTitle: 'Analyze your own shape',
    analyzeYourShapeDirections: [
      `Choose the draw tool ${drawTool} in the toolbox`,
      'Draw a shape anywhere on the map',
      'Select the shape to run the analysis'
    ],
    drawButton: 'Start drawing',
    enterCoordinatesTitle: 'Enter your own coordinates',
    enterCoordinatesDirections: [
      `Enter at least 3 coordinates`,
      `Add up to 10 points to make shapes`
    ],
    coordinatesButton: 'Enter Values',
    visitTitle: 'Add additional shapes in the future by visiting the draw tool',
    uploadShapefileTitle: 'or drop a custom shapefile here',
    uploadShapefileDirections: `Only polygon data is supported and should use a spatial reference of WGS84.\
       The recommended maximum size is 1MB, anything more than that may not work as expected.\
       Esri shapefiles must be zipped (.zip) and GeoJSON files must be in .json files.`
  },
  ka: {
    analyzeExistingShapeTitle: 'ჩაატარეთ ფიგურის ანალიზი რუკაზე',
    analyzeExistingShapeDirections: [
      'მონაცემების ფენის ჩასართავად გამოიყენეთ ფენების მენიუ',
      'აარჩიეთ ფიგურა რუკაზე',
      'დააჭირეთ ანალიზისი მენიუს'
    ],
    analyzeYourShapeTitle: 'ჩაატარეთ თქვენი ფიგურის ანალიზი',
    analyzeYourShapeDirections: [
      `შეარჩიეთ სახაზავი ინსტრუმენტი ${drawTool} ტულბოქსიდან`,
      'რუკაზე ნებისმიერი ფიგურა დახაზეთ',
      'ანალიზის ჩასატარებლად შეარჩიეთ ფიგურა'
    ],
    drawButton: 'დაიწყეთ ხაზვა',
    enterCoordinatesTitle: 'შეიტანეთ თქვენი კოორდინატები',
    enterCoordinatesDirections: [
      `შეიტანეთ მინიმუმ  3 კოორდინატი`,
      `დაამატეთ 10 წერტილამდე პოლიგონის შესაქმნელად`
    ],
    coordinatesButton: `მნიშვნელობების შეტანა`,
    visitTitle: `მომავალში დაამატეთ დამატებითი ფიგურები სახაზავი ინსტრუმენტის ${drawTool} მეშვეობით`,
    uploadShapefileTitle: 'ან შემოიტანეთ სხვა შეიპფაილი',
    uploadShapefileDirections: `უნდა იყოს გამოყენებული მხოლოდ პოლიგონების მონაცემები WGS84 სივრცული რეფერენსებით.\
    რეკომენდირებული მაქსიმალური ზომაა 1 მბ, უფრო დიდმა ფაილმა შეიძლება ვერ იმუშაოს კორექტულად.\
    Esri შეიპფაილები უნდა იყოს დაზიპული (.zip) ხოლო GeoJSON ფაილები უნდა იყოს  .json ფორმატით.`
  },
  fr: {
    analyzeExistingShapeTitle: 'Analysez un polygone sur la carte',
    analyzeExistingShapeDirections: [
      "Utilisez l'onglet Couches pour activer une couche de données",
      'Sélectionnez une entité sur la carte',
      "Cliquez sur l'onglet analyse"
    ],
    analyzeYourShapeTitle: 'Analysez votre propre polygone',
    analyzeYourShapeDirections: [
      `Utiliser l'outil dessin ${drawTool} dans la boîte à outil`,
      'Tracez un polygone sur la carte',
      "Cliquez sur le polygone pour lancer l'analyse"
    ],
    drawButton: 'Débutez le dessin',
    enterCoordinatesTitle: 'Entrez vos propres coordonnées',
    enterCoordinatesDirections: [
      `Entrez au moins 3 coordonnées`,
      `Ajoutez jusqu’à 10 points pour définir votre zone`
    ],
    coordinatesButton: `Entrez les valeurs`,
    visitTitle: "Ajouter des polygones supplémentaires grâce à l'outil dessin",
    uploadShapefileTitle: 'ou glissez un shapefile ici',
    uploadShapefileDirections: `Fonctionne uniquement avec des données de type polygone avec la réérence spatiale WGS84.\
    La taille maximale est de 1MB. Les fichiers shapefiles doivent être compressés(.zip) et les fichiers GeoJSON sous\
    le format .json.`
  },
  es: {
    analyzeExistingShapeTitle: 'Analizar un polígono  en el mapa',
    analyzeExistingShapeDirections: [
      'Usar la pestaña de capas para encender una capa',
      'Seleccionar un polígono en el mapa',
      'Hacer clic en la pestaña de analizar'
    ],
    analyzeYourShapeTitle: 'Analizar su propio polígono',
    analyzeYourShapeDirections: [
      `Escoger la herramienta de dibujo ${drawTool} en la caja de herramientas`,
      'Dibujar un polígono en cualquier lugar del mapa',
      'Seleccionar el polígono para hacer el análisis'
    ],
    drawButton: 'Empezar a dibujar',
    enterCoordinatesTitle: 'Ingresa las coordenadas',
    enterCoordinatesDirections: [
      `Ingresa por lo menos 3 coordenadas`,
      `Agrega hasta 10 puntos para generar el polígono`
    ],
    coordinatesButton: `Ingresa valores`,
    visitTitle:
      'Añadir polígonos adicionales en el futuro usando la herramienta de dibujo ',
    uploadShapefileTitle: 'o dejar un shapefile aquí',
    uploadShapefileDirections: `Solo están permitido datos en formato de polígono, con el Sistema de Referencia de Coordinados WGS84. \
    Se recomienda un tamaño máximo de 1MB, más grande de 1MB puede no funcionar como era de esperar. \
    Shapefiles de ESRI necesitan estar en formato .zip, y archivos de GeoJSON necesitan estar en formato .json.`
  },
  pt: {
    analyzeExistingShapeTitle: 'Analise a área selecionada no mapa',
    analyzeExistingShapeDirections: [
      'Use a guia camadas para ativar os dados da camada',
      'Selecione uma área no mapa',
      'Clique na guia de Análise'
    ],
    analyzeYourShapeTitle: 'Use sua propria área de Análise',
    analyzeYourShapeDirections: [
      `Escolha a ferramenta de desenho ${drawTool} na caixa de ferramentas`,
      'Desenhe uma área de interesse no mapa',
      'Selecione a área na qual irá executar a análise'
    ],
    drawButton: 'Comece a desenhar',
    enterCoordinatesTitle: 'Entre com suas coordenadas',
    enterCoordinatesDirections: [
      `Insira pelo menos 3 coordenadas`,
      `Adicione até 10 pontos para desenhar o shape`
    ],
    coordinatesButton: `Entre com os valores`,
    visitTitle:
      'Adicionar formas adicionais no futuro, visitando a ferramenta de desenho',
    uploadShapefileTitle: 'ou soltar aqui um shapefile personalizado',
    uploadShapefileDirections: `Somente geometria de polígono é suportada, devendo-se usar WGS81 como sistema de referência espacial. \
    O tamanho máximo recomendado é de 5 MB, arquivos com tamanho maior que o recomendado podem não funcionar corretamente. \
    ESRI shapefiles devem estar compactados (.zip) e arquivos GeoJSON devem estar no formato .json.`
  },
  id: {
    analyzeExistingShapeTitle: 'Analyze a shape on the map',
    analyzeExistingShapeDirections: [
      'Use the layers tab to turn on a data layer',
      'Select a shape on the map',
      'Click on the analyze tab'
    ],
    analyzeYourShapeTitle: 'Analyze your own shape',
    analyzeYourShapeDirections: [
      `Choose the draw tool ${drawTool} in the toolbox`,
      'Draw a shape anywhere on the map',
      'Select the shape to run the analysis'
    ],
    drawButton: 'Start drawing',
    enterCoordinatesTitle: 'Masukkan koordinat Anda',
    enterCoordinatesDirections: [
      `Masukkan paling sedikit 3 koordinat`,
      `Tambahkan sampai 10 titik untuk membuat bentuk`
    ],
    coordinatesButton: `Masukkan Nilai`,
    visitTitle:
      'Add additional shapes in the future by visiting the draw tool ',
    uploadShapefileTitle: 'or drop a custom shapefile here',
    uploadShapefileDirections: `Only polygon data is supported and should use a spatial reference of WGS84. \
    The recommended maximum size is 1MB, anything more than that may not work as expected. \
    Esri shapefiles must be zipped (.zip) and GeoJSON files must be in .json files.`
  },
  zh: {
    analyzeExistingShapeTitle: '分析地图上的图形',
    analyzeExistingShapeDirections: [
      '使用图层键来打开图层',
      '在地图上选择一个图形',
      '点击分析键'
    ],
    analyzeYourShapeTitle: '',
    analyzeYourShapeDirections: [
      `在工具箱里选择一个绘画工具 ${drawTool}`,
      '在地图上任意地方画一个图形',
      '选择进行分析的图形'
    ],
    drawButton: '开始绘画',
    enterCoordinatesTitle: '输入你的坐标',
    enterCoordinatesDirections: [
      `输入至少三个坐标`,
      `添加最多10个坐标来完成作图`
    ],
    coordinatesButton: `输入`,
    visitTitle: '使用绘画工具来添加更多图形',
    uploadShapefileTitle: '或者在这里添加自定义地理信息系统文件（shapefile）',
    uploadShapefileDirections: `本网站仅支持空间参考系统为WGS84的图形数据文件。\
    建议文件大小应小于1MB。ESRI文件必须为压缩文件（.zip）,GeoJSON 文件必须为后缀.json的文件。`
  }
};
