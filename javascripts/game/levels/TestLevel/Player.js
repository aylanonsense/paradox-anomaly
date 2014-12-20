define([
	'game/classes/Actor'
], function(
	SUPERCLASS
) {
	function Player() {
		SUPERCLASS.call(this, {
			moveSpeed: 2,
			width: 20,
			height: 30,
			debugColor: '#0f0',
			debugFillColor: '#0a0'
		});
	}
	Player.prototype = Object.create(SUPERCLASS.prototype);
	Player.prototype.onKeyboardEvent = function(evt, keyboard) {
		var dir = null;
		if(evt.gameKey === 'MOVE_UP') { dir = 'NORTH'; }
		else if(evt.gameKey === 'MOVE_DOWN') { dir = 'SOUTH'; }
		else if(evt.gameKey === 'MOVE_LEFT') { dir = 'WEST'; }
		else if(evt.gameKey === 'MOVE_RIGHT') { dir = 'EAST'; }
		if(evt.isDown && dir !== null) {
			this.move(dir);
		}
	};
	return Player;
});