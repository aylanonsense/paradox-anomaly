if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
	'game/classes/GameObj'
], function(
	SUPERCLASS
) {
	function Widget(x, y, width, height) {
		SUPERCLASS.call(this, x, y, width, height);
	}
	Widget.prototype = Object.create(SUPERCLASS.prototype);
	return Widget;
});