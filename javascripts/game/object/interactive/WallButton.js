define([
	'game/object/interactive/Interactive',
	'game/util/extend',
	'create!game/display/Sprite > WallThings'
], function(
	SUPERCLASS,
	extend,
	SPRITE
) {
	function WallButton(params) {
		SUPERCLASS.call(this, extend(params, { debugColor: '#7f0' }));
	}
	WallButton.prototype = Object.create(SUPERCLASS.prototype);
	WallButton.prototype.use = function(obj, dir, isDistant) {
		if(this.isAlive() && obj.isAlive() && !isDistant && dir === this._dir) {
			this.trigger();
			return true;
		}
		return false;
	};
	WallButton.prototype.render = function(ctx, camera) {
		var frame;
		if(this._dir === 'NORTH') { frame = 0; }
		else if(this._dir === 'SOUTH') { frame = 3; }
		else if(this._dir === 'EAST') { frame = 1; }
		else if(this._dir === 'WEST') { frame = 2; }
		SPRITE.render(ctx, camera, this.x - SPRITE.width / 2,
			this.y - SPRITE.height / 2, frame, false);
	};
	return WallButton;
});