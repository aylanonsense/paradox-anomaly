define([
	'game/classes/Level',
	'game/levels/TestLevel/Mailman',
	'game/levels/TestLevel/Rock',
	'game/levels/TestLevel/tile-map'
], function(
	SUPERCLASS,
	Mailman,
	Rock,
	tileMap
) {
	function Level() {
		SUPERCLASS.call(this);
		this.tileGrid.loadFromMap(tileMap.foreground);
		this.backgroundTileGrid.loadFromMap(tileMap.background);
		this.actors.push(new Mailman(100, 100));
		this.actors.push(new Rock(200, 100));
	}
	Level.prototype = Object.create(SUPERCLASS.prototype);
	return Level;
});