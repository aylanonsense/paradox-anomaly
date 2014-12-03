define([
	'game/classes/Level',
	'game/levels/TestLevel/Mailman',
	'game/levels/TestLevel/Rock'
], function(
	SUPERCLASS,
	Mailman,
	Rock
) {
	function Level() {
		SUPERCLASS.call(this);
		this.actors.push(new Mailman(100, 100));
		this.actors.push(new Rock(200, 100));
	}
	Level.prototype = Object.create(SUPERCLASS.prototype);
	return Level;
});