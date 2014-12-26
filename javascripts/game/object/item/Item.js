define([
	'game/object/GameObj'
], function(
	SUPERCLASS
) {
	function Item(params) {
		SUPERCLASS.call(this, params);
		this._debugColor = params.debugColor || '#fff';
	}
	Item.prototype = Object.create(SUPERCLASS.prototype);
	Item.prototype.render = function(ctx, camera) {
		ctx.fillStyle = this._debugColor;
		ctx.fillRect(this.x - 10 - camera.x, this.y - 6 - camera.y, 20, 12);
	};
	return Item;
});