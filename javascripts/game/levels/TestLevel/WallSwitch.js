define([
	'game/classes/Actor',
	'game/Global'
], function(
	SUPERCLASS,
	Global
) {
	function WallSwitch(dir) {
		dir = dir || 'NORTH';
		SUPERCLASS.call(this, {
			width: (dir === 'NORTH' || dir === 'SOUTH' ? Global.TILE_WIDTH : 8),
			depth: (dir === 'NORTH' || dir === 'SOUTH' ? 8 : Global.TILE_HEIGHT),
			height: 30,
			occupiesFullTile: false,
			debugColor: '#ff0',
			debugFillColor: '#aa0'
		});
		this._facing = dir;
		this._useDir = {
			NORTH: 'SOUTH',
			SOUTH: 'NORTH',
			EAST: 'WEST',
			WEST: 'EAST'
		}[dir];
	}
	WallSwitch.prototype = Object.create(SUPERCLASS.prototype);
	WallSwitch.prototype.onUsed = function(actor, isInSameTile) {
		if(isInSameTile && actor.getFacing() == this._useDir) {
			this.togglePower();
			return true;
		}
		return false;
	};
	return WallSwitch;
});