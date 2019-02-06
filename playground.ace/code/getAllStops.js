module.exports.function = function getAllStops (id) {
  var url = 'http://acerailpublic.etaspot.net/service.php?service=get_stops&includeETAData=1&orderedETAArray=1&token=TESTING'
  var response = http.getUrl (url, {format:'json'})
  
  return response.get_stops
}
