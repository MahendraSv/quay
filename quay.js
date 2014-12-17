var Quay = function($el) {
	var _self = this

	/*Utility Functions*/
	var contains = function(a, obj) {
		var i = a.length
		while(i--) {
			if (a[i] === obj) {
				return true
			}
		}
		return false
	},
		remove = function(a, x) {
			if (contains(a,x)) {
				a.splice(a.indexOf(x),1 )
			}
		}

	this.bindings = {}

	var pressing = [],
		special_keys = {
			8: "backspace", 9: "tab", 10: "return", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 186: "", 191: "/",
			220: "\\", 222: "'", 224: "meta"
		}

	this.convert = function(key) {

		if (contains(Object.keys(special_keys),String(key)))
		{
			return special_keys[key]
		} else {
			return String.fromCharCode(key).toLowerCase()
		}
	}
	this.run = function(key) {
		var string = this.convert(key.which)
		pressing.push(string)

		pressing.sort()
	}

	this.press = function(key_bindings) {

		var keys = Object.keys(key_bindings)

		for(var i=0; i<keys.length; i++) {
			var key = keys[i],
				keys_split = key.split(',');

			for(var k=0; k<keys_split.length; k++) {
				var sorted = keys_split[k].split('_').sort().join('_')

				this.bindings[sorted] = key_bindings[keys[i]]
			}
		}
	}

	this.VERSION = {
		MAJOR:2,
		MINOR:0,
		PATCH:0,
		FULL :function() {
			return this.MAJOR+'.'+this.MINOR+'.'+this.PATCH
		}
	}

	this.keydown = function(e) {
		_self.run(e)

		var sorted_pressing    = pressing.sort()
		var currently_pressing = sorted_pressing.join('_')

		if (contains(Object.keys(_self.bindings),currently_pressing))
		{
			_self.bindings[currently_pressing](currently_pressing)

			pressing = []
		}
	}

	this.keyup = function(e) {
		remove(pressing,_self.convert(e.which))
	}

	this.bindTo = function($el) {
		$el.addEventListener('keydown', this.keydown);
		$el.addEventListener('keyup', this.keyup);
	}

	if(typeof $el !== 'undefined') {
		this.bindTo($el);
	}
}

if ( typeof define == "function" && define.amd) {
	define([], function() {
		return Quay;
	})
}
