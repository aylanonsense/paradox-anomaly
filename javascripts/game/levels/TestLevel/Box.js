define([
	'game/classes/Actor'
], function(
	SUPERCLASS
) {
	function Box() {
		SUPERCLASS.call(this, {
			moveSpeed: 2,
			width: 20,
			height: 20
		});
	}
	Box.prototype = Object.create(SUPERCLASS.prototype);
	Box.prototype.render = function(ctx, camera) {
		if(this.x !== null && this.y !== null) {
			ctx.fillStyle = '#0cc';
			ctx.fillRect(this.renderX - camera.x, this.renderY - camera.y, this.width, this.height);
		}
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	return Box;
});