define([
	'game/object/interactive/Interactive',
	'game/Global',
	'create!game/display/Sprite > Obstacles' //oops wrong sprite sheet
], function(
	SUPERCLASS,
	Global,
	SPRITE
) {
	function FloorSwitch(params) {
		SUPERCLASS.call(this, params);
		this._debugColor = '#f70';
		this._isTriggered = false;
	}
	FloorSwitch.prototype = Object.create(SUPERCLASS.prototype);
	FloorSwitch.prototype.render = function(ctx, camera) {
		SPRITE.render(ctx, camera, this.x - SPRITE.width / 2,
			this.y - SPRITE.height / 2, 1, false);
	};
	FloorSwitch.prototype.endOfFrame = function() {
		SUPERCLASS.prototype.endOfFrame.call(this);
		var occupants = this._tile.getOccupants();
		for(var i = 0; i < occupants.length; i++) {
			if(occupants[i].isAlive() && occupants[i].fillsTile) {
				if(!this._isTriggered) {
					this._isTriggered = true;
					this.trigger(true);
				}
				return;
			}
		}
		if(this._isTriggered) {
			this._isTriggered = false;
			this.trigger(false);
		}
	};
	return FloorSwitch;
});