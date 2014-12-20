define([
	'game/classes/Actor'
], function(
	SUPERCLASS
) {
	function FloorSwitch() {
		SUPERCLASS.call(this, {
			moveSpeed: 2,
			width: 30,
			height: 4,
			occupiesFullTile: false,
			debugColor: '#ff0',
			debugFillColor: '#aa0'
		});
	}
	FloorSwitch.prototype = Object.create(SUPERCLASS.prototype);
	return FloorSwitch;
});