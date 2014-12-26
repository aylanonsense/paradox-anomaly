define([
	'game/object/actor/Actor'
], function(
	SUPERCLASS
) {
	function Player() {
		SUPERCLASS.call(this, { debugColor: '#0ff' });
	}
	Player.prototype = Object.create(SUPERCLASS.prototype);
	return Player;
});