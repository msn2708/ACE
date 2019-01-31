module.exports.function = function isMyTrainLate (trainNumber) {
  var url = 'http://acerailpublic.etaspot.net/service.php?service=get_vehicles&includeETAData=1&orderedETAArray=1&token=TESTING'
  var options = {}
  var response = http.getUrl (url, {format:'json'})

  var train = getValues(response.get_vehicles,'scheduleNumber',trainNumber)

  if(train) {
    if(train.length > 1) {
      //we have a problem
    } else {
      if( train[0].onSchedule == "On Time") {
        return true
      } else { 
        return false
      }
    }
  }
}