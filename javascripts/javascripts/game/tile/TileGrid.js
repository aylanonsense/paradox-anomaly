define(function() {
	function TileGrid() {
		this._tiles = { minRow: null, maxRow: null };
	}
	TileGrid.prototype.get = function(col, row) {
		return (this._tiles[row] && this._tiles[row][col]) || null;
	};
	TileGrid.prototype.add = function(tile, col, row) {
		if(this._tiles.minRow === null || row < this._tiles.minRow) {
			this._tiles.minRow = row;
		}
		if(this._tiles.maxRow === null || row > this._tiles.maxRow) {
			this._tiles.maxRow = row;
		}
		if(!this._tiles[row]) {
			this._tiles[row] = { minCol: col, maxCol: col };
		}
		else {
			if(col < this._tiles[row].minCol) {
				this._tiles[row].minCol = col;
			}
			else if(col > this._tiles[row].maxCol) {
				this._tiles[row].maxCol = col;
			}
		}
		this._tiles[row][col] = tile;
		tile.addToTileGrid(this, col, row);
		return tile;
	};
	TileGrid.prototype.remove = function(col, row) {
		if(this._tiles[row] && this._tiles[row][col]) {
			//we don't clean up the min/max row/col, but that's perfectly fine
			delete this._tiles[row][col];
		}
	};
	TileGrid.prototype.render = function(ctx, camera) {
		if(this._tiles.minRow !== null) {
			for(var r = this._tiles.minRow; r <= this._tiles.maxRow + 1; r++) {
				var c;
				//render the tile
				if(this._tiles[r]) {
					for(c = this._tiles[r].minCol; c <= this._tiles[r].maxCol; c++) {
						if(this._tiles[r][c]) {
							this._tiles[r][c].render(ctx, camera);
						}
					}
				}
				//render (SOME) occupants of previous row
				if(this._tiles[r - 1]) {
					for(c = this._tiles[r - 1].minCol; c <= this._tiles[r - 1].maxCol; c++) {
						if(this._tiles[r - 1][c]) {
							this._tiles[r - 1][c].renderPriorityOccupants(ctx, camera);
						}
					}
				}
				//render occupants
				if(this._tiles[r]) {
					for(c = this._tiles[r].minCol; c <= this._tiles[r].maxCol; c++) {
						if(this._tiles[r][c]) {
							this._tiles[r][c].renderOccupants(ctx, camera);
						}
					}
				}
			}
		}
	};

	//define useful getters/setters
	Object.defineProperty(TileGrid.prototype, 'minCol', {
		get: function() {
			var minCol = null;
			for(var r = this._tiles.minRow; r <= this._tiles.maxRow; r++) {
				if(this._tiles[r] && (minCol === null || this._tiles[r].minCol < minCol)) {
					minCol = this._tiles[r].minCol;
				}
			}
			return minCol;
		},
		set: function(x) { throw new Error("Cannot set minCol of TileGrid"); }
	});
	Object.defineProperty(TileGrid.prototype, 'maxCol', {
		get: function() {
			var maxCol = null;
			for(var r = this._tiles.minRow; r <= this._tiles.maxRow; r++) {
				if(this._tiles[r] && (maxCol === null || this._tiles[r].maxCol > maxCol)) {
					maxCol = this._tiles[r].maxCol;
				}
			}
			return maxCol;
		},
		set: function(y) { throw new Error("Cannot set maxCol of TileGrid"); }
	});
	Object.defineProperty(TileGrid.prototype, 'minRow', {
		get: function() { return this._tiles.minRow; },
		set: function(x) { throw new Error("Cannot set minRow of TileGrid"); }
	});
	Object.defineProperty(TileGrid.prototype, 'maxRow', {
		get: function() { return this._tiles.maxRow; },
		set: function(y) { throw new Error("Cannot set maxRow of TileGrid"); }
	});

	return TileGrid;
});