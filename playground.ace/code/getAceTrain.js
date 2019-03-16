var ACETRAINSLIST = require("./lib/aceTrains");
var config = require("config");
var console = require("console");
var dates = require("dates")

var http = require ('http');

module.exports.function = function getVehicle (scheduleNumber,$vivContext) {
  
  if(scheduleNumber) {
    var trainNumber =   scheduleNumber.replace(/\D+/gi, "")
    if(trainNumber.indexOf('1') != 0 && trainNumber.indexOf('0') != 0) {
      trainNumber = '0' + trainNumber
    }
  }
  
  if(config.get("offline") != "true") {
    var url = 'http://acerailpublic.etaspot.net/service.php?service=get_vehicles&includeETAData=1&orderedETAArray=1&token=TESTING'
    var response = http.getUrl (url, {format:'json', cacheTime:0})
    var trains = response.get_vehicles
    } else {
      var trains = ACETRAINSLIST
      }

  var aceTrains = new Array ()
  var n = 0

  if(trains) {
    for (var z=0; z<trains.length; z++) {
      if(trainNumber) {
        var train = getObject (trains[z],'scheduleNumber',trainNumber)
      } else {
        var train = trains[z]
      }
      if(train != null) {
        if(train.length > 1) {
          //we have a problem
        } else {
          var aceTrain = {}

          aceTrain["trainNumber"] = trains[z].scheduleNumber

          if(trains[z].inService == 1) {
            aceTrain.inService = true
          } else {
            aceTrain.inService = false
          }

          aceTrain.location = {latitude:trains[z].lat, longitude:trains[z].lng}

          if (trains[z].onSchedule < 0) {
            aceTrain.onTime = false
            aceTrain.lateBy = trains[z].onSchedule * -1
          } else {
            aceTrain.onTime = true
            aceTrain.lateBy = 0
          }

          var nextStops = new Array ()
          var i = 0
          for (var k=0; k < trains[z].minutesToNextStops.length; k++) {
            
            var nextStop = {}
            nextStop.timeToNextStop = trains[z].minutesToNextStops[k].minutes
            nextStop.scheduledTime = parseAceTime(trains[z].minutesToNextStops[k].schedule)
            nextStop.actualTime = parseAceTime(trains[z].minutesToNextStops[k].time)
            nextStop.aceStopName = getStopName(trains[z].minutesToNextStops[k].stopID)
            nextStop.aceStopImageName = getStopName(trains[z].minutesToNextStops[k].stopID).replace(' ', '_')

            nextStops[i++] = nextStop
          }
          aceTrain["nextStops"] = nextStops

          if(trainNumber) {
            return aceTrain
          } else {
            aceTrains[n++] = aceTrain
          }
        }
      }
    }
    return aceTrains
  }  
  return []
}

function getAceTrain (train) {

  var aceTrain = {}

  for (var property in train) {
    console.log("getAceTrain::property:" + property)
    if(property == 'scheduleNumber') {
      if(train[property] == 'NIS') {
        return null
      }
    }
    if (typeof train[property] == 'object') {
      if(property == 'minutesToNextStops') {
        var nextStops = new Array ()
        var i = 0
        for (var nextStop in train[property]) {
          nextStops[i++] = getAceStop(nextStop)
        }
        aceTrain["nextStops"] = nextStops
      }

    } else {
      switch (property) {
        case 'scheduleNumber': aceTrain["trainNumber"] = train[property]
          break;
        case 'lat': aceTrain["location"] = {latitude:train[property], longitude:train["lng"]}
          break;
        case ('inService'):
          switch(train[property]) {
            case '1': aceTrain["inService"] = true;
              break;
            default: aceTrain["inService"] = false;
              break;
          }
          break;
        case ('onSchedule'): 
          if (train[property] < 0) {
            aceTrain["onTime"] = false
            aceTrain["lateBy"] = train[property] * -1
          } else {
            aceTrain["onTime"] = true
            aceTrain["lateBy"] = 0
          }
          break;
      }
    }
  }
  
  return aceTrain
}

function getAceStop (stop) {
  return {  
           timeToNextStop:stop["minutes"],
           aceStopName:getStopName(stop.stopID),
           scheduledTime:parseAceTime(stop["schedule"]),
           actualTime:parseAceTime(stop["time"]),
         }
}

function getStopName (id) {

  switch(id) {
    case '150': 
      return 'Stockton';
      break;
    case '151': 
      return 'Lathrop';
      break;
    case '152': 
      return 'Tracy';
      break;
    case '153': 
      return 'Vasco';
      break;
    case '154': 
      return 'Livermore';
      break;
    case '155': 
      return 'Pleasanton';
      break;
    case '156': 
      return 'Fremont';
      break;
    case '157': 
      return 'Great America';
      break;
    case '158': 
      return 'Santa Clara';
      break;
    case '159': 
      return 'San Jose';
      break;
    default: return 'Something';
  }
}

function parseAceTime (aceTime) {
  if(!aceTime)
    return {hour:0, minute:0, second:0 ,timezone:"America/Los_Angeles"}
  var zonedDateTime = dates.ZonedDateTime.parseTime (aceTime, "hh:mma", "America/Los_Angeles" )
  if(!zonedDateTime)
    return {hour:0, minute:0, second:0 ,timezone:"America/Los_Angeles"}
  console.log('zoneddatetime: ' + zonedDateTime)
  return {hour:zonedDateTime.getHour(), minute:zonedDateTime.getMinute(), second:0 ,timezone:"America/Los_Angeles"}
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