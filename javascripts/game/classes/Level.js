if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
	'game/classes/TileGrid'
], function(
	TileGrid
) {
	function Level() {
		this.backgroundColor = '#222';
		this.backgroundTileGrid = new TileGrid();
		this.tileGrid = new TileGrid();
		this.obstacles = [];
		this.widgets = [];
		this.actors = [];
		this.effects = [];
	}
	Level.prototype.startOfFrame = function() {};
	Level.prototype.endOfFrame = function() {};
	Level.prototype.renderHUD = function(ctx, camera) {};
	return Level;
});