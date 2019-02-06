module.exports.function = function isMyTrainLate (myTrain) {
  if(myTrain.onSchedule == 0) {
    return {isTrainLate:false, train:myTrain}
  } else { 
    return {isTrainLate:true, train:myTrain}
  }
}

