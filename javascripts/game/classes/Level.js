define([
	'game/tile/TileGrid'
], function(
	TileGrid
) {
	function Level() {
		this.backgroundColor = '#222';
		this.player = null;
		this.tileGrid = new TileGrid();
		this.actors = [];
		this.camera = { x: 0, y: 0 };
	}
	Level.prototype.startOfFrame = function() {};
	Level.prototype.endOfFrame = function() {};
	Level.prototype.onKeyboardEvent = function(evt, keyboard) {
		if(this.player) {
			this.player.onKeyboardEvent(evt, keyboard);
		}
	};
	Level.prototype.onMouseEvent = function(evt) {};
	Level.prototype.spawnActor = function(actor, tile) {
		this.actors.push(actor);
		actor.addToLevel(this, tile);
	};
	return Level;
});