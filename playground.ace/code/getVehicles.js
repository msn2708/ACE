module.exports.function = function getVehicles (trainNumber) {
  var url = 'http://acerailpublic.etaspot.net/service.php?service=get_vehicles&includeETAData=1&orderedETAArray=1&token=TESTING'
  var options = {}
  var response = http.getUrl (url, {format:'json'})

  return response.get_vehicles
}
