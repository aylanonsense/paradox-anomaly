define([
	'game/classes/Actor'
], function(
	SUPERCLASS
) {
	function Robot() {
		SUPERCLASS.call(this, {
			moveSpeed: 2,
			width: 20,
			height: 30
		});
	}
	Robot.prototype = Object.create(SUPERCLASS.prototype);
	Robot.prototype.startOfFrame = function() {
		SUPERCLASS.prototype.startOfFrame.call(this);
		var r = Math.random();
		if(r < 0.25) { this.move('NORTH'); }
		else if(r < 0.50) { this.move('SOUTH'); }
		else if(r < 0.75) { this.move('EAST'); }
		else { this.move('WEST'); }
	};
	Robot.prototype.render = function(ctx, camera) {
		if(this.x !== null && this.y !== null) {
			ctx.fillStyle = '#c00';
			ctx.fillRect(this.renderX - camera.x, this.renderY - camera.y, this.width, this.height);
		}
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	return Robot;
});