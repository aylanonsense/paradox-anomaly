define([
	'game/object/door/Door',
	'game/util/extend'
], function(
	SUPERCLASS,
	extend
) {
	function SecurityDoor(params) {
		SUPERCLASS.call(this, extend(params, { debugColor: '#fc0' }));
	}
	SecurityDoor.prototype = Object.create(SUPERCLASS.prototype);
	return SecurityDoor;
});