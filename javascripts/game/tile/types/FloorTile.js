define([
	'game/tile/Tile',
	'game/Global'
], function(
	SUPERCLASS,
	Global
) {
	function FloorTile(col, row) {
		SUPERCLASS.call(this, col, row);
	}
	FloorTile.prototype = Object.create(SUPERCLASS.prototype);
	FloorTile.prototype.render = function(ctx, camera) {
		ctx.fillStyle = '#ddd';
		ctx.fillRect(this.col * Global.TILE_WIDTH - camera.x,
			this.row * Global.TILE_HEIGHT - camera.y,
			Global.TILE_WIDTH, Global.TILE_HEIGHT);
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	return FloorTile;
});