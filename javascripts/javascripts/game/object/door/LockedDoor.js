define([
	'game/object/door/Door',
	'game/util/extend',
	'game/util/toOppositeDirection',
	'create!game/display/Sprite > Door'
], function(
	SUPERCLASS,
	extend,
	toOppositeDirection,
	SPRITE
) {
	function LockedDoor(params) {
		SUPERCLASS.call(this, extend(params, { debugColor: '#f00' }));
	}
	LockedDoor.prototype = Object.create(SUPERCLASS.prototype);
	LockedDoor.prototype.use = function(obj, dir, isDistant) {
		if(this.isAlive() && obj.isAlive() && this.isLocked() && obj.canCarryItems &&
			obj.isCarryingItem() && this.sameAs(obj.getCarriedItem().door) &&
			((!isDistant && dir === this._dir) ||
			(isDistant && toOppositeDirection(dir) === this._dir))) {
			this.unlock();
			return true;
		}
		return SUPERCLASS.prototype.use.call(obj, dir, isDistant);
	};
	LockedDoor.prototype.render = function(ctx, camera) {
		var frame;
		if(this._dir === 'NORTH') { frame = 0; }
		else if(this._dir === 'SOUTH') { frame = 3; }
		else if(this._dir === 'EAST') { frame = 1; }
		else if(this._dir === 'WEST') { frame = 2; }
		if(!this.isLocked()) {
			frame += 4;
		}
		SPRITE.render(ctx, camera, this.x - SPRITE.width / 2,
			this.y - SPRITE.height / 2, frame, false);
	};
	return LockedDoor;
});