module.exports.function = function filterAceTrain (aceTrains, filterWord) {
  return aceTrains.filter(function filterTrains(el) {return (textlib.fuzzyMatch(filterWord,el,-1) == 0)})
}
