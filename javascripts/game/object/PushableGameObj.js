define([
	'game/object/MovableGameObj',
	'game/Global'
], function(
	SUPERCLASS,
	Global
) {
	function PushableGameObj(params) {
		SUPERCLASS.call(this, params);
	}
	PushableGameObj.prototype = Object.create(SUPERCLASS.prototype);
	PushableGameObj.prototype.canPush = function(pusher, moveX, moveY) {
		if(!this.isAlive()) {
			return true;
		}
		var nextTile = this._level.tileGrid.get(this.col + moveX, this.row + moveY);
		if(this._tile.canLeave(this, moveX, moveY) && nextTile && nextTile.canEnter(this, moveX, moveY)) {
			return true;
		}
		return false;
	};
	PushableGameObj.prototype.push = function(pusher, moveX, moveY, speed) {
		this.move(moveX, moveY, speed);
	};
	return PushableGameObj;
});