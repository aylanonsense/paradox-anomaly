define([
	'game/Global'
], function(
	Global
) {
	var NEXT_ID = 0;
	function Actor(params) {
		this._actorId = NEXT_ID++;
		this._level = null;
		this._prevTile = null;
		this._tile = null;
		this._nextTile = null;
		this._facing = 'NORTH';
		this._framesToMoveBetweenTiles = (params.moveSpeed ?
			Global.TARGET_FRAMERATE / params.moveSpeed : null);
		this._moveFrame = null;
	}
	Actor.prototype.tick = function() {
		if(this._moveFrame !== null) {
			this._moveFrame--;
			if(this._nextTile !== null && this._moveFrame < this._framesToMoveBetweenTiles / 2) {
				this._tile.removeOccupant(this);
				this._tile = this._nextTile;
				this._tile.addOccupant(this);
				this._nextTile = null;
			}
			if(this._moveFrame === 0) {
				this._prevTile = this._tile;
				this._moveFrame = null;
			}
		}
	};
	Actor.prototype.sameAs = function(other) {
		return other && other._entityId == this._entityId;
	};
	Actor.prototype.addToLevel = function(level, tile) {
		this._level = level;
		this._prevTile = tile;
		this._tile = tile;
		this._tile.addOccupant(this);
	};
	Actor.prototype.move = function(dir) {
		if(this._moveFrame === null) {
			this._facing = dir;
			var dx = 0;
			var dy = 0;
			if(dir === 'NORTH') { dy = -1; }
			else if(dir === 'SOUTH') { dy = 1; }
			else if(dir === 'EAST') { dx = 1; }
			else if(dir === 'WEST') { dx = -1; }
			var nextTile = this._level.tileGrid.get(this.col + dx, this.row + dy);
			if(nextTile && nextTile.hasRoomFor(this)) {
				this._nextTile = nextTile;
				this._moveFrame = this._framesToMoveBetweenTiles;
			}
		}
	};
	Actor.prototype.isAlive = function() {
		return true;
	};
	Actor.prototype.startOfFrame = function() {};
	Actor.prototype.endOfFrame = function() {};
	Actor.prototype.onEnter = function(tile) {};
	Actor.prototype.onLeave = function(tile) {};
	Actor.prototype.render = function(ctx, camera) {};

	//define useful getters/setters
	Object.defineProperty(Actor.prototype, 'x', {
		get: function() {
			if(!this._tile) {
				return null;
			}
			return this._tile.col * Global.TILE_WIDTH;
		},
		set: function(x) { throw new Error("Cannot set x of Actor"); }
	});
	Object.defineProperty(Actor.prototype, 'y', {
		get: function() {
			if(!this._tile) {
				return null;
			}
			return this._tile.row * Global.TILE_HEIGHT;
		},
		set: function(y) { throw new Error("Cannot set y of Actor"); }
	});
	Object.defineProperty(Actor.prototype, 'col', {
		get: function() { return this._tile && this._tile.col; },
		set: function(col) { throw new Error("Cannot set col of Actor"); }
	});
	Object.defineProperty(Actor.prototype, 'row', {
		get: function() { return this._tile && this._tile.row; },
		set: function(row) { throw new Error("Cannot set row of Actor"); }
	});

	return Actor;
});