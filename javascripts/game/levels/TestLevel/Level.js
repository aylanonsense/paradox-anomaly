define([
	'game/classes/Level',
	'game/Global',
	'game/levels/TestLevel/Player',
	'game/levels/TestLevel/Robot',
	'game/levels/TestLevel/Box',
	'game/levels/TestLevel/FloorSwitch',
	'game/levels/TestLevel/Door',
	'game/levels/TestLevel/Key',
	'game/tile/types/FloorTile',
	'game/tile/types/WallTile'
], function(
	SUPERCLASS,
	Global,
	Player,
	Robot,
	Box,
	FloorSwitch,
	Door,
	Key,
	FloorTile,
	WallTile
) {
	function Level() {
		SUPERCLASS.call(this);
		this.backgroundColor = '#333';
		for(var c = 0; c < 9; c++) {
			for(var r = 0; r < 9; r++) {
				this.tileGrid.add(new FloorTile(), c, r);
			}
		}
		this.tileGrid.add(new WallTile(), 4, 5);
		this.tileGrid.add(new WallTile(), 4, 6);
		this.tileGrid.add(new WallTile(), 4, 8);
		this.tileGrid.add(new WallTile(), 5, 6);
		this.tileGrid.add(new WallTile(), 2, 3);
		this.tileGrid.add(new WallTile(), 8, 2);
		this.camera.x = -Global.CANVAS_WIDTH / 2 + Global.TILE_WIDTH / 2 *
				(this.tileGrid.getMaxCol() - this.tileGrid.getMinCol() + 1);
		this.camera.y = -Global.CANVAS_HEIGHT / 2 + Global.TILE_HEIGHT / 2 *
				(this.tileGrid.getMaxRow() - this.tileGrid.getMinRow() + 1);
		this.spawnActor(new Robot(), this.tileGrid.get(1, 1));
		this.spawnActor(new Box(), this.tileGrid.get(2, 1));
		this.spawnActor(new FloorSwitch(), this.tileGrid.get(5, 1));
		this.spawnActor(new Door('NORTH'), this.tileGrid.get(4, 3));
		this.spawnActor(new Door('EAST'), this.tileGrid.get(5, 3));
		this.spawnActor(new Door('SOUTH'), this.tileGrid.get(6, 3));
		this.spawnActor(new Door('WEST'), this.tileGrid.get(4, 7));
		this.spawnActor(new Key(), this.tileGrid.get(3, 1));
		this.player = this.spawnActor(new Player(), this.tileGrid.get(3, 4));
	}
	Level.prototype = Object.create(SUPERCLASS.prototype);
	return Level;
});