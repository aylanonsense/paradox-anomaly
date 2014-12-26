define([
	'game/tile/Tile',
	'game/Global'
], function(
	SUPERCLASS,
	Global
) {
	var NEXT_ID = 0;
	function WallTile() {
		SUPERCLASS.call(this);
	}
	WallTile.prototype = Object.create(SUPERCLASS.prototype);
	WallTile.prototype.render = function(ctx, camera) {
		ctx.fillStyle = '#00b';
		ctx.fillRect(this.col * Global.TILE_WIDTH - camera.x,
			this.row * Global.TILE_HEIGHT - camera.y,
			Global.TILE_WIDTH, Global.TILE_HEIGHT);
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	WallTile.prototype.canEnter = function(occupant, moveX, moveY) {
		return false;
	};
	return WallTile;
});