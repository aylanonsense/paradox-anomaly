define([
	'game/object/item/Item',
	'game/util/extend',
	'create!game/display/Sprite > Items'
], function(
	SUPERCLASS,
	extend,
	SPRITE
) {
	function IDCard(params) {
		SUPERCLASS.call(this, extend(params, { debugColor: '#fc0' }));
		this.scanner = params.scanner || null;
	}
	IDCard.prototype = Object.create(SUPERCLASS.prototype);
	IDCard.prototype.dupe = function() {
		var dupe = new IDCard({ scanner: this.scanner });
		dupe.loadState(this.getState());
		return dupe;
	};
	IDCard.prototype.render = function(ctx, camera, calledByCarrier) {
		if(!this.isBeingCarried() || calledByCarrier) {
			SPRITE.render(ctx, camera, this.x - SPRITE.width / 2,
				this.y - SPRITE.height / 2, 1, false);
		}
	};
	return IDCard;
});