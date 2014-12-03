define([
	'game/classes/Level',
	'game/levels/TestLevel/Mailman'
], function(
	SUPERCLASS,
	Mailman
) {
	function Level() {
		SUPERCLASS.call(this);
		this.actors.push(new Mailman(100, 100));
	}
	Level.prototype = Object.create(SUPERCLASS.prototype);
	return Level;
});