define([
	'game/Global'
], function(
	Global
) {
	var NEXT_ID = 0;
	function GameObj(params) {
		params = params || {};
		this.id = NEXT_ID++;
		this._level = null;
		this._tile = null;
		this.fillsTile = (params.fillsTile === true);
		this.canCarryItems = (params.canCarryItems === true);
		this.isPushable = (params.isPushable === true);
	}
	GameObj.prototype.addToLevel = function(level, tile) {
		this._level = level;
		this._tile = tile;
		if(this._tile) {
			this._tile.addOccupant(this);
		}
	};
	GameObj.prototype.sameAs = function(other) {
		return other && other.id == this.id;
	};
	GameObj.prototype.getState = function() {
		return { tile: this._tile };
	};
	GameObj.prototype.loadState = function(state) {
		if(this._tile) {
			this._tile.removeOccupant(this, false);
		}
		this._tile = state.tile;
		this._tile.addOccupant(this, false);
	};
	GameObj.prototype.renderAboveRowBelow = function() {
		return false;
	};
	GameObj.prototype.startOfFrame = function() {};
	GameObj.prototype.tick = function() {};
	GameObj.prototype.endOfFrame = function() {};
	GameObj.prototype.use = function(obj, dir, isDistant) {
		return false;
	};
	GameObj.prototype.render = function(ctx, camera) {};
	GameObj.prototype.isAlive = function() {
		return true;
	};
	GameObj.prototype.canEnter = function(obj, moveX, moveY) {
		return !this.fillsTile || !obj.fillsTile;
	};
	GameObj.prototype.canLeave = function(obj, moveX, moveY) {
		return true;
	};
	GameObj.prototype.onEnter = function(obj) {};

	//define useful getters/setters
	GameObj.prototype._getX = function() {
		return (this._tile.col + 0.5) * Global.TILE_WIDTH;
	};
	Object.defineProperty(GameObj.prototype, 'x', {
		get: function() {
			if(!this._tile) {
				throw new Error("Cannot access 'x' of GameObj before it is added to level");
			}
			else {
				return this._getX();
			}
		},
		set: function(x) { throw new Error("Cannot set 'x' of GameObj"); }
	});
	GameObj.prototype._getY = function() {
		return (this._tile.row + 0.5) * Global.TILE_HEIGHT;
	};
	Object.defineProperty(GameObj.prototype, 'y', {
		get: function() {
			if(!this._tile) {
				throw new Error("Cannot access 'y' of GameObj before it is added to level");
			}
			else {
				return this._getY();
			}
		},
		set: function(y) { throw new Error("Cannot set 'y' of GameObj"); }
	});
	Object.defineProperty(GameObj.prototype, 'col', {
		get: function() {
			if(!this._tile) {
				throw new Error("Cannot access 'col' of GameObj before it is added to level");
			}
			else {
				return this._tile.col;
			}
		},
		set: function(col) { throw new Error("Cannot set 'col' of GameObj"); }
	});
	Object.defineProperty(GameObj.prototype, 'row', {
		get: function() {
			if(!this._tile) {
				throw new Error("Cannot access 'row' of GameObj before it is added to level");
			}
			else {
				return this._tile.row;
			}
		},
		set: function(row) { throw new Error("Cannot set 'row' of GameObj"); }
	});
	Object.defineProperty(GameObj.prototype, 'tileX', {
		get: function() {
			if(!this._tile) {
				throw new Error("Cannot access 'tileX' of GameObj before it is added to level");
			}
			else {
				return this._tile.col * Global.TILE_WIDTH;
			}
		},
		set: function(tileX) { throw new Error("Cannot set 'tileX' of GameObj"); }
	});
	Object.defineProperty(GameObj.prototype, 'tileY', {
		get: function() {
			if(!this._tile) {
				throw new Error("Cannot access 'tileY' of GameObj before it is added to level");
			}
			else {
				return this._tile.row * Global.TILE_HEIGHT;
			}
		},
		set: function(tileY) { throw new Error("Cannot set 'tileY' of GameObj"); }
	});

	return GameObj;
});