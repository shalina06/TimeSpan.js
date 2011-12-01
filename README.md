# TimeSpan.js

## is a library for Node.js or the browser that allows you to easily manipulate and format lengths of time.

### Installation

	npm install TimeSpan.js

### AMD module support

TimeSpan.js supports loading as an AMD module, it detects AMD like:
	if (typeof define !== 'undefined' && define.amd)

If AMD is not supported TimeSpan.js will be located at window.TimeSpan

## Documentation


### TimeSpan

The TimeSpan constructor, the `new` operator is optional.

#### TimeSpan()

Creates a new TimeSpan with a time of 0.

#### TimeSpan(milliseconds, [seconds, [minutes, [hours, [days]]]])

Creates a TimeSpan with given amount of time

#### TimeSpan(Date, Date)

Creates a TimeSpan with the difference between times (the future time should go first for a positive number).


### TimeSpan.prototype.add

#### add(unit, value)

Add `value` amount of `unit` to the TimeSpan

Units can be one of:
- milliseconds
- seconds
- minutes
- hours
- days

#### add(unit)

Add 1 of `unit` to the TimeSpan

Unit can be
- millisecond
- second
- minute
- hour
- day

### TimeSpan.prototype.subtract

#### Exactly the same as add except values are subtracted instead of added.


### TimeSpan.prototype.total

#### total(unit)

Returns the total number of `unit` in the TimeSpan.

	// 10 minutes and 5 seconds
	TimeSpan(0, 5, 10).total("seconds") // 605
	TimeSpan(0, 5, 10).total("minutes") // 10

### TimeSpan.prototype.get

#### get(unit)

Returns the number of `unit` in the TimeSpan which is no greater than the next largest unit.

	// 10 minutes and 5 seconds
	TimeSpan(0, 5, 10).total("seconds") // 5
	TimeSpan(0, 5, 10).total("minutes") // 10


### TimeSpan.prototype.format

#### format(formatString)

Formats the TimeSpan with the specified string, the following will be replaced:

	l - milliseconds
	s - seconds
	m - minutes
	h - hours
	d - days

Those letters will be replaced with the equivalent of doing TimeSpan.get.
If you want TimeSpan.total prefix them with a `^`.

For padding numbers with zeros, you can have many letters repeated and TimeSpan will use that as the minimum length of the number.

If you want to put the actual letter in the string without it being replaced or a `^` before one of those letters, `~` is the escape character.
	
	TimeSpan(0, 28, 7, 5, 1).format("^hh:mm:ss") // 29:07:28
	TimeSpan(0, 28, 7, 5, 1).format("zzz ~^~h~h~hh ^ ~^h ~^~h~h~h^h ^hhh hhh zzz") // zzz ^hhh4 ^ ^4 ^hhh52 052 004 zzz
