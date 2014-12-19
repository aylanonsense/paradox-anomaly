define([
	'game/tile/Tile',
	'game/Global'
], function(
	SUPERCLASS,
	Global
) {
	function WallTile(col, row) {
		SUPERCLASS.call(this, col, row);
	}
	WallTile.prototype = Object.create(SUPERCLASS.prototype);
	WallTile.prototype.hasRoomFor = function(occupant) {
		return false;
	};
	WallTile.prototype.render = function(ctx, camera) {
		ctx.fillStyle = '#444';
		ctx.fillRect(this.col * Global.TILE_WIDTH - camera.x,
			this.row * Global.TILE_HEIGHT - camera.y,
			Global.TILE_WIDTH, Global.TILE_HEIGHT);
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	return WallTile;
});