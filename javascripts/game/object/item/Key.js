define([
	'game/object/item/Item',
	'game/util/extend'
], function(
	SUPERCLASS,
	extend
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
	return Key;
});