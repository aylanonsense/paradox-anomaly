define([
	'game/object/device/Device',
	'game/Global'
], function(
	SUPERCLASS,
	Global
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
	return FloorSwitch;
});