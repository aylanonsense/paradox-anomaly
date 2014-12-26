define([
	'game/object/actor/Actor',
	'game/util/toVector',
	'game/util/toDirection'
], function(
	SUPERCLASS,
	toVector,
	toDirection
) {
	function Player() {
		SUPERCLASS.call(this, {
			speed: 2,
			canCarryItems: true,
			debugColor: '#0f0'
		});
		this._isStandingStill = false;
		this._moveDir = null;
		this._bufferedMoveDir = null;
	}
	Player.prototype = Object.create(SUPERCLASS.prototype);
	Player.prototype.startOfFrame = function() {
		SUPERCLASS.prototype.startOfFrame.call(this);
		if(!this.isMoving()) {
			if(this._isStandingStill) {
				if(this._moveDir) {
					this._facing = this._moveDir;
				}
			}
			else if(this._bufferedMoveDir) {
				this.move(toVector(this._bufferedMoveDir).x, toVector(this._bufferedMoveDir).y);
				this._bufferedMoveDir = null;
			}
			else if(this._moveDir) {
				this.move(toVector(this._moveDir).x, toVector(this._moveDir).y);
			}
		}
	};
	Player.prototype.onKeyboardEvent = function(evt, keyboard) {
		var dir = { MOVE_UP: 'NORTH', MOVE_DOWN: 'SOUTH', MOVE_LEFT: 'WEST', MOVE_RIGHT: 'EAST' }[evt.gameKey];
		this._isStandingStill = keyboard.STAND_STILL;
		if(evt.gameKey === 'STAND_STILL' && evt.isDown) {
			this._bufferedMoveDir = null;
		}
		else if(dir) {
			if(evt.isDown) {
				this._moveDir = dir;
				if(!this._isStandingStill) {
					this._bufferedMoveDir = dir;
				}
			}
			else if(keyboard.MOVE_UP) { this._moveDir = 'NORTH'; }
			else if(keyboard.MOVE_DOWN) { this._moveDir = 'SOUTH'; }
			else if(keyboard.MOVE_LEFT) { this._moveDir = 'WEST'; }
			else if(keyboard.MOVE_RIGHT) { this._moveDir = 'EAST'; }
			else { this._moveDir = null; }
		}
		else if(evt.gameKey === 'USE' && evt.isDown) {
			if(this._tile.use(this, this._facing, false)) {
				return;
			}
			var nextTile = this._level.tileGrid.get(this.col + toVector(this._facing).x,
				this.row + toVector(this._facing).y);
			if(nextTile && nextTile.use(this, this._facing, true)) {
				return;
			}
			if(this.dropCarriedItem()) {
				return;
			}
		}
	};
	return Player;
});