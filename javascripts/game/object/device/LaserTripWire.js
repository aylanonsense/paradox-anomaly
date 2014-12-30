define([
	'game/object/device/Device',
	'game/Global',
	'create!game/display/Sprite > WallThings'
], function(
	SUPERCLASS,
	Global,
	SPRITE
) {
	function LaserTripWire(params) {
		SUPERCLASS.call(this, params);
		this._dir = params.dir || 'NORTH';
		this._debugColor = '#f00';
	}
	LaserTripWire.prototype = Object.create(SUPERCLASS.prototype);
	LaserTripWire.prototype.render = function(ctx, camera) {
		var frame;
		if(this._dir === 'NORTH') { frame = 3; }
		else if(this._dir === 'SOUTH') { frame = 0; }
		else if(this._dir === 'EAST') { frame = 2; }
		else if(this._dir === 'WEST') { frame = 1; }
		SPRITE.render(ctx, camera, this.x - SPRITE.width / 2,
			this.y - SPRITE.height / 2, frame + 20, false);
	};
	return LaserTripWire;
});