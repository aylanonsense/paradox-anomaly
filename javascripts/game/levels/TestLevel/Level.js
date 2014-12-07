define([
	'game/classes/Level',
	'game/Global',
	'game/levels/TestLevel/Mailman',
	'game/levels/TestLevel/Rock',
	'game/levels/TestLevel/tile-map'
], function(
	SUPERCLASS,
	Global,
	Mailman,
	Rock,
	tileMap
) {
	function Level() {
		SUPERCLASS.call(this);
		this.backgroundColor = '#333';
		this.camera.x = -50;
		this.camera.y = -Global.HEIGHT / 2;
		this.tileGrid.loadFromMap(tileMap.foreground);
		this.backgroundTileGrid.loadFromMap(tileMap.background);
		this.actors.push(new Mailman(100, 100));
		this.actors.push(new Rock(200, 30));
	}
	Level.prototype = Object.create(SUPERCLASS.prototype);
	return Level;
});