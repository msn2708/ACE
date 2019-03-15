module.exports.function = function filterAceTrain (aceTrains, filterWord) {
  // var filterWord = filterWord.trim().replace(/\s/g,'')
  var scheduleNumber = filterWord.replace(/^\D+/g, "")
  return aceTrains.filter(function filterTrains(el) {return (textlib.fuzzyMatch(scheduleNumber,el,-1) == 0)})
}
