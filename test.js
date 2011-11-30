var TimeSpan = require('itv/public/TimeSpan')

exports.emptyConstructor = function (assert) {
	var ts = TimeSpan()
	assert.equal(0, ts.total("milliseconds"))
	assert.finish()
}

exports.dateDiffConstructor = function (assert) {
	var ts = TimeSpan(new Date(1322589331), new Date(946684800))
	assert.equal(375904531, ts.total("milliseconds"))
	assert.finish()
}

exports.millisecondsConstructor = function (assert) {
	var ts = TimeSpan(28)
	assert.equal(28, ts.total("milliseconds"))
	assert.finish()
}

exports.secondsConstructor = function (assert) {
	var ts = TimeSpan(28, 20)
	assert.equal(20028, ts.total("milliseconds"))
	assert.finish()
}

exports.minutesConstructor = function (assert) {
	var ts = TimeSpan(28, 20, 7)
	assert.equal(440028, ts.total("milliseconds"))
	assert.finish()
}

exports.hoursConstructor = function (assert) {
	var ts = TimeSpan(28, 20, 7, 5)
	assert.equal(18440028, ts.total("milliseconds"))
	assert.finish()
}

exports.daysConstructor = function (assert) {
	var ts = TimeSpan(28, 20, 7, 5, 2)
	assert.equal(191240028, ts.total("milliseconds"))
	assert.finish()
}

exports.total = function (assert) {
	var ts = TimeSpan(28, 20, 7, 5, 2)
	assert.equal(191240028, ts.total("milliseconds"))
	assert.equal(191240, ts.total("seconds"))
	assert.equal(3187, ts.total("minutes"))
	assert.equal(53, ts.total("hours"))
	assert.equal(2, ts.total("days"))
	assert.finish()
}

exports.get = function (assert) {
	var ts = TimeSpan(28, 20, 7, 5, 2)
	assert.equal(28, ts.get("milliseconds"))
	assert.equal(20, ts.get("seconds"))
	assert.equal(7, ts.get("minutes"))
	assert.equal(5, ts.get("hours"))
	assert.equal(2, ts.get("days"))
	assert.finish()
}

exports.add = function (assert) {
	var ts = TimeSpan()

	ts.add("milliseconds", 27)
	ts.add("millisecond")

	ts.add("seconds", 19)
	ts.add("second")

	ts.add("minutes", 6)
	ts.add("minute")

	ts.add("hours", 4)
	ts.add("hour")

	ts.add("days", 2)
	ts.add("day")
	
	assert.equal(277640028, ts.total("milliseconds"))
	assert.finish()
}

exports.subtract = function (assert) {
	var ts = TimeSpan(29, 21, 8, 6, 4)

	ts.subtract("milliseconds", 27)
	ts.subtract("millisecond")

	ts.subtract("seconds", 19)
	ts.subtract("second")

	ts.subtract("minutes", 6)
	ts.subtract("minute")

	ts.subtract("hours", 4)
	ts.subtract("hour")

	ts.subtract("days", 2)
	ts.subtract("day")

	assert.equal(90061001, ts.total("milliseconds"))
	assert.finish()
}

exports.format = function (assert) {
	var ts = TimeSpan(0, 28, 7, 4, 1)

	assert.equal("28:07:28", ts.format("^hh:mm:ss"))
	assert.equal("28:7:28", ts.format("^h:m:s"))

	ts = TimeSpan(183, 28, 7, 4, 2)
	
	assert.equal("zzz 187648183 zzz", ts.format("zzz ^l zzz"))
	assert.equal("zzz 187648 zzz", ts.format("zzz ^s zzz"))
	assert.equal("zzz 3127 zzz", ts.format("zzz ^m zzz"))
	assert.equal("zzz 52 zzz", ts.format("zzz ^h zzz"))
	assert.equal("zzz 2 zzz", ts.format("zzz ^d zzz"))

	assert.equal("zzz 0187648183 zzz", ts.format("zzz ^llllllllll zzz"))
	assert.equal("zzz 0000187648 zzz", ts.format("zzz ^ssssssssss zzz"))
	assert.equal("zzz 0000003127 zzz", ts.format("zzz ^mmmmmmmmmm zzz"))
	assert.equal("zzz 0000000052 zzz", ts.format("zzz ^hhhhhhhhhh zzz"))
	assert.equal("zzz 0000000002 zzz", ts.format("zzz ^dddddddddd zzz"))

	assert.equal("zzz 183 zzz", ts.format("zzz l zzz"))
	assert.equal("zzz 28 zzz", ts.format("zzz s zzz"))
	assert.equal("zzz 7 zzz", ts.format("zzz m zzz"))
	assert.equal("zzz 4 zzz", ts.format("zzz h zzz"))
	assert.equal("zzz 2 zzz", ts.format("zzz d zzz"))

	assert.equal("zzz 00183 zzz", ts.format("zzz lllll zzz"))
	assert.equal("zzz 00028 zzz", ts.format("zzz sssss zzz"))
	assert.equal("zzz 00007 zzz", ts.format("zzz mmmmm zzz"))
	assert.equal("zzz 00004 zzz", ts.format("zzz hhhhh zzz"))
	assert.equal("zzz 00002 zzz", ts.format("zzz ddddd zzz"))

	assert.equal("zzz ^hhh4 ^ ^4 ^hhh52 052 004 zzz", ts.format("zzz ~^~h~h~hh ^ ~^h ~^~h~h~h^h ^hhh hhh zzz"))
	
	assert.finish()
}
