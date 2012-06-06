window.Gispro = {};
window.Gispro.Utils = {

  // translation of fields and layer codes (fedd)
  translatedSymbols: {
      field: {},
      layer: {}
  },

  TRANSLATE_URL: 'translate',

  METADATA_URL: 'metadata',

  translateSymbols: function(symbolType, symbolCodes){
      var cached = this.translatedSymbols[symbolType];
      if(cached){
          var toAsk = [];
          for(var i=0,len=symbolCodes.length;i<len;i++){
              if(!cached[symbolCodes[i]]){
                  toAsk.push(symbolCodes[i]);
              }
          }
          if(toAsk.length>0){
              //call the servlet
              var url = this.TRANSLATE_URL;
              var request = OpenLayers.Request.issue({
                  method: "GET",
                  url: url,
                  async: false,
                  params:{
                      type: symbolType,
                      code: toAsk
                  }
              });

              if(request.status==200){
                  var answered = Ext.util.JSON.decode(request.responseText);
                  //caching all incoming
                  for(var prop in answered){
                      cached[prop] = answered[prop];
                  }
                  //caching not founded
                  for(var i=0,len=symbolCodes.length;i<len;i++){
                      if(!cached[symbolCodes[i]] && !answered[symbolCodes[i]]){
                          cached[symbolCodes[i]] = symbolCodes[i];
                      }
                  }
              }
          }
      }
      //var ret = {};
      //for(i=0;i<symbolCodes.length;i++){
      //    if(cached && cached[symbolCodes[i]])
      //        ret[symbolCodes[i]] = cached[symbolCodes[i]];
      //    else
      //        ret[symbolCodes[i]] = symbolCodes[i];
      //}

      //return ret;
      return cached;
  },

  // metadata of fields and of layer codes (fedd)
  metaData: {
      field: {},
      layer: {}
  },

  getMetaData: function(symbolType, symbolCodes){
//	console.log ('getMetaData : symbolType = ' + symbolType + ', symbolCodes = ' + symbolCodes);
      var cached = this.metaData[symbolType];
      if(cached){
          var toAsk = [];
          for(var i=0,len=symbolCodes.length;i<len;i++){
              if(!cached[symbolCodes[i]]){
                  toAsk.push(symbolCodes[i]);
              }
          }
          if(toAsk.length>0){
              //call the servlet
              var url = this.METADATA_URL;
              var request = OpenLayers.Request.issue({
                  method: "GET",
                  url: url,
                  async: false,
                  params:{
                      type: symbolType,
                      code: toAsk
                  }
              });

              if(request.status==200){
                  var answered = Ext.util.JSON.decode(request.responseText);
                  //caching all incoming
                  for(var prop in answered){
                      cached[prop] = answered[prop];
                  }
                  //caching not founded
                  for(var i=0,len=symbolCodes.length;i<len;i++){
                      if(!cached[symbolCodes[i]] && !answered[symbolCodes[i]]){
                          cached[symbolCodes[i]] = symbolCodes[i];
                      }
                  }
              }
          }
      }

      //var ret = {};
      //for(i=0;i<symbolCodes.length;i++){
          //if(cached && cached[symbolCodes[i]])
              //ret[symbolCodes[i]] = cached[symbolCodes[i]];
          //else
              //ret[symbolCodes[i]] = symbolCodes[i];
      //}

      //return ret;

      return cached;
  },
  
  moveLayerOnTop: function(map,layer){
    var currentIndex = map.getLayerIndex(layer) 
    var indexes = []
    for(var i = 0; i<map.layers.length; i++){
      indexes.push( map.getLayerIndex(map.layers[i]) )
    }
    indexes.sort(function(a,b){return b-a})
    if(currentIndex < indexes[0])
    map.raiseLayer(layer,indexes[0] - currentIndex + 1)
  }
};
