module.exports.function = function isMyTrainLate (myTrain) {
  if(myTrain.onSchedule == 0) {
    return {isTrainLate:true, train:train}
  } else { 
    return {isTrainLate:false, train:train}
  }
}

