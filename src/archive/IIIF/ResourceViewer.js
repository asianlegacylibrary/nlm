
import _ from "lodash";

//import Fullscreen from '@material-ui/icons/Fullscreen';
import Script from 'react-load-script'
import React, { Component } from 'react';
import IIIFViewerContainer from './IIIFViewerContainer';
//import { Redirect404 } from "../routes.js"
import Loader from "react-loader"
//import {getEntiType} from '../lib/api';
//import {getLangLabel,langProfile} from './App';

const adm  = "http://purl.bdrc.io/ontology/admin/" ;
const bdac = "http://purl.bdrc.io/anncollection/" ;
const bdan = "http://purl.bdrc.io/annotation/" ;
const bdo  = "http://purl.bdrc.io/ontology/core/";
const bdr  = "http://purl.bdrc.io/resource/";
const foaf = "http://xmlns.com/foaf/0.1/" ;
const owl  = "http://www.w3.org/2002/07/owl#";
const oa = "http://www.w3.org/ns/oa#" ;
const rdf  = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
const rdfs = "http://www.w3.org/2000/01/rdf-schema#";
const skos = "http://www.w3.org/2004/02/skos/core#";
const tmp  = "http://purl.bdrc.io/ontology/tmp/" ;
const _tmp  = "http://purl.bdrc.io/ontology/tmp/" ;

const prefixes = { adm, bdac, bdan, bdo, bdr, foaf, oa, owl, rdf, rdfs, skos, tmp }

let propOrder = {
   "Corporation":[],
   "Etext":[],
   "Item":[
      "bdo:itemForWork",
      "bdo:itemVolumes"
   ],
   "Lineage":[
      "skos:altLabel",
      "bdo:lineageObject",
      "bdo:lineageType",
      "bdo:workLocation",
   ],
   "Person" : [
      "bdo:personName",
      "bdo:personGender",
      "bdo:kinWith",
      "bdo:personEvent",
      // "bdo:incarnationActivities",
      "bdo:isIncarnation",
      "bdo:hasIncarnation",
      // "bdo:incarnationGeneral",
      "bdo:personTeacherOf",
      "bdo:personStudentOf",
      "bdo:note",
      "rdfs:seeAlso",
    ],
   "Place":[
      "skos:altLabel",
      "bdo:placeLat",
      "bdo:placeLong",
      "bdo:placeRegionPoly",
      "bdo:placeType",
      "bdo:placeLocatedIn",
      "bdo:placeIsNear",
      "bdo:placeEvent",
      "bdo:placeContains",
   ],
   "Role":[],
   "Topic":[],
   "Work":[
      "bdo:workTitle",
      "bdo:workExpressionOf",
      "bdo:workType",
      "bdo:workHasExpression",
      "bdo:workIsAbout",
      "bdo:workGenre",
      // "bdo:creatorMainAuthor",
      // "bdo:creatorContributingAuthor",
      "bdo:workCreator",
      "bdo:workLangScript",
      "bdo:workObjectType",
      "bdo:workMaterial",
      "tmp:dimensions",
      "bdo:workDimWidth",
      "bdo:workDimHeight",
      "bdo:workEvent",
      "bdo:workHasItem",
      // "bdo:workHasItemImageAsset",
      "bdo:workLocation",
      "bdo:workPartOf",
      "bdo:workHasPart",
      "bdo:note",
      "bdo:workHasSourcePrintery",
   ],
   "Taxonomy":[],
   "Volume":[],
}

let reload = false ;

class ResourceViewer extends Component<Props,State>{
   _annoPane = [] ;
   _leafletMap = null

   constructor(props:Props)
   {
      super(props);

      this.state = { uviewer:false, imageLoaded:false, collapse:{}, pdfOpen:false, showAnno:true}

      console.log("props",props)

      let tmp = {}
      for(let k of Object.keys(propOrder)){ tmp[k] = propOrder[k].map((e) => this.expand(e)) }
      //console.log("tmp",tmp)
      propOrder = tmp
   }


   componentWillMount()
   {
      console.log("mount")

      if(!this.state.ready && this.props.IRI && this.props.resources && this.props.resources[this.props.IRI] )
      {
         this.setState({...this.state,ready:true})
      }
      else if (this.state.ready && !(this.props.IRI && this.props.resources && this.props.resources[this.props.IRI]))
      {
         this.setState({...this.state,ready:false})

      }

      window.onpopstate = function(event) {
         if(reload) { window.location.reload(); }
      };

   }

   componentWillUpdate(newProps,newState)
   {
      console.log("stateU",this.state,newState,newProps)


      if(newState.annoPane && !newProps.annoCollec)
      {
         this.props.onGetAnnotations(this.props.IRI)
      }


      if(!this.state.ready && newProps.IRI && newProps.resources && newProps.resources[newProps.IRI] )
      {
         this.setState({...this.state,ready:true})
      }
      else if (this.state.ready && !(newProps.IRI && newProps.resources && newProps.resources[newProps.IRI]))
      {
         this.setState({...this.state,ready:false})

      }
   }

   expand(str:string) //,stripuri:boolean=true)
   {
      for(let k of Object.keys(prefixes)) { str = str.replace(new RegExp(k+":"),prefixes[k]); }

      return str ;
   }

   pretty(str:string) //,stripuri:boolean=true)
   {

      for(let p of Object.values(prefixes)) { str = str.replace(new RegExp(p,"g"),"") }

      //if(stripuri) {

      if(!str.match(/ /) && !str.match(/^http[s]?:/)) str = str.replace(/([a-z])([A-Z])/g,"$1 $2")

      if(str.match(/^https?:\/\/[^ ]+$/)) { str = <a href={str} target="_blank">{str}</a> }
      else {
         str = str.split("\n").map((i) => ([i,<br/>]))
         str = [].concat.apply([],str);
         str.pop();
      }

      //}

      return str ;
   }

   properties(sorted : boolean = false)
   {
      if(!this.props.IRI || !this.props.resources || !this.props.resources[this.props.IRI]
         || !this.props.resources[this.props.IRI][this.expand(this.props.IRI)]) return {}

      let prop = this.props.resources[this.props.IRI][this.expand(this.props.IRI)] ;
      let w = prop[bdo+"workDimWidth"]
      let h = prop[bdo+"workDimHeight"]

      //console.log("propZ",prop)

      if(w && h && w[0] && h[0] && !w[0].value.match(/cm/) && !h[0].value.match(/cm/)) {
         prop[tmp+"dimensions"] = [ {type: "literal", value: w[0].value+"×"+h[0].value+"cm" } ]
         delete prop[bdo+"workDimWidth"]
         delete prop[bdo+"workDimHeight"]
      }
      else if(w && w[0] && !w[0].value.match(/cm/)) {
         prop[bdo+"workDimWidth"] = [ { ...w[0], value:w[0].value+"cm" } ]
      }
      else if(h && h[0] && !h[0].value.match(/cm/)) {
         prop[bdo+"workDimHeight"] = [ { ...h[0], value:h[0].value+"cm" } ]
      }

      //console.log("w h",w,h,prop)

      //prop["bdr:workDimensions"] =
      if(sorted)
      {


         let parts = prop[bdo+"workHasPart"]
         if(parts) {

            let assoR = this.props.assocResources
            if (assoR) {
               //console.log("AV parts",parts[0],parts)

               parts = parts.map((e) => {

                  let index = assoR[e.value]

                  //console.log("index",index,e)

                  if(index) index = index.filter(e => e.type == bdo+"workPartIndex")
                  if(index && index[0] && index[0].value) index = Number(index[0].value)
                  else index = null

                  //console.log("?",index)

                  return ({ ...e, index })
               })


               /* // weird bug, sort all but leave 79 at @0 and 2 at @78 ...
               parts = parts.sort((a,b) => {
                  if( a.index && b.index) return a.index - b.index
                  return 0 ;
               })
               */

               prop[bdo+"workHasPart"] = _.orderBy(parts,['index'],['asc'])

               //console.log("AP parts",prop[bdo+"workHasPart"][0])
            }
         }


         let expr = prop[bdo+"workHasExpression"]
         if(expr) {

            let assoR = this.props.assocResources
            if (assoR) {

               expr = expr.map((e) => {

                  let label1,label2 ;

                  //console.log("index",e,assoR[e.value])
                  if(assoR[e.value])
                  {
                     /*
                     label1 = assoR[e.value].filter(e => e.type === skos+"prefLabel" && (e.lang === this.props.prefLang || e["xml:lang"] === this.props.prefLang))
                     if(label1.length === 0) label1 = assoR[e.value].filter(e => e.type === skos+"prefLabel")
                     */
                     label1 = "langlabel1" //getLangLabel(this, assoR[e.value].filter(e => e.type === skos+"prefLabel"))
                     if(label1 && label1.value) label1 = label1.value

                     if(assoR[e.value].filter(e => e.type === bdo+"workHasRoot").length > 0)
                     {
                        /*
                        label2 = assoR[assoR[e.value].filter(e => e.type === bdo+"workHasRoot")[0].value].filter(e => e.type === skos+"prefLabel" && (e.lang === this.props.prefLang || e["xml:lang"] === this.props.prefLang))
                        if(label2.length === 0) label2 = assoR[assoR[e.value].filter(e => e.type === bdo+"workHasRoot")[0].value].filter(e => e.type === skos+"prefLabel")
                        */
                        label2 = "langlabel2" //getLangLabel(assoR[assoR[e.value].filter(e => e.type === bdo+"workHasRoot")[0].value].filter(e => e.type === skos+"prefLabel"))
                        if(label2 && label2.value > 0) label2 = label2.value
                        //console.log(label2)
                     }
                  }

                  return ({ ...e, label1, label2 })
               })

               prop[bdo+"workHasExpression"] = _.sortBy(expr,['label1','label2'])

               for(let o of prop[bdo+"workHasExpression"]) console.log(o.value,o.label1)

            }
         }


         let t = getEntiType(this.props.IRI);
         if(t && propOrder[t])
         {
            let that = this ;

            //console.log("sort",prop)

            let sortProp = Object.keys(prop).map(e => {
               let index = propOrder[t].indexOf(e)
               if(index === -1) index = 99999 ;
               return ({value:e,index})
            })
            sortProp = _.orderBy(sortProp,['index','value'],['asc','asc'])

            console.log("sortProp",sortProp)

            /*Object.keys(prop).sort((a,b)=> {
               let ia = propOrder[t].indexOf(a)
               let ib = propOrder[t].indexOf(b)
               //console.log(t,a,ia,b,ib)
               if ((ia != -1 && ib != -1 && ia < ib) || (ia != -1 && ib == -1)) return -1
               else if(ia == -1 && ib == -1) return (a < b ? -1 : (a == b ? 0 : -1))
               else return 1 ;
            })*/

            sortProp = sortProp.reduce((acc,e) => {

               //console.log("sorting",e,prop[e])
               if(e.value === bdo+"workHasPart" || e.value === bdo+"workHasExpression" ) {
                  //console.log("skip sort parts",prop[e][0],prop[e])
                  return { ...acc, [e.value]:prop[e.value] }
               }

               return ({ ...acc, [e.value]:prop[e.value].sort(function(A,B){

                  let a = A
                  let b = B
                  if(a.type == "bnode" && a.value) a = that.getResourceBNode(a.value)
                  if(b.type == "bnode" && b.value) b = that.getResourceBNode(b.value)

                  //console.log(a,b)

                  if(!a["value"] && a[rdfs+"label"] && a[rdfs+"label"][0]) a = a[rdfs+"label"][0]
                  if(a["lang"]) a = a["lang"]
                  else if(a["xml:lang"] && a["xml:lang"] != "") a = a["xml:lang"]
                  //else if(a["type"] == "uri") a = a["value"]
                  else a = null

                  if(!b["value"] && b[rdfs+"label"] && b[rdfs+"label"][0]) b = b[rdfs+"label"][0]
                  if(b["lang"]) b = b["lang"]
                  else if(b["xml:lang"] && b["xml:lang"] != "") b = b["xml:lang"]
                  //else if(b["type"] == "uri") b = b["value"]
                  else b = null

                  //console.log(a,b)

                  if( a && b ) {
                     if(a < b ) return -1 ;
                     else if(a > b) return 1 ;
                     else return 0 ;
                  }
                  else return 0 ;
               }) })},{})


           // console.log("propSort",prop,sortProp)

            return sortProp
         }
      }
      return prop ;
   }



   fullname(prop:string){
      for(let p of Object.keys(prefixes)) { prop = prop.replace(new RegExp(p+":","g"),prefixes[p]) }

      //console.log("full",prop)

      if(this.props.ontology[prop] && this.props.ontology[prop][rdfs+"label"]){
         let ret = "langlabelRET" //getLangLabel(this, this.props.ontology[prop][rdfs+"label"])
         if(ret && ret.value && ret.value != "")
            return ret.value
      }

      return this.pretty(prop)
   }

   hasValue(val:[],k:string)
   {
      for(let v of val) {
         if(v.value == k) {
            return true;
         }
       }

       return false;
   }


  

   getResourceElem(prop:string)
   {
      if(!this.props.IRI || !this.props.resources || !this.props.resources[this.props.IRI]
         || !this.props.resources[this.props.IRI][this.expand(this.props.IRI)]
         || !this.props.resources[this.props.IRI][this.expand(this.props.IRI)][prop]) return ;

      let elem = this.props.resources[this.props.IRI][this.expand(this.props.IRI)][prop]

      return elem
   }

   getResourceBNode(prop:string)
   {
      if(!this.props.IRI || !this.props.resources || !this.props.resources[this.props.IRI]
         || !this.props.resources[this.props.IRI][prop]) return ;

      let elem = this.props.resources[this.props.IRI][prop]

      return elem
   }

   setCollapse(node,extra:{})
   {
      this.setState(
         {...this.state,
            //collapse:{...this.state.collapse,[node.collapseId]:!this.state.collapse[node.collapseId]},
            ...extra
         }
      )

   }

   

   showUV()
   {
      let state = { ...this.state, openUV:true, hideUV:false }
      this.setState(state);


      reload = true ;
   }


   handlePdfClick = (event,pdf,askPdf,file = "pdf") => {
      // This prevents ghost click.

      // trick to prevent popup warning
      //let current = window.self
      //let win = window.open("","pdf");
      //window.focus(current)

      if(!askPdf)
      {
         event.preventDefault();
         console.log("pdf",pdf)
         this.props.onCreatePdf(pdf,{iri:this.props.IRI,file});
      }
   };


   handleRequestCloseAnno = () => {
      if(!this.state.annoCollecOpen == false) {
         this.setState({
            ...this.state,
            annoCollecOpen: false,
            anchorElAnno:null
         });
      }
   }

   handleAnnoCollec = (collec) => {
      if(!this.state.annoCollecOpen == false)
         this.setState({
            ...this.state,
            annoCollecOpen: false,
            anchorElAnno:null,
            showAnno:collec
         });
   }

   handleRequestClosePdf = () => {
      if(!this.state.pdfOpen == false)
         this.setState({
            ...this.state,
            pdfOpen: false,
            anchorElPdf:null,
            close:true
         });
   };

   proplink = (k,txt) => {
      if(k === bdo+'note') txt = "Notes" ;

      let ret = (<a class="propref" {...(true || k.match(/purl[.]bdrc/) ? {"href":k}:{})} target="_blank">{txt?txt:this.fullname(k)}</a>)
      return ret;
   }


   render()
    {
      console.log("render",this.props,this.state)
      this._annoPane = []
      if(!this.props.IRI || (this.props.failures && this.props.failures[this.props.IRI])) {
         let msg = "IRI undefined" ;
         if(this.props.IRI) msg = "Resource "+this.props.IRI+" does not exist."
         return <div>NO!</div>
      }

      let kZprop = Object.keys(this.properties(true))

      console.log("kZprop",kZprop)

      let iiifpres = "http://iiifpres.bdrc.io" ;
      if(this.props.config && this.props.config.iiifpres) iiifpres = this.props.config.iiifpres.endpoints[this.props.config.iiifpres.index]


      let kZasso ;
      if (this.props.assocResources) {
         kZasso = Object.keys(this.props.assocResources) ;

         let elem = this.getResourceElem(bdo+"workHasItem")
         if(!this.props.manifestError && elem) for(let e of elem)
         {
            let assoc = this.props.assocResources[e.value]

            //console.log("hImA",assoc,e.value)

            if(assoc && assoc.length > 0 && !this.props.imageAsset && !this.props.manifestError) {

               this.setState({...this.state, imageLoaded:false})

               if(assoc.length == 1) { this.props.onHasImageAsset(iiifpres+"/2.1.1/v:bdr:"+this.pretty(assoc[0].value)+"/manifest",this.props.IRI); }
               else { this.props.onHasImageAsset(iiifpres+"/2.1.1/collection/i:bdr:"+this.pretty(e.value),this.props.IRI);  }

            }
         }
      }

      if(kZprop.indexOf(bdo+"imageList") !== -1)
      {
         if(!this.props.imageAsset && !this.props.manifestError) {
            this.setState({...this.state, imageLoaded:false})
            this.props.onHasImageAsset(iiifpres+"/2.1.1/v:"+ this.props.IRI+ "/manifest",this.props.IRI);
         }
      }
      else if(kZprop.indexOf(bdo+"hasIIIFManifest") !== -1)
      {
         let elem = this.getResourceElem(bdo+"hasIIIFManifest")
         if(elem[0] && elem[0].value && !this.props.manifestError && !this.props.imageAsset) {
            this.setState({...this.state, imageLoaded:false})
            this.props.onHasImageAsset(elem[0].value,this.props.IRI);
         }
      }
      else if(kZprop.indexOf(bdo+"workLocation") !== -1)
      {
         if(!this.props.imageAsset && !this.props.manifestError) {
            this.setState({...this.state, imageLoaded:false})
            this.props.onHasImageAsset("http://presentation.bdrc.io/2.1.1/collection/wio:"+this.props.IRI,this.props.IRI)
         }
      }

      let titre = <br/>;

      
      let pdfLink,monoVol = -1 ;
      if(this.props.imageAsset &&  !this.props.manifestError && this.props.imageAsset.match(/[.]bdrc[.]io/))
      {
         let iiif = "http://iiif.bdrc.io" ;
         if(this.props.config && this.props.config.iiif) iiif = this.props.config.iiif.endpoints[this.props.config.iiif.index]

//         console.log("iiif",iiif,this.props.config)

         let id = this.props.IRI.replace(/^[^:]+:./,"")
         if(this.props.imageAsset.match(/[/]i:/)) {
            pdfLink = iiif+"/download/pdf/wi:bdr:W"+id+"::bdr:I"+id ;
         }
         else if(this.props.imageAsset.match(/[/]v:/)) {

            let elem = this.getResourceElem(bdo+"volumeNumber")
            if(elem && elem.length > 0 && elem[0].value)
               monoVol = Number(elem[0].value)

            elem = this.getResourceElem(bdo+"imageCount")
            if(!elem) elem = this.getResourceElem(bdo+"volumePagesTotal")
            if(elem && elem.length > 0 && elem[0].value)
               pdfLink = iiif+"/download/zip/v:bdr:V"+id+"::1-"+elem[0].value ;
            else {
               elem = this.getResourceElem(bdo+"workHasItemImageAsset")
               if(elem && elem.length > 0 && elem[0].value)
                  pdfLink = iiif+"/download/zip/wi:bdr:W"+id+"::bdr:"+ this.pretty(elem[0].value) ;
            }
         }
      }
      let theData = null
      
      console.log("pdf",pdfLink,this._annoPane.length)

      // add nother route to UViewer Gallery page
      return (
         <div style={{overflow:"hidden",textAlign:"center"}}>
            { !this.state.ready && <Loader loaded={false} /> }
            <div className={"resource "+getEntiType(this.props.IRI).toLowerCase()}>
               
              
              
               { titre }
               
               {
                  !this.props.manifestError && this.props.imageAsset && //!this.state.openUV &&
                  <div className={"uvDefault "+(this.state.imageLoaded?"loaded":"")} onClick={this.showUV.bind(this)}>
                     <Loader className="uvLoader" loaded={this.state.imageLoaded} color="#fff"/>
                     <img src={this.props.firstImage} onLoad={(e)=>this.setState({...this.state,imageLoaded:true})}/>
                     {
                        this.props.firstImage && this.state.imageLoaded &&
                        <div id="title">
                           <span>View image gallery</span>
                           <Fullscreen style={{transform: "scale(1.4)",position:"absolute",right:"3px",top:"3px"}}/>
                        </div>
                     }
                  </div>
               }
               {

                  !this.props.manifestError && this.props.imageAsset && this.state.openUV &&
                  [<div id="fondUV" className={(this.state.hideUV?"hide":"")}>
                     <Loader loaded={false} color="#fff"/>
                  </div>,
                  <div
                  className={"uv "+(this.state.toggleUV?"toggled ":"")+(this.state.hideUV?"hide":"")}
                  data-locale="en-GB:English (GB),cy-GB:Cymraeg"
                  //data-config="/config.json"
                  //data-uri="https://eap.bl.uk/archive-file/EAP676-12-4/manifest"
                  data-uri={this.props.imageAsset}
                  data-collectionindex="0"
                  data-manifestindex="0"
                  data-sequenceindex="0"
                  data-fullscreen="true"
                  data-canvasindex="0"
                  data-zoom="-1.0064,0,3.0128,1.3791"
                  data-rotation="0"
                  style={{width:"0",height:"0",backgroundColor: "#000"}}
               />,
                  <Script url={"http://universalviewer.io/uv/lib/embed.js"} />]

               }
               { (!this.state.openUV || this.state.hideUV || !this.state.toggleUV) && theData }
            </div>
            {/* <iframe style={{width:"calc(100% - 100px)",margin:"50px",height:"calc(100vh - 160px)",border:"none"}} src={"http://purl.bdrc.io/resource/"+get.IRI}/> */}
         </div>

      ) ;


   }
}

export default ResourceViewer ;
