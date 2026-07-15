import { setInScope, getPropsPT } from "./createHtmlCode";
import karopapier from "./karopapier";

export default{
  props: {
    "min-x": {
      type: Number,
      default: 0
    },
    "max-x": {
      type: Number,
      default: 10
    },
    "min-y": {
      type: Number,
      default: 0
    },
    "max-y": {
      type: Number,
      default: 10
    },
    "style": {
      type: String,
      default: ""
    },
    "zoom-x": {
      type: Number,
      default: 1
    },
    "zoom-y": {
      type: Number,
      default: 1
    }
  },
  create(minX,maxX,minY,maxY,style,zoomX,zoomY,pt,scope){
    let sizeX=maxX-minX;
    let sizeY=maxY-minY;
    let width=sizeX*zoomX;
    let height=sizeY*zoomY;
    let viewBox="0 0 "+width+" "+height;
    let transformation="matrix("+(1)+",0,0,"+(-1)+","+(-minX)+","+(maxY)+")";
    let code=`<div style="display: inline-block; position:relative; width: ${width}cm; height: ${height}cm;${style}" ${pt}>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" style="width: 100%; height: 100%; overflow: hidden;" viewBox="${viewBox}">
  <defs>
    <filter x="0" y="0" width="1" height="1" id="white0.5">
      <feFlood flood-color="white" flood-opacity="0.5" result="bg" />
      <feMerge>
        <feMergeNode in="bg"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <g transform="${transformation}" style="stroke: black; fill: none; stroke-width: 0.06">
    `;
    setInScope(scope,"grafik",{
      minX,maxX,minY,maxY,zoomX,zoomY,width,height
    });
    return {
      open: code,
      close: "</g></svg></div>"
    };
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props);
    return this.create(props["min-x"],props["max-x"],props["min-y"],props["max-y"],props["style"], props["zoom-x"], props["zoom-y"], pt,scope);
  }
}