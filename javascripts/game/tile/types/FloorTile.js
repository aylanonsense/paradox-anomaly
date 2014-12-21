define([
	'game/tile/Tile',
	'game/Global'
], function(
	SUPERCLASS,
	Global
) {
	function FloorTile() {
		SUPERCLASS.call(this);
	}
	FloorTile.prototype = Object.create(SUPERCLASS.prototype);
	FloorTile.prototype.render = function(ctx, camera) {
		if(this._occupants.length > 0) {
			ctx.fillStyle = '#aaf';
		}
		else if(this._reservedFor.length > 0) {
			ctx.fillStyle = '#cce';
		}
		else {
			ctx.fillStyle = '#ddd';
		}
		ctx.fillRect(this.col * Global.TILE_WIDTH - camera.x,
			this.row * Global.TILE_HEIGHT - camera.y,
			Global.TILE_WIDTH, Global.TILE_HEIGHT);
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	return FloorTile;
});