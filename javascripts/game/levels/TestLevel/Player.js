define([
	'game/classes/Actor',
	'game/Utils'
], function(
	SUPERCLASS,
	Utils
) {
	function Player() {
		SUPERCLASS.call(this, {
			moveSpeed: 4,
			pushStrength: 4,
			canCarry: true,
			width: 20,
			height: 30,
			debugColor: '#0f0',
			debugFillColor: '#0a0'
		});
		this._moveDir = null;
		this._movePriority = [];
		this._bufferedMoveDir = null;
		this._standingStill = false;
	}
	Player.prototype = Object.create(SUPERCLASS.prototype);
	Player.prototype.startOfFrame = function() {
		SUPERCLASS.prototype.startOfFrame.call(this);
		if(!this.isMoving()) {
			if(this._standingStill) {
				if(this._moveDir !== null) {
					this._facing = this._moveDir;
				}
			}
			else if(this._bufferedMoveDir) {
				this.move(this._bufferedMoveDir);
				this._bufferedMoveDir = null;
			}
			else if(this._moveDir) {
				this.move(this._moveDir);
			}
		}
	};
	Player.prototype.render = function(ctx, camera) {
		SUPERCLASS.prototype.render.call(this, ctx, camera);
		if(this._carrying) {
			this._carrying.render(ctx, camera);
		}
	};
	Player.prototype.onKeyboardEvent = function(evt, keyboard) {
		var dir = {
			MOVE_UP: 'NORTH',
			MOVE_DOWN: 'SOUTH',
			MOVE_LEFT: 'WEST',
			MOVE_RIGHT: 'EAST'
		}[evt.gameKey];
		this._standingStill = keyboard.STAND_STILL;
		if(evt.gameKey === 'STAND_STILL' && evt.isDown) {
			this._bufferedMoveDir = null;
		}
		else if(dir) {
			if(evt.isDown) {
				this._moveDir = dir;
				if(!this._standingStill) {
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
			if(this._tile.onUsed(this)) {
				return;
			}
			else if(this.isCarrying()) {
				this.dropCarried();
				return;
			}
		}
	};
	return Player;
});