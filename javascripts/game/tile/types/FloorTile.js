define([
	'game/tile/Tile',
	'game/Global',
	'create!game/display/Sprite > DefaultTile'
], function(
	SUPERCLASS,
	Global,
	SPRITE
) {
	var NEXT_ID = 0;
	function FloorTile() {
		SUPERCLASS.call(this, { type: 'FLOOR' });
	}
	FloorTile.prototype = Object.create(SUPERCLASS.prototype);
	FloorTile.prototype.render = function(ctx, camera) {
		SPRITE.render(ctx, camera, (this.col - 0) * Global.TILE_WIDTH,
			(this.row - 0) * Global.TILE_HEIGHT, 0, false);
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	return FloorTile;
});