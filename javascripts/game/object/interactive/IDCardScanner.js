define([
	'game/object/interactive/Interactive',
	'game/util/extend',
	'create!game/display/Sprite > WallThings'
], function(
	SUPERCLASS,
	extend,
	SPRITE
) {
	function IDCardScanner(params) {
		SUPERCLASS.call(this, extend(params, { debugColor: '#fc0' }));
	}
	IDCardScanner.prototype = Object.create(SUPERCLASS.prototype);
	IDCardScanner.prototype.use = function(obj, dir, isDistant) {
		if(this.isAlive() && obj.isAlive() && obj.canCarryItems && obj.isCarryingItem() &&
			this.sameAs(obj.getCarriedItem().scanner) && !isDistant && dir === this._dir) {
			this.trigger();
			return true;
		}
		return SUPERCLASS.prototype.use.call(obj, dir, isDistant);
	};
	IDCardScanner.prototype.render = function(ctx, camera) {
		var frame;
		if(this._dir === 'NORTH') { frame = 3; }
		else if(this._dir === 'SOUTH') { frame = 0; }
		else if(this._dir === 'EAST') { frame = 1; }
		else if(this._dir === 'WEST') { frame = 2; }
		SPRITE.render(ctx, camera, this.x - SPRITE.width / 2,
			this.y - SPRITE.height / 2, frame + 4, false);
	};
	return IDCardScanner;
});