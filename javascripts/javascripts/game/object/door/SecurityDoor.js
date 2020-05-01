define([
	'game/object/door/Door',
	'game/util/extend',
	'create!game/display/Sprite > Door'
], function(
	SUPERCLASS,
	extend,
	SPRITE
) {
	function SecurityDoor(params) {
		SUPERCLASS.call(this, extend(params, { debugColor: '#fc0' }));
	}
	SecurityDoor.prototype = Object.create(SUPERCLASS.prototype);
	SecurityDoor.prototype.render = function(ctx, camera) {
		var frame;
		if(this._dir === 'NORTH') { frame = 0; }
		else if(this._dir === 'SOUTH') { frame = 3; }
		else if(this._dir === 'EAST') { frame = 1; }
		else if(this._dir === 'WEST') { frame = 2; }
		if(!this.isLocked()) {
			frame += 4;
		}
		SPRITE.render(ctx, camera, this.x - SPRITE.width / 2,
			this.y - SPRITE.height / 2, frame + 8, false);
	};
	return SecurityDoor;
});