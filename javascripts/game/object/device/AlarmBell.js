define([
	'game/object/device/Device',
	'game/Global'
], function(
	SUPERCLASS,
	Global
) {
	function AlarmBell(params) {
		SUPERCLASS.call(this, params);
		this._dir = params.dir || 'NORTH';
		this._debugColor = '#f70';
	}
	AlarmBell.prototype = Object.create(SUPERCLASS.prototype);
	AlarmBell.prototype.render = function(ctx, camera) {
		ctx.fillStyle = this._debugColor;
		
		if(this._dir === 'NORTH') {
			ctx.fillRect(this.tileX + Global.TILE_WIDTH / 2 - 6 - camera.x,
				this.tileY - camera.y,
				12, 20);
		}
		else if(this._dir === 'SOUTH') {
			ctx.fillRect(this.tileX + Global.TILE_WIDTH / 2 - 6 - camera.x,
				this.tileY + Global.TILE_HEIGHT - 20 - camera.y,
				12, 20);
		}
		else if(this._dir === 'EAST') {
			ctx.fillRect(this.tileX + Global.TILE_WIDTH - 20 - camera.x,
				this.tileY + Global.TILE_HEIGHT / 2 - 6 - camera.y,
				20, 12);
		}
		else if(this._dir === 'WEST') {
			ctx.fillRect(this.tileX - camera.x,
				this.tileY + Global.TILE_HEIGHT / 2 - 6 - camera.y,
				20, 12);
		}
	};
	return AlarmBell;
});