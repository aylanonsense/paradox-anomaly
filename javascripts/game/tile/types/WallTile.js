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
	function WallTile() {
		SUPERCLASS.call(this, { type: 'WALL' });
	}
	WallTile.prototype = Object.create(SUPERCLASS.prototype);
	WallTile.prototype.render = function(ctx, camera) {
		var tileBelow = this._tileGrid.get(this.col, this.row + 1);
		SPRITE.render(ctx, camera, (this.col - 0) * Global.TILE_WIDTH,
			(this.row - 0) * Global.TILE_HEIGHT,
			(tileBelow && tileBelow.type === 'WALL' ? 2 : 1), false);
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	WallTile.prototype.canEnter = function(occupant, moveX, moveY) {
		return false;
	};
	WallTile.prototype.canPush = function(occupant, moveX, moveY) {
		return false;
	};
	return WallTile;
});