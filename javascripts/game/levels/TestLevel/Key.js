define([
	'game/classes/Actor'
], function(
	SUPERCLASS
) {
	function Key() {
		SUPERCLASS.call(this, {
			canBeCarried: true,
			width: 10,
			height: 10,
			occupiesFullTile: false,
			facingMatters: false,
			debugColor: '#f0f',
			debugFillColor: '#a0a'
		});
	}
	Key.prototype = Object.create(SUPERCLASS.prototype);
	return Key;
});