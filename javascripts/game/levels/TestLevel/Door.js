define([
	'game/classes/Actor',
	'game/Global',
	'game/Utils'
], function(
	SUPERCLASS,
	Global,
	Utils
) {
	function Door(dir) {
		dir = dir || 'NORTH';
		SUPERCLASS.call(this, {
			width: (dir === 'NORTH' || dir === 'SOUTH' ? Global.TILE_WIDTH : 8),
			depth: (dir === 'NORTH' || dir === 'SOUTH' ? 8 : Global.TILE_HEIGHT),
			height: 30,
			occupiesFullTile: false,
			debugColor: '#fa0',
			debugFillColor: '#a60'
		});
		this._facing = dir;
		this._vector = Utils.toVector(this._facing);
	}
	Door.prototype = Object.create(SUPERCLASS.prototype);
	Door.prototype.canEnter	= function(actor, dx, dy) {
		return dx !== -this._vector.x || dy !== -this._vector.y;
	};
	Door.prototype.canLeave	= function(actor, dx, dy) {
		return dx !== this._vector.x || dy !== this._vector.y;
	};
	return Door;
});