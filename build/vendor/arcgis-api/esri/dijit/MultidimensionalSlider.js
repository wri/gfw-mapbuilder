//>>built
require({cache:{"url:esri/dijit/templates/MultidimensionalSlider_vertical.html":'\x3cdiv class\x3d"esriMdSliderVertical esriMdSliderPassive"\x3e\r\n  \x3ctable class\x3d"esriMdSliderTableVertical" data-dojo-attach-point\x3d"mdSliderTable"\x3e\r\n    \x3ctr\x3e\r\n      \x3ctd colspan\x3d"3" class\x3d"esriMdSliderInfoCellVertical"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"dimensionInfo" class\x3d"esriMdSliderInfo"\x3e\r\n          \x3cbr/\x3e\x3cbr/\x3e\r\n        \x3c/div\x3e\r\n      \x3c/td\x3e\r\n    \x3c/tr\x3e\r\n    \x3ctr\x3e\r\n      \x3ctd colspan\x3d"3" class\x3d"esriMdSliderCellVertical" data-dojo-attach-point\x3d"mdSliderCell"\x3e\x3c/td\x3e\r\n    \x3c/tr\x3e\r\n    \x3ctr  class\x3d"esriMdSliderPlayButtonRow"  data-dojo-attach-point\x3d"playPauseBtnRow"\x3e\r\n      \x3ctd class\x3d"esriMdSliderPrevButtonCell"\x3e\r\n        \x3cbutton data-dojo-type\x3d"dijit/form/Button" data-dojo-props\x3d"iconClass: \'mdsButton mdsPrevButton\'" data-dojo-attach-event\x3d"onClick:decrement" data-dojo-attach-point\x3d"prevBtn" type\x3d"button"\r\n                title\x3d"${_i18n.widgets.mdSlider.NLS_previous}"\x3e\r\n        \x3c/button\x3e\x3c/td\x3e\r\n      \x3ctd class\x3d"esriMdSliderPlayButtonCell"\x3e\r\n        \x3cbutton data-dojo-type\x3d"dijit/form/Button" data-dojo-props\x3d"iconClass: \'mdsButton mdsPlayButton\'" data-dojo-attach-event\x3d"onClick:_onPlay" data-dojo-attach-point\x3d"playPauseBtn" type\x3d"button"\r\n                title\x3d"${_i18n.widgets.mdSlider.NLS_play}"\x3e\r\n        \x3c/button\x3e\x3c/td\x3e\r\n      \x3ctd class\x3d"esriMdSliderNextButtonCell"\x3e\r\n        \x3cbutton data-dojo-type\x3d"dijit/form/Button" data-dojo-props\x3d"iconClass: \'mdsButton mdsNextButton\'" data-dojo-attach-event\x3d"onClick:increment" data-dojo-attach-point\x3d"nextBtn" type\x3d"button"\r\n                title\x3d"${_i18n.widgets.mdSlider.NLS_next}"\x3e\r\n        \x3c/button\x3e\x3c/td\x3e\r\n    \x3c/tr\x3e\r\n  \x3c/table\x3e\r\n\x3c/div\x3e',
"url:esri/dijit/templates/MultidimensionalSlider_horizontal.html":'\x3cdiv class\x3d"esriMdSliderHorizontal"\x3e\r\n  \x3ctable class\x3d"esriMdSliderTableHorizontal"\x3e\r\n    \x3ccolgroup\x3e\r\n      \x3ccol class\x3d"esriMdSliderHorizontalCol1"\x3e\r\n      \x3ccol\x3e\r\n    \x3c/colgroup\x3e\r\n    \x3ctr\x3e\r\n      \x3ctd class\x3d"esriMdSliderDimensionInfoCellHorizontal" colspan\x3d"2"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"dimensionInfo"\x3e\x3c/div\x3e\r\n      \x3c/td\x3e\r\n    \x3c/tr\x3e\r\n    \x3ctr\x3e\r\n      \x3ctd align\x3d"right" valign\x3d"middle"\x3e\x3cbutton data-dojo-type\x3d"dijit/form/Button" data-dojo-props\x3d"iconClass: \'mdsButton mdsPlayButton\'" data-dojo-attach-event\x3d"onClick:_onPlay" \r\n                                               data-dojo-attach-point\x3d"playPauseBtn" type\x3d"button" title\x3d"${_i18n.widgets.mdSlider.NLS_play}"\x3e\x3c/button\x3e\x3c/td\x3e\r\n      \x3ctd class\x3d"esriMdSliderCellHorizontal" data-dojo-attach-point\x3d"mdSliderCell"\x3e\r\n      \x3c/td\x3e\r\n    \x3c/tr\x3e\r\n  \x3c/table\x3e\r\n\x3c/div\x3e\r\n'}});
define("esri/dijit/MultidimensionalSlider","dojo/_base/declare dojo/_base/lang dojo/has dojo/on dojo/json dijit/form/VerticalSlider dojox/form/VerticalRangeSlider dijit/form/VerticalRule dijit/form/VerticalRuleLabels dijit/form/HorizontalSlider dojox/form/HorizontalRangeSlider dijit/form/HorizontalRule dijit/form/HorizontalRuleLabels dijit/_Widget dijit/_Templated dojox/timing/_base dojo/_base/array dojo/Deferred dojo/DeferredList ../layers/MosaicRule ../layers/DimensionalDefinition ../kernel ../lang ./_EventedWidget dojo/text!./templates/MultidimensionalSlider_vertical.html dojo/text!./templates/MultidimensionalSlider_horizontal.html dojo/i18n!../nls/jsapi dojo/dom-class dojo/dom-style dojo/dom-geometry dojo/touch dojo/query dojo/dom-construct".split(" "),
function(w,g,x,k,t,z,A,B,C,D,E,F,G,r,H,I,e,J,K,L,M,N,h,O,P,Q,R,l,m,u,q,y,s){var p={LAYOUT_VERTICAL:"vertical",LAYOUT_HORIZONTAL:"horizontal"};r=w([O,r,H],{declaredClass:"esri.dijit.MultidimensionalSlider",widgetsInTemplate:!0,templateString:P,nLabels:10,_thumbCount:1,useRanges:!1,loop:!0,useLayersDimSlices:!0,prefetch:!0,prefetchedValues:{},showPlayButton:!0,prefetchFactor:2,_hasUnitConflict:!1,_update:!0,playDirectionAscending:!0,unitSymbols:{meter:"m",pascal:"Pa"},_eventMap:{"dimension-value-change":!0,
play:!0,pause:!0,next:!0,previous:!0,change:!0,"dimension-array-create":!0},onChange:function(){},onPlay:function(){},onPause:function(){},onDimensionValueChange:function(){},_onPlay:function(){this.playing=!this.playing;this._updateUI();this.playing?(this._timer.start(),this.onPlay()):(this._timer.stop(),this.onPause())},constructor:function(a,b){w.safeMixin(this,a);this.playing=!1;this._iconClass="mdsButton mdsPlayButton";this.map&&this._getImageLayers();this.layout===p.LAYOUT_HORIZONTAL&&(this.templateString=
Q);this.thumbMovingRate=this.thumbMovingRate||3E3;this._i18n=R;this.prefetchImgNodes={}},postCreate:function(){this.inherited(arguments)},startup:function(){this.inherited(arguments);var a=this;this._getAllLayersMDInfo().then(function(){a._sortDimensionValues();a.dimensionValues=a.dimensionValues&&a.dimensionValues.length&&!a.useLayersDimValues?a.dimensionValues:a._mapSortedDimensionValues;a.getUnit();a._setupSlider(!0)});this._timer=new I.Timer;this._timer.setInterval(this.thumbMovingRate);this._timer.onTick=
g.hitch(this,function(){this.playDirectionAscending?this._bumpSlider(1):this._bumpSlider(-1)});this.layout===p.LAYOUT_VERTICAL&&(this.computeSliderStyle(),this.on("resize",g.hitch(this,"computeSliderStyle")));this._setupHandles()},_insertPassiveLabels:function(){var a=y(".dijitSliderMoveable.dijitSliderMoveableV",this.domNode);this._passiveLbl1=s.create("div");l.add(this._passiveLbl1,"esriMdSliderPassiveLbl");s.place(this._passiveLbl1,a[0]);2===this._thumbCount&&(this._passiveLbl2=s.create("div"),
l.add(this._passiveLbl2,"esriMdSliderPassiveLbl"),s.place(this._passiveLbl2,a[1]))},_setupHandles:function(){this._eventHandles=[];this._eventHandles.push(k(this.domNode,"mouseover",g.hitch(this,"activateSlider")));this._eventHandles.push(k(this.domNode,"mouseleave",g.hitch(this,"deactivateSlider")));this._eventHandles.push(k(this.domNode,q.press,g.hitch(this,"activateSlider")));this._eventHandles.push(k(this.domNode,q.release,g.hitch(this,"deactivateSlider")));this._eventHandles.push(k(this.prevBtn.domNode,
q.press,g.hitch(this,"activateSlider")));this._eventHandles.push(k(this.playPauseBtn.domNode,q.press,g.hitch(this,"activateSlider")));this._eventHandles.push(k(this.nextBtn.domNode,q.press,g.hitch(this,"activateSlider")));var a=y(".dijitSliderImageHandle.dijitSliderImageHandleV",this.domNode);e.forEach(a,function(a){this._eventHandles.push(k(a,q.press,g.hitch(this,"activateSlider")));this._eventHandles.push(k(a,q.release,g.hitch(this,"deactivateSlider")))},this)},_removeHandles:function(){e.forEach(this._eventHandles,
function(a){a&&a.remove()})},activateSlider:function(){9>dojo.isIE&&dojo.style(this.domNode,"background","#fff");this.sliderActive=!0;this.deactivateTimer&&clearTimeout(this.deactivateTimer);l.remove(this.domNode,"esriMdSliderPassive");l.add(this.domNode,"esriMdSliderActive");m.set(this._passiveLbl1,"display","none");this._passiveLbl2&&m.set(this._passiveLbl2,"display","none")},deactivateSlider:function(){if(!(10>dojo.isIE)){var a=this;this.deactivateTimer=setTimeout(function(){a.sliderActive=!1;
a.updatePassiveLabels();l.remove(a.domNode,"esriMdSliderActive");l.add(a.domNode,"esriMdSliderPassive");a._showPassiveLabels()},2500)}},updatePassiveLabels:function(){this._slider&&h.isDefined(this._slider.value)&&(this._passiveLbl1.innerHTML=this.value.length?this.value[0]:this.value,this._slider.value.length&&(this._passiveLbl2.innerHTML=this.value[1]),this.sliderActive||this._showPassiveLabels())},_showPassiveLabels:function(){h.isDefined(this.value)&&(m.set(this._passiveLbl1,"display","inline-block"),
this.value.length?m.set(this._passiveLbl2,"display","inline-block"):this._passiveLbl2&&m.set(this._passiveLbl2,"display","none"))},increment:function(){var a=1;!this.playDirectionAscending&&this.playing&&(a=-1);this._bumpSlider(a)},decrement:function(){var a=-1;!this.playDirectionAscending&&this.playing&&(a=1);this._bumpSlider(a)},_setDimensionAttr:function(a){var b=!h.isDefined(b)?!0:!1;this._slider&&(a.dimension&&(this.dimension=a.dimension),this.dimensionValues=a.dimensionValues&&a.dimensionValues.length?
a.dimensionValues:[],this.update(!1))},update:function(a){var b=this;this._mapSortedDimensionValues=[];this._getImageLayers();this.value=a?this.dimensionValues[this._slider.value]:null;this._getAllLayersMDInfo().then(function(){b._sortDimensionValues();b.getUnit();if(!b.dimensionValues||!b.dimensionValues.length||b.useLayersDimSlices)b.dimensionValues=b._mapSortedDimensionValues;b._setupSlider(a)})},pause:function(){this.playing=!1;this._updateUI();this._timer.stop()},play:function(a){!0!==this.playing&&
(this.playing=!1,this._onPlay())},_setupSlider:function(a){this._destroySlider();this.dimensionValues&&this.dimensionValues.length&&(this.sliderNode=document.createElement("div"),this._getDimensionAlias(),this._layers&&(this._layers.length&&1===this._layers.length&&a)&&this._readMosaicRule(),this._createRule(),this._createLabels(),this._createSlider(),this._insertPassiveLabels(),this._slider.onChange(this._slider.value))},_createLabels:function(){this.layout===p.LAYOUT_HORIZONTAL?this._createHorizontalLabels():
this._createVerticalLabels()},_createRule:function(){this.layout===p.LAYOUT_HORIZONTAL?this._createHorizontalRule():this._createVerticalRule()},_createVerticalLabels:function(){this.labelsNode=document.createElement("div");this.sliderNode.appendChild(this.labelsNode);this._sliderLabels=new C({labels:this._filterLabels(),labelStyle:"font-size: 83%; padding-left: 5px;"},this.labelsNode)},_createVerticalRule:function(){this.rulesNode=document.createElement("div");this.sliderNode.appendChild(this.rulesNode);
100>=this.dimensionValues.length&&(this._sliderRules=new B({count:this.dimensionValues.length,style:"width:5px;"},this.rulesNode),this._sliderRules.startup())},_createHorizontalLabels:function(){this.labelsNode=document.createElement("div");this.sliderNode.appendChild(this.labelsNode);this._sliderLabels=new G({labels:this._filterLabels(),labelStyle:"font-size: 83%"},this.labelsNode)},_createHorizontalRule:function(){this.rulesNode=document.createElement("div");this.sliderNode.appendChild(this.rulesNode);
100>=this.dimensionValues.length&&(this._sliderRules=new F({count:this.dimensionValues.length,style:"height:5px;"},this.rulesNode),this._sliderRules.startup())},_createHorizontalSingleSlider:function(a){a=a?a:this.playDirectionAscending?0:this.dimensionValues.length-1;this._slider=new D({name:"horizontal",minimum:0,maximum:this.dimensionValues.length-1,intermediateChanges:!1,discreteValues:this.dimensionValues.length,style:"width: 100%;",increment:g.hitch(this,"increment"),decrement:g.hitch(this,
"decrement"),value:a||0,onChange:g.hitch(this,this._onSingleSliderChange),showButtons:!1},this.sliderNode);this._slider.startup()},_createHorizontalRangeSlider:function(a){a=a?a:this.playDirectionAscending?[0,1]:[this.dimensionValues.length-2,this.dimensionValues.length-1];this._slider=new E({name:"horizontal",minimum:0,maximum:this.dimensionValues.length-1,intermediateChanges:!1,discreteValues:this.dimensionValues.length,style:"width:100%;",increment:g.hitch(this,"increment"),decrement:g.hitch(this,
"decrement"),value:a||[0,1],onChange:g.hitch(this,this._onRangeSliderChange),showButtons:!1},this.sliderNode);this._slider.startup();k(this._slider.incrementButton,"click",this._slider.increment);k(this._slider.decrementButton,"click",this._slider.decrement);this._slider._typematicCallback=function(){}},_createVerticalSingleSlider:function(a){a=a?a:this.playDirectionAscending?0:this.dimensionValues.length-1;this._slider=new z({name:"vertical",minimum:0,maximum:this.dimensionValues.length-1,intermediateChanges:!1,
discreteValues:this.dimensionValues.length,style:this.computeSliderStyle(),increment:g.hitch(this,"increment"),decrement:g.hitch(this,"decrement"),value:a||0,onChange:g.hitch(this,this._onSingleSliderChange),showButtons:!1},this.sliderNode);this._slider.startup()},_createVerticalRangeSlider:function(a){a=a?a:this.playDirectionAscending?[0,1]:[this.dimensionValues.length-2,this.dimensionValues.length-1];this._slider=new A({name:"vertical",minimum:0,maximum:this.dimensionValues.length-1,intermediateChanges:!1,
discreteValues:this.dimensionValues.length,style:this.computeSliderStyle(),increment:g.hitch(this,"increment"),decrement:g.hitch(this,"decrement"),value:a||[0,1],onChange:g.hitch(this,this._onRangeSliderChange),showButtons:!1},this.sliderNode);this._slider.startup();this._slider._typematicCallback=function(){}},_onSingleSliderChange:function(a){var b=this.dimensionValues[a];this.setDimensionInfoText(b);e.forEach(this._layers,function(c){this._updateMosaicRule(c,b);this.prefetch&&this.playing&&this._prefetchData(a,
c)},this);this._oldValue=a;this.value=b;this.updatePassiveLabels();this.onChange(b)},_onRangeSliderChange:function(a){if(this._update){this._snap&&(a=this._snapToNearestRange(a));var b=[this.dimensionValues[a[1]],this.dimensionValues[a[0]]];b.sort(this._sortCompareFunction);this.value=b;this.setDimensionInfoText(b);this.updatePassiveLabels();e.forEach(this._layers,function(c){this._updateMosaicRule(c,b);this.prefetch&&this.playing&&this._prefetchData(a,c)},this);this._update=!0;this._oldValue=g.clone(a);
this.onChange(b)}},destroy:function(){this.inherited(arguments);this._timer.stop();this._destroySlider();this._removeHandles()},_destroySlider:function(){this._slider&&(this._slider.destroy(),this._slider=null)},_createSlider:function(){var a;this.mdSliderCell.appendChild(this.sliderNode);this.value&&this.value.length?a=0<=e.indexOf(this.dimensionValues,this.value[0])&&0<=e.indexOf(this.dimensionValues,this.value[1])?[e.indexOf(this.dimensionValues,this.value[0]),e.indexOf(this.dimensionValues,this.value[1])]:
[0,1]:this.value&&(a=0<=e.indexOf(this.dimensionValues,this.value)?e.indexOf(this.dimensionValues,this.value):0);2===this._thumbCount?this.layout===p.LAYOUT_HORIZONTAL?this._createHorizontalRangeSlider(a):this._createVerticalRangeSlider(a):this.layout===p.LAYOUT_HORIZONTAL?this._createHorizontalSingleSlider(a):this._createVerticalSingleSlider(a)},_getMultidimensionalInfo:function(a){function b(){a.getMultidimensionalInfo().then(function(b){a.multidimensionalInfo=b;c.resolve(a)},function(a){c.reject(a)})}
var c=new J;if(a.multidimensionalInfo)c.resolve(a);else if(a.loaded)b();else a.on("load",function(){b()});return c},_getAllLayersMDInfo:function(){var a=[];e.forEach(this._layers,function(b){a.push(this._getMultidimensionalInfo(b))},this);return new K(a)},_getImageLayers:function(){var a=this.map.layerIds.concat(this.map.graphicsLayerIds),b;this._layers=[];e.forEach(a,function(a){b=this.map.getLayer(a);("esri.layers.ArcGISImageServiceLayer"===b.declaredClass||"esri.layers.ArcGISImageServiceVectorLayer"===
b.declaredClass||"esri.layers.RasterLayer"===b.declaredClass)&&this._layers.push(b)},this);return this._layers},_sortCompareFunction:function(a,b){return!h.isDefined(a)||!h.isDefined(b)?!1:a-b},_getDimensionObjects:function(){function a(a){if(a&&a.values&&a.hasRanges){var d=[];e.forEach(a.values,function(a){a.length?d=b(d,a):d.push.apply(b(d.sort(this._sortCompareFunction),[a]))},this);d=d.sort(c._sortCompareFunction);a.decodedValues=d}return a}var b=this._merge,c=this;this._allRangeValues=!0;this._thumbCount=
1;this._snap=!1;this._dimensionObjects=[];this._layers=this._filterLayers();e.forEach(this._layers,function(a){a.multidimensionalInfo&&e.some(a.multidimensionalInfo.variables,function(a){e.some(a.dimensions,function(a){a.name===this.dimension&&!a.hasRanges&&(this._allRangeValues=!1)},this)},this)},this);this.useRanges?(this._thumbCount=2,this._snap=!1):this._allRangeValues&&this.useLayersDimSlices?(this._thumbCount=2,this._snap=!0):this._snap=!1;e.forEach(this._layers,function(b){b.multidimensionalInfo&&
e.some(b.multidimensionalInfo.variables,function(b){e.some(b.dimensions,function(b){b.name===this.dimension&&(this._allRangeValues&&b.hasRanges||this.useRanges?this._dimensionObjects.push(a(g.clone(b))):(this._allRangeValues||!b.hasRanges)&&this._dimensionObjects.push(g.clone(b)))},this)},this)},this)},_merge:function(a,b){for(var c=[],f=0,d=0;f<a.length&&d<b.length;)a[f]<b[d]?c.push(a[f++]):a[f]>b[d]?c.push(b[d++]):(c.push(b[d++]),f++);c=c.concat(a.slice(f)).concat(b.slice(d));return c=e.filter(c,
function(a,b,c){return c.indexOf(a)===b})},_mergeRangeArrays:function(a,b){for(var c=[],f=0,d=0;f<a.length&&d<b.length;)a[f][0]<b[d][0]||a[f][0]===b[d][0]&&a[f][1]<b[d][1]?c.push(a[f++]):a[f][0]>b[d][0]||a[f][0]===b[d][0]&&a[f][1]>b[d][1]?c.push(b[d++]):(c.push(b[d++]),f++);c=c.concat(a.slice(f)).concat(b.slice(d));return c=e.filter(c,function(a,b,c){return c.indexOf(a)===b},this)},_sortDimensionValues:function(){var a=0,b=this._merge,c=this._mergeRangeArrays;this._getDimensionObjects();1<=this._dimensionObjects.length&&
(this._mapSortedDimensionValues=this._dimensionObjects[0].decodedValues||this._dimensionObjects[0].values,this._allRangeValues&&(this._dimensionRangeValues=this._dimensionObjects[0].values));if(1<this._dimensionObjects.length)for(a=1;a<this._dimensionObjects.length;a++)this._mapSortedDimensionValues=b(this._mapSortedDimensionValues,this._dimensionObjects[a].decodedValues||this._dimensionObjects[a].values),this._allRangeValues&&(this._dimensionRangeValues=c(this._dimensionRangeValues,this._dimensionObjects[a].values))},
_createDimensionalDefinition:function(a,b){var c=[a];return new M({variableName:b,dimensionName:this.dimension,values:c,isSlice:1===c.length})},_updateMosaicRule:function(a,b){var c=!1,f=a.mosaicRule||a.defaultMosaicRule||new L({multidimensionalDefinition:[]}),d=f.multidimensionalDefinition||[];b.length&&b.sort(this._sortCompareFunction);e.forEach(d,function(a){a.dimensionName===this.dimension&&(a.values=[b],a.isSlice=!this.useRanges,c=!0)},this);!c&&e.some(a.multidimensionalInfo.variables,function(a){if(e.some(a.dimensions,
function(a){if(a.name===this.dimension)return!0},this))return!0},this)&&(d.push(this._createDimensionalDefinition(b,"")),c=!0);c&&(f.multidimensionalDefinition=d,a.setMosaicRule(f))},_prefetchData:function(a,b){if(b&&b.mosaicRule){var c,f,d,v=!1,n,h=this,k;this.prefetchedValues[b.id]||(this.prefetchedValues[b.id]=[]);this.prefetchImgNodes[b.id]=[];f=g.clone(b._params);d=g.clone(b.mosaicRule);for(c=1;c<=this.prefetchFactor;c++)v=!1,e.forEach(d.multidimensionalDefinition,function(d){d.dimensionName===
this.dimension&&(this.playDirectionAscending?a.length?(this.snap?(n=this._getNextRangeIndex(a)||a,d.values=[this.dimensionValues[n[0]],this.dimensionValues[n[1]]]):d.values=[this.dimensionValues[(a[0]+c)%this.dimensionValues.length],this.dimensionValues[(a[1]+c)%this.dimensionValues.length]],d.values.sort(this._sortCompareFunction)):d.values=[this.dimensionValues[(a+c)%this.dimensionValues.length]]:a.length?(this.snap?(n=this._getNextRangeIndex(a,-1)||a,d.values=[this.dimensionValues[n[0]],this.dimensionValues[n[1]]]):
d.values=[this.dimensionValues[(this.dimensionValues.length+a[0]-c)%this.dimensionValues.length],this.dimensionValues[(this.dimensionValues.length+a[1]-c)%this.dimensionValues.length]],d.values.sort(this._sortCompareFunction)):d.values=[this.dimensionValues[(this.dimensionValues.length+a-c)%this.dimensionValues.length]],e.some(this.prefetchedValues[b.id],function(a){if(t.stringify(a)===t.stringify(d.values))return!0})||(v=!0,this.prefetchedValues[b.id].push(d.values)))},this),v&&(f.mosaicRule=t.stringify(d.toJson()),
b.getImageUrl(this.map.extent,this.map.width,this.map.height,function(a){k=new Image;h.prefetchImgNodes[b.id].push(k);k.src=a},f))}},setDimensionInfoText:function(a){if(h.isDefined(a)){var b=this.unitSymbol||this.unit;if("number"!==typeof a){a=g.clone(a.sort(this._sortCompareFunction));if(0!==a[0]%1||0!==a[1]%1)a[0]=parseFloat(a[0].toFixed(2)),a[1]=parseFloat(a[1].toFixed(2));a="["+a[0]+", "+a[1]+"]"}else 0!==a%1&&(a=a.toFixed(2));this.dimensionInfo.innerHTML=this.unitSymbol?"\x3clabel style\x3d'font-weight:700;'\x3e"+
this.dimensionAlias+" ("+b+")\x3c/label\x3e":"\x3clabel style\x3d'font-weight:700;'\x3e"+this.dimensionAlias+"\x3c/label\x3e";this.dimensionInfo.innerHTML=this.layout===p.LAYOUT_HORIZONTAL?this.dimensionInfo.innerHTML+(": "+a):this.dimensionInfo.innerHTML+("\x3cbr/\x3e "+a)}},setLabels:function(a){},_filterLabels:function(){if(this.nLabels&&this.dimensionValues&&this.dimensionValues.length){var a=Math.ceil(this.dimensionValues.length/this.nLabels);return e.map(this.dimensionValues,function(b,c){return 0===
c%a||c===this.dimensionValues.length-1?(0!==b%1&&(b=parseFloat(b.toFixed(2))),b):""},this)}},_filterLayers:function(){return e.filter(this._layers,function(a){if(a.multidimensionalInfo&&(a.visible&&a.useMapDimensionValue)&&e.some(a.multidimensionalInfo.variables,function(a){if(e.some(a.dimensions,function(a){if(a.name===this.dimension)return!0},this))return!0},this))return!0},this)},_updateUI:function(){l.remove(this.playPauseBtn.iconNode,this._iconClass);this._iconClass=this.playing?"mdsButton mdsPauseButton":
"mdsButton mdsPlayButton";l.add(this.playPauseBtn.iconNode,this._iconClass)},_bumpSlider:function(a){var b=this._slider.value;if(0<=a)!this._snap&&(0>b||b>=this.dimensionValues.length-1||b[0]>=this.dimensionValues.length-1||b[1]>=this.dimensionValues.length-1)?this._timer.isRunning&&(this.loop?(this._timer.stop(),this.prefetchedValues={},this.prefetchImgNodes={},2===this._thumbCount?this._snap?this._slider.set("value",this._getNextRangeIndex(b)):this._slider.set("value",[0,Math.abs(b[0]-b[1])]):this._slider.set("value",
0),this._timer.start(),this.playing=!0):this.pause()):2===this._thumbCount&&!this._snap&&b[0]<this.dimensionValues.length-1&&b[1]<this.dimensionValues.length-1?this._slider.set("value",[b[0]+1,b[1]+1]):1===this._thumbCount&&b<this.dimensionValues.length-1?this._slider.set("value",b+1):this._snap&&this._slider.set("value",this._getNextRangeIndex(b));else if(0>=b||0>=b[0]||0>=b[1])this._timer.isRunning&&(this.loop?(this._timer.stop(),this.prefetchedValues={},2===this._thumbCount?this._snap?this._slider.set("value",
this._getNextRangeIndex(b,-1)):this._slider.set("value",[this.dimensionValues.length-1,this.dimensionValues.length-1-Math.abs(b[0]-b[1])]):this._slider.set("value",this.dimensionValues.length-1),this._timer.start(),this.playing=!0):this.pause());else if(0<=b||0<=b[1])2===this._thumbCount&&0<b[1]&&0<b[0]?this._snap?this._slider.set("value",this._getNextRangeIndex(b,-1)):this._slider.set("value",[b[0]-1,b[1]-1]):1===this._thumbCount&&0<b&&this._slider.set("value",b-1)},setThumbMovingRate:function(a){this.thumbMovingRate=
a;this._timer&&this._timer.setInterval(this.thumbMovingRate)},getFullDimensionRange:function(a){a=a||this.dimension;var b,c;e.forEach(this._layers,function(f){f.multidimensionalInfo&&f.multidimensionalInfo.variables&&e.forEach(f.multidimensionalInfo.variables,function(d){e.forEach(d.dimensions,function(d){if(d.name===a&&d.extent&&d.extent.length&&1<d.extent.length){if(!h.isDefined(b)||d.extent[0]<b)b=d.extent[0];if(!h.isDefined(c)||d.extent[1]>c)c=d.extent[1]}},this)},this)},this);return[b,c]},setThumbCount:function(a){this._thumbCount=
2==a?2:1;this.value=this.dimensionValues[this._slider.value];this._setupSlider()},clearDimensionalDefinition:function(a){var b,c=[],f;a&&(a.mosaicRule&&a.mosaicRule.multidimensionalDefinition)&&(f=a.mosaicRule,b=f.multidimensionalDefinition,e.forEach(b,function(a){a.dimensionName!==this.dimension&&c.push(a)},this),f.multidimensionalDefinition=c,a.setMosaicRule(f))},getUnit:function(){var a=null,b=!1;this.unit=null;e.forEach(this._layers,function(c){c.multidimensionalInfo&&e.forEach(c.multidimensionalInfo.variables,
function(c){e.forEach(c.dimensions,function(c){c.name===this.dimension&&c.unit&&(null==a&&!b?a=c.unit.replace("esri",""):h.isDefined(c.unit)&&c.unit.replace("esri","").toLowerCase()!==a.toLowerCase()&&(a=null,b=!0))},this)},this)},this);a&&(a=a.replace("esri",""));this.unit=a;this.unitSymbol=this.getUnitSymbol();this._hasUnitConflict=b;return a},_getDimensionAlias:function(){this.dimensionAlias=this.dimension;e.some(this._layers,function(a){if(a.fields&&a.fields.length&&e.some(a.fields,function(a){if(a.name&&
a.name===this.dimension&&a.alias)return this.dimensionAlias=a.alias,!0},this))return!0},this)},_readMosaicRule:function(){var a;e.forEach(this._layers,function(b){b.mosaicRule&&b.mosaicRule.multidimensionalDefinition&&e.forEach(b.mosaicRule.multidimensionalDefinition,function(b){b&&b.dimensionName===this.dimension&&b.values&&(a=b.values.length&&b.values[0]&&b.values[0].length?b.values[0]:b.values)},this)},this);a&&(1===a.length?(this._thumbCount=1,this.useRanges=!1,this.value=a[0]):(this._thumbCount=
2,this.useRanges=!0,this.value=a))},hasUnitConflict:function(){this.getUnit();return this._hasUnitConflict},resizeSlider:function(a,b){m.set(this.domNode,{height:a+"px",width:b+"px"});m.set(this.mdSliderTable,{height:a+"px",width:b+"px"});this.computeSliderStyle()},computeSliderStyle:function(){var a,b;a=u.getContentBox(this.domNode).h-u.getContentBox(this.dimensionInfo).h-(u.getContentBox(this.playPauseBtnRow).h+20);10>=x("ie")&&(a-=53);b="height: "+a+"px;";this._slider&&this._slider.domNode&&m.set(this._slider.domNode,
"height",a+"px");return b},getUnitSymbol:function(){if(!h.isDefined(this.unit))return null;var a=this.unit.toLowerCase();if("meters"===a||"meter"===a)return this.unitSymbols.meter;if("pascal"===a||"pascals"===a)return this.unitSymbols.pascal},_snapToNearestRange:function(a){if(a&&a.length&&this._snap){var b,c,f,d,k=this,n,h,l,m;d=[this.dimensionValues[a[1]],this.dimensionValues[a[0]]];d.sort(this._sortCompareFunction);if(e.some(this._dimensionObjects,function(a){if(e.some(a.values,function(a){if(a&&
a.length&&a[0]===d[0]&&a[1]===d[1])return!0}))return!0},this))return a;e.some(this._dimensionObjects,function(a){if(e.some(a.values,function(a){if(a&&a.length&&a[0]===d[0])return b=g.clone(a.sort(this._sortCompareFunction)),!0},this))return!0},this)&&(e.some(this.dimensionValues,function(a,d){a===b[0]&&(c=d);a===b[1]&&(f=d)}),l=Math.abs(a[0]-c),n=[c,f]);e.some(this._dimensionObjects,function(a){if(e.some(a.values,function(a){if(a&&a.length&&a[1]===d[1])return b=g.clone(a.sort(this._sortCompareFunction)),
!0},this))return!0},this)&&(e.some(this.dimensionValues,function(a,d){a===b[1]&&(f=d);a===b[0]&&(c=d)}),m=Math.abs(a[1]-f),h=[c,f]);a=!l||!m?n||h||a:this._oldValue&&this._oldValue.length&&this._arraysEqual(this._oldValue,n)?h:this._oldValue&&this._oldValue.length&&this._arraysEqual(this._oldValue,h)?n:l<=m?n:h;this._update=!1;setTimeout(function(){k._slider.set("value",a)},100);return a}},_arraysEqual:function(a,b){var c;if(!h.isDefined(a)||!h.isDefined(b))return!1;if(a===b)return!0;if(a.length!==
b.length)return!1;a.sort(this._sortCompareFunction);b.sort(this._sortCompareFunction);for(c=0;c<a.length;++c)if(a[c]!==b[c])return!1;return!0},_getNextRangeIndex:function(a,b){if(!this._dimensionRangeValues||!this._dimensionRangeValues.length)return null;var c,f,d,g;b=h.isDefined(b)?b:1;e.some(this._dimensionRangeValues,function(b,d){if(this._arraysEqual(b,[this.dimensionValues[a[0]],this.dimensionValues[a[1]]]))return c=d,!0},this);f=this._dimensionRangeValues[0<b?(c+1)%this._dimensionRangeValues.length:
(this._dimensionRangeValues.length+c-1)%this._dimensionRangeValues.length];e.some(this.dimensionValues,function(a,b){a===f[0]&&(d=b);a===f[1]&&(g=b);if(d&&g)return!0},this);return[d,g]}});g.mixin(r,p);x("extend-esri")&&g.setObject("dijit.MultidimensionalSlider",r,N);return r});