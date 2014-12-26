define([
	'game/object/item/Item'
], function(
	SUPERCLASS
) {
	function Key() {
		SUPERCLASS.call(this, { debugColor: '#f00' });
	}
	Key.prototype = Object.create(SUPERCLASS.prototype);
	return Key;
});