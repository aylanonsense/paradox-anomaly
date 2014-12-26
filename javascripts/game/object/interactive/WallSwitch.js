define([
	'game/object/interactive/Interactive',
	'game/util/extend'
], function(
	SUPERCLASS,
	extend
) {
	function WallSwitch(params) {
		SUPERCLASS.call(this, extend(params, { debugColor: '#7f0' }));
	}
	WallSwitch.prototype = Object.create(SUPERCLASS.prototype);
	WallSwitch.prototype.use = function(obj, dir, isDistant) {
		if(!isDistant && dir === this._dir) {
			this.trigger();
		}
	};
	return WallSwitch;
});