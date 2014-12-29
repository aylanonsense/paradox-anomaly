define([
	'game/object/item/Item'
], function(
	SUPERCLASS
) {
	function Key(params) {
		SUPERCLASS.call(this, { debugColor: '#f00' });
		this.door = params.door || null;
	}
	Key.prototype = Object.create(SUPERCLASS.prototype);
	return Key;
});