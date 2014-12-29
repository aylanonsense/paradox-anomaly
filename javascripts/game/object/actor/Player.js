define([
	'game/object/actor/Actor',
	'game/util/toVector',
	'game/util/toDirection',
	'create!game/display/Sprite > GreenWoman',
	'create!game/display/Sprite > TimeTravelFlash'
], function(
	SUPERCLASS,
	toVector,
	toDirection,
	SPRITE,
	FLASH_SPRITE
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
		this._isPastSelf = false;
		this._actionHistory = [];
		this._spawnTime = null;
		this._despawnTime = null;
		this._moveFrames = 0;
	}
	Player.prototype = Object.create(SUPERCLASS.prototype);
	Player.prototype.addToLevel = function(level, tile) {
		SUPERCLASS.prototype.addToLevel.call(this, level, tile);
		this._spawnTime = this._level.frame;
	};
	Player.prototype.dupe = function() {
		var dupe = new Player();
		dupe._isStandingStill = this._isStandingStill;
		dupe._moveDir = this._moveDir;
		dupe._bufferedMoveDir = this._bufferedMoveDir;
		return dupe;
	};
	Player.prototype.makePastSelf = function() {
		this._isPastSelf = true;
		this._debugColor = '#0ff';
	};
	Player.prototype.move = function(moveX, moveY, speed) {
		speed = speed || this._defaultSpeed;
		var facing = this._facing;
		if(SUPERCLASS.prototype.move.call(this, moveX, moveY, speed)) {
			if(!this._isPastSelf) {
				this._actionHistory.push({
					action: 'MOVE',
					frame: this._level.frame,
					moveX: moveX,
					moveY: moveY,
					speed: speed
				});
			}
			return true;
		}
		if(facing !== this._facing && !this._isPastSelf) {
			this._actionHistory.push({
				action: 'TURN',
				frame: this._level.frame,
				facing: this._facing
			});
		}
		return false;
	};
	Player.prototype.startOfFrame = function(frame) {
		SUPERCLASS.prototype.startOfFrame.call(this, frame);
		this._moveFrames += (this.isMoving() ? 1 : 0);
		if(this._isPastSelf) {
			this._isDead = (this._level.frame < this._spawnTime ||
					this._level.frame >= this._despawnTime);
			for(var i = 0; i < this._actionHistory.length; i++) {
				if(this._actionHistory[i].frame === this._level.frame) {
					this._processAction(this._actionHistory[i]);
				}
			}
		}
		else if(!this.isMoving()) {
			if(this._isStandingStill) {
				if(this._moveDir) {
					this._facing = this._moveDir;
					this._actionHistory.push({
						action: 'TURN',
						frame: this._level.frame,
						facing: this._facing
					});
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
	Player.prototype._processAction = function(action) {
		if(action.action === 'MOVE') {
			if(!this.move(action.moveX, action.moveY, action.speed)) {
				this._isCorrupt = true;
				this._debugColor = '#f00';
			}
		}
		else if(action.action === 'TURN') {
			this._facing = action.facing;
		}
		else if(action.action === 'USE') {
			this._attemptToUse();
		}
	};
	Player.prototype._attemptToUse = function() {
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
	};
	Player.prototype.onKeyboardEvent = function(evt, keyboard) {
		if(!this._isPastSelf) {
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
				this._actionHistory.push({
					action: 'USE',
					frame: this._level.frame
				});
				this._attemptToUse();
			}
			else if(evt.gameKey === 'TIME_TRAVEL' && evt.isDown) {
				this._despawnTime = this._level.frame;
				this._level.rewindState(5 * 60);
			}
		}
	};
	Player.prototype.render = function(ctx, camera) {
		var frame;
		var x = this.x - SPRITE.width / 2;
		var y = this.y - SPRITE.height * 0.8;
		if(this._facing === 'NORTH') { frame = 3; }
		else if(this._facing === 'SOUTH') { frame = 0; }
		else if(this._facing === 'EAST') { frame = 6; }
		else if(this._facing === 'WEST') { frame = 9; }
		if(this._isPastSelf) { frame += 12; }
		if(this.isMoving()) {
			frame += (this._moveFrames % 30 > 15 ? 2 : 1);
		}

		//draw time travel flash and player sprite
		var spawnFlashFrame = Math.floor((this._level.frame - this._spawnTime) / 3);
		var despawnFlashFrame = (this._despawnTime === null ? -1 :
			5 - Math.floor((this._despawnTime -  this._level.frame) / 3));
		if(0 <= spawnFlashFrame && spawnFlashFrame < 6) {
			if(spawnFlashFrame >= 2 || !this._isPastSelf) {
				SPRITE.render(ctx, camera, x, y, frame, false);
			}
			FLASH_SPRITE.render(ctx, camera, x, y,
				(this._isPastSelf ? 6 : 0) + spawnFlashFrame, false);
		}
		else if(0 <= despawnFlashFrame && despawnFlashFrame < 6) {
			if(despawnFlashFrame < 2 || !this._isPastSelf) {
				SPRITE.render(ctx, camera, x, y, frame, false);
			}
			FLASH_SPRITE.render(ctx, camera, x, y,
				(this._isPastSelf ? 6 : 0) + despawnFlashFrame, false);
		}
		else {
			SPRITE.render(ctx, camera, x, y, frame, false);
		}
	};
	return Player;
});