(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{129:function(e,t,a){},133:function(e,t,a){},147:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(64),s=a.n(c);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l=a(20),i=a(65),o=a(3),u=a(67),m=a(18),d=a(62),p=a(63),g=a(31),h=a.n(g),f=a(34),v=a(37),E=a.n(v),b=a(68),y=a.n(b),k="157.230.172.69",N=!1,w="red",I=function(){};I(k);var O=new y.a.Client({host:{protocol:"http",host:k,port:9200,path:""},log:"info"});function j(){return(j=Object(f.a)(h.a.mark(function e(){var t;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:I("process.env.NODE_ENV ",k);case 1:if(N){e.next=22;break}I("Connnnnecting....");case 3:if("red"!==w){e.next=20;break}return I("awaiting green light"),e.prev=5,e.next=8,O.cluster.health({});case 8:t=e.sent,I("health: ",t),w=t.status,N=!0,e.next=18;break;case 14:e.prev=14,e.t0=e.catch(5),console.error("Connection yo, is failing...",e.t0),N=!1;case 18:e.next=3;break;case 20:e.next=1;break;case 22:return e.abrupt("return",N);case 23:case"end":return e.stop()}},e,this,[[5,14]])}))).apply(this,arguments)}var A=function(e){var t={size:10,query:{ids:{type:"_doc",values:e}}};return I("initial search body",t),O.search({index:"frontend",type:"",body:t})},L=function(e){var t={size:10,query:{ids:{type:"_doc",values:e}}};return I("initial search body",t),O.search({index:["bdrc_work","bdrc_topic","bdrc_person","bdrc_item"],type:"",body:t})},_="http://178.128.7.239/",D="wp-json/wp/v2/",F="http://iiifpres.bdrc.io",P=["W22677","W1GS135873","W1KG5200","W22344","W1GS135531","W1KG1132","W1KG10720","W1KG1279","W1KG14700"],M="en",T={en:"English",mn:"Mongolian"},C=function(e){return{type:"SET_LANG",language:e}},S=function(e){return{type:"SET_PAGE",page:e}},U="REQUEST_PAGES";var R="RECEIVE_PAGES";var x="REQUEST_POSTS";var G="RECEIVE_POSTS";var q="REQUEST_DATA";var W="RECEIVE_DATA";var H="REQUEST_ID";var V="RECEIVE_ID";function B(e){return function(t){console.log("fetchSpecificID!",e),t({type:H});try{L([e]).then(function(e){console.log("THEN",e);var a=e.hits.hits[0]._source.workHasItemImageAsset,n=e.hits.hits[0]._source.workNumberOfVolumes;return t(function(e,t){return function(a){console.log("INSIDE fetchManifest",e),a((console.log("requesting manifest!"),{type:z}));try{var n;if(!e)return a(K(""));var r=e.includes(":")?e.split(":")[1]:e;if(1===t)L([r]).then(function(e){console.log("THEN",e);var t=e.hits.hits[0]._source.itemHasVolume;return n="".concat(F,"/2.1.1/v:").concat(t,"/manifest"),console.log("THIS IS IMAGE URL",n),a(ee(n)),a(K(n))});else if(t>1)return n="".concat(F,"/2.1.1/collection/i:").concat(e),console.log("THIS IS IMAGE URL",n),a(ee(n)),a(K(n))}catch(c){console.error("fetch manifest error! ",c)}}}(a,n)),e}).then(function(e){return t({type:V,data:a=e,imageAsset:a.hits.hits[0]._source.workHasItemImageAsset,volume:a.hits.hits[0]._source.workHasItem,receivedAt:Date.now()});var a})}catch(a){console.error("fetch ID error! ",a)}}}var Q="RECEIVE_MANIFEST";function K(e){return{type:Q,manifestURL:e,receivedAt:Date.now()}}var z="REQUEST_MANIFEST";var J="DETAIL_MODAL",Y="NULLIFY_IIIF",$="RECEIVE_IIIF";function X(e){return{type:$,firstImage:e,receivedAt:Date.now()}}var Z="REQUEST_IIIF";function ee(e){return function(t){t((console.log("requesting IIIF!"),{type:Z,firstImage:null}));try{E()(e,{method:"GET"}).then(function(e){return e.json()}).then(function(e){var a;if(console.log("MANIFEST?!",e),e.sequences||e.manifests&&(console.log("I AM A COLLECTION"),t(ee(e.manifests[0]["@id"]))),e.sequences&&e.sequences[0]&&e.sequences[0].canvases){var n=!1;for(var r in e.sequences[0].canvases){var c=e.sequences[0].canvases[r];if("tbrc-1"===c.label&&(c=e.sequences[0].canvases[2])&&c.images&&c.images[0])return a=e.sequences[0].canvases[2].images[0].resource["@id"],n=!0,t(X(a))}if(!n&&e.sequences[0].canvases[0]&&e.sequences[0].canvases[0].images[0]&&e.sequences[0].canvases[0].images[0].resource["@id"])return a=e.sequences[0].canvases[0].images[0].resource["@id"],n=!0,t(X(a))}})}catch(a){console.error("config error",a)}}}function te(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isFetching:!1,items:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case U:return Object.assign({},e,{isFetching:!0});case R:return Object.assign({},e,{isFetching:!1,items:t.pages,lastUpdated:t.receivedAt});case x:return Object.assign({},e,{isFetching:!0});case G:return Object.assign({},e,{isFetching:!1,items:t.posts,lastUpdated:t.receivedAt});case q:return Object.assign({},e,{isFetching:!0});case W:return Object.assign({},e,{isFetching:!1,items:t.data,lastUpdated:t.receivedAt});case H:return Object.assign({},e,{isFetching:!0});case V:return Object.assign({},e,{isFetching:!1,item:t.data,imageAsset:t.imageAsset,volume:t.volume,lastUpdated:t.receivedAt});case z:return Object.assign({},e,{isFetching:!0});case Q:return Object.assign({},e,{isFetching:!1,manifestURL:t.manifestURL,lastUpdated:t.receivedAt});case Z:return Object.assign({},e,{isFetching:!0});case $:return Object.assign({},e,{isFetching:!1,firstImage:t.firstImage,lastUpdated:t.receivedAt});case Y:return Object.assign({},e,{firstImage:null});case J:return Object.assign({},e,{modalID:t.modalID,show:t.show});default:return e}}function ae(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case R:case U:return Object.assign({},e,te(e,t));default:return e}}function ne(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case W:case q:return Object.assign({},e,te(e,t));default:return e}}function re(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case V:case H:return Object.assign({},e,te(e,t));default:return e}}function ce(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Q:case z:return Object.assign({},e,te(e,t));default:return e}}function se(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case $:case Y:case Z:return Object.assign({},e,te(e,t));default:return e}}function le(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case G:case x:return Object.assign({},e,te(e,t));default:return e}}var ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_LANG":return t.language;case"@@router/LOCATION_CHANGE":return 0===t.payload.location.pathname.split("/")[1].length?e:t.payload.location.pathname.split("/")[1];default:return e}};function oe(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{modalID:0},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case J:return Object.assign({},e,te(e,t));default:return e}}var ue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"home",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_PAGE":return t.page;default:return e}},me=function(e){return Object(l.c)({router:Object(p.b)(e),selectedLanguage:ie,selectedPage:ue,pages:ae,posts:le,data:ne,detailData:re,manifestData:ce,IIIFData:se,detailModal:oe})},de=a(150),pe=a(151),ge=a(152),he=a(149),fe=a(26),ve=a(27),Ee=a(29),be=a(28),ye=a(30),ke=a(114),Ne=a(6),we=(new Ne.b)(function(e){var t=e.active,a=e.children,n=e.dispatch,c=e.lang,s=e.i18n;return r.a.createElement("li",{key:a,onClick:function(){var e;n(C(c)),e=c,console.log("in language connector with",e),s.changeLanguage(e)},className:t?"lang-active":"lang",style:t?{color:"red"}:{color:"black"}},r.a.createElement("button",{key:a,disabled:!!t,className:"btn-lang"},a))}),Ie=Object(o.c)(function(e,t){return{active:t.selectedLanguage===e.selectedLanguage,lang:t.selectedLanguage||M}})(we),Oe=a(148),je=(new Ne.b)(function(e){var t;return t=Object.entries(e.t("languageCodes")).map(function(t){var a=Object(ke.a)(t,2),n=a[0],c=a[1],s="home"===e.page?"":"/".concat(e.page);return r.a.createElement(Oe.a,{key:n,to:"/".concat(n).concat(s)},r.a.createElement(Ie,{key:c,selectedLanguage:n},c))}),r.a.createElement("ul",{className:"language-list"},t)}),Ae=Object(o.c)(function(e){return{page:e.selectedPage}})(je),Le=Object(o.c)(function(e,t){return{active:t.selectedPage===e.selectedPage}},function(e,t){return{onClick:function(){return e(S(t.selectedPage))}}})(function(e){var t=e.active,a=e.children,n=e.onClick;return r.a.createElement("li",{key:a,onClick:t?null:n,className:t?"nav-active":"nav",style:t?{color:"red"}:{color:"black"}},r.a.createElement("button",{key:a,disabled:!!t,className:"btn-nav"},a))}),_e=(new Ne.b)(function(e){console.log(e.navigation);var t=e.navigation.map(function(t){console.log("getting it from translation",e.t("pages")[t.match]);var a="home"===t.match?"":"/".concat(t.match);return r.a.createElement(Oe.a,{key:t.slug,to:"/".concat(e.lng).concat(a)},r.a.createElement(Le,{key:t.slug,selectedPage:t.match},e.t("pages")[t.match]))});return r.a.createElement("ul",{className:"nav-list"},t)}),De=Object(o.c)(function(e){return{navigation:(t=e.pages.items[e.selectedLanguage],t.map(function(e){return{match:e.slug.split("-")[0],title:"home"===e.slug.substring(0,4)?"Home":e.title.rendered,slug:e.slug,order:e.menu_order}})),lang:e.selectedLanguage,page:e.selectedPage};var t})(_e),Fe=function(){return r.a.createElement("header",{id:"header"},r.a.createElement(Ae,null),r.a.createElement(De,null))},Pe=Object(Ne.b)()(function(e){return r.a.createElement("footer",{id:"footer"},r.a.createElement("div",{className:"icon"},r.a.createElement("img",{src:"http://".concat("178.128.7.239","/wp-content/uploads/2018/10/nlm-logo-no-text.png"),alt:"mongolia-logo"})),r.a.createElement("ul",{className:"alt-icons"},r.a.createElement("li",null,r.a.createElement("a",{href:"#1",className:"icon fa-twitter"},r.a.createElement("span",{className:"label"},"Twitter"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1",className:"icon fa-facebook"},r.a.createElement("span",{className:"label"},"Facebook"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1",className:"icon fa-linkedin"},r.a.createElement("span",{className:"label"},"LinkedIn"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1",className:"icon fa-github"},r.a.createElement("span",{className:"label"},"GitHub"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1",className:"icon fa-phone"},r.a.createElement("span",{className:"label"},"Phone"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1",className:"icon fa-envelope"},r.a.createElement("span",{className:"label"},"Email")))),r.a.createElement("ul",{className:"menu"},r.a.createElement("li",null,r.a.createElement("a",{href:"#1"},e.t("footer.terms"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1"},e.t("footer.privacy"))),r.a.createElement("li",null,r.a.createElement("a",{href:"#1"},e.t("footer.contact")))),r.a.createElement("p",{className:"copyright"},"\xa9 ","2018 ".concat("National Library of Mongolia",". ").concat(e.t("footer.rights"),".")))}),Me=Object(o.c)(function(e){return{fetchingPosts:e.posts.isFetching,selectedLanguage:e.selectedLanguage,posts:e.posts.isFetching?[]:e.posts.items[e.selectedLanguage]}})(function(e){var t=e.posts;return t?t.map(function(e,t){var a=t%2===0?1:3,n="";return e._embedded["wp:featuredmedia"]&&(n=e._embedded["wp:featuredmedia"][0].source_url||""),3===a?r.a.createElement("section",{key:t,id:t,className:"wrapper special style".concat(a)},r.a.createElement("div",{className:"inner"},r.a.createElement("section",{className:"spotlights"},r.a.createElement("section",null,r.a.createElement("h2",null,e.acf.title),r.a.createElement("span",{className:"image"},r.a.createElement("img",{src:n,alt:""}))),r.a.createElement("section",null,r.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.content.rendered}}))))):r.a.createElement("section",{key:t,id:t,className:"wrapper special style".concat(a)},r.a.createElement("div",{className:"inner"},r.a.createElement("section",{className:"spotlights"},r.a.createElement("section",null,r.a.createElement("h2",null,e.acf.title),r.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.content.rendered}})),r.a.createElement("section",null,r.a.createElement("span",{className:"image"},r.a.createElement("img",{src:n,alt:""}))))))}):r.a.createElement("div",null)}),Te=function(e){function t(){var e,a;Object(fe.a)(this,t);for(var n=arguments.length,c=new Array(n),s=0;s<n;s++)c[s]=arguments[s];return(a=Object(Ee.a)(this,(e=Object(be.a)(t)).call.apply(e,[this].concat(c)))).unpackNames=function(e,t){if(Array.isArray(e["rdfs:label"])){var a=e["rdfs:label"].map(function(e,t){return r.a.createElement("p",{key:t,className:"modal-text"},r.a.createElement("span",{className:"meta-italics"},"(",e["@language"],"): "),r.a.createElement("span",{className:"meta-title"},e["@value"]))});return r.a.createElement("div",{key:t,className:"modal-text"},r.a.createElement("span",{className:"meta-detail"},t.split("Person")[1],": "),a)}return r.a.createElement("p",{key:t,className:"modal-text"},r.a.createElement("span",{className:"meta-detail"},t.split("Person")[1],": "),r.a.createElement("span",{className:"meta-italics"},"(",e["rdfs:label"]["@language"],"): "),r.a.createElement("span",{className:"meta-title"},e["rdfs:label"]["@value"]))},a.unpack=function(e){return null===e?null:Array.isArray(e)?e.map(function(e,t){return"object"===typeof e?a.unpack(e):"bdr"===e.substring(0,3)?r.a.createElement("div",{key:t,className:"card-sub-item"},r.a.createElement("div",{onClick:function(){return a.showModal(e.split(":")[1])}},e)):r.a.createElement("div",{key:t,className:"card-sub-item"},e)}):"object"===typeof e?e.hasOwnProperty("type")?a.unpackNames(e,e.type):r.a.createElement("p",{key:e["@value"],className:"modal-text"},r.a.createElement("span",{className:"meta-title"},e["@value"])):"string"===typeof e?"bdr"===e.substring(0,3)?r.a.createElement("div",{onClick:function(){return a.showModal(e.split(":")[1])}},e):e:void 0},a.parseType=function(e,t,n,c){var s=e["skos:prefLabel"],l=e["@id"],i=e.type,o=e.workCatalogInfo,u=e.personName,m=e.note,d=e["adm:access"],p=r.a.createElement("p",{className:"meta-detail"},r.a.createElement("span",null,c("modal.detail")," ",l,", "),r.a.createElement("span",null," ",i)),g=r.a.createElement("button",{className:"modal-btn",onClick:t},r.a.createElement("i",{className:"fa fa-2x fa-times"}),c("technical.btn-close"));switch(m=void 0!==m?m.noteText:null,i){case"Person":return r.a.createElement("div",{className:"detail-data"},p,r.a.createElement("div",{className:"modal-title"},a.unpack(s)),r.a.createElement("div",{className:""},r.a.createElement("span",{className:"lead-item"},c("modal.names"),": "),r.a.createElement("span",{className:"meta-catalog"},a.unpack(u))),g);case"Topic":return r.a.createElement("div",{className:"detail-data"},p,r.a.createElement("div",{className:"modal-title"},a.unpack(s)),null===m?null:r.a.createElement("div",{className:"meta-catalog"},c("modal.note"),": ",null!==m?a.unpack(m):null),g);case"Work":var h,f=a.buildScansBtn(d,c);return h="bdr:AccessRestrictedByTbrc"===d?r.a.createElement("div",null,c("modal.image-restricted")):null===n||void 0===n?r.a.createElement("div",{className:"blinky"},c("technical.loading-image")):r.a.createElement("img",{src:n,width:"100%",alt:"scan"}),r.a.createElement("div",{className:"detail-data"},r.a.createElement("div",{className:"modal-title"},a.unpack(s)),p,h,r.a.createElement("div",{className:"meta-catalog"},a.unpack(o)),g,f);default:return null}},a}return Object(ye.a)(t,e),Object(ve.a)(t,[{key:"buildScansBtn",value:function(e,t){var a=null;return void 0!==this.props.manifestURL&&(localStorage.setItem("manifestURL",this.props.manifestURL),0===this.props.manifestURL.length?(localStorage.setItem("manifestURL",""),a=null):a="bdr:AccessRestrictedByTbrc"===e?r.a.createElement("button",{disabled:!0},r.a.createElement("i",{className:"fa fa-2x fa-eye-slash"})," ",t("modal.scans-restricted")):r.a.createElement("a",{target:"_blank",href:"/viewer.html"},r.a.createElement("button",null,r.a.createElement("i",{className:"fa fa-2x fa-eye"})," ",t("modal.scans")))),a}},{key:"render",value:function(){var e,t=this.props.show?"modal display-block":"modal display-none";return e=Object.keys(this.props.workDetail).length>0?this.parseType(this.props.workDetail._source,this.props.hideModal,this.props.firstImage,this.props.t):r.a.createElement("div",{className:"blinky"},this.props.t("technical.loading")," ",this.props.doc_id),r.a.createElement("div",{className:t,onClick:this.props.hideModal},r.a.createElement("section",{className:"modal-main"},e))}}]),t}(n.Component),Ce=Object(Ne.b)()(Te),Se=Object(o.c)(function(e){return{workDetail:e.detailData.isFetching||0===e.detailModal.modalID?{}:e.detailData.item.hits.hits[0],manifestURL:e.manifestData.isFetching||e.detailData.isFetching?"":e.manifestData.manifestURL,numberVolumes:e.detailData.isFetching||0===e.detailModal.modalID?null:e.detailData.item.hits.hits[0]._source.workNumberOfVolumes,firstImage:e.IIIFData.isFetching||0===e.detailModal.modalID?null:e.IIIFData.firstImage}})(Ce),Ue=function(e){function t(){var e,a;Object(fe.a)(this,t);for(var n=arguments.length,c=new Array(n),s=0;s<n;s++)c[s]=arguments[s];return(a=Object(Ee.a)(this,(e=Object(be.a)(t)).call.apply(e,[this].concat(c)))).showModal=function(e){a.props.dispatch(B(e)),a.props.dispatch({type:"DETAIL_MODAL",modalID:e,show:!0})},a.hideModal=function(){a.props.dispatch({type:"DETAIL_MODAL",show:!1}),a.props.dispatch({type:"NULLIFY_IIIF"})},a.unpackFrontend=function(e,t){if("P"===e){var a=null;return Array.isArray(t.data.personName)&&(a=(a=t.data.personName.find(function(e){return"PersonPrimaryName"===e.type}))["rdfs:label"]["@value"]),a}if("T"===e){var n=null;return Array.isArray(t.data["skos:prefLabel"])?n=(n=null==(n=t.data["skos:prefLabel"].find(function(e){return"en"===e["@language"]}))?n=t.data["skos:prefLabel"].find(function(e){return"bo-x-ewts"===e["@language"]}):n)["@value"]:"object"===typeof t.data["skos:prefLabel"]&&(n=t.data["skos:prefLabel"]["@value"]),n}if("W"!==e)return null;console.log("I ended up in W",t)},a.unpack=function(e){return null===e||void 0===e?null:Array.isArray(e)?e.map(function(e,t){return"object"===typeof e?a.unpack(e):"bdr"===e.substring(0,3)?r.a.createElement("div",{key:t,className:"card-sub-item"},r.a.createElement("div",{onClick:function(){return a.showModal(e.split(":")[1])}},e)):r.a.createElement("div",{key:t,className:"card-sub-item"},e)}):"object"===typeof e?"key"in e?e.data.hasOwnProperty("@id")?e.data["@id"]:a.unpackFrontend(e.code,e):e.hasOwnProperty("@value")?e["@value"]:r.a.createElement("span",{key:e["rdfs:label"]["@value"]},e["rdfs:label"]["@value"]):"string"===typeof e?"bdr"===e.substring(0,3)?r.a.createElement("div",{onClick:function(){return a.showModal(e.split(":")[1])}},e):r.a.createElement("span",null,e):void 0},a}return Object(ye.a)(t,e),Object(ve.a)(t,[{key:"buildCardItem",value:function(e,t,a){var n=this;return null===t?null:r.a.createElement("div",{className:"card-item"},r.a.createElement("span",{className:"item-lead"},a," "),r.a.createElement("span",{className:"item-btn",onClick:function(){return n.showModal(t)}},this.unpack(e)))}},{key:"render",value:function(){var e=this,t=this.props.works.map(function(t,a){var n=t._source,c=n["skos:prefLabel"],s=n["@id"],l=n.workGenre,i=n.workIsAbout,o=void 0!==t._source.creatorMainAuthor?t._source.creatorMainAuthor:null,u=null!==o?o.item:null,m=void 0!==l?l.item:null,d=void 0!==i?i.item:null,p=void 0!==s?s.item:null,g=e.buildCardItem(o,u,"".concat(e.props.t("archives.author"),":")),h=e.buildCardItem(l,m,"".concat(e.props.t("archives.genre"),":")),f=e.buildCardItem(i,d,"".concat(e.props.t("archives.topic"),":"));return r.a.createElement("div",{key:a,className:"card"},r.a.createElement("p",{className:"meta-detail"},p),r.a.createElement("div",{className:"card-item"},r.a.createElement("span",{className:"item-work"},e.unpack(c))),g,h,f,r.a.createElement("button",{onClick:function(){return e.showModal(s.item)}},"".concat(e.props.t("archives.more"),":")))});return r.a.createElement("div",{className:"grid"},t,r.a.createElement(Se,{key:this.props.doc_id,hideModal:this.hideModal,doc_id:this.props.doc_id,show:this.props.showModal}))}}]),t}(n.Component),Re=(new Ne.b)(Ue),xe=Object(o.c)(function(e){return{works:e.data.isFetching?[]:e.data.items.hits.hits,workDetail:e.detailData.isFetching||0===e.detailModal.modalID?{}:e.detailData.item.hits.hits[0],doc_id:e.detailModal.modalID,showModal:e.detailModal.show,manifestURL:e.manifestData.isFetching?"":e.manifestData.manifestURL}})(Re),Ge=function(e){function t(e){var a;return Object(fe.a)(this,t),(a=Object(Ee.a)(this,Object(be.a)(t).call(this,e))).setLang=function(e){var t=a.props,n=t.i18n,r=t.dispatch;n.changeLanguage(e),r(C(e))},a.resetPage=function(){a.props.dispatch({type:"SET_PAGE",page:"home"}),a.setLang(M)},a.setNumber={0:"one",1:"one",2:"two",3:"three",4:"four"},a}return Object(ye.a)(t,e),Object(ve.a)(t,[{key:"componentWillMount",value:function(){this.languageCheckAndUpdate()}},{key:"componentDidUpdate",value:function(){var e=this;window.onpopstate=function(t){t.preventDefault(),e.languageCheckAndUpdate()}}},{key:"languageCheckAndUpdate",value:function(){var e=this.props,t=e.history,a=e.url,n=e.selectedPage,r=e.dispatch,c=e.t;void 0!==a.split("/")[2]?Object.keys(c("pages")).includes(a.split("/")[2])?r(S("archives")):(r(S("home")),t.push("/".concat(a.split("/")[1]))):r(S("home")),a.split("/")[1]in T?this.setLang(a.split("/")[1],n):(this.setLang(M,n),t.push(M))}},{key:"renderPage",value:function(e,t){return t.some(function(t){return t.slug.split("-")[0]===e})||(console.log("page not there"),this.resetPage()),t.filter(function(t){return t.slug.split("-")[0]===e}).map(function(e,t){var a=null;return e._embedded["wp:featuredmedia"]&&(a=e._embedded["wp:featuredmedia"][0].source_url),r.a.createElement("div",{key:e.slug},r.a.createElement("section",{id:"banner",key:e.id,style:{backgroundImage:"linear-gradient(to bottom, \n                  rgba(239, 239, 239,0.1) 50%,\n                  rgba(239, 239, 239,1.0) 100%), \n                  url(".concat(a,")")}},r.a.createElement("header",{className:"major"},r.a.createElement("span",{className:"icon fa-book style7"}),r.a.createElement("h1",null,e.acf.title),r.a.createElement("h3",null,e.acf.subtitle),r.a.createElement("div",{className:"inner-page"},r.a.createElement("section",{className:"spotlights-page"},r.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.content.rendered}}))))))})}},{key:"render",value:function(){return this.props.fetchingPages||this.props.fetchingPosts?r.a.createElement("div",{className:"blinky"},this.props.t("technical.loading")):r.a.createElement("div",{className:"container"},r.a.createElement(Fe,null),this.renderPage(this.props.selectedPage,this.props.pages),console.log("is it archives?",this.props.selectedPage,this.props.pages),"home"===this.props.selectedPage?r.a.createElement(Me,null):null,"archives"===this.props.selectedPage?r.a.createElement(xe,null):null,r.a.createElement(Pe,null))}}]),t}(n.Component),qe=(new Ne.b)(Ge),We=Object(o.c)(function(e){return{router:e.router,url:e.router.location.pathname,fetchingPages:e.pages.isFetching,selectedLanguage:e.selectedLanguage||M,selectedPage:e.pages.isFetching?[]:e.pages.items[e.selectedLanguage].some(function(t){return t.slug.split("-")[0]===e.selectedPage})?e.selectedPage:"home",pages:e.pages.isFetching?[]:e.pages.items[e.selectedLanguage]}})(qe),He=function(){return r.a.createElement(de.a,null,r.a.createElement(pe.a,null,r.a.createElement(ge.a,{path:"/en",component:We}),r.a.createElement(ge.a,{path:"/mn",component:We}),r.a.createElement(ge.a,{path:"/en/archives",component:We}),r.a.createElement(ge.a,{path:"/mn/archives",component:We}),r.a.createElement(ge.a,{path:"/mn/\u0410\u0440\u0445\u0438\u0432\u0443\u0443\u0434",component:We}),r.a.createElement(he.a,{push:!0,from:"*",to:"/en",component:We})))},Ve=(a(129),a(133),a(110)),Be=a(112),Qe=a.n(Be),Ke=a(113),ze=a.n(Ke);Ve.a.use(Qe.a).use(ze.a).use(Ne.a).init({fallbackLng:"en",debug:!0,load:"languageOnly",returnObjects:!0,interpolation:{escapeValue:!1},react:{wait:!0}});Ve.a;var Je=Object(i.createLogger)(),Ye=Object(m.a)(),$e=Object(l.e)(me(Ye),Object(l.d)(Object(l.a)(Object(d.a)(Ye),u.a,Je)));$e.dispatch(function(e){return e({type:U}),E()("".concat(_).concat(D,"pages?_embed")).then(function(e){return e.json()},function(e){return console.log("An error ",e)}).then(function(e){return e.reduce(function(e,t){var a=Object.keys(T).find(function(e){return T[e]===t.acf.language});return e[a]=e[a]||[],e[a].push(t),e},[])}).then(function(t){e(function(e){return{type:R,pages:e,receivedAt:Date.now()}}(t))})}),$e.dispatch(function(e){return e({type:x}),E()("".concat(_).concat(D,"posts?_embed")).then(function(e){return e.json()},function(e){return console.log("An error ",e)}).then(function(e){return e.reduce(function(e,t){var a=Object.keys(T).find(function(e){return T[e]===t.acf.language});return e[a]=e[a]||[],e[a].push(t),e},[])}).then(function(t){return e(function(e){return{type:G,posts:e,receivedAt:Date.now()}}(t))})}),$e.dispatch(function(){var e=Object(f.a)(h.a.mark(function e(t){var a;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:q}),e.prev=1,e.next=4,A(P);case 4:return a=e.sent,e.abrupt("return",t({type:W,data:a,receivedAt:Date.now()}));case 8:e.prev=8,e.t0=e.catch(1),console.error("there been error ",e.t0);case 11:case"end":return e.stop()}},e,this,[[1,8]])}));return function(t){return e.apply(this,arguments)}}()),function(){j.apply(this,arguments)}();s.a.render(r.a.createElement(function(){return document.body.classList.add("landing"),r.a.createElement(o.a,{store:$e},r.a.createElement(p.a,{history:Ye},r.a.createElement(He,null)))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},72:function(e,t,a){e.exports=a(147)}},[[72,2,1]]]);
//# sourceMappingURL=main.5b18028e.chunk.js.map