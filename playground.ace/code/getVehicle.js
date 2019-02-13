module.exports.function = function getVehicle (trainNumber) {
  var url = 'http://acerailpublic.etaspot.net/service.php?service=get_vehicles&includeETAData=1&orderedETAArray=1&token=TESTING'
  var response = http.getUrl (url, {format:'json'})

  var trains = response.get_vehicles

  var aceTrains = new Array ()
  var k = 0

  if(!trainNumber) {
    for(var j=0; j<trains.length; j++) {
      var aceTrain = getAceTrain (trains[j])

      if(aceTrain != null)
        aceTrains[k++] = aceTrain
    }
    return aceTrains
  }

  if(trains) {
    for (var z=0; z<trains.length; z++) {
      var train = getObject (trains[z],'scheduleNumber',trainNumber)
      if(train) {
        if(train.length > 1) {
          //we have a problem
          console.log ('More than 1 train returned: ' + train)
        } else {
          var aceTrain = getAceTrain (train)

          if(aceTrain != null)
            aceTrains[k++] = aceTrain
          
          console.log (aceTrains)
          return aceTrains
        }
      }
    }
  }  
  return null

}

function getAceTrain (train) {
  if(train.scheduleNumber == "NIS")
    return null

  var aceTrain = {}

  aceTrain["trainNumber"] = train.scheduleNumber

  switch(train.inService) {
    case '1': aceTrain["inService"] = true
    default: aceTrain["inService"] = false
  }

  aceTrain["location"] = {latitude:train.lat, longitude:train.lng}

  if (train.onSchedule < 0) {
    aceTrain["onTime"] = false
    aceTrain["lateBy"] = abs(train.onSchedule)
  } else {
    aceTrain["onTime"] = true
    aceTrain["lateBy"] = 0
  }

  aceTrain["inService"] = false 

  var nextStops = new Array ()
  var i = 0
  for (var nextStop in train.minutesToNextStops) {
    nextStops[i++] = getAceStop(nextStop)
  }

  aceTrain["nextStops"] = nextStops

  return aceTrain
}

function getAceStop (stop) {
//   var aceStop = {}
// 
//   aceStop["timeToNextStop"] = stop.minutes
//   aceStop["aceStopName"] = getStopName(stop.id)
//   aceStop["scheduledTime"] = parseAceTime(stop.schedule)
//   aceStop["actualTime"] = parceAceTime(stop.time)
// 
//   return aceStop
  
  return { timeToNextStop:stop.minutes, 
           aceStopName:getStopName(stop.id),
           scheduledTime:parseAceTime(stop.schedule),
           actualTime:parseAceTime(stop.time) 
         }
}

function getStopName (id) {
  switch(id) {
    case '150': return 'Stockton'
    case '151': return 'Lathrop'
    case '152': return 'Tracy'
    case '153': return 'Vasco'
    case '154': return 'Livermore'
    case '155': return 'Pleasanton'
    case '156': return 'Fremont'
    case '157': return 'Great America'
    case '158': return 'Santa Clara'
    case '159': return 'San Jose'
    default: return ''
  }
}

function parseAceTime (aceTime) {
  var zonedDateTime = dates.ZonedDateTime.parseTime (aceTime, "hh:mma", "America/Los_Angeles" )
  console.log('zoneddatetime: ' + zonedDateTime)
  return {hour:zonedDateTime.getHour(), minute:zonedDateTime.getMinute(), second:0 ,timezone:timezone}
}

function getObject(obj, key, val) {

  //console.log (printObject(obj)+ '::' + key + '::' + val)
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;

    //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
    if (i == key && obj[i] == val) { //
      objects.push(obj);
      return objects
    } else if (obj[i] == val && key == ''){
      //only add if the object is not already in the array
      if (objects.lastIndexOf(obj) == -1){
        objects.push(obj);
      }
    }
  }
  return null;
}

//return an array of objects according to key, value, or key and value matching
function getObjects(obj, key, val) {

  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;

    if (typeof obj[i] == 'object') {
      objects = objects.concat(getObjects(obj[i], key, val));    
    } else 
      //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      if (i == key && obj[i] == val || i == key && val == '') { //
        objects.push(obj);
      } else if (obj[i] == val && key == ''){
        //only add if the object is not already in the array
        if (objects.lastIndexOf(obj) == -1){
          objects.push(obj);
        }
      }
  }
  return objects;
}

//return an array of values that match on a certain key
function getValues(obj, key) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(getValues(obj[i], key));
    } else if (i == key) {
      objects.push(obj[i]);
    }
  }
  return objects;
}

//return an array of keys that match on a certain value
function getKeys(obj, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(getKeys(obj[i], val));
    } else if (obj[i] == val) {
      objects.push(i);
    }
  }
  return objects;
}


function printObject(obj) {

  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;

    if (typeof obj[i] == 'object') {
      objects = objects.concat(printObject(obj[i]));    
    } else {
      console.log('key: ' + i + '::val:' + obj[i])
    }

  }
}