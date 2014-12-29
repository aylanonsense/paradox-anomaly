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
	Key.prototype.dupe = function() {
		var dupe = new Key({ door: this.door });
		dupe.loadState(this.getState());
		return dupe;
	};
	return Key;
});