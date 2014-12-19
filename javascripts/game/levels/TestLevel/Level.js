define([
	'game/classes/Level',
	'game/Global',
	'game/levels/TestLevel/Robot',
	'game/tile/types/FloorTile',
	'game/tile/types/WallTile'
], function(
	SUPERCLASS,
	Global,
	Robot,
	FloorTile,
	WallTile
) {
	function Level() {
		SUPERCLASS.call(this);
		this.backgroundColor = '#333';
		for(var c = 0; c < 9; c++) {
			for(var r = 0; r < 9; r++) {
				this.tileGrid.add(new FloorTile(c, r));
			}
		}
		this.tileGrid.add(new WallTile(4, 5));
		this.tileGrid.add(new WallTile(4, 6));
		this.tileGrid.add(new WallTile(5, 6));
		this.tileGrid.add(new WallTile(2, 3));
		this.tileGrid.add(new WallTile(8, 2));
		this.camera.x = -Global.CANVAS_WIDTH / 2 + Global.TILE_WIDTH / 2 *
				(this.tileGrid.getMaxCol() - this.tileGrid.getMinCol());
		this.camera.y = -Global.CANVAS_HEIGHT / 2 + Global.TILE_HEIGHT / 2 *
				(this.tileGrid.getMaxRow() - this.tileGrid.getMinRow());
		this.spawnActor(new Robot(), this.tileGrid.get(1, 1));
	}
	Level.prototype = Object.create(SUPERCLASS.prototype);
	return Level;
});