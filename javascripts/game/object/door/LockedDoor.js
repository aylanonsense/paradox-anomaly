define([
	'game/object/door/Door',
	'game/util/extend'
], function(
	SUPERCLASS,
	extend
) {
	function LockedDoor(params) {
		SUPERCLASS.call(this, extend(params, { debugColor: '#f00' }));
	}
	LockedDoor.prototype = Object.create(SUPERCLASS.prototype);
	return LockedDoor;
});