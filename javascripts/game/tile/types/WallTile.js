define([
	'game/tile/Tile',
	'game/Global'
], function(
	SUPERCLASS,
	Global
) {
	function WallTile() {
		SUPERCLASS.call(this);
	}
	WallTile.prototype = Object.create(SUPERCLASS.prototype);
	WallTile.prototype.canEnter = function(occupant, dx, dy) {
		return false;
	};
	WallTile.prototype.canPushInto = function(pusher, dx, dy) {
		return false;
	};
	WallTile.prototype.render = function(ctx, camera) {
		var perceivedHeight = 30 * Global.DEBUG_HEIGHT_MULT;
		ctx.fillStyle = '#666';
		ctx.fillRect(this.col * Global.TILE_WIDTH - camera.x,
			this.row * Global.TILE_HEIGHT - camera.y - perceivedHeight,
			Global.TILE_WIDTH, Global.TILE_HEIGHT);
		ctx.fillStyle = '#444';
		ctx.fillRect(this.col * Global.TILE_WIDTH - camera.x,
			(this.row + 1) * Global.TILE_HEIGHT - camera.y - perceivedHeight,
			Global.TILE_WIDTH, perceivedHeight);
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	return WallTile;
});