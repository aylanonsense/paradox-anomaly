define([
	'game/object/device/Device',
	'game/Global',
	'create!game/display/Sprite > Obstacles' //oops wrong sprite sheet
], function(
	SUPERCLASS,
	Global,
	SPRITE
) {
	function FloorSwitch(params) {
		SUPERCLASS.call(this, params);
		this._debugColor = '#f70';
	}
	FloorSwitch.prototype = Object.create(SUPERCLASS.prototype);
	FloorSwitch.prototype.render = function(ctx, camera) {
		ctx.strokeStyle = this._debugColor;
		ctx.lineWidth = 2;
		ctx.strokeRect(this.x - 17 - camera.x, this.y - 17 - camera.y, 34, 34);
	};
	FloorSwitch.prototype.render = function(ctx, camera) {
		SPRITE.render(ctx, camera, this.x - SPRITE.width / 2,
			this.y - SPRITE.height / 2, 1, false);
	};
	return FloorSwitch;
});