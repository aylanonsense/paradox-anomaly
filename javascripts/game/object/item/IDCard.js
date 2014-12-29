define([
	'game/object/item/Item'
], function(
	SUPERCLASS
) {
	function IDCard() {
		SUPERCLASS.call(this, { debugColor: '#fc0' });
	}
	IDCard.prototype = Object.create(SUPERCLASS.prototype);
	IDCard.prototype.dupe = function() {
		var dupe = new IDCard();
		dupe.loadState(this.getState());
		return dupe;
	};
	return IDCard;
});