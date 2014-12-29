define([
	'game/object/interactive/Interactive',
	'game/util/extend'
], function(
	SUPERCLASS,
	extend
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
	return IDCardScanner;
});