define([
	'game/object/GameObj',
	'game/Global',
	'game/util/toDirection'
], function(
	SUPERCLASS,
	Global,
	toDirection
) {
	function Door(params) {
		SUPERCLASS.call(this, params);
		this._dir = params.dir || 'NORTH';
		this._isLocked = true;
		this._debugColor = params.debugColor || '#fff';
	}
	Door.prototype = Object.create(SUPERCLASS.prototype);
	Door.prototype.getState = function() {
		var state = SUPERCLASS.prototype.getState.call(this);
		state.isLocked = this._isLocked;
		return state;
	};
	Door.prototype.loadState = function(state, prevFrame) {
		SUPERCLASS.prototype.loadState.call(this, state, prevFrame);
		this._isLocked = state.isLocked;
	};
	Door.prototype.lock = function() {
		this._isLocked = true;
	};
	Door.prototype.unlock = function() {
		this._isLocked = false;
	};
	Door.prototype.isLocked = function() {
		return this._isLocked;
	};
	Door.prototype.trigger = function(onOrOff) {
		if(onOrOff === true) {
			this.unlock();
		}
		else if(onOrOff === false) {
			this.lock();
		}
		else {
			this.toggleLocked();
		}
	}
	Door.prototype.toggleLocked = function(isLocked) {
		if(isLocked === true) {
			this.lock();
		}
		else if(isLocked === false || this.isLocked()) {
			this.unlock();
		}
		else {
			this.lock();
		}
	};
	Door.prototype.canEnter = function(obj, moveX, moveY) {
		if(!this.isAlive() || !obj.isAlive()) {
			return true;
		}
		var dir = toDirection(-moveX, -moveY);
		if(this.isLocked() && dir === this._dir) {
			return false;
		}
		return SUPERCLASS.prototype.canEnter.call(this, obj, moveX, moveY);
	};
	Door.prototype.canLeave = function(obj, moveX, moveY) {
		if(!this.isAlive() || !obj.isAlive()) {
			return true;
		}
		var dir = toDirection(moveX, moveY);
		if(this.isLocked() && dir === this._dir) {
			return false;
		}
		return SUPERCLASS.prototype.canLeave.call(this, obj, moveX, moveY);
	};
	Door.prototype.render = function(ctx, camera) {
		if(this.isLocked()) {
			ctx.fillStyle = this._debugColor;
			if(this._dir === 'NORTH') {
				ctx.fillRect(this.tileX - camera.x, this.tileY + 5 - camera.y,
					Global.TILE_WIDTH, 15);
			}
			else if(this._dir === 'SOUTH') {
				ctx.fillRect(this.tileX - camera.x, this.tileY + Global.TILE_HEIGHT - 20 - camera.y,
					Global.TILE_WIDTH, 15);
			}
			else if(this._dir === 'EAST') {
				ctx.fillRect(this.tileX + Global.TILE_WIDTH - 20 - camera.x, this.tileY - camera.y,
					15, Global.TILE_HEIGHT);
			}
			else if(this._dir === 'WEST') {
				ctx.fillRect(this.tileX + 5 - camera.x, this.tileY - camera.y,
					15, Global.TILE_HEIGHT);
			}
		}
		else {
			ctx.strokeStyle = this._debugColor;
			ctx.lineWidth = 3;
			if(this._dir === 'NORTH') {
				ctx.strokeRect(this.tileX - camera.x, this.tileY + 5 - camera.y,
					Global.TILE_WIDTH, 15);
			}
			else if(this._dir === 'SOUTH') {
				ctx.strokeRect(this.tileX - camera.x, this.tileY + Global.TILE_HEIGHT - 20 - camera.y,
					Global.TILE_WIDTH, 15);
			}
			else if(this._dir === 'EAST') {
				ctx.strokeRect(this.tileX + Global.TILE_WIDTH - 20 - camera.x, this.tileY - camera.y,
					15, Global.TILE_HEIGHT);
			}
			else if(this._dir === 'WEST') {
				ctx.strokeRect(this.tileX + 5 - camera.x, this.tileY - camera.y,
					15, Global.TILE_HEIGHT);
			}
		}
	};
	return Door;
});