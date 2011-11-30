
;(function () {
	
	function TimeSpan (a, b, c, d, e) {
		if (!(this instanceof TimeSpan)) return new TimeSpan(a, b, c, d, e) // work without the new operator
		this._ms = 0
		
		// Take 2 Dates and set the ms to the difference
		if (a instanceof Date && b instanceof Date) {
			this._ms = a.getTime() - b.getTime()
		}
		// take ms, seconds, minutes, hours, days
		else if (typeof a === "number") {
			this._ms = a
			if (typeof b === "number") this._ms += b * TimeSpan.second
			if (typeof c === "number") this._ms += c * TimeSpan.minute
			if (typeof d === "number") this._ms += d * TimeSpan.hour
			if (typeof e === "number") this._ms += e * TimeSpan.day
		}
	}

	TimeSpan.millisecond = 1
	TimeSpan.second = TimeSpan.millisecond * 1000
	TimeSpan.minute = TimeSpan.second * 60
	TimeSpan.hour = TimeSpan.minute * 60
	TimeSpan.day = TimeSpan.hour * 24

	TimeSpan._formatters = {
		"l": "milliseconds",
		"s": "seconds",
		"m": "minutes",
		"h": "hours",
		"d": "days"
	}

	TimeSpan._formatRegex = /(~\^)|(~l|l+|\^l+)|(~s|s+|\^s+)|(~m|m+|\^m+)|(~h|h+|\^h+)|(~d|d+|\^d+)/g

	TimeSpan._pad = function (num, length) {
		var string = num.toString()
		while (string.length < length) {
			string = "0" + string
		}
		return string
	}

	TimeSpan.prototype._unitName = function (unit) {
		unit = unit.replace(/s$/, "")
		if (!(typeof TimeSpan[unit] === "number")) throw new Error("Invalid unit '" + unit + "'")
		return unit
	}

	TimeSpan.prototype._unitSize = function (unit) {
		return TimeSpan[this._unitName(unit)]
	}

	TimeSpan.prototype._getUnits = function () {
		var units = {}
		var remaining = this._ms

		units.days = Math.floor(remaining / TimeSpan.day)
		remaining %= TimeSpan.day

		units.hours = Math.floor(remaining / TimeSpan.hour)
		remaining %= TimeSpan.hour

		units.minutes = Math.floor(remaining / TimeSpan.minute)
		remaining %= TimeSpan.minute

		units.seconds = Math.floor(remaining / TimeSpan.second)
		remaining %= TimeSpan.second

		units.milliseconds = Math.floor(remaining / TimeSpan.millisecond)
		remaining %= TimeSpan.millisecond

		return units
	}

	TimeSpan.prototype.total = function (unit) {
		if (this.ms === 0) return 0
		return Math.floor(this._ms / this._unitSize(unit))
	}

	TimeSpan.prototype.get = function (unit) {
		return this._getUnits()[this._unitName(unit) + "s"]
	}
	
	TimeSpan.prototype.add = function (unit, value) {
		this._ms += (value || 1) * this._unitSize(unit)
		return this
	}

	TimeSpan.prototype.subtract = function (unit, value) {
		return this.add(unit, -(value || 1))
	}

	TimeSpan.prototype.format = function (format) {
		var self = this
		return format.replace(TimeSpan._formatRegex, function (match) {
			var mode = self.get
			var type
			if (match.indexOf("~") === 0) return match.replace("~", "")

			if (match.indexOf("^") === 0) {
				mode = self.total
				match = match.replace("^", "")
			}

			type = TimeSpan._formatters[match.charAt(0)]
			return TimeSpan._pad(mode.call(self, type), match.length)
		})
	}


	if (typeof module !== 'undefined') module.exports = TimeSpan // node
	else if (typeof define !== 'undefined' && define.amd) define(function () { return TimeSpan }) // AMD
	else window.TimeSpan = TimeSpan // old skool browser
}())
