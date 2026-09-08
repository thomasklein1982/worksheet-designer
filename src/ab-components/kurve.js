
import { getFromScope, setInScope, getPropsPT, createHtmlCode, getTagContentAsString } from "../functions/createHtmlCode"
import { app } from "../main";
import punkt from "./punkt";

export default {
  props: {
    x: String,
    kruemmung: {
      type: Number,
      default: 1
    },
    farbe: {
      type: String,
      default: "black"
    },
    punkte: String
  },
  create(x,kruemmung,farbe,punkte,content,pt,scope){
    let open,close;
    let g=getFromScope(scope,"grafik");
    content=content.toLowerCase().trim().split("\n");
    let points=[];
    let regexp=/^(p|ep|wp)\s+([^,]+),\s*(\S+)\s*$/;
    for(let i=0;i<content.length;i++){
      let line=content[i].trim();
      if(line.length===0) continue;
      let res=regexp.exec(line);
      if(!res) continue;
      points.push({
        type: res[1],
        x: res[2]*1,
        y: res[3]*1,
        s: 0,
        cp: { x: 0, y: 0}
      });
    }
    if(points.length===0) return {open: "",close: ""};
    //determine slope and control point before:
    let last=null;
    let pointCode="";
    points=points.sort((a,b)=>{
      return a.x-b.x;
    });
    
    for(let i=0;i<points.length;i++){
      let p=points[i];
      let dx1, dx2;
      if(last){
        dx1=p.x-last.x;
      }
      if(p.type==="p"){
        let next=i<points.length-1? points[i+1]: null;
        let s1=0; let s2=0;
        let s=0;
        if(last){
          s1=(p.y-last.y)/(p.x-last.x);
          dx1=p.x-last.x;
        }
        if(next){
          s2=(next.y-p.y)/(next.x-p.x);
          dx2=next.x-p.x;
        }
        let sum=0;
        if(last){
          sum+=dx1;
        }
        if(next){
          sum+=dx2;
        }
        if(sum>0){
          if(last) s+=s1*dx1/sum;
          if(next) s+=s2*dx2/sum;
          if(!last) s*=3;
        }
        p.s=s;
      }else if(p.type==="ep"){
        p.s=0;
      }
      let dx=kruemmung/(1+Math.abs(p.s));
      if(last && dx>dx1/2) dx=dx1/2;
      let a=p.x-dx;
      let b=p.y-p.s*dx;
      p.cp.x=a;
      p.cp.y=b;
      last=p;
      if(punkte){
        let pcode=punkt.create(p.x,p.y,"x","",punkte,undefined,"",scope);
        pointCode+=pcode.open+pcode.close;
      }
      // pcode=punkt.create(p.cp.x,p.cp.y,".","","blue",undefined,"",scope);
      // pointCode+=pcode.open+pcode.close;
    }
    //steigung fuer wendepunkte:
    last=points[0];
    let ds=0;
    for(let i=1;i<points.length;i++){
      let p=points[i];
      let dx1;
      if(last){
        dx1=p.x-last.x;
      }
      let next;
      if(i<points.length-1){
        next=points[i+1];
      }
      if(p.type==="wp"){
        if(ds<0){
          //ReLi:
          p.s=last.s;
          if(next && next.s<p.s) p.s=next.s;
          p.s-=kruemmung;
        }else{
          //LiRe:
          p.s=last.s;
          if(next && next.s>p.s) p.s=next.s;
          p.s+=kruemmung;
        }
      }
      ds=p.s-last.s;
      let dx=kruemmung/(1+Math.abs(p.s));
      if(last && dx>dx1/2) dx=dx1/2;
      let a=p.x-dx;
      let b=p.y-p.s*dx;
      p.cp.x=a;
      p.cp.y=b;
      last=p;
    }
    console.log(points);
    let p=points[0];
    let path=`M ${p.x*g.zoomX} ${p.y*g.zoomY}`;
    
    last=p;
    for(let i=1;i<points.length;i++){
      let p=points[i];
      path+=`S ${p.cp.x*g.zoomX} ${p.cp.y*g.zoomY}, ${p.x*g.zoomX} ${p.y*g.zoomY}`;
    }
    open=`${pointCode} <path stroke="${farbe}" d="${path}" ${pt}>`;
    close="</path>";
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    let content=getTagContentAsString(node,code);
    return this.create(props.x,props.kruemmung,props.farbe,props.punkte,content,pt,scope);
  }
}