define([
	'game/object/ActionGameObj',
	'game/Global'
], function(
	SUPERCLASS,
	Global
) {
	function MovableGameObj(params) {
		SUPERCLASS.call(this, params);
		this._defaultSpeed = params.speed || 1;
		this._moveX = 0;
		this._moveY = 0;
		this._prevTile = null;
		this._nextTile = null;
	}
	MovableGameObj.prototype = Object.create(SUPERCLASS.prototype);
	MovableGameObj.prototype.addToLevel = function(level, tile) {
		SUPERCLASS.prototype.addToLevel.call(this, level, tile);
		this._prevTile = this._tile;
		this._nextTile = null;
	};
	MovableGameObj.prototype.startOfFrame = function() {
		SUPERCLASS.prototype.startOfFrame.call(this);
		if(this.isMoving() && this._nextTile !== null &&
			this._currentActionFramesLeft <= this._currentActionFrames / 2) {
			this._tile.removeOccupant(this);
			this._tile = this._nextTile;
			this._nextTile = null;
			this._tile.addOccupant(this);
		}
	};
	MovableGameObj.prototype.move = function(moveX, moveY, speed) {
		speed = speed || this._defaultSpeed;
		if(!this.isPerformingAction()) {
			this._nextTile = this._level.tileGrid.get(this.col + moveX, this.row + moveY);
			if(this._nextTile && this._nextTile.canEnter(this, moveX, moveY)) {
				this._moveX = moveX;
				this._moveY = moveY;
				this._prevTile = this._tile;
				this._nextTile.reserveForOccupant(this);
				this._setCurrentAction('moving', Math.max(2, Math.ceil(Global.TARGET_FRAMERATE / speed)));
				return true;
			}
		}
		return false;
	};
	MovableGameObj.prototype.isMoving = function() {
		return this._currentAction === 'moving';
	};
	MovableGameObj.prototype._getX = function() {
		var x = SUPERCLASS.prototype._getX.call(this);
		if(this.isMoving()) {
			var p = this._currentActionFramesLeft / this._currentActionFrames;
			return x + Global.TILE_WIDTH * (this._nextTile ? 1 - p : -p) * this._moveX;
		}
		else {
			return x;
		}
	};
	MovableGameObj.prototype._getY = function() {
		var y = SUPERCLASS.prototype._getY.call(this);
		if(this.isMoving()) {
			var p = this._currentActionFramesLeft / this._currentActionFrames;
			return y + Global.TILE_HEIGHT * (this._nextTile ? 1 - p : -p) * this._moveY;
		}
		else {
			return y;
		}
	};
	MovableGameObj.prototype.renderAboveRowBelow = function() {
		return ((this._moveY === 1 && this._nextTile !== null) ||
			(this._moveY === -1 && this._nextTile === null)) && this.isMoving();
	};
	return MovableGameObj;
});