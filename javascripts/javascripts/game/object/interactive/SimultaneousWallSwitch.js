define([
	'game/object/interactive/Interactive',
	'game/util/extend',
	'create!game/display/Sprite > WallThings'
], function(
	SUPERCLASS,
	extend,
	SPRITE
) {
	function SimultaneousWallSwitch(params) {
		SUPERCLASS.call(this, extend(params, { debugColor: '#c0f' }));
	}
	SimultaneousWallSwitch.prototype = Object.create(SUPERCLASS.prototype);
	SimultaneousWallSwitch.prototype.render = function(ctx, camera) {
		var frame;
		if(this._dir === 'NORTH') { frame = 3; }
		else if(this._dir === 'SOUTH') { frame = 0; }
		else if(this._dir === 'EAST') { frame = 1; }
		else if(this._dir === 'WEST') { frame = 2; }
		SPRITE.render(ctx, camera, this.x - SPRITE.width / 2,
			this.y - SPRITE.height / 2, frame + 12, false);
	};
	return SimultaneousWallSwitch;
});