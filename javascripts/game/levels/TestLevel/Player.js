define([
	'game/classes/Actor'
], function(
	SUPERCLASS
) {
	function Player() {
		SUPERCLASS.call(this, {
			moveSpeed: 4,
			width: 20,
			height: 30,
			debugColor: '#0f0',
			debugFillColor: '#0a0'
		});
		this._moveDir = null;
		this._movePriority = [];
		this._bufferedMoveDir = null;
	}
	Player.prototype = Object.create(SUPERCLASS.prototype);
	Player.prototype.startOfFrame = function() {
		SUPERCLASS.prototype.startOfFrame.call(this);
		if(!this.isMoving()) {
			if(this._bufferedMoveDir) {
				this.move(this._bufferedMoveDir);
				this._bufferedMoveDir = null;
			}
			else if(this._moveDir) {
				this.move(this._moveDir);
			}
		}
	};
	Player.prototype.onKeyboardEvent = function(evt, keyboard) {
		var dir = {
			MOVE_UP: 'NORTH',
			MOVE_DOWN: 'SOUTH',
			MOVE_LEFT: 'WEST',
			MOVE_RIGHT: 'EAST'
		}[evt.gameKey];
		if(dir) {
			if(evt.isDown) {
				this._moveDir = dir;
				this._bufferedMoveDir = dir;
			}
			else if(keyboard.MOVE_UP) { this._moveDir = 'NORTH'; }
			else if(keyboard.MOVE_DOWN) { this._moveDir = 'SOUTH'; }
			else if(keyboard.MOVE_LEFT) { this._moveDir = 'WEST'; }
			else if(keyboard.MOVE_RIGHT) { this._moveDir = 'EAST'; }
			else { this._moveDir = null; }
		}
	};
	return Player;
});