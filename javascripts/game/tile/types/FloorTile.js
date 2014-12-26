define([
	'game/tile/Tile',
	'game/Global'
], function(
	SUPERCLASS,
	Global
) {
	var NEXT_ID = 0;
	function FloorTile() {
		SUPERCLASS.call(this);
	}
	FloorTile.prototype = Object.create(SUPERCLASS.prototype);
	FloorTile.prototype.render = function(ctx, camera) {
		ctx.fillStyle = '#002';
		ctx.fillRect(this.col * Global.TILE_WIDTH - camera.x,
			this.row * Global.TILE_HEIGHT - camera.y,
			Global.TILE_WIDTH, Global.TILE_HEIGHT);
		/*if(this._occupants.length > 0 || this._reservedFor.length > 0) {
			ctx.strokeStyle = (this._occupants.length > 0 ? '#fff' : '#99f');
			ctx.lineWidth = 1;
			ctx.strokeRect(this.col * Global.TILE_WIDTH + 2 - camera.x,
				this.row * Global.TILE_HEIGHT + 2 - camera.y,
			Global.TILE_WIDTH - 4, Global.TILE_HEIGHT - 4);
		}*/
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	return FloorTile;
});