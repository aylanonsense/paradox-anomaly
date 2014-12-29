define([
	'game/object/GameObj',
	'game/Global'
], function(
	SUPERCLASS,
	Global
) {
	function Interactive(params) {
		SUPERCLASS.call(this, params);
		this._dir = params.dir || 'NORTH';
		this._debugColor = params.debugColor || '#fff';
		this._triggerCallbacks = [];
	}
	Interactive.prototype = Object.create(SUPERCLASS.prototype);
	Interactive.prototype.render = function(ctx, camera) {
		ctx.fillStyle = this._debugColor;
		if(this._dir === 'NORTH') {
			ctx.fillRect(this.tileX + Global.TILE_WIDTH / 2 - 10 - camera.x,
				this.tileY - camera.y,
				20, 5);
		}
		else if(this._dir === 'SOUTH') {
			ctx.fillRect(this.tileX + Global.TILE_WIDTH / 2 - 10 - camera.x,
				this.tileY + Global.TILE_HEIGHT - 5 - camera.y,
				20, 5);
		}
		else if(this._dir === 'EAST') {
			ctx.fillRect(this.tileX + Global.TILE_WIDTH - 5 - camera.x,
				this.tileY + Global.TILE_HEIGHT / 2 - 10 - camera.y,
				5, 20);
		}
		else if(this._dir === 'WEST') {
			ctx.fillRect(this.tileX - camera.x,
				this.tileY + Global.TILE_HEIGHT / 2 - 10 - camera.y,
				5, 20);
		}
	};
	Interactive.prototype.trigger = function() {
		if(this.isAlive()) {
			for(var i = 0; i < this._triggerCallbacks.length; i++) {
				this._triggerCallbacks[i].call(this);
			}
		}
	};
	Interactive.prototype.onTriggered = function(callback) {
		this._triggerCallbacks.push(callback);
	};
	return Interactive;
});