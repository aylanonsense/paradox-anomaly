define([
	'game/object/PushableGameObj',
	'game/util/extend'
], function(
	SUPERCLASS,
	extend
) {
	function Obstacle(params) {
		SUPERCLASS.call(this, extend(params, {
			fillsTile: true
		}));
		this._debugColor = params.debugColor || '#fff';
	}
	Obstacle.prototype = Object.create(SUPERCLASS.prototype);
	Obstacle.prototype.render = function(ctx, camera) {
		ctx.fillStyle = this._debugColor;
		ctx.fillRect(this.x - 15 - camera.x, this.y - 15 - camera.y, 30, 30);
	};
	return Obstacle;
});