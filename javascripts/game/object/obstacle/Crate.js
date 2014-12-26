define([
	'game/object/obstacle/Obstacle'
], function(
	SUPERCLASS
) {
	function Crate() {
		SUPERCLASS.call(this, {
			isPushable: true,
			debugColor: '#f70'
		});
	}
	Crate.prototype = Object.create(SUPERCLASS.prototype);
	return Crate;
});