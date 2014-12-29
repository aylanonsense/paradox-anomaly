define([
	'game/object/actor/Actor',
	'game/object/actor/PastSelf',
	'game/util/toVector',
	'game/util/toDirection'
], function(
	SUPERCLASS,
	PastSelf,
	toVector,
	toDirection
) {
	function Player() {
		SUPERCLASS.call(this, {
			speed: 2,
			canCarryItems: true,
			canPush: true,
			debugColor: '#0f0'
		});
		this._isStandingStill = false;
		this._moveDir = null;
		this._bufferedMoveDir = null;
		this._actionHistory = [];
	}
	Player.prototype = Object.create(SUPERCLASS.prototype);
	Player.prototype.addToLevel = function(level, tile) {
		SUPERCLASS.prototype.addToLevel.call(this, level, tile);
		this._actionHistory.push({
			action: 'SPAWN',
			frame: this._level.frame
		});
	};
	Player.prototype.loadState = function(state, prevFrame) {
		this._actionHistory.push({
			action: 'DESPAWN',
			frame: prevFrame
		});
		var pastSelf = this._level.spawnGameObj(new PastSelf({
			actions: this._actionHistory
		}));
		pastSelf.loadState(state, prevFrame);
		this._actionHistory = [{
			action: 'SPAWN',
			frame: this._level.frame
		}];
	};
	Player.prototype.move = function(moveX, moveY, speed) {
		speed = speed || this._defaultSpeed;
		if(SUPERCLASS.prototype.move.call(this, moveX, moveY, speed)) {
			this._actionHistory.push({
				action: 'MOVE',
				frame: this._level.frame,
				moveX: moveX,
				moveY: moveY,
				speed: speed
			});
		}
	};
	Player.prototype.startOfFrame = function(frame) {
		SUPERCLASS.prototype.startOfFrame.call(this, frame);
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
		var dir = { MOVE_UP: 'NORTH', MOVE_DOWN: 'SOUTH',
				MOVE_LEFT: 'WEST', MOVE_RIGHT: 'EAST' }[evt.gameKey];
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
		else if(evt.gameKey === 'TIME_TRAVEL' && evt.isDown) {
			this._level.rewindState(5 * 60);
		}
	};
	return Player;
});