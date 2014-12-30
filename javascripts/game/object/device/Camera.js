define([
	'game/object/device/Device',
	'game/Global',
	'create!game/display/Sprite > WallThings'
], function(
	SUPERCLASS,
	Global,
	SPRITE
) {
	function Camera(params) {
		SUPERCLASS.call(this, params);
		this._dir = params.dir || 'NORTH';
		this._debugColor = '#0af';
	}
	Camera.prototype = Object.create(SUPERCLASS.prototype);
	Camera.prototype.render = function(ctx, camera) {
		ctx.fillStyle = this._debugColor;
		if(this._dir === 'NORTH') {
			ctx.fillRect(this.tileX + Global.TILE_WIDTH / 2 - 6 - camera.x,
				this.tileY + Global.TILE_HEIGHT - 20 - camera.y,
				12, 20);
		}
		else if(this._dir === 'SOUTH') {
			ctx.fillRect(this.tileX + Global.TILE_WIDTH / 2 - 6 - camera.x,
				this.tileY - camera.y,
				12, 20);
		}
		else if(this._dir === 'EAST') {
			ctx.fillRect(this.tileX - camera.x,
				this.tileY + Global.TILE_HEIGHT / 2 - 6 - camera.y,
				20, 12);
		}
		else if(this._dir === 'WEST') {
			ctx.fillRect(this.tileX + Global.TILE_WIDTH - 20 - camera.x,
				this.tileY + Global.TILE_HEIGHT / 2 - 6 - camera.y,
				20, 12);
		}
	};
	Camera.prototype.render = function(ctx, camera) {
		var frame;
		if(this._dir === 'NORTH') { frame = 3; }
		else if(this._dir === 'SOUTH') { frame = 0; }
		else if(this._dir === 'EAST') { frame = 2; }
		else if(this._dir === 'WEST') { frame = 1; }
		SPRITE.render(ctx, camera, this.x - SPRITE.width / 2,
			this.y - SPRITE.height / 2, frame + 8, false);
	};
	return Camera;
});