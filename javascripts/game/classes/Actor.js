define([
	'game/Global',
	'game/Utils'
], function(
	Global,
	Utils
) {
	var NEXT_ID = 0;
	function Actor(params) {
		this._actorId = NEXT_ID++;
		this._level = null;
		this._prevTile = null;
		this._tile = null;
		this._nextTile = null;
		this._facing = 'NORTH';
		this._facingMatters = params.facingMatters !== false;
		this.moveSpeed = params.moveSpeed || null;
		this.width = params.width || 0;
		this.height = params.height || 0;
		this.depth = (typeof params.depth === 'number' ? params.depth : this.width);
		this._moveFrame = null;
		this._framesUntilMovementComplete = null;
		this._framesUntilMovementHalfway = null;
		this.occupiesFullTile = (params.occupiesFullTile !== false);
		this.pushWeight = params.pushWeight || 0;
		this.pushStrength = params.pushStrength || 0;
		this._debugColor = params.debugColor || '#0a0';
		this._debugFillColor = params.debugFillColor || null;
		this.isHalfwayToNextTile = false;
		this.canCarry = params.canCarry || false;
		this.canBeCarried = params.canBeCarried || false;
		this._carrying = null;
		this._carriedBy = null;
		this.carryRenderOffset = { x: 0, y: 0 };
	}
	Actor.prototype.tick = function() {
		if(this._moveFrame !== null) {
			this._moveFrame++;
			if(this._nextTile !== null && this._moveFrame > this._framesUntilMovementHalfway) {
				this._tile.removeOccupant(this);
				this._tile = this._nextTile;
				this._tile.addOccupant(this);
				this.isHalfwayToNextTile = true;
			}
			if(this._moveFrame >= this._framesUntilMovementComplete) {
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
	Actor.prototype.move = function(dx, dy) { //or (dir)
		if(arguments.length === 1) {
			var vector = Utils.toVector(arguments[0]);
			dx = vector.x;
			dy = vector.y;
		}
		var dir = Utils.toDirection(dx, dy);
		if(this._moveFrame === null) {
			this._facing = dir;
			var nextTile = this._level.tileGrid.get(this.col + dx, this.row + dy);
			if(nextTile && this._tile.canLeave(this, dx, dy)) {
				if(nextTile.canEnter(this, dx, dy)) {
					this.isHalfwayToNextTile = false;
					this._nextTile = nextTile;
					this._moveFrame = 0;
					this._framesUntilMovementComplete = Global.TARGET_FRAMERATE / this.moveSpeed;
					this._framesUntilMovementHalfway = this._framesUntilMovementComplete / 2;
					this._nextTile.reserveForOccupant(this);
					return true;
				}
				else if(this.pushStrength > 0 && nextTile.canPushInto(this, dx, dy)) {
					this.isHalfwayToNextTile = false;
					this._nextTile = nextTile;
					var pushSpeed = this._nextTile.pushOccupants(this, dx, dy);
					this._moveFrame = 0;
					this._framesUntilMovementComplete = Global.TARGET_FRAMERATE / pushSpeed;
					this._framesUntilMovementHalfway = this._framesUntilMovementComplete / 2;
					this._nextTile.reserveForOccupant(this);
					return true;
				}
			}
		}
		return false;
	};
	Actor.prototype.getPushed = function(pushSpeed, dx, dy) { //or (pushSpeed, dir)
		if(arguments.length === 2) {
			var vector = Utils.toVector(arguments[0]);
			dx = vector.x;
			dy = vector.y;
		}
		var dir = Utils.toDirection(dx, dy);
		if(this._moveFrame === null) {
			this._facing = dir;
			var nextTile = this._level.tileGrid.get(this.col + dx, this.row + dy);
			if(nextTile) {
				if(nextTile.canEnter(this, dx, dy) && this._tile.canLeave(this, dx, dy)) {
					this.isHalfwayToNextTile = false;
					this._nextTile = nextTile;
					this._moveFrame = 0;
					this._framesUntilMovementComplete = Global.TARGET_FRAMERATE / pushSpeed;
					this._framesUntilMovementHalfway = this._framesUntilMovementComplete / 2;
					this._nextTile.reserveForOccupant(this);
					return true;
				}
			}
		}
		return false;
	};
	Actor.prototype.canEnter = function(actor, dx, dy) {
		return true;
	};
	Actor.prototype.canLeave = function(actor, dx, dy) {
		return true;
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
	Actor.prototype.onEnter = function(tile) {
		if(this.canCarry && !this._carrying) {
			var occupants = tile.getOccupants();
			for(var i = 0; i < occupants.length; i++) {
				if(!occupants[i].sameAs(this) && occupants[i].canBeCarried) {
					this.carry(occupants[i]);
					occupants[i].getCarriedBy(this);
					break;
				}
			}
		}
	};
	Actor.prototype.carry = function(actor) {
		this._carrying = actor;
	};
	Actor.prototype.getCarriedBy = function(actor) {
		this._carriedBy = actor;
		if(this._tile) {
			this._tile.removeOccupant(this);
			this._tile = null;
		}
	};
	Actor.prototype.getDropped = function(tile) {
		this._carriedBy = null;
		this._tile = tile;
		this._tile.addOccupant(this);
	};
	Actor.prototype.isBeingCarried = function() {
		return this._carriedBy !== null;
	};
	Actor.prototype.isCarrying = function() {
		return this._carrying !== null;
	};
	Actor.prototype.dropCarried = function() {
		if(this._carrying) {
			var vector = Utils.toVector(this._facing);
			var dx = vector.x;
			var dy = vector.y;
			var dropTile = this._level.tileGrid.get(this.col + dx, this.row + dy);
			if(dropTile && dropTile.canEnter(this._carrying, dx, dy) &&
					this._tile.canLeave(this._carrying, dx, dy)) {
				this._carrying.getDropped(dropTile);
				this._carrying = null;
				return true;
			}
		}
		return false;
	};
	Actor.prototype.onLeave = function(tile) {};
	Actor.prototype.render = function(ctx, camera) {
		if(Global.DEBUG_DRAW_ACTOR_BORDERS) {
			var x = (this._carriedBy ? this._carriedBy.x + this._carriedBy.carryRenderOffset.x : this.x);
			var y = (this._carriedBy ? this._carriedBy.y + this._carriedBy.carryRenderOffset.y : this.y);
			var perceivedDepth = this.depth * Global.DEBUG_DEPTH_MULT;
			var perceivedHeight = this.height * Global.DEBUG_HEIGHT_MULT;
			if(this._debugFillColor) {
				ctx.fillStyle = this._debugFillColor;
				ctx.fillRect(x - camera.x - this.width / 2,
					y - camera.y - perceivedHeight - perceivedDepth / 2,
					this.width, perceivedHeight + perceivedDepth);
			}
			ctx.strokeStyle = this._debugColor;
			ctx.lineWidth = 2;
			ctx.strokeRect(x - camera.x - this.width / 2,
				y - camera.y - perceivedDepth / 2 - perceivedHeight,
				this.width, perceivedDepth);
			ctx.strokeRect(x - camera.x - this.width / 2,
				y - camera.y - perceivedHeight - perceivedDepth / 2,
				this.width, perceivedHeight + perceivedDepth);
			ctx.lineWidth = 1;
			ctx.strokeRect(x - camera.x - this.width / 2,
				y - camera.y - perceivedDepth / 2,
				this.width, perceivedDepth);
			ctx.lineWidth = 4;
			if(this._facingMatters) {
				ctx.beginPath();
				ctx.moveTo(x - camera.x, y - camera.y - perceivedHeight);
				var dx = 0, dy = 0;
				if(this._facing === 'NORTH') { dy = -1; }
				else if(this._facing === 'EAST') { dx = 1; }
				else if(this._facing === 'SOUTH') { dy = 1; }
				else if(this._facing === 'WEST') { dx = -1; }
				ctx.lineTo(x - camera.x + dx * this.width / 2,
					y - camera.y - perceivedHeight + dy * perceivedDepth / 2);
				ctx.stroke();
			}
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
				var dx = colChange * this._moveFrame / this._framesUntilMovementComplete;
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
				var dy = rowChange * this._moveFrame / this._framesUntilMovementComplete;
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