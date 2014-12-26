define([
	'game/object/door/Door',
	'game/util/extend'
], function(
	SUPERCLASS,
	extend
) {
	function BarredDoor(params) {
		SUPERCLASS.call(this, extend(params, { debugColor: '#00f' }));
	}
	BarredDoor.prototype = Object.create(SUPERCLASS.prototype);
	return BarredDoor;
});