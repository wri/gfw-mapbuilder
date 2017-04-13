//>>built
define("esri/styles/choropleth","dojo/_base/array dojo/_base/lang dojo/has ../kernel ../Color ./colors".split(" "),function(k,w,E,F,p,G){function u(a,b){return k.map(a,function(a){a=new p(a);null!=b&&(a.a=b);return a})}function z(a,b){var e,d=0;a.length===b.length&&((e=k.every(a,function(a,c){return a.r===b[c].r&&a.g===b[c].g&&a.b===b[c].b}))?d=1:(e=a.slice(0).reverse(),(e=k.every(e,function(a,c){return a.r===b[c].r&&a.g===b[c].g&&a.b===b[c].b}))&&(d=-1)));return d}function A(a,b){var e,d;if(d=z(b,
a.colors))e=0<d?a:q.flipColors(a,!0);else{var f;k.some(a.colorsForClassBreaks,function(a){a.numClasses===b.length&&(f=a.colors);return!!f});f&&(d=z(b,f))&&(e=0<d?a:q.flipColors(a,!0))}return e}function x(a,b){var e=a&&a.basemapGroups,d=a&&a.basemaps,f,c;if(e)for(f in e)if(d=e[f],d=k.indexOf(d,b),-1<d){c=f;break}c=c||b;return a&&c?a.schemes[c]:null}function B(a){var b=a.basemapGroups;a=a.basemaps;var e,d=[];if(b)for(e in b)d=d.concat(b[e]);else a&&(d=d.concat(a));return d}function r(a,b,e,d,f){var c,
g,h=G[a];if(h){c={id:d+"/"+f+"/"+a,theme:d};d=b.fillOpacity;null==d&&-1!==k.indexOf(C,a)&&(d=0.8);c.opacity=d||1;c.colors=u(h.stops);c.colorsForClassBreaks=[];for(g in h)"stops"!==g&&(g=+g,c.colorsForClassBreaks.push({numClasses:g,colors:u(h[g])}));c.noDataColor=new p(-1!==k.indexOf(C,a)?H:I);switch(e){case "point":c.outline={color:new p(b.outline.color),width:b.outline.width};c.size=b.size;break;case "line":c.width=b.width;break;case "polygon":c.outline={color:new p(b.outline.color),width:b.outline.width}}}return c}
function y(a){"esriGeometryPoint"===a||"esriGeometryMultipoint"===a?a="point":"esriGeometryPolyline"===a?a="line":"esriGeometryPolygon"===a&&(a="polygon");return a}var n={color:[128,128,128,1],width:0.5},g={color:[153,153,153,1],width:0.5},h={outline:g,fillOpacity:0.8,width:2,size:8},s={outline:n,fillOpacity:0.6,width:2,size:8},v={outline:{color:[153,153,153,0.5],width:0.5},fillOpacity:0.8,width:2,size:8},I="#aaaaaa",H="#ffffff",C="highlight-orange-gray highlight-bluegreen-gray highlight-purple-gray highlight-pink-gray highlight-blue-gray highlight-red-gray highlight-orange-gray-dark highlight-blue-gray-dark highlight-orange-gray-bright highlight-blue-gray-bright extremes-orange-gray extremes-bluegreen-gray extremes-purple-gray extremes-pink-gray extremes-blue-gray extremes-red-gray extremes-orange-gray-dark extremes-blue-gray-dark extremes-orange-gray-bright extremes-blue-gray-bright".split(" "),
l="seq-single-blues seq-single-greens seq-single-grays seq-single-oranges seq-single-purples seq-single-reds seq-multi-bugn seq-multi-bupu seq-multi-gnbu seq-multi-orrd seq-multi-pubu seq-multi-pubugn seq-multi-purd seq-multi-rdpu seq-multi-ylgn seq-multi-ylgnbu seq-multi-ylorbr seq-multi-ylorrd".split(" "),m="div-brbg div-piyg div-prgn div-puor div-rdbu div-rdgy div-rdylbu div-rdylgn div-spectral".split(" "),D="tropical-bliss desert-blooms under-the-sea vibrant-rainbow ocean-bay prairie-summer pastel-chalk".split(" "),
t={"high-to-low":{name:"high-to-low",label:"TODO",description:"TODO",basemaps:"streets gray topo terrain national-geographic oceans osm satellite hybrid dark-gray".split(" "),schemes:{streets:{common:h,primary:"seq-yellow-red-purple",secondary:"seq-yellow-orange-red seq-yellow-pink-purple seq-yellow-purple-blue seq-yellow-green-blue seq-teal-lightgreen-bright seq-green-lightgray-bright seq-teal-lightbrown-bright seq-reds-bright seq-purples-bright seq-greens-bright seq-browns-bright seq-dark-to-light-magenta-bright seq-dark-to-light-purple-bright seq-dark-to-light-blue-bright seq-dark-to-light-green-bright seq-brown-to-tan-bright seq-lightgray-blue-bright seq-lightgray-green-bright seq-lightgray-darkmagenta-bright seq-yellow-darkblue-bright seq-lightred-darkgray-bright".split(" ").concat(l)},
gray:{common:v,primary:"seq-yellow-red-purple",secondary:"seq-orange-red-light seq-yellow-orange-red seq-yellow-pink-purple seq-yellow-purple-blue seq-teal-lightgreen-bright seq-green-lightgray-bright seq-red-lightgray-bright seq-blue-lightgray-bright seq-orange-lightgray-bright seq-blue-red-yellow-bright seq-blue-tan-bright seq-teal-lightbrown-bright seq-reds-bright seq-purples-bright seq-blues-bright seq-greens-bright seq-browns-bright seq-dark-to-light-magenta-bright seq-dark-to-light-purple-bright seq-dark-to-light-blue-bright seq-dark-to-light-green-bright seq-brown-to-tan-bright seq-lightgray-blue-bright seq-lightgray-green-bright seq-lightgray-darkmagenta-bright seq-yellow-darkblue-bright seq-lightred-darkgray-bright".split(" ").concat(l)},
topo:{common:h,primary:"seq-yellow-green-blue",secondary:"seq-yellow-pink-purple seq-yellow-purple-blue seq-yellow-red-purple seq-yellow-orange-red seq-teal-lightgreen-bright seq-green-lightgray-bright seq-blue-lightgray-bright seq-orange-lightgray-bright seq-teal-lightbrown-bright seq-reds-bright seq-purples-bright seq-greens-bright seq-browns-bright seq-dark-to-light-magenta-bright seq-dark-to-light-purple-bright seq-dark-to-light-blue-bright seq-dark-to-light-green-bright seq-brown-to-tan-bright seq-lightgray-blue-bright seq-lightgray-green-bright seq-lightgray-darkmagenta-bright seq-yellow-darkblue-bright seq-lightred-darkgray-bright".split(" ").concat(l)},
terrain:{common:h,primary:"seq-pink-red",secondary:"seq-yellow-pink-purple seq-yellow-red-purple seq-yellow-orange-red seq-orange-red-light seq-teal-lightgreen-bright seq-green-lightgray-bright seq-red-lightgray-bright seq-blue-lightgray-bright seq-orange-lightgray-bright seq-blue-red-yellow-bright seq-blue-tan-bright seq-teal-lightbrown-bright seq-reds-bright seq-purples-bright seq-blues-bright seq-greens-bright seq-browns-bright seq-dark-to-light-magenta-bright seq-dark-to-light-purple-bright seq-dark-to-light-blue-bright seq-dark-to-light-green-bright seq-brown-to-tan-bright seq-lightgray-blue-bright seq-lightgray-green-bright seq-lightgray-darkmagenta-bright seq-yellow-darkblue-bright seq-lightred-darkgray-bright".split(" ").concat(l)},
"national-geographic":{common:h,primary:"seq-yellow-orange-red",secondary:"seq-yellow-red-purple seq-yellow-pink-purple seq-yellow-purple-blue seq-yellow-green-blue seq-teal-lightgreen-bright seq-blue-lightgray-bright seq-reds-bright seq-purples-bright seq-greens-bright seq-browns-bright seq-dark-to-light-magenta-bright seq-dark-to-light-purple-bright seq-dark-to-light-blue-bright seq-dark-to-light-green-bright seq-brown-to-tan-bright seq-lightgray-blue-bright seq-lightgray-green-bright seq-lightgray-darkmagenta-bright seq-yellow-darkblue-bright seq-lightred-darkgray-bright".split(" ").concat(l)},
oceans:{common:h,primary:"seq-yellow-green-blue",secondary:"seq-yellow-red-purple seq-yellow-orange-red seq-yellow-pink-purple seq-yellow-purple-blue seq-teal-lightgreen-bright seq-green-lightgray-bright seq-red-lightgray-bright seq-blue-lightgray-bright seq-blue-red-yellow-bright seq-teal-lightbrown-bright seq-reds-bright seq-purples-bright seq-greens-bright seq-browns-bright seq-dark-to-light-magenta-bright seq-dark-to-light-purple-bright seq-dark-to-light-blue-bright seq-dark-to-light-green-bright seq-brown-to-tan-bright seq-lightgray-blue-bright seq-lightgray-green-bright seq-lightgray-darkmagenta-bright seq-yellow-darkblue-bright seq-lightred-darkgray-bright".split(" ").concat(l)},
osm:{common:h,primary:"seq-red-blue-green",secondary:"seq-yellow-pink-purple seq-yellow-red-purple seq-yellow-purple-blue seq-teal-lightgreen-bright seq-blue-lightgray-bright seq-blue-red-yellow-bright seq-teal-lightbrown-bright seq-reds-bright seq-purples-bright seq-greens-bright seq-browns-bright seq-dark-to-light-magenta-bright seq-dark-to-light-purple-bright seq-dark-to-light-blue-bright seq-dark-to-light-green-bright seq-brown-to-tan-bright seq-lightgray-blue-bright seq-lightgray-green-bright seq-lightgray-darkmagenta-bright seq-yellow-darkblue-bright seq-lightred-darkgray-bright".split(" ").concat(l)},
satellite:{common:s,primary:"seq-orange-red-dark",secondary:"seq-yellow-green-blue seq-red-blue-green seq-yellow-purple-blue seq-teal-lightgreen-bright seq-blue-lightgray-bright seq-gray-lightgreen-bright seq-teal-lightbrown-bright seq-reds-bright seq-purples-bright seq-blues-bright seq-greens-bright seq-browns-bright seq-dark-to-light-magenta-bright seq-dark-to-light-purple-bright seq-dark-to-light-blue-bright seq-dark-to-light-green-bright seq-brown-to-tan-bright seq-lightgray-blue-bright seq-lightgray-green-bright seq-lightgray-darkmagenta-bright seq-yellow-darkblue-bright seq-lightred-darkgray-bright seq-lightmagenta-darkgray-bright seq-lightblue-darkgray-bright".split(" ").concat(l)},
hybrid:{common:s,primary:"seq-orange-red-dark",secondary:"seq-yellow-green-blue seq-red-blue-green seq-yellow-purple-blue seq-teal-lightgreen-bright seq-blue-lightgray-bright seq-gray-lightgreen-bright seq-teal-lightbrown-bright seq-reds-bright seq-purples-bright seq-blues-bright seq-greens-bright seq-browns-bright seq-dark-to-light-magenta-bright seq-dark-to-light-purple-bright seq-dark-to-light-blue-bright seq-dark-to-light-green-bright seq-brown-to-tan-bright seq-lightgray-blue-bright seq-lightgray-green-bright seq-lightgray-darkmagenta-bright seq-yellow-darkblue-bright seq-lightred-darkgray-bright seq-lightmagenta-darkgray-bright seq-lightblue-darkgray-bright".split(" ").concat(l)},
"dark-gray":{common:v,primary:"seq-dark-to-light-blue-bright",secondary:"seq-blue-lightgray-bright seq-gray-lightgreen-bright seq-reds-bright seq-purples-bright seq-blues-bright seq-greens-bright seq-browns-bright seq-dark-to-light-magenta-bright seq-dark-to-light-purple-bright seq-dark-to-light-green-bright seq-brown-to-tan-bright seq-lightgray-blue-bright seq-lightgray-green-bright seq-lightgray-darkmagenta-bright seq-yellow-darkblue-bright seq-teal-lightgreen-bright seq-lightred-darkgray-bright seq-lightmagenta-darkgray-bright seq-lightblue-darkgray-bright".split(" ").concat(l)}}},
"above-and-below":{name:"above-and-below",label:"TODO",description:"TODO",basemaps:"streets gray topo terrain national-geographic oceans osm satellite hybrid dark-gray".split(" "),schemes:{streets:{common:h,primary:"div-bluegreen-yellow-orange",secondary:"div-orange-yellow-blue-light div-green-yellow-redpurple div-green-yellow-orange div-green-gray-bright div-red-blue-bright div-blue-orange-bright div-blue-lightgreen-bright div-red-gray-bright div-blue-gray-bright div-red-lightgreen-bright div-green-teal-bright div-lightgreen-yellow-bright div-lightred-gray-bright".split(" ").concat(m)},
gray:{common:v,primary:"div-bluegreen-orange",secondary:"div-orange-purple div-bluegreen-purple div-orange-pink div-blue-yellow-red-bright div-green-gray-bright div-red-green-bright div-red-blue-bright div-orange-gray-bright div-blue-orange-bright div-blue-lightgreen-bright div-red-gray-bright div-blue-gray-bright div-red-lightgreen-bright div-blue-green-bright div-purple-brown-bright div-blue-brown-bright div-teal-brown-bright div-green-teal-bright div-lightgreen-yellow-bright div-lightblue-gray-bright div-lightgreen-gray-bright div-lightred-gray-bright div-yellow-green-bright div-green-darkgray-bright".split(" ").concat(m)},
topo:{common:h,primary:"div-orange-pink",secondary:"div-redpurple-blue div-orange-blue div-green-pink div-blue-yellow-red-bright div-green-gray-bright div-red-green-bright div-red-blue-bright div-orange-gray-bright div-blue-orange-bright div-blue-lightgreen-bright div-red-gray-bright div-blue-gray-bright div-red-lightgreen-bright div-blue-green-bright div-purple-brown-bright div-blue-brown-bright div-teal-brown-bright div-green-teal-bright div-lightgreen-yellow-bright div-lightblue-gray-bright div-lightgreen-gray-bright div-lightred-gray-bright div-yellow-green-bright div-green-darkgray-bright".split(" ").concat(m)},
terrain:{common:h,primary:"div-bluegreen-orange",secondary:"div-bluegreen-redpurple div-green-redpurple div-green-orange div-blue-yellow-red-bright div-green-gray-bright div-red-blue-bright div-orange-gray-bright div-blue-lightgreen-bright div-red-gray-bright div-blue-gray-bright div-red-lightgreen-bright div-blue-green-bright div-purple-brown-bright div-blue-brown-bright div-teal-brown-bright div-green-teal-bright div-lightgreen-yellow-bright div-lightblue-gray-bright div-lightgreen-gray-bright div-lightred-gray-bright div-yellow-green-bright div-green-darkgray-bright".split(" ").concat(m)},
"national-geographic":{common:h,primary:"div-orange-yellow-blue-light",secondary:"div-bluegreen-yellow-orange div-green-yellow-redpurple div-red-green-bright div-red-blue-bright div-orange-gray-bright div-red-gray-bright div-blue-gray-bright div-red-lightgreen-bright div-blue-green-bright div-purple-brown-bright div-green-teal-bright div-lightgreen-yellow-bright div-lightred-gray-bright div-yellow-green-bright div-green-darkgray-bright".split(" ").concat(m)},oceans:{common:h,primary:"div-red-yellow-pink",
secondary:"div-blue-green div-bluegreen-yellow-redpurple div-bluegreen-yellow-orange div-blue-yellow-red-bright div-green-gray-bright div-red-green-bright div-red-blue-bright div-orange-gray-bright div-blue-orange-bright div-blue-lightgreen-bright div-red-gray-bright div-blue-gray-bright div-red-lightgreen-bright div-blue-green-bright div-purple-brown-bright div-blue-brown-bright div-teal-brown-bright div-green-teal-bright div-lightgreen-yellow-bright div-lightblue-gray-bright div-lightgreen-gray-bright div-lightred-gray-bright div-yellow-green-bright div-green-darkgray-bright".split(" ").concat(m)},
osm:{common:h,primary:"div-bluegreen-pink",secondary:"div-bluegreen-redpurple div-bluegreen-orange div-orange-pink div-green-gray-bright div-red-blue-bright div-red-gray-bright div-blue-gray-bright div-red-lightgreen-bright div-blue-green-bright div-purple-brown-bright div-green-teal-bright div-lightgreen-yellow-bright div-lightred-gray-bright div-yellow-green-bright div-green-darkgray-bright".split(" ").concat(m)},satellite:{common:s,primary:"div-blue-green-bright",secondary:"div-red-yellow-purple div-orange-yellow-pink div-orange-yellow-blue-light div-green-gray-bright div-red-green-bright div-red-blue-bright div-orange-gray-bright div-blue-orange-bright div-blue-lightgreen-bright div-red-gray-bright div-blue-gray-bright div-red-lightgreen-bright div-orange-yellow-blue-dark div-purple-brown-bright div-blue-brown-bright div-teal-brown-bright div-green-teal-bright div-lightgreen-yellow-bright div-lightblue-gray-bright div-lightgreen-gray-bright div-lightred-gray-bright div-lightmagenta-gray-bright div-yellow-green-bright div-lightblue-yellow-bright div-green-darkgray-bright".split(" ").concat(m)},
hybrid:{common:s,primary:"div-blue-green-bright",secondary:"div-red-yellow-purple div-orange-yellow-pink div-orange-yellow-blue-light div-green-gray-bright div-red-green-bright div-red-blue-bright div-orange-gray-bright div-blue-orange-bright div-blue-lightgreen-bright div-red-gray-bright div-blue-gray-bright div-red-lightgreen-bright div-orange-yellow-blue-dark div-purple-brown-bright div-blue-brown-bright div-teal-brown-bright div-green-teal-bright div-lightgreen-yellow-bright div-lightblue-gray-bright div-lightgreen-gray-bright div-lightred-gray-bright div-lightmagenta-gray-bright div-yellow-green-bright div-lightblue-yellow-bright div-green-darkgray-bright".split(" ").concat(m)},
"dark-gray":{common:v,primary:"div-blue-green-bright",secondary:"div-yellow-gray-purple div-lightblue-yellow-bright div-red-gray-blue div-green-gray-purple div-orange-gray-blue div-green-gray-bright div-red-green-bright div-red-blue-bright div-orange-gray-bright div-blue-orange-bright div-blue-lightgreen-bright div-red-gray-bright div-blue-gray-bright div-red-lightgreen-bright div-green-teal-bright div-purple-brown-bright div-blue-brown-bright div-teal-brown-bright div-lightgreen-yellow-bright div-lightblue-gray-bright div-lightgreen-gray-bright div-lightred-gray-bright div-lightmagenta-gray-bright div-yellow-green-bright div-green-darkgray-bright".split(" ").concat(m)}}},
"centered-on":{name:"centered-on",label:"TODO",description:"TODO",basemaps:"streets gray topo terrain national-geographic oceans osm satellite hybrid dark-gray".split(" "),schemes:{streets:{common:{outline:g,width:2,size:8},primary:"highlight-orange",secondary:["highlight-bluegreen","highlight-orange-gray","highlight-bluegreen-gray"]},gray:{common:{outline:g,width:2,size:8},primary:"highlight-orange",secondary:["highlight-purple","highlight-orange-gray","highlight-purple-gray"]},topo:{common:{outline:g,
width:2,size:8},primary:"highlight-orange",secondary:["highlight-pink","highlight-orange-gray","highlight-pink-gray"]},terrain:{common:{outline:g,width:2,size:8},primary:"highlight-orange",secondary:["highlight-bluegreen","highlight-orange-gray","highlight-bluegreen-gray"]},"national-geographic":{common:{outline:g,width:2,size:8},primary:"highlight-orange",secondary:["highlight-blue","highlight-orange-gray","highlight-blue-gray"]},oceans:{common:{outline:g,width:2,size:8},primary:"highlight-red",
secondary:["highlight-pink","highlight-red-gray","highlight-pink-gray"]},osm:{common:{outline:g,width:2,size:8},primary:"highlight-pink",secondary:["highlight-bluegreen","highlight-pink-gray","highlight-bluegreen-gray"]},satellite:{common:{outline:n,width:2,size:8},primary:"highlight-orange-dark",secondary:["highlight-blue-dark","highlight-orange-gray-dark","highlight-blue-gray-dark"]},hybrid:{common:{outline:n,width:2,size:8},primary:"highlight-orange-dark",secondary:["highlight-blue-dark","highlight-orange-gray-dark",
"highlight-blue-gray-dark"]},"dark-gray":{common:{outline:n,width:2,size:8},primary:"highlight-orange-bright",secondary:["highlight-blue-bright","highlight-orange-gray-bright","highlight-blue-gray-bright"]}}},extremes:{name:"extremes",label:"TODO",description:"TODO",basemaps:"streets gray topo terrain national-geographic oceans osm satellite hybrid dark-gray".split(" "),schemes:{streets:{common:{outline:g,width:2,size:8},primary:"extremesdiv-bluegreen-yellow-orange",secondary:"extremesdiv-orange-yellow-blue-light extremesdiv-green-yellow-redpurple extremesdiv-green-yellow-orange extremes-orange extremes-bluegreen extremes-orange-gray extremes-bluegreen-gray".split(" ")},
gray:{common:{outline:g,width:2,size:8},primary:"extremesdiv-orange-purple",secondary:"extremesdiv-bluegreen-purple extremesdiv-bluegreen-orange extremesdiv-orange-pink extremes-orange extremes-purple extremes-orange-gray extremes-purple-gray".split(" ")},topo:{common:{outline:g,width:2,size:8},primary:"extremesdiv-orange-pink",secondary:"extremesdiv-redpurple-blue extremesdiv-orange-blue extremesdiv-green-pink extremes-orange extremes-pink extremes-orange-gray extremes-pink-gray".split(" ")},terrain:{common:{outline:g,
width:2,size:8},primary:"extremesdiv-bluegreen-orange",secondary:"extremesdiv-bluegreen-redpurple extremesdiv-green-redpurple extremesdiv-green-orange extremes-orange extremes-bluegreen extremes-orange-gray extremes-bluegreen-gray".split(" ")},"national-geographic":{common:{outline:g,width:2,size:8},primary:"extremesdiv-orange-yellow-blue-light",secondary:"extremesdiv-bluegreen-yellow-orange extremesdiv-green-yellow-redpurple extremes-orange extremes-blue extremes-orange-gray extremes-blue-gray".split(" ")},
oceans:{common:{outline:g,width:2,size:8},primary:"extremesdiv-red-yellow-pink",secondary:"extremesdiv-blue-green extremesdiv-bluegreen-yellow-redpurple extremesdiv-bluegreen-yellow-orange extremes-red extremes-pink extremes-red-gray extremes-pink-gray".split(" ")},osm:{common:{outline:g,width:2,size:8},primary:"extremesdiv-bluegreen-pink",secondary:"extremesdiv-bluegreen-redpurple extremesdiv-bluegreen-orange extremesdiv-orange-pink extremes-pink extremes-bluegreen extremes-pink-gray extremes-bluegreen-gray".split(" ")},
satellite:{common:{outline:n,width:2,size:8},primary:"extremesdiv-orange-yellow-blue-dark",secondary:"extremesdiv-red-yellow-purple extremesdiv-orange-yellow-pink extremesdiv-orange-yellow-blue-light extremes-orange-dark extremes-blue-dark extremes-orange-gray-dark extremes-blue-gray-dark".split(" ")},hybrid:{common:{outline:n,width:2,size:8},primary:"extremesdiv-orange-yellow-blue-dark",secondary:"extremesdiv-red-yellow-purple extremesdiv-orange-yellow-pink extremesdiv-orange-yellow-blue-light extremes-orange-dark extremes-blue-dark extremes-orange-gray-dark extremes-blue-gray-dark".split(" ")},
"dark-gray":{common:{outline:n,width:2,size:8},primary:"extremesdiv-orange-gray-blue",secondary:"extremesdiv-yellow-gray-purple extremesdiv-red-gray-blue extremesdiv-green-gray-purple extremes-orange-bright extremes-blue-bright extremes-orange-gray-bright extremes-blue-gray-bright".split(" ")}}},"group-similar":{name:"group-similar",label:"TODO",description:"TODO",basemapGroups:{light:"streets gray topo terrain national-geographic oceans osm".split(" "),dark:["satellite","hybrid","dark-gray"]},schemes:{light:{common:h,
primary:"spectral",secondary:["cat-dark","cat-light"].concat(D)},dark:{common:s,primary:"spectral",secondary:["cat-dark","cat-light"].concat(D)}}}},q={};w.mixin(q,{getAvailableThemes:function(a){var b=[],e,d,f;for(e in t)d=t[e],f=B(d),a&&-1===k.indexOf(f,a)||b.push({name:d.name,label:d.label,description:d.description,basemaps:f});return b},getSchemes:function(a){var b=a.theme,e=a.basemap,d=y(a.geometryType),f,c;(f=x(t[b],e))&&(c={primaryScheme:r(f.primary,f.common,d,b,e),secondarySchemes:k.map(f.secondary,
function(a){return r(a,f.common,d,b,e)})});return c},getSchemeById:function(a){var b,e,d,f,c;c=a.id;a=y(a.geometryType);if(c&&(c=c.split("/")))e=c[0],d=c[1],f=c[2];(c=x(t[e],d))&&(b=r(f,c.common,a,e,d));return b},cloneScheme:function(a){var b;a&&(b=w.mixin({},a),b.colors=u(b.colors),b.colorsForClassBreaks=k.map(b.colorsForClassBreaks,function(a){return{numClasses:a.numClasses,colors:u(a.colors)}}),b.noDataColor&&(b.noDataColor=new p(b.noDataColor)),b.outline&&(b.outline={color:b.outline.color&&new p(b.outline.color),
width:b.outline.width}));return b},flipColors:function(a,b){var e=b?a:q.cloneScheme(a);e.colors.reverse();k.forEach(e.colorsForClassBreaks,function(a){a.colors.reverse()});return e},getMatchingSchemes:function(a){var b=a.theme,e=y(a.geometryType),d=a.colors,f=t[b];a=B(f);var c,g=[];k.forEach(a,function(a){var h=x(f,a);h&&((c=A(r(h.primary,h.common,e,b,a),d))&&g.push(c),k.forEach(h.secondary,function(f){(c=A(r(f,h.common,e,b,a),d))&&g.push(c)}))});return g}});E("extend-esri")&&w.setObject("styles.choropleth",
q,F);return q});