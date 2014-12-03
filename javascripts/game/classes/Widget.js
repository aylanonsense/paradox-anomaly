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