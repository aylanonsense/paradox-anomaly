define([
	'game/object/interactive/Interactive',
	'game/util/extend'
], function(
	SUPERCLASS,
	extend
) {
	function IDCardScanner(params) {
		SUPERCLASS.call(this, extend(params, { debugColor: '#fc0' }));
		this._card = params.card || null;
	}
	IDCardScanner.prototype = Object.create(SUPERCLASS.prototype);
	IDCardScanner.prototype.use = function(obj, dir, isDistant) {
		if(obj.canCarryItems && obj.isCarryingItem() && obj.getCarriedItem().sameAs(this._card) &&
			!isDistant && dir === this._dir) {
			this.trigger();
			return true;
		}
		return SUPERCLASS.prototype.use.call(obj, dir, isDistant);
	};
	return IDCardScanner;
});