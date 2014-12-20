define([
	'game/classes/Actor'
], function(
	SUPERCLASS
) {
	function Box() {
		SUPERCLASS.call(this, {
			moveSpeed: 2,
			width: 20,
			height: 20,
			facingMatters: false,
			debugColor: '#0ff',
			debugFillColor: '#0aa'
		});
	}
	Box.prototype = Object.create(SUPERCLASS.prototype);
	return Box;
});