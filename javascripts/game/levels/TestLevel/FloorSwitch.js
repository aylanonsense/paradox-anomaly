define([
	'game/classes/Actor'
], function(
	SUPERCLASS
) {
	function FloorSwitch() {
		SUPERCLASS.call(this, {
			moveSpeed: 2,
			width: 20,
			height: 12
		});
	}
	FloorSwitch.prototype = Object.create(SUPERCLASS.prototype);
	FloorSwitch.prototype.render = function(ctx, camera) {
		if(this.x !== null && this.y !== null) {
			ctx.fillStyle = '#cc0';
			ctx.fillRect(this.renderX - camera.x, this.renderY - camera.y + this.height / 2,
				this.width, this.height);
		}
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	return FloorSwitch;
});