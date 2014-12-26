define([
	'game/object/item/Item'
], function(
	SUPERCLASS
) {
	function IDCard() {
		SUPERCLASS.call(this, { debugColor: '#fc0' });
	}
	IDCard.prototype = Object.create(SUPERCLASS.prototype);
	return IDCard;
});