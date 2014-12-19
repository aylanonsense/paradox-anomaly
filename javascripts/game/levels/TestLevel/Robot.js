define([
	'game/classes/Actor'
], function(
	SUPERCLASS
) {
	function Robot() {
		SUPERCLASS.call(this, {
			moveSpeed: 1
		});
	}
	Robot.prototype = Object.create(SUPERCLASS.prototype);
	Robot.prototype.startOfFrame = function() {
		SUPERCLASS.prototype.startOfFrame.call(this);
		this.move('EAST');
	};
	Robot.prototype.render = function(ctx, camera) {
		if(this.x !== null && this.y !== null) {
			ctx.fillStyle = '#f00';
			ctx.fillRect(this.x - camera.x, this.y - camera.y, 15, 15);
		}
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	return Robot;
});