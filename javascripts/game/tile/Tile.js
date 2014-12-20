define([
	'game/Global'
], function(
	Global
) {
	function Tile(col, row) {
		this.col = col;
		this.row = row;
		this._occupants = [];
		this._reservedFor = [];
	}
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
	Tile.prototype.hasRoomFor = function(occupant) {
		return (occupant && !occupant.occupiesFullTile) ||
			(this._occupants.every(doesNotOccupyFullTile) &&
			this._reservedFor.every(doesNotOccupyFullTile));
	};
	Tile.prototype.renderOccupants = function(ctx, camera) {
		for(var i = 0; i < this._occupants.length; i++) {
			this._occupants[i].render(ctx, camera);
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