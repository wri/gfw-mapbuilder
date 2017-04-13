//>>built
require({cache:{"url:esri/dijit/geoenrichment/DataBrowser/templates/CountrySelect.html":'\x3cdiv class\x3d"DataBrowser_CountryBoxContainer"\x3e\r\n    \x3cdiv class\x3d"DataBrowser_CountryBox" data-dojo-attach-point\x3d"divCountrySelect"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"DataBrowser_HierarchyBox" data-dojo-attach-point\x3d"divHierarchySelect"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("esri/dijit/geoenrichment/DataBrowser/CountrySelect","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/string dojo/dom-class dojo/dom-construct dojo/on dojo/store/Memory dijit/form/FilteringSelect dijit/form/_ComboBoxMenu dojo/i18n!../../../nls/jsapi dojox/mvc/Templated dojo/text!./templates/CountrySelect.html".split(" "),function(f,g,m,n,h,u,k,e,p,q,c,r,s){c=c.geoenrichment.dijit.DataCategoriesPage;var t={AUS_MapDataServices:"Map Services - Census",AUS_MapDataServicesDeloitte:"Map Services - Spending",
FRA_EsriFrance:"Esri France",DEU_Nexiga:"Nexiga GmbH",IND_Indicus:"Indicus Analytics",KOR_OPENmate:"OPENmate",ESP_AIS:"AIS Group"};h=f(q,{"class":"dijitComboBoxMenu DataBrowser_CountrySelectMenu",selectItem:function(a){if(this.items){for(var b=-1,d=0;d<this.items.length;d++)if(this.items[d].value==a){b=d;break}if(!(0>b)){a=this.containerNode.children;for(d=0;d<a.length;d++){var c=a[d];if("none"!=c.style.display&&c.getAttribute("item")==b){this.selectLastNode();this.set("selected",c,!0);break}}}}}});
var l=f(p,{dropDownClass:h,_openResultList:function(a,b,d){this.inherited(arguments);this.store.filtered||this.dropDown.selectItem(this.get("value"))}});return f(r,{templateString:s,nls:c,_hierarchyCache:null,_currentValue:null,postCreate:function(){this.inherited(arguments);this.countrySelect=new l({maxHeight:151});this.countrySelect.placeAt(this.divCountrySelect);this.countrySelect.set("labelAttr","label");this.countrySelect.set("searchAttr","label");this.countrySelect.set("store",new e({data:[{value:"loading",
label:c.loading}],idProperty:"value"}));this.countrySelect.set("value","loading");this.countrySelect.set("disabled",!0);this.countrySelect.startup();this.own(this.countrySelect);this.hierarchySelect=new l({});this.hierarchySelect.placeAt(this.divHierarchySelect);this.hierarchySelect.set("labelAttr","label");this.hierarchySelect.set("searchAttr","label");this.hierarchySelect.domNode.style.display="none";this.hierarchySelect.startup();this.own(this.hierarchySelect)},setCountries:function(a){this._hierarchyCache=
{};var b=[];m.forEach(a,function(a){a.hierarchyID?(this._hierarchyCache[a.countryID]||(this._hierarchyCache[a.countryID]={value:a.countryID,label:c.allHierarchies,index:0}),this._hierarchyCache[a.value]={value:a.value,label:this._composeHierarchyLabel(a),index:a.isDefault?1:2}):b.push(a)},this);this.countrySelect.set("disabled",!1);this.countrySelect.set("store",new e({data:b,idProperty:"value"}));k(this.countrySelect,"change",g.hitch(this,this._changeCountry));k(this.hierarchySelect,"change",g.hitch(this,
this._changeHierarchy))},_composeHierarchyLabel:function(a){var b=c["hierarchy_"+a.hierarchyID];b||(b=n.substitute(c.premiumHierarchy,{name:t[a.hierarchyID]||a.hierarchyID}));return b},_changeCountry:function(){if(!this._innerUpdate){var a=this.countrySelect.get("value");a!=this._currentValue.substr(0,2)&&(this._innerUpdate=!0,this._updateHierarchySelect(a),this._innerUpdate=!1,this.emit("change"))}},_changeHierarchy:function(){if(!this._innerUpdate){var a=this.hierarchySelect.get("value");a!=this._currentValue&&
(this._hierarchyCache&&this._hierarchyCache[a])&&(this._currentValue=a,this.emit("change"))}},_innerUpdate:!1,_getValueAttr:function(){return this._currentValue},_setValueAttr:function(a){a!=this._currentValue&&(this._innerUpdate=!0,this._currentValue=a.substr(0,2),this.countrySelect.set("value",this._currentValue),this._updateHierarchySelect(a),this._innerUpdate=!1,this.emit("change"))},_updateHierarchySelect:function(a){if(this._hierarchyCache){var b=a.substr(0,2);if(this._hierarchyCache[b]){var d=
[],c;for(c in this._hierarchyCache)c.substr(0,2)==b&&d.push(this._hierarchyCache[c]);d.sort(function(a,b){return a.index<b.index?-1:a.index>b.index?1:a.label<b.label?-1:a.label>b.label?1:0});this._currentValue=this._hierarchyCache[a]&&a||b;this.hierarchySelect.set("store",new e({data:d,idProperty:"value"}));this.hierarchySelect.set("value",this._currentValue);this.hierarchySelect.domNode.style.display=""}else this._currentValue=b,this.hierarchySelect.domNode.style.display="none",this.hierarchySelect.set("store",
new e({data:[{value:"none",label:""}],idProperty:"value"})),this.hierarchySelect.set("value","none")}}})});