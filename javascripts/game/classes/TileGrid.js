define([
	'game/Global'
], function(
	Global
) {
	function TileGrid() {
		this._tiles = { minRow: null, maxRow: null };
	}
	TileGrid.prototype.get = function(col, row) {
		return (this._tiles[row] && this._tiles[row][col]) || null;
	};
	TileGrid.prototype.add = function(tile) {
		if(this._tiles.minRow === null || tile.row < this._tiles.minRow) {
			this._tiles.minRow = tile.row;
		}
		if(this._tiles.maxRow === null || tile.row > this._tiles.maxRow) {
			this._tiles.maxRow = tile.row;
		}
		if(!this._tiles[tile.row]) {
			this._tiles[tile.row] = { minCol: tile.col, maxCol: tile.col };
		}
		else {
			if(tile.col < this._tiles[tile.row].minCol) {
				this._tiles[tile.row].minCol = tile.col;
			}
			else if(tile.col > this._tiles[tile.row].maxCol) {
				this._tiles[tile.row].maxCol = tile.col;
			}
		}
		this._tiles[tile.row][tile.col] = tile;
		return tile;
	};
	TileGrid.prototype.remove = function(col, row) {
		if(this._tiles[row] && this._tiles[row][col]) {
			//we don't clean up the min/max row/col, but that's perfectly fine
			delete this._tiles[row][col];
		}
	};
	TileGrid.prototype.getTilesOverlapping = function(rect) {
		var tiles = [];
		var rowOfRectTop = Math.floor(rect.y / Global.TILE_SIZE);
		var rowOfRectBottom = Math.floor((rect.y + rect.height) / Global.TILE_SIZE);
		var colOfRectLeft = Math.floor(rect.x / Global.TILE_SIZE);
		var colOfRectRight = Math.floor((rect.x + rect.width) / Global.TILE_SIZE);
		for(var r = rowOfRectTop; r <= rowOfRectBottom; r++) {
			for(var c = colOfRectLeft; c <= colOfRectRight; c++) {
				if(this._tiles[r] && this._tiles[r][c]) {
					tiles.push(this._tiles[r][c]);
				}
			}
		}
		return tiles;
	};
	TileGrid.prototype.render = function(ctx, camera) {
		if(this._tiles.minRow !== null) {
			for(var r = this._tiles.minRow; r <= this._tiles.maxRow; r++) {
				if(this._tiles[r]) {
					for(var c = this._tiles[r].minCol; c <= this._tiles[r].maxCol; c++) {
						if(this._tiles[r][c]) {
							this._tiles[r][c].render(ctx, camera);
						}
					}
				}
			}
		}
	};
	TileGrid.prototype.getMinCol = function() {
		var minCol = null;
		for(var r = this._tiles.minRow; r <= this._tiles.maxRow; r++) {
			if(this._tiles[r] && (minCol === null || this._tiles[r].minCol < minCol)) {
				minCol = this._tiles[r].minCol;
			}
		}
		return minCol;
	};
	TileGrid.prototype.getMaxCol = function() {
		var maxCol = null;
		for(var r = this._tiles.minRow; r <= this._tiles.maxRow; r++) {
			if(this._tiles[r] && (maxCol === null || this._tiles[r].maxCol > maxCol)) {
				maxCol = this._tiles[r].maxCol;
			}
		}
		return maxCol;
	};
	TileGrid.prototype.getMinRow = function() {
		return this._tiles.minRow;
	};
	TileGrid.prototype.getMaxRow = function() {
		return this._tiles.maxRow;
	};
	return TileGrid;
});