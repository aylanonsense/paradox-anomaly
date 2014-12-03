if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
	'game/classes/GameObj'
], function(
	SUPERCLASS
) {
	function Effect(x, y, width, height) {
		SUPERCLASS.call(this, x, y, width, height);
	}
	Effect.prototype = Object.create(SUPERCLASS.prototype);
	return Effect;
});