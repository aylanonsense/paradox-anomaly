if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
	'game/classes/GameObj'
], function(
	SUPERCLASS
) {
	function Tile(x, y, width, height) {
		SUPERCLASS.call(this, x, y, width, height);
	}
	Tile.prototype = Object.create(SUPERCLASS.prototype);
	return Tile;
});