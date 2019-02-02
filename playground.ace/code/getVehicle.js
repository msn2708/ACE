module.exports.function = function getVehicle (trainNumber) {
  var url = 'http://acerailpublic.etaspot.net/service.php?service=get_vehicles&includeETAData=1&orderedETAArray=1&token=TESTING'
  var response = http.getUrl (url, {format:'json'})

  var trains = response.get_vehicles
  
  if(!trainNumber) {
    return trains
  }
  
  if(trains) {
    for (var i=0; i<trains.length; i++) {
      var train = getObject (trains[i],'scheduleNumber',trainNumber)
      if(train) {
        if(train.length > 1) {
          //we have a problem
          console.log ('More than 1 train returned: ' + train)
          return null
        } else {
          return train
        }
      }
    }  
    return null
  }
}

function getObject(obj, key, val) {

  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;

    //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
    if (i == key && obj[i] == val) { //
      objects.push(obj);
      console.log ('getObject::printObject')
      printObject(obj)
    } else if (obj[i] == val && key == ''){
      //only add if the object is not already in the array
      if (objects.lastIndexOf(obj) == -1){
        objects.push(obj);
      }
    }
  }
  return objects;
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