define([
	'game/Global'
], function(
	Global
) {
	function Tile() {
		this._occupants = [];
		this._reservedFor = [];
	}
	Tile.prototype.addToTileGrid = function(tileGrid, col, row) {
		this._tileGrid = tileGrid;
		this.col = col;
		this.row = row;
	};
	Tile.prototype.reserveForOccupant = function(occupant) {
		this._reservedFor.push(occupant);
	};
	Tile.prototype.addOccupant = function(occupant) {
		this._reservedFor = this._reservedFor.filter(function(otherOccupant) {
			return !otherOccupant.sameAs(occupant);
		});
		this._occupants.push(occupant);
		this.onEnter(occupant);
		occupant.onEnter(this);
	};
	Tile.prototype.removeOccupant = function(occupant) {
		this._occupants = this._occupants.filter(function(otherOccupant) {
			return !otherOccupant.sameAs(occupant);
		});
		this._reservedFor = this._reservedFor.filter(function(otherOccupant) {
			return !otherOccupant.sameAs(occupant);
		});
		this.onLeave(occupant);
		occupant.onLeave(this);
	};
	Tile.prototype.canEnter = function(actor, dx, dy) {
		return ((actor && !actor.occupiesFullTile) ||
			(this._occupants.every(doesNotOccupyFullTile) &&
			this._reservedFor.every(doesNotOccupyFullTile))) &&
			this._occupants.every(function(occupant) {
				return occupant.sameAs(actor) || occupant.canEnter(actor, dx, dy);
			});
	};
	Tile.prototype.canLeave = function(actor, dx, dy) {
		return this._occupants.every(function(occupant) {
			return occupant.sameAs(actor) || occupant.canLeave(actor, dx, dy);
		});
	};
	Tile.prototype.canPushInto = function(pusher, dx, dy) {
		var tile = this._tileGrid.get(this.col + dx, this.row + dy);
		return tile &&
			this._occupants.every(function(occupant) {
				return ((occupant.pushWeight > 0 && tile.canEnter(occupant, dx, dy)) ||
					(!occupant.occupiesFullTile || !pusher.occupiesFullTile)) &&
					(occupant.sameAs(pusher) || occupant.canEnter(pusher, dx, dy));
			}) && this._reservedFor.every(doesNotOccupyFullTile);
	};
	Tile.prototype.pushOccupants = function(pusher, dx, dy) {
		//calculate push speed
		var pushWeight = 0;
		for(var i = 0; i < this._occupants.length; i++) {
			if(this._occupants[i].pushWeight > 0) {
				pushWeight += this._occupants[i].pushWeight;
			}
		}
		var pushSpeed = (pusher.pushStrength === 0 || pushWeight === 0 ?
			null : pusher.pushStrength / pushWeight);
		//push
		for(i = 0; i < this._occupants.length; i++) {
			if(this._occupants[i].pushWeight > 0) {
				this._occupants[i].getPushed(pushSpeed, dx, dy);
			}
		}
		return pushSpeed;
	};
	Tile.prototype.renderOccupants = function(ctx, camera) {
		for(var i = 0; i < this._occupants.length; i++) {
			var o = this._occupants[i];
			if(!(o.isMoving() && ((o.getFacing() === 'SOUTH' && !o.isHalfwayToNextTile) ||
					(o.getFacing() === 'NORTH' && o.isHalfwayToNextTile)))) {
				o.render(ctx, camera);
			}
		}
	};
	Tile.prototype.renderOccupantsMovingVertically = function(ctx, camera) {
		for(var i = 0; i < this._occupants.length; i++) {
			var o = this._occupants[i];
			if(o.isMoving() && ((o.getFacing() === 'SOUTH' && !o.isHalfwayToNextTile) ||
					(o.getFacing() === 'NORTH' && o.isHalfwayToNextTile))) {
				o.render(ctx, camera);
			}
		}
	};

	//to be overridden
	Tile.prototype.render = function(ctx, camera) {
		if(Global.DEBUG_DRAW_GRIDLINES) {
			ctx.strokeStyle = '#fff';
			ctx.lineWidth = 1;
			ctx.strokeRect(this.col * Global.TILE_WIDTH - camera.x,
				this.row * Global.TILE_HEIGHT - camera.y,
				Global.TILE_WIDTH, Global.TILE_HEIGHT);
		}
	};
	Tile.prototype.onEnter = function(occupant) {};
	Tile.prototype.onLeave = function(occupant) {};

	//helper methods
	function doesNotOccupyFullTile(occupant) {
		return !occupant.occupiesFullTile;
	}

	return Tile;
});