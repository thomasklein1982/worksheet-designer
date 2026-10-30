window.api={};
let api=window.api;

Random=function(seed){
  this.setSeed(seed);
}

Random.prototype={
  setSeed: function(seed){
    this.seed=seed;
    this.fix=(seed!==undefined);
  },
  mixArray: function(a,forceRandom){
    var o=this.order(0,a.length-1,forceRandom);
    var b=[];
    for(var i=0;i<a.length;i++){
      b.push(a[o[i]]);
    }
    return b;
  },
  order: function(min,max,forceRandom){
    /*erstellt ein Array mit den Zahlen von min bis max in zufaelliger Reihenfolge:*/
    var a=[];
    for(var i=min;i<=max;i++){
      a.push(i);
    }
    var b=[];
    for(var i=min;i<=max;i++){
      var c=a.splice(this.int(0,a.length-1,forceRandom),1);
      b.push(c[0]);
    }
    return b;
  },
  drawFrom: function(k,array,forceRandom){
    var indices=this.draw(k,array.length,forceRandom);
    var b=[];
    for(var i=0;i<indices.length;i++){
      b.push(array[indices[i]-1]);
    }
    return b;
  },
  draw: function(k,n,forceRandom){
    /*gibt ein Array mit k verschiedenen Zahlen aus 1 bis n zurueck*/
    var a=[];
    for(var i=1;i<=n;i++){
      a.push(i);
    }
    var b=[];
    for(var i=1;i<=k;i++){
      var c=a.splice(this.int(0,a.length-1,forceRandom),1);
      b.push(c[0]);
    }
    return b;
  },
  real: function(forceRandom){
    if(this.fix && !forceRandom){
      this.seed++;
      var z=Math.sin(this.seed)*100;
      return z-Math.floor(z);
    }else{
      return Math.random();
    }
  },
  int: function(min,max,forceRandom){
    if(this.fix && !forceRandom){
      var x=this.real();
    }else{
      var x=Math.random();
    }
    return Math.floor(x*(max-min+1))+min;
  }
};
api.Random=new Random();
api.setSeed=function(seed){
  api.Random.setSeed(seed);
};
api.getSeed=function(){
  return api.Random.seed;
};
api.random=function(min,max,exclude){
  if(min>max){
    return this.random(max,min,exclude);
  }
  if(exclude){
    return api.randomWithout(min,max,exclude);
  }else{
    return api.Random.int(min,max);
  }
};
api.randomWithout=function(min,max,exclude){
  var numbers=[];
  var j=0;
  if(exclude!==undefined && !exclude.pop){
    exclude=[exclude];
  }
  for(var i=min;i<=max;i++){
    if(!exclude || exclude.indexOf(i)<0){
      numbers.push(i);
    }
  }
  if(numbers.length>0){
    var i=api.random(0,numbers.length-1);
    return numbers[i];
  }else{
    throw "randomWithout-Fehler "+min+","+max+","+exclude;
  }
};
api.createRandomOrder=function(n){
  return api.Random.order(0,n-1);
};
api.randomize=function(array){
  var order=api.Random.order(0,array.length-1);
  var a=[];
  for(var i=0;i<order.length;i++){
    var j=order[i];
    a.push(array[j]);
  }
  return a;
};