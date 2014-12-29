define([
	'game/object/item/Item',
	'game/util/extend'
], function(
	SUPERCLASS,
	extend
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
	return IDCard;
});