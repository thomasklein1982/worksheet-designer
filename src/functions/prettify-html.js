let blockTags=["div","p","titel","ol","abc","ul","fusszeile","kopfzeile","hessenkasten","grafik","aufgabe","loop","if","else","elseif","seite","setup","zentriert"];

export function prettifyHtml(code,tree){
  return code;
  console.log(code,tree);
  let scope={
    indent: "",
    indentPlus: "  "
  }
  let node=tree.topNode.firstChild;
  return prettify(node,code,scope);
  return code;
}

function prettify(node,code, scope){
  if(node.name==="Element"){

  }
}