define([
	'game/tile/TileGrid'
], function(
	TileGrid
) {
	function Level() {
		this.backgroundColor = '#222';
		this.backgroundTileGrid = new TileGrid();
		this.player = null;
		this.tileGrid = new TileGrid();
		this.obstacles = [];
		this.widgets = [];
		this.actors = [];
		this.effects = [];
		this.camera = { x: 0, y: 0 };
	}
	Level.prototype.startOfFrame = function() {};
	Level.prototype.endOfFrame = function() {};
	Level.prototype.renderHUD = function(ctx, camera) {};
	return Level;
});