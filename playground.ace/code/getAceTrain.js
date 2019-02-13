module.exports.function = function getVehicle (trainNumber) {
  var url = 'http://acerailpublic.etaspot.net/service.php?service=get_vehicles&includeETAData=1&orderedETAArray=1&token=TESTING'
  var response = http.getUrl (url, {format:'json', cacheTime:0})

  // var response =  [
  //   {
  //     "routeID": 5,
  //     "patternID": 2,
  //     "equipmentID": "3101",
  //     "tripID": "0",
  //     "lat": 37.6576,
  //     "lng": -121.8829,
  //     "load": 0,
  //     "capacity": null,
  //     "blockID": 0,
  //     "nextStopID": 154,
  //     "nextStopETA": 1064,
  //     "nextPatternStopID": 16,
  //     "scheduleNumber": "06",
  //     "inService": 1,
  //     "onSchedule": -7,
  //     "vehicleType": "Train",
  //     "trainID": 224,
  //     "receiveTime": 1549676100000,
  //     "deadHead": "0",
  //     "aID": "2133309675",
  //     "minutesToNextStops": [
  //       {
  //         "blockID": 0,
  //         "stopID": "154",
  //         "patternStopID": "16",
  //         "minutes": 9,
  //         "time": "05:44PM",
  //         "schedule": "05:37PM",
  //         "status": "05:44PM",
  //         "scheduleNumber": "06",
  //         "statuscolor": "#d58803",
  //         "track": 3,
  //         "direction": "",
  //         "directionAbbr": "",
  //         "equipmentID": "3101",
  //         "routeID": 5
  //       },
  //       {
  //         "blockID": 0,
  //         "stopID": "153",
  //         "patternStopID": "17",
  //         "minutes": 14,
  //         "time": "05:49PM",
  //         "schedule": "05:42PM",
  //         "status": "05:49PM",
  //         "scheduleNumber": "06",
  //         "statuscolor": "#d58803",
  //         "track": 3,
  //         "direction": "",
  //         "directionAbbr": "",
  //         "equipmentID": "3101",
  //         "routeID": 5
  //       },
  //       {
  //         "blockID": 0,
  //         "stopID": "152",
  //         "patternStopID": "18",
  //         "minutes": 43,
  //         "time": "06:18PM",
  //         "schedule": "06:11PM",
  //         "status": "06:18PM",
  //         "scheduleNumber": "06",
  //         "statuscolor": "#d58803",
  //         "track": 3,
  //         "direction": "",
  //         "directionAbbr": "",
  //         "equipmentID": "3101",
  //         "routeID": 5
  //       },
  //       {
  //         "blockID": 0,
  //         "stopID": "151",
  //         "patternStopID": "19",
  //         "minutes": 55,
  //         "time": "06:30PM",
  //         "schedule": "06:23PM",
  //         "status": "06:30PM",
  //         "scheduleNumber": "06",
  //         "statuscolor": "#d58803",
  //         "track": 3,
  //         "direction": "",
  //         "directionAbbr": "",
  //         "equipmentID": "3101",
  //         "routeID": 5
  //       },
  //       {
  //         "blockID": 0,
  //         "stopID": "150",
  //         "patternStopID": "20",
  //         "minutes": 79,
  //         "time": "06:54PM",
  //         "schedule": "06:47PM",
  //         "status": "06:54PM",
  //         "scheduleNumber": "06",
  //         "statuscolor": "#d58803",
  //         "track": 3,
  //         "direction": "",
  //         "directionAbbr": "",
  //         "equipmentID": "3101",
  //         "routeID": 5
  //       }
  //     ],
  //     "direction": "",
  //     "directionAbbr": ""
  //   },
  //   {
  //     "routeID": 5,
  //     "patternID": 2,
  //     "equipmentID": "3102",
  //     "tripID": null,
  //     "lat": 37.97884,
  //     "lng": -121.2843,
  //     "load": 0,
  //     "capacity": null,
  //     "blockID": 0,
  //     "nextStopID": 0,
  //     "nextStopETA": -1,
  //     "nextPatternStopID": 0,
  //     "scheduleNumber": "NIS",
  //     "inService": 0,
  //     "onSchedule": null,
  //     "vehicleType": "Train",
  //     "trainID": 0,
  //     "receiveTime": 1549631892000,
  //     "deadHead": "0",
  //     "aID": "2133309724",
  //     "minutesToNextStops": []
  //   },
  //   {
  //     "routeID": 5,
  //     "patternID": 1,
  //     "equipmentID": "3103",
  //     "tripID": null,
  //     "lat": 37.73226,
  //     "lng": -121.6299,
  //     "load": 0,
  //     "capacity": null,
  //     "blockID": 0,
  //     "nextStopID": 0,
  //     "nextStopETA": -1,
  //     "nextPatternStopID": 0,
  //     "scheduleNumber": "NIS",
  //     "inService": 0,
  //     "onSchedule": null,
  //     "vehicleType": "Train",
  //     "trainID": 0,
  //     "receiveTime": 1549641171000,
  //     "deadHead": "0",
  //     "aID": "2133309637",
  //     "minutesToNextStops": []
  //   },
  //   {
  //     "routeID": 5,
  //     "patternID": 2,
  //     "equipmentID": "3104",
  //     "tripID": "0",
  //     "lat": 37.32883,
  //     "lng": -121.9029,
  //     "load": 0,
  //     "capacity": null,
  //     "blockID": 0,
  //     "nextStopID": 158,
  //     "nextStopETA": 1060,
  //     "nextPatternStopID": 12,
  //     "scheduleNumber": "08",
  //     "inService": 1,
  //     "onSchedule": 0,
  //     "vehicleType": "Train",
  //     "trainID": 226,
  //     "receiveTime": 1549676108000,
  //     "deadHead": "0",
  //     "aID": "2133309673",
  //     "minutesToNextStops": [
  //       {
  //         "blockID": 0,
  //         "stopID": "158",
  //         "patternStopID": "12",
  //         "minutes": 5,
  //         "time": "05:40PM",
  //         "schedule": "05:40PM",
  //         "status": "On Time",
  //         "scheduleNumber": "08",
  //         "statuscolor": "#39b139",
  //         "track": 3,
  //         "direction": "",
  //         "directionAbbr": "",
  //         "equipmentID": "3104",
  //         "routeID": 5
  //       },
  //       {
  //         "blockID": 0,
  //         "stopID": "157",
  //         "patternStopID": "13",
  //         "minutes": 14,
  //         "time": "05:49PM",
  //         "schedule": "05:49PM",
  //         "status": "On Time",
  //         "scheduleNumber": "08",
  //         "statuscolor": "#39b139",
  //         "track": 3,
  //         "direction": "",
  //         "directionAbbr": "",
  //         "equipmentID": "3104",
  //         "routeID": 5
  //       },
  //       {
  //         "blockID": 0,
  //         "stopID": "156",
  //         "patternStopID": "14",
  //         "minutes": 30,
  //         "time": "06:05PM",
  //         "schedule": "06:05PM",
  //         "status": "On Time",
  //         "scheduleNumber": "08",
  //         "statuscolor": "#39b139",
  //         "track": 3,
  //         "direction": "",
  //         "directionAbbr": "",
  //         "equipmentID": "3104",
  //         "routeID": 5
  //       },
  //       {
  //         "blockID": 0,
  //         "stopID": "155",
  //         "patternStopID": "15",
  //         "minutes": 53,
  //         "time": "06:28PM",
  //         "schedule": "06:28PM",
  //         "status": "On Time",
  //         "scheduleNumber": "08",
  //         "statuscolor": "#39b139",
  //         "track": 3,
  //         "direction": "",
  //         "directionAbbr": "",
  //         "equipmentID": "3104",
  //         "routeID": 5
  //       },
  //       {
  //         "blockID": 0,
  //         "stopID": "154",
  //         "patternStopID": "16",
  //         "minutes": 62,
  //         "time": "06:37PM",
  //         "schedule": "06:37PM",
  //         "status": "On Time",
  //         "scheduleNumber": "08",
  //         "statuscolor": "#39b139",
  //         "track": 3,
  //         "direction": "",
  //         "directionAbbr": "",
  //         "equipmentID": "3104",
  //         "routeID": 5
  //       }
  //     ],
  //     "direction": "",
  //     "directionAbbr": ""
  //   },
  //   {
  //     "routeID": 5,
  //     "patternID": 2,
  //     "equipmentID": "3105",
  //     "tripID": "0",
  //     "lat": 37.8165,
  //     "lng": -121.2623,
  //     "load": 0,
  //     "capacity": null,
  //     "blockID": 0,
  //     "nextStopID": 150,
  //     "nextStopETA": 1076,
  //     "nextPatternStopID": 20,
  //     "scheduleNumber": "04",
  //     "inService": 1,
  //     "onSchedule": -9,
  //     "vehicleType": "Train",
  //     "trainID": 223,
  //     "receiveTime": 1549676107000,
  //     "deadHead": "0",
  //     "aID": "2133309629",
  //     "minutesToNextStops": [
  //       {
  //         "blockID": 0,
  //         "stopID": "150",
  //         "patternStopID": "20",
  //         "minutes": 21,
  //         "time": "05:56PM",
  //         "schedule": "05:47PM",
  //         "status": "05:56PM",
  //         "scheduleNumber": "04",
  //         "statuscolor": "#d58803",
  //         "track": 3,
  //         "direction": "",
  //         "directionAbbr": "",
  //         "equipmentID": "3105",
  //         "routeID": 5
  //       }
  //     ],
  //     "direction": "",
  //     "directionAbbr": ""
  //   },
  //   {
  //     "routeID": 5,
  //     "patternID": 2,
  //     "equipmentID": "3106",
  //     "tripID": null,
  //     "lat": 37.97881,
  //     "lng": -121.2844,
  //     "load": 0,
  //     "capacity": null,
  //     "blockID": 0,
  //     "nextStopID": 0,
  //     "nextStopETA": -1,
  //     "nextPatternStopID": 0,
  //     "scheduleNumber": "NIS",
  //     "inService": 0,
  //     "onSchedule": null,
  //     "vehicleType": "Train",
  //     "trainID": 0,
  //     "receiveTime": 1549523595000,
  //     "deadHead": "0",
  //     "aID": "2133309685",
  //     "minutesToNextStops": []
  //   }
  // ]
  // var trains = response
  
  
  var trains = response.get_vehicles
  
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




  //   aceTrain["location"] = {latitude:train.lat, longitude:train.lng}
  // 
  // 
  //   switch(train.inService) {
  //     case '1': aceTrain["inService"] = true;
  //       break;
  //     default: aceTrain["inService"] = false;
  //       break;
  //   }
  //   aceTrain["trainNumber"] = train.scheduleNumber
  // 
  // 
  //   if (train.onSchedule < 0) {
  //     aceTrain["onTime"] = false
  //     aceTrain["lateBy"] = train.onSchedule * -1
  //   } else {
  //     aceTrain["onTime"] = true
  //     aceTrain["lateBy"] = 0
  //   }
  // 
  //   var nextStops = new Array ()
  //   var i = 0
  // 
  //   console.log(train.minutesToNextStops)
  // 
  //   for (var nextStop in train.minutesToNextStops) {
  //     console.log('Came here:' + nextStop.minutes)
  //     nextStops[i++] = getAceStop(nextStop)
  //   }
  // 
  //   aceTrain["nextStops"] = nextStops



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
  return {timeToNextStop:stop["minutes"],
          aceStopName:getStopName(stop.stopID),
          scheduledTime:parseAceTime(stop["schedule"]),
          actualTime:parseAceTime(stop["time"]) 
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