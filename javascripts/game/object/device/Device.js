define([
	'game/object/GameObj'
], function(
	SUPERCLASS
) {
	function Device(params) {
		SUPERCLASS.call(this, params);
	}
	Device.prototype = Object.create(SUPERCLASS.prototype);
	return Device;
});