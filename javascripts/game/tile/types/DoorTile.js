define([
	'game/tile/Tile',
	'game/Global'
], function(
	SUPERCLASS,
	Global
) {
	function DoorTile(col, row, facing) {
		SUPERCLASS.call(this, col, row);
		this._facing = facing || 'NORTH';
	}
	DoorTile.prototype = Object.create(SUPERCLASS.prototype);
	DoorTile.prototype.render = function(ctx, camera) {
		//draw floor
		if(this._occupants.length > 0) {
			ctx.fillStyle = '#aaf';
		}
		else if(this._reservedFor.length > 0) {
			ctx.fillStyle = '#cce';
		}
		else {
			ctx.fillStyle = '#ddd';
		}
		ctx.fillRect(this.col * Global.TILE_WIDTH - camera.x,
			this.row * Global.TILE_HEIGHT - camera.y,
			Global.TILE_WIDTH, Global.TILE_HEIGHT);
		//draw door
		ctx.strokeStyle = '#f90';
		ctx.lineWidth = 8;
		ctx.beginPath();
		ctx.beginPath();
		if(this._facing === 'EAST') {
			ctx.moveTo((this.col + 0.75) * Global.TILE_WIDTH - camera.x,
				this.row * Global.TILE_HEIGHT - camera.y);
			ctx.lineTo((this.col + 0.75) * Global.TILE_WIDTH - camera.x,
				(this.row + 1) * Global.TILE_HEIGHT - camera.y);
		}
		else if(this._facing === 'SOUTH') {
			ctx.moveTo(this.col * Global.TILE_WIDTH - camera.x,
				(this.row + 0.75) * Global.TILE_HEIGHT - camera.y);
			ctx.lineTo((this.col + 1) * Global.TILE_WIDTH - camera.x,
				(this.row + 0.75) * Global.TILE_HEIGHT - camera.y);
		}
		else if(this._facing === 'WEST') {
			ctx.moveTo((this.col + 0.25) * Global.TILE_WIDTH - camera.x,
				this.row * Global.TILE_HEIGHT - camera.y);
			ctx.lineTo((this.col + 0.25) * Global.TILE_WIDTH - camera.x,
				(this.row + 1) * Global.TILE_HEIGHT - camera.y);
		}
		else {
			ctx.moveTo(this.col * Global.TILE_WIDTH - camera.x,
				(this.row + 0.25) * Global.TILE_HEIGHT - camera.y);
			ctx.lineTo((this.col + 1) * Global.TILE_WIDTH - camera.x,
				(this.row + 0.25) * Global.TILE_HEIGHT - camera.y);
		}
		ctx.stroke();
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	return DoorTile;
});