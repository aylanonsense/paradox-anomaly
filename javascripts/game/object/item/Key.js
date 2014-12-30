define([
	'game/object/item/Item',
	'game/util/extend',
	'create!game/display/Sprite > Items'
], function(
	SUPERCLASS,
	extend,
	SPRITE
) {
	function Key(params) {
		SUPERCLASS.call(this, extend(params, { debugColor: '#f00' }));
		this.door = params.door || null;
	}
	Key.prototype = Object.create(SUPERCLASS.prototype);
	Key.prototype.dupe = function() {
		var dupe = new Key({ door: this.door });
		dupe.loadState(this.getState());
		return dupe;
	};
	Key.prototype.render = function(ctx, camera, calledByCarrier) {
		if(!this.isBeingCarried() || calledByCarrier) {
			SPRITE.render(ctx, camera, this.x - SPRITE.width / 2,
				this.y - SPRITE.height / 2, 0, false);
		}
	};
	return Key;
});