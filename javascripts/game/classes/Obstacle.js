define([
	'game/classes/GameObj'
], function(
	SUPERCLASS
) {
	function Obstacle(x, y, width, height) {
		SUPERCLASS.call(this, x, y, width, height);
	}
	Obstacle.prototype = Object.create(SUPERCLASS.prototype);
	return Obstacle;
});