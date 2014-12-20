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
		this.width = params.width || 0;
		this.height = params.height || 0;
		this.depth = (typeof params.depth === 'number' ? params.depth : this.width);
		this._moveFrame = null;
		this.occupiesFullTile = (params.occupiesFullTile !== false);
		this._debugColor = params.debugColor || '#0a0';
		this._debugFillColor = params.debugFillColor || null;
	}
	Actor.prototype.tick = function() {
		if(this._moveFrame !== null) {
			this._moveFrame--;
			if(this._nextTile !== null && this._moveFrame < this._framesToMoveBetweenTiles / 2) {
				this._tile.removeOccupant(this);
				this._tile = this._nextTile;
				this._tile.addOccupant(this);
			}
			if(this._moveFrame === 0) {
				this._moveFrame = null;
				this._prevTile = this._tile;
				this._nextTile = null;
			}
		}
	};
	Actor.prototype.sameAs = function(other) {
		return other && other._actorId == this._actorId;
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
	Actor.prototype.isMoving = function() {
		return this._moveFrame !== null;
	};
	Actor.prototype.getFacing = function() {
		return this._facing;
	};
	Actor.prototype.isAlive = function() {
		return true;
	};
	Actor.prototype.startOfFrame = function() {};
	Actor.prototype.endOfFrame = function() {};
	Actor.prototype.onEnter = function(tile) {};
	Actor.prototype.onLeave = function(tile) {};
	Actor.prototype.render = function(ctx, camera) {
		if(Global.DEBUG_DRAW_ACTOR_BORDERS) {
			var perceivedDepth = this.depth * Global.DEBUG_DEPTH_MULT;
			var perceivedHeight = this.height * Global.DEBUG_HEIGHT_MULT;
			if(this._debugFillColor) {
				ctx.fillStyle = this._debugFillColor;
				ctx.fillRect(this.x - camera.x - this.width / 2,
					this.y - camera.y - perceivedHeight - perceivedDepth / 2,
					this.width, perceivedHeight + perceivedDepth);
			}
			ctx.strokeStyle = this._debugColor;
			ctx.lineWidth = 2;
			ctx.strokeRect(this.x - camera.x - this.width / 2,
				this.y - camera.y - perceivedDepth / 2 - perceivedHeight,
				this.width, perceivedDepth);
			ctx.strokeRect(this.x - camera.x - this.width / 2,
				this.y - camera.y - perceivedHeight - perceivedDepth / 2,
				this.width, perceivedHeight + perceivedDepth);
			ctx.lineWidth = 1;
			ctx.strokeRect(this.x - camera.x - this.width / 2,
				this.y - camera.y - perceivedDepth / 2,
				this.width, perceivedDepth);
		}
	};

	//define useful getters/setters
	Object.defineProperty(Actor.prototype, 'x', {
		get: function() {
			if(!this._tile) {
				return null;
			}
			else if(this._moveFrame !== null) {
				var colChange = this._nextTile.col - this._prevTile.col;
				var dx = colChange * (1 - this._moveFrame / this._framesToMoveBetweenTiles);
				return (this._prevTile.col + 0.5 + dx) * Global.TILE_WIDTH;
			}
			else {
				return (this._tile.col + 0.5) * Global.TILE_WIDTH;
			}
		},
		set: function(x) { throw new Error("Cannot set x of Actor"); }
	});
	Object.defineProperty(Actor.prototype, 'y', {
		get: function() {
			if(!this._tile) {
				return null;
			}
			else if(this._moveFrame !== null) {
				var rowChange = this._nextTile.row - this._prevTile.row;
				var dy = rowChange * (1 - this._moveFrame / this._framesToMoveBetweenTiles);
				return (this._prevTile.row + 0.5 + dy) * Global.TILE_HEIGHT;
			}
			else {
				return (this._tile.row + 0.5) * Global.TILE_HEIGHT;
			}
		},
		set: function(y) { throw new Error("Cannot set y of Actor"); }
	});
	Object.defineProperty(Actor.prototype, 'renderX', {
		get: function() { return this.x - this.width / 2; },
		set: function(x) { throw new Error("Cannot set renderX of Actor"); }
	});
	Object.defineProperty(Actor.prototype, 'renderY', {
		get: function() { return this.y - this.height; },
		set: function(y) { throw new Error("Cannot set renderY of Actor"); }
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