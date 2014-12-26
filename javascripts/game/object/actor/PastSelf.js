define([
	'game/object/actor/Actor'
], function(
	SUPERCLASS
) {
	function PastSelf() {
		SUPERCLASS.call(this, {
			speed: 2,
			canCarryItems: true,
			debugColor: '#0ff'
		});
	}
	PastSelf.prototype = Object.create(SUPERCLASS.prototype);
	return PastSelf;
});