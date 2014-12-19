define(function() {
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
		return this._occupants.every(doesNotOccupyFullTile) &&
				this._reservedFor.every(doesNotOccupyFullTile);
	};

	//to be overridden
	Tile.prototype.render = function(ctx, camera) {
		for(var i = 0; i < this._occupants.length; i++) {
			this._occupants[i].render(ctx, camera);
		}
	};
	Tile.prototype.onEnter = function(occupant) {};
	Tile.prototype.onLeave = function(occupant) {};

	//helper methods
	function doesNotOccupyFullTile(occupant) {
		return !occupent.occupiesFullTile;
	}

	return Tile;
});