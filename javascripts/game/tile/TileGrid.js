define([
	'game/Global',
	'game/tile/Tile',
	'game/tile/tile-config'
], function(
	Global,
	Tile,
	config
) {
	//create a lookup table of tile symbols
	var TILE_SYMBOL_LOOKUP = {};
	for(var key in config) {
		TILE_SYMBOL_LOOKUP[config[key].symbol] = config[key];
	}

	function TileGrid() {
		this._reset();
	}
	TileGrid.prototype._reset = function() {
		this._tiles = { minRow: null, maxRow: null };
	};
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
	TileGrid.prototype.loadFromMap = function(map) {
		this._reset();
		for(var r = 0; r < map.tiles.length; r++) {
			for(var c = 0; c < map.tiles[r].length; c++) {
				if(map.tiles[r][c] !== ' ') {
					var params = TILE_SYMBOL_LOOKUP[map.tiles[r][c]];
					var frame = charToNum(map.frames && map.frames[r] && map.frames[r][c]);
					var variant = charToNum(map.variants && map.variants[r] && map.variants[r][c]);
					this.add(new Tile(c, r, params, frame, variant));
				}
			}
		}
	};

	//helper functions
	function charToNum(c) {
		c = c || '0';
		var frame = c.charCodeAt(0);
		return (frame > 64 ? frame - 55 : frame - 48);
	}
	function numToChar(frame) {
		frame = frame || '0';
		return String.fromCharCode((frame > 9 ? frame + 55 : frame + 48));
	}

	return TileGrid;
});