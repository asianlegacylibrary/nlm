(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{212:function(e,t,a){e.exports=a.p+"static/media/UB-woodblock-closeup.67ac4b0f.jpg"},213:function(e,t,a){e.exports=a.p+"static/media/calligraphy_icon.b45851d1.ico"},218:function(e,t,a){e.exports=a(493)},258:function(e,t){},260:function(e,t){},292:function(e,t){},293:function(e,t){},359:function(e,t){},469:function(e,t,a){},471:function(e,t,a){},474:function(e,t,a){e.exports=a.p+"static/media/endless-knot.4a457e37.png"},475:function(e,t,a){},479:function(e,t,a){},493:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(203),c=a.n(s);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l=a(46),i=a(204),o=a(10),u=a(206),m=a(37),d=a(114),p=a(115),g=a(38),h=a.n(g),f=a(58),v=a(73),E=a.n(v),b=a(207),y="157.230.172.69",k=!1,N="red",w=new(a.n(b).a.Client)({host:{protocol:"http",host:y,port:9200,path:""},log:"info"});function I(){return(I=Object(f.a)(h.a.mark(function e(){var t;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:S("process.env.NODE_ENV ",y);case 1:if(k){e.next=22;break}S("Connnnnecting....");case 3:if("red"!==N){e.next=20;break}return S("awaiting green light"),e.prev=5,e.next=8,w.cluster.health({});case 8:t=e.sent,S("health: ",t),N=t.status,k=!0,e.next=18;break;case 14:e.prev=14,e.t0=e.catch(5),console.error("Connection is failing...",e.t0),k=!1;case 18:e.next=3;break;case 20:e.next=1;break;case 22:return e.abrupt("return",k);case 23:case"end":return e.stop()}},e,this,[[5,14]])}))).apply(this,arguments)}var O=function(e){var t={size:10,query:{ids:{type:"_doc",values:e}}};return S("initial search body",t),w.search({index:"frontend",type:"",body:t})},j=function(e){var t={size:10,query:{ids:{type:"_doc",values:e}}};return S("initial search body",t),w.search({index:["bdrc_work","bdrc_topic","bdrc_person","bdrc_item"],type:"",body:t})},A=a(208),_=a.n(A),L="".concat("https://docs.google.com/spreadsheets/d/").concat("1hPqe-Y2TWwMTAxIEXYvc8du_GMFUJQNPvZbJou7veAY","/edit?usp=sharing"),D="http://178.128.7.239/",F="wp-json/wp/v2/",P="http://iiifpres.bdrc.io",T=["W22677","W1GS135873","W1KG5200","W22344","W1GS135531","W1KG1132","W1KG10720","W1KG1279","W1KG14700"],C="en",M={en:"English",mn:"Mongolian"},S=function(){},U=function(e){return{type:"SET_LANG",language:e}},x=function(e){return{type:"SET_PAGE",page:e}},R="REQUEST_PAGES";var G="RECEIVE_PAGES";var V="REQUEST_GS";var q="RECEIVE_GS";var W=function(){var e=Object(f.a)(h.a.mark(function e(){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise(function(e,t){_.a.init({key:L,callback:function(a,n){e(a),t(n)},simpleSheet:!0})});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}();var H="REQUEST_POSTS";var Q="RECEIVE_POSTS";var z="REQUEST_DATA";var B="RECEIVE_DATA";var K="REQUEST_ID";var Y="RECEIVE_ID";function J(e){return function(t){S("fetchSpecificID!",e),t({type:K});try{j([e]).then(function(e){S("THEN",e);var a=e.hits.hits[0]._source.workHasItemImageAsset,n=e.hits.hits[0]._source.workNumberOfVolumes;return t(function(e,t){return function(a){S("INSIDE fetchManifest",e),a((S("requesting manifest!"),{type:Z}));try{var n;if(!e)return a(X(""));var r=e.includes(":")?e.split(":")[1]:e;if(1===t)j([r]).then(function(e){S("THEN",e);var t=e.hits.hits[0]._source.itemHasVolume;return n="".concat(P,"/2.1.1/v:").concat(t,"/manifest"),S("THIS IS IMAGE URL",n),a(se(n)),a(X(n))});else if(t>1)return n="".concat(P,"/2.1.1/collection/i:").concat(e),S("THIS IS IMAGE URL",n),a(se(n)),a(X(n))}catch(s){console.error("fetch manifest error! ",s)}}}(a,n)),e}).then(function(e){return t({type:Y,data:a=e,imageAsset:a.hits.hits[0]._source.workHasItemImageAsset,volume:a.hits.hits[0]._source.workHasItem,receivedAt:Date.now()});var a})}catch(a){console.error("fetch ID error! ",a)}}}var $="RECEIVE_MANIFEST";function X(e){return{type:$,manifestURL:e,receivedAt:Date.now()}}var Z="REQUEST_MANIFEST";var ee="DETAIL_MODAL",te="NULLIFY_IIIF",ae="RECEIVE_IIIF";function ne(e){return{type:ae,firstImage:e,receivedAt:Date.now()}}var re="REQUEST_IIIF";function se(e){return function(t){t((S("requesting IIIF!"),{type:re,firstImage:null}));try{E()(e,{method:"GET"}).then(function(e){return e.json()}).then(function(e){var a;if(S("MANIFEST?!",e),e.sequences||e.manifests&&(S("I AM A COLLECTION"),t(se(e.manifests[0]["@id"]))),e.sequences&&e.sequences[0]&&e.sequences[0].canvases){var n=!1;for(var r in e.sequences[0].canvases){var s=e.sequences[0].canvases[r];if("tbrc-1"===s.label&&(s=e.sequences[0].canvases[2])&&s.images&&s.images[0])return a=e.sequences[0].canvases[2].images[0].resource["@id"],n=!0,t(ne(a))}if(!n&&e.sequences[0].canvases[0]&&e.sequences[0].canvases[0].images[0]&&e.sequences[0].canvases[0].images[0].resource["@id"])return a=e.sequences[0].canvases[0].images[0].resource["@id"],n=!0,t(ne(a))}})}catch(a){console.error("config error",a)}}}function ce(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isFetching:!1,items:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case R:return Object.assign({},e,{isFetching:!0});case G:return Object.assign({},e,{isFetching:!1,items:t.pages,lastUpdated:t.receivedAt});case H:return Object.assign({},e,{isFetching:!0});case Q:return Object.assign({},e,{isFetching:!1,items:t.posts,lastUpdated:t.receivedAt});case z:return Object.assign({},e,{isFetching:!0});case B:return Object.assign({},e,{isFetching:!1,items:t.data,lastUpdated:t.receivedAt});case V:return Object.assign({},e,{isFetching:!0});case q:return Object.assign({},e,{isFetching:!1,gs:t.gs,lastUpdated:t.receivedAt});case K:return Object.assign({},e,{isFetching:!0});case Y:return Object.assign({},e,{isFetching:!1,item:t.data,imageAsset:t.imageAsset,volume:t.volume,lastUpdated:t.receivedAt});case Z:return Object.assign({},e,{isFetching:!0});case $:return Object.assign({},e,{isFetching:!1,manifestURL:t.manifestURL,lastUpdated:t.receivedAt});case re:return Object.assign({},e,{isFetching:!0});case ae:return Object.assign({},e,{isFetching:!1,firstImage:t.firstImage,lastUpdated:t.receivedAt});case te:return Object.assign({},e,{firstImage:null});case ee:return Object.assign({},e,{modalID:t.modalID,show:t.show});default:return e}}function le(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case G:case R:return Object.assign({},e,ce(e,t));default:return e}}function ie(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case B:case z:return Object.assign({},e,ce(e,t));default:return e}}function oe(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Y:case K:return Object.assign({},e,ce(e,t));default:return e}}function ue(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case q:case V:return Object.assign({},e,ce(e,t));default:return e}}function me(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case $:case Z:return Object.assign({},e,ce(e,t));default:return e}}function de(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ae:case te:case re:return Object.assign({},e,ce(e,t));default:return e}}function pe(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Q:case H:return Object.assign({},e,ce(e,t));default:return e}}var ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_LANG":return t.language;case"@@router/LOCATION_CHANGE":return 0===t.payload.location.pathname.split("/")[1].length?e:t.payload.location.pathname.split("/")[1];default:return e}};function he(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{modalID:0},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ee:return Object.assign({},e,ce(e,t));default:return e}}var fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"home",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_PAGE":return t.page;default:return e}},ve=function(e){return Object(l.c)({router:Object(p.b)(e),selectedLanguage:ge,selectedPage:fe,pages:le,posts:pe,data:ie,gsData:ue,detailData:oe,manifestData:me,IIIFData:de,detailModal:he})},Ee=a(496),be=a(497),ye=a(498),ke=a(495),Ne=a(55),we=a(56),Ie=a(98),Oe=a(57),je=a(99),Ae=a(216),_e=a(20),Le=(new _e.b)(function(e){var t=e.active,a=e.children,n=e.dispatch,s=e.lang,c=e.i18n;return r.a.createElement("li",{key:a,onClick:function(){var e;n(U(s)),e=s,console.log("in language connector with",e),c.changeLanguage(e)},className:t?"lang-active":"lang",style:t?{color:"red"}:{color:"black"}},r.a.createElement("button",{key:a,disabled:!!t,className:"btn-lang"},a))}),De=Object(o.c)(function(e,t){return{active:t.selectedLanguage===e.selectedLanguage,lang:t.selectedLanguage||C}})(Le),Fe=a(494),Pe=(new _e.b)(function(e){var t;return t=Object.entries(e.t("languageCodes")).map(function(t){var a=Object(Ae.a)(t,2),n=a[0],s=a[1],c="home"===e.page?"":"/".concat(e.page);return r.a.createElement(Fe.a,{key:n,to:"/".concat(n).concat(c)},r.a.createElement(De,{key:s,selectedLanguage:n},s))}),r.a.createElement("ul",{className:"language-list"},t)}),Te=Object(o.c)(function(e){return{page:e.selectedPage}})(Pe),Ce=Object(o.c)(function(e,t){return{active:t.selectedPage===e.selectedPage}},function(e,t){return{onClick:function(){return e(x(t.selectedPage))}}})(function(e){var t=e.active,a=e.children,n=e.onClick;return r.a.createElement("li",{key:a,onClick:t?null:n,className:t?"nav-active":"nav",style:t?{color:"red"}:{color:"black"}},r.a.createElement("button",{key:a,disabled:!!t,className:"btn-nav"},a))}),Me=(new _e.b)(function(e){S("creating navbar with props",e.navigation);var t=e.navigation.map(function(t){var a="home"===t.match?"":"/".concat(t.match);return r.a.createElement(Fe.a,{key:t.slug,to:"/".concat(e.lng).concat(a)},r.a.createElement(Ce,{key:t.slug,selectedPage:t.match},e.t("pages")[t.match]))});return r.a.createElement("ul",{className:"nav-list"},t)}),Se=Object(o.c)(function(e){return{navigation:(t=e.pages.items[e.selectedLanguage],t.map(function(e){return{match:e.slug.split("-")[0],title:"home"===e.slug.substring(0,4)?"Home":e.title.rendered,slug:e.slug,order:e.menu_order}})),lang:e.selectedLanguage,page:e.selectedPage};var t})(Me),Ue=function(){return r.a.createElement("header",{id:"header"},r.a.createElement(Te,null),r.a.createElement(Se,null))},xe=Object(_e.b)()(function(e){return r.a.createElement("footer",{id:"footer"},r.a.createElement("div",{className:"icon"},r.a.createElement("img",{src:"http://".concat("178.128.7.239","/wp-content/uploads/2018/10/nlm-logo-no-text.png"),alt:"mongolia-logo"})),r.a.createElement("ul",{className:"alt-icons"},r.a.createElement("li",null,r.a.createElement("a",{href:"#1",className:"icon fa-twitter"},r.a.createElement("span",{className:"label"},"Twitter"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1",className:"icon fa-facebook"},r.a.createElement("span",{className:"label"},"Facebook"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1",className:"icon fa-linkedin"},r.a.createElement("span",{className:"label"},"LinkedIn"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1",className:"icon fa-github"},r.a.createElement("span",{className:"label"},"GitHub"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1",className:"icon fa-phone"},r.a.createElement("span",{className:"label"},"Phone"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1",className:"icon fa-envelope"},r.a.createElement("span",{className:"label"},"Email")))),r.a.createElement("ul",{className:"menu"},r.a.createElement("li",null,r.a.createElement("a",{href:"#1"},e.t("footer.terms"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1"},e.t("footer.privacy"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1"},e.t("footer.contact")))),r.a.createElement("p",{className:"copyright"},"\xa9 ","".concat("2018"," ").concat(e.t("title"),". ").concat(e.t("footer.rights"),".")))}),Re=(a(469),Object(o.c)(function(e){return{fetchingPosts:e.posts.isFetching,selectedLanguage:e.selectedLanguage,posts:e.posts.isFetching?[]:e.posts.items[e.selectedLanguage]}})(function(e){var t=e.posts;return t?t.map(function(e,t){var a=t%2===0?1:3,n="";return e._embedded["wp:featuredmedia"]&&(n=e._embedded["wp:featuredmedia"][0].source_url||""),3===a?r.a.createElement("section",{key:t,id:t,className:"wrapper special style".concat(a)},r.a.createElement("div",{className:"inner"},r.a.createElement("section",{className:"spotlights"},r.a.createElement("section",null,r.a.createElement("h2",null,e.acf.title),r.a.createElement("span",{className:"image"},r.a.createElement("img",{src:n,alt:""}))),r.a.createElement("section",null,r.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.content.rendered}}))))):r.a.createElement("section",{key:t,id:t,className:"wrapper special style".concat(a)},r.a.createElement("div",{className:"inner"},r.a.createElement("section",{className:"spotlights col1"},r.a.createElement("section",null,r.a.createElement("h2",null,e.acf.title),r.a.createElement("span",{className:"image"},r.a.createElement("img",{src:n,alt:""})),r.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.content.rendered}})))))}):r.a.createElement("div",null)})),Ge=a(212),Ve=a.n(Ge),qe=(a(471),function(e){var t=e.stats,a=e.t;return r.a.createElement("section",{className:"wrapper special style3"},r.a.createElement("div",{className:"inner"},r.a.createElement("section",{className:"spotlights"},r.a.createElement("section",null,r.a.createElement("h2",null,a("stats.Title")),r.a.createElement("ul",{className:"list-stats"},r.a.createElement("li",{className:"stat-item"},r.a.createElement("p",null,a("stats.LastUpdate"),": ",r.a.createElement("em",null,t.LastUpdate))),r.a.createElement("li",{className:"stat-item"},r.a.createElement("p",null,a("stats.PagesDigitized"),": ",r.a.createElement("em",null,t.PagesDigitized))),r.a.createElement("li",{className:"stat-item"},r.a.createElement("p",null,a("stats.VolumesDigitized"),": ",r.a.createElement("em",null,t.VolumesDigitized))),r.a.createElement("li",{className:"stat-item"},r.a.createElement("p",null,a("stats.VolumesCataloged"),": ",r.a.createElement("em",null,t["VolumesCataloged(normalized)"]))),r.a.createElement("li",{className:"stat-item"},r.a.createElement("p",null,a("stats.TitlesCataloged"),": ",r.a.createElement("em",null,t["TitlesCataloged(ACIP)"]))))),r.a.createElement("section",null,r.a.createElement("span",{className:"image"},r.a.createElement("img",{src:Ve.a,alt:""}))))))}),We=function(e){function t(){var e,a;Object(Ne.a)(this,t);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return(a=Object(Ie.a)(this,(e=Object(Oe.a)(t)).call.apply(e,[this].concat(s)))).unpackNames=function(e,t){if(Array.isArray(e["rdfs:label"])){var a=e["rdfs:label"].map(function(e,t){return r.a.createElement("p",{key:t,className:"modal-text"},r.a.createElement("span",{className:"meta-italics"},"(",e["@language"],"): "),r.a.createElement("span",{className:"meta-title"},e["@value"]))});return r.a.createElement("div",{key:t,className:"modal-text"},r.a.createElement("span",{className:"meta-detail"},t.split("Person")[1],": "),a)}return r.a.createElement("p",{key:t,className:"modal-text"},r.a.createElement("span",{className:"meta-detail"},t.split("Person")[1],": "),r.a.createElement("span",{className:"meta-italics"},"(",e["rdfs:label"]["@language"],"): "),r.a.createElement("span",{className:"meta-title"},e["rdfs:label"]["@value"]))},a.unpack=function(e){return null===e?null:Array.isArray(e)?e.map(function(e,t){return"object"===typeof e?a.unpack(e):"bdr"===e.substring(0,3)?r.a.createElement("div",{key:t,className:"card-sub-item"},r.a.createElement("div",{onClick:function(){return a.showModal(e.split(":")[1])}},e)):r.a.createElement("div",{key:t,className:"card-sub-item"},e)}):"object"===typeof e?e.hasOwnProperty("type")?a.unpackNames(e,e.type):r.a.createElement("p",{key:e["@value"],className:"modal-text"},r.a.createElement("span",{className:"meta-title"},e["@value"])):"string"===typeof e?"bdr"===e.substring(0,3)?r.a.createElement("div",{onClick:function(){return a.showModal(e.split(":")[1])}},e):e:void 0},a.buildAttribution=function(e){return r.a.createElement("p",{className:"meta-detail"},r.a.createElement("span",null,e("archives.attribution")))},a.parseType=function(e,t,n,s){var c=e["skos:prefLabel"],l=e["@id"],i=e.type,o=e.workCatalogInfo,u=e.personName,m=e.note,d=e["adm:access"],p=r.a.createElement("p",{className:"meta-detail"},r.a.createElement("span",null,s("modal.detail")," ",l,", "),r.a.createElement("span",null," ",i)),g=a.buildAttribution(s),h=r.a.createElement("button",{className:"modal-btn",onClick:t},r.a.createElement("i",{className:"fa fa-2x fa-times"}),s("technical.btn-close"));switch(m=void 0!==m?m.noteText:null,i){case"Person":return r.a.createElement("div",{className:"detail-data"},p,r.a.createElement("div",{className:"modal-title"},a.unpack(c)),r.a.createElement("div",{className:""},r.a.createElement("span",{className:"lead-item"},s("modal.names"),": "),r.a.createElement("span",{className:"meta-catalog"},a.unpack(u))),h);case"Topic":return r.a.createElement("div",{className:"detail-data"},p,r.a.createElement("div",{className:"modal-title"},a.unpack(c)),null===m?null:r.a.createElement("div",{className:"meta-catalog"},s("modal.note"),": ",null!==m?a.unpack(m):null),h);case"Work":var f,v=a.buildScansBtn(d,s);return f="bdr:AccessRestrictedByTbrc"===d?r.a.createElement("div",null,s("modal.image-restricted")):null===n||void 0===n?r.a.createElement("div",{className:"blinky"},s("technical.loading-image")):r.a.createElement("img",{src:n,width:"100%",alt:"scan"}),r.a.createElement("div",{className:"detail-data"},r.a.createElement("div",{className:"modal-title"},a.unpack(c)),p,f,g,r.a.createElement("div",{className:"meta-catalog"},a.unpack(o)),h,v);default:return null}},a}return Object(je.a)(t,e),Object(we.a)(t,[{key:"buildScansBtn",value:function(e,t){var a=null;return void 0!==this.props.manifestURL&&(a=0===this.props.manifestURL.length?null:"bdr:AccessRestrictedByTbrc"===e?r.a.createElement("button",{disabled:!0},r.a.createElement("i",{className:"fa fa-2x fa-eye-slash"})," ",t("modal.scans-restricted")):r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"/uv.html?manifest="+this.props.manifestURL},r.a.createElement("button",null,r.a.createElement("i",{className:"fa fa-2x fa-eye"})," ",t("modal.scans")))),a}},{key:"render",value:function(){var e,t=this.props.show?"modal display-block":"modal display-none";return e=Object.keys(this.props.workDetail).length>0?this.parseType(this.props.workDetail._source,this.props.hideModal,this.props.firstImage,this.props.t):r.a.createElement("div",{className:"blinky"},this.props.t("technical.loading")," ",this.props.doc_id),r.a.createElement("div",{className:t,onClick:this.props.hideModal},r.a.createElement("section",{className:"modal-main"},e))}}]),t}(n.Component),He=Object(_e.b)()(We),Qe=Object(o.c)(function(e){return{workDetail:e.detailData.isFetching||0===e.detailModal.modalID?{}:e.detailData.item.hits.hits[0],manifestURL:e.manifestData.isFetching||e.detailData.isFetching?"":e.manifestData.manifestURL,numberVolumes:e.detailData.isFetching||0===e.detailModal.modalID?null:e.detailData.item.hits.hits[0]._source.workNumberOfVolumes,firstImage:e.IIIFData.isFetching||0===e.detailModal.modalID?null:e.IIIFData.firstImage}})(He),ze=function(e){function t(){var e,a;Object(Ne.a)(this,t);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return(a=Object(Ie.a)(this,(e=Object(Oe.a)(t)).call.apply(e,[this].concat(s)))).showModal=function(e){a.props.dispatch(J(e)),a.props.dispatch({type:"DETAIL_MODAL",modalID:e,show:!0})},a.hideModal=function(){a.props.dispatch({type:"DETAIL_MODAL",show:!1}),a.props.dispatch({type:"NULLIFY_IIIF"})},a.unpackFrontend=function(e,t){if("P"===e){var a=null;return Array.isArray(t.data.personName)&&(a=(a=t.data.personName.find(function(e){return"PersonPrimaryName"===e.type}))["rdfs:label"]["@value"]),a}if("T"===e){var n=null;return Array.isArray(t.data["skos:prefLabel"])?n=(n=null==(n=t.data["skos:prefLabel"].find(function(e){return"en"===e["@language"]}))?n=t.data["skos:prefLabel"].find(function(e){return"bo-x-ewts"===e["@language"]}):n)["@value"]:"object"===typeof t.data["skos:prefLabel"]&&(n=t.data["skos:prefLabel"]["@value"]),n}if("W"!==e)return null;console.log("I ended up in W",t)},a.unpack=function(e){return null===e||void 0===e?null:Array.isArray(e)?e.map(function(e,t){return"object"===typeof e?a.unpack(e):"bdr"===e.substring(0,3)?r.a.createElement("div",{key:t,className:"card-sub-item"},r.a.createElement("div",{onClick:function(){return a.showModal(e.split(":")[1])}},e)):r.a.createElement("div",{key:t,className:"card-sub-item"},e)}):"object"===typeof e?"key"in e?e.data.hasOwnProperty("@id")?e.data["@id"]:a.unpackFrontend(e.code,e):e.hasOwnProperty("@value")?e["@value"]:r.a.createElement("span",{key:e["rdfs:label"]["@value"]},e["rdfs:label"]["@value"]):"string"===typeof e?"bdr"===e.substring(0,3)?r.a.createElement("div",{onClick:function(){return a.showModal(e.split(":")[1])}},e):r.a.createElement("span",null,e):void 0},a}return Object(je.a)(t,e),Object(we.a)(t,[{key:"buildCardItem",value:function(e,t,a){var n=this;return null===t?null:r.a.createElement("div",{className:"card-item"},r.a.createElement("span",{className:"item-lead"},a," "),r.a.createElement("span",{className:"item-btn",onClick:function(){return n.showModal(t)}},this.unpack(e)))}},{key:"render",value:function(){var e=this,t=this.props.works.map(function(t,a){var n=t._source,s=n["skos:prefLabel"],c=n["@id"],l=n.workGenre,i=n.workIsAbout,o=void 0!==t._source.creatorMainAuthor?t._source.creatorMainAuthor:null,u=null!==o?o.item:null,m=void 0!==l?l.item:null,d=void 0!==i?i.item:null,p=void 0!==c?c.item:null,g=e.buildCardItem(o,u,"".concat(e.props.t("archives.author"),":")),h=e.buildCardItem(l,m,"".concat(e.props.t("archives.genre"),":")),f=e.buildCardItem(i,d,"".concat(e.props.t("archives.topic"),":"));return r.a.createElement("div",{key:a,className:"card"},r.a.createElement("p",{className:"meta-detail"},p),r.a.createElement("div",{className:"card-item"},r.a.createElement("span",{className:"item-work"},e.unpack(s))),g,h,f,r.a.createElement("button",{onClick:function(){return e.showModal(c.item)}},"".concat(e.props.t("archives.more"),":")))});return r.a.createElement("div",{className:"grid"},t,r.a.createElement(Qe,{key:this.props.doc_id,hideModal:this.hideModal,doc_id:this.props.doc_id,show:this.props.showModal}))}}]),t}(n.Component),Be=(new _e.b)(ze),Ke=Object(o.c)(function(e){return{works:e.data.isFetching?[]:e.data.items.hits.hits,workDetail:e.detailData.isFetching||0===e.detailModal.modalID?{}:e.detailData.item.hits.hits[0],doc_id:e.detailModal.modalID,showModal:e.detailModal.show,manifestURL:e.manifestData.isFetching?"":e.manifestData.manifestURL}})(Be),Ye=a(213),Je=a.n(Ye),$e=(a(474),function(e){function t(e){var a;return Object(Ne.a)(this,t),(a=Object(Ie.a)(this,Object(Oe.a)(t).call(this,e))).setLang=function(e){var t=a.props,n=t.i18n,r=t.dispatch;n.changeLanguage(e),r(U(e))},a.resetPage=function(){a.props.dispatch({type:"SET_PAGE",page:"home"}),a.setLang(C)},a.setNumber={0:"one",1:"one",2:"two",3:"three",4:"four"},a}return Object(je.a)(t,e),Object(we.a)(t,[{key:"componentWillMount",value:function(){this.languageCheckAndUpdate()}},{key:"componentDidUpdate",value:function(){var e=this;window.onpopstate=function(t){t.preventDefault(),e.languageCheckAndUpdate()}}},{key:"languageCheckAndUpdate",value:function(){var e=this.props,t=e.history,a=e.url,n=e.selectedPage,r=e.dispatch,s=e.t;void 0!==a.split("/")[2]?Object.keys(s("pages")).includes(a.split("/")[2])?r(x("archives")):(r(x("home")),t.push("/".concat(a.split("/")[1]))):r(x("home")),a.split("/")[1]in M?this.setLang(a.split("/")[1],n):(this.setLang(C,n),t.push(C))}},{key:"renderPage",value:function(e,t){return t.some(function(t){return t.slug.split("-")[0]===e})||(S("page not there"),this.resetPage()),t.filter(function(t){return t.slug.split("-")[0]===e}).map(function(e,t){var a=null;return e._embedded["wp:featuredmedia"]&&(a=e._embedded["wp:featuredmedia"][0].source_url),r.a.createElement("div",{key:e.slug},r.a.createElement("section",{id:"banner",key:e.id,style:{backgroundImage:"linear-gradient(to bottom, \n                  rgba(239, 239, 239,0.1) 50%,\n                  rgba(239, 239, 239,1.0) 100%), \n                  url(".concat(a,")")}},r.a.createElement("header",{className:"major"},r.a.createElement("span",{className:"icon style7"},r.a.createElement("img",{width:"90px",alt:"hi",src:Je.a})),r.a.createElement("h1",null,e.acf.title),r.a.createElement("h3",null,e.acf.subtitle),r.a.createElement("div",{className:"inner-page"},r.a.createElement("section",{className:"spotlights-page"},r.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.content.rendered}}))))))})}},{key:"render",value:function(){return this.props.fetchingPages||this.props.fetchingPosts?r.a.createElement("div",{className:"blinky"},this.props.t("technical.loading")):r.a.createElement("div",{className:"container"},r.a.createElement(Ue,null),this.renderPage(this.props.selectedPage,this.props.pages),S("is it archives?",this.props.selectedPage,this.props.pages),"home"===this.props.selectedPage?r.a.createElement("div",null,r.a.createElement(qe,{stats:this.props.gs,t:this.props.t}),r.a.createElement(Re,null)):null,"archives"===this.props.selectedPage?r.a.createElement(Ke,null):null,r.a.createElement(xe,null))}}]),t}(n.Component)),Xe=(new _e.b)($e),Ze=Object(o.c)(function(e){return{router:e.router,url:e.router.location.pathname,fetchingPages:e.pages.isFetching,selectedLanguage:e.selectedLanguage||C,selectedPage:e.pages.isFetching?[]:e.pages.items[e.selectedLanguage].some(function(t){return t.slug.split("-")[0]===e.selectedPage})?e.selectedPage:"home",pages:e.pages.isFetching?[]:e.pages.items[e.selectedLanguage],gs:e.gsData.isFetching?{}:e.gsData.gs}})(Xe),et=function(){return r.a.createElement(Ee.a,null,r.a.createElement(be.a,null,r.a.createElement(ye.a,{path:"/en",component:Ze}),r.a.createElement(ye.a,{path:"/mn",component:Ze}),r.a.createElement(ye.a,{path:"/en/archives",component:Ze}),r.a.createElement(ye.a,{path:"/mn/archives",component:Ze}),r.a.createElement(ye.a,{path:"/mn/\u0410\u0440\u0445\u0438\u0432\u0443\u0443\u0434",component:Ze}),r.a.createElement(ke.a,{push:!0,from:"*",to:"/en",component:Ze})))},tt=(a(475),a(479),a(129)),at=a(214),nt=a.n(at),rt=a(215),st=a.n(rt);tt.a.use(nt.a).use(st.a).use(_e.a).init({fallbackLng:"en",debug:!0,load:"languageOnly",returnObjects:!0,interpolation:{escapeValue:!1},react:{wait:!0}});tt.a;var ct=Object(i.createLogger)(),lt=Object(m.a)(),it=Object(l.e)(ve(lt),Object(l.d)(Object(l.a)(Object(d.a)(lt),u.a,ct)));it.dispatch(function(e){return e({type:R}),E()("".concat(D).concat(F,"pages?_embed")).then(function(e){return e.json()},function(e){return console.log("An error ",e)}).then(function(e){return e.reduce(function(e,t){var a=Object.keys(M).find(function(e){return M[e]===t.acf.language});return e[a]=e[a]||[],e[a].push(t),e},[])}).then(function(t){e(function(e){return{type:G,pages:e,receivedAt:Date.now()}}(t))})}),it.dispatch(function(e){return e({type:H}),E()("".concat(D).concat(F,"posts?_embed")).then(function(e){return e.json()},function(e){return console.log("An error ",e)}).then(function(e){return e.reduce(function(e,t){var a=Object.keys(M).find(function(e){return M[e]===t.acf.language});return e[a]=e[a]||[],e[a].push(t),e},[])}).then(function(t){return e(function(e){return{type:Q,posts:e,receivedAt:Date.now()}}(t))})}),it.dispatch(function(){var e=Object(f.a)(h.a.mark(function e(t){var a,n;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:V}),e.prev=1,e.next=4,W();case 4:return a=e.sent,n={},a.map(function(e){var t=e.StatName.split(" ").join("");console.log(typeof e.Value,isNaN(e.Value),e.Value),n[t]=isNaN(e.Value)?e.Value:String(e.Value).replace(/(.)(?=(\d{3})+$)/g,"$1,")}),e.abrupt("return",t({type:q,gs:n,receivedAt:Date.now()}));case 10:e.prev=10,e.t0=e.catch(1),console.error("error from tabletop",e.t0);case 13:case"end":return e.stop()}},e,this,[[1,10]])}));return function(t){return e.apply(this,arguments)}}()),function(){I.apply(this,arguments)}(),it.dispatch(function(){var e=Object(f.a)(h.a.mark(function e(t){var a;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:z}),e.prev=1,e.next=4,O(T);case 4:return a=e.sent,e.abrupt("return",t({type:B,data:a,receivedAt:Date.now()}));case 8:e.prev=8,e.t0=e.catch(1),console.error("there been error ",e.t0);case 11:case"end":return e.stop()}},e,this,[[1,8]])}));return function(t){return e.apply(this,arguments)}}());c.a.render(r.a.createElement(function(){return document.body.classList.add("landing"),r.a.createElement(o.a,{store:it},r.a.createElement(p.a,{history:lt},r.a.createElement(et,null)))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[218,2,1]]]);
//# sourceMappingURL=main.495dfec3.chunk.js.map