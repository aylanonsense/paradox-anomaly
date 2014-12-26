define([
	'game/object/actor/Actor'
], function(
	SUPERCLASS
) {
	function Guard() {
		SUPERCLASS.call(this, {
			speed: 1,
			debugColor: '#f0f'
		});
	}
	Guard.prototype = Object.create(SUPERCLASS.prototype);
	Guard.prototype.startOfFrame = function() {
		SUPERCLASS.prototype.startOfFrame.call(this);
		if(!this.isPerformingAction()) {
			var dir = [[1,0], [-1,0], [0,1], [0,-1]][Math.floor(4 * Math.random())];
			this.move(dir[0], dir[1]);
		}
	};
	return Guard;
});