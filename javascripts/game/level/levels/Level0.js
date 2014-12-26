define([
	'game/level/Level',
	'game/Global',
	'game/tile/types/FloorTile',
	'game/tile/types/WallTile',
	'game/object/item/Key',
	'game/object/item/IDCard',
	'game/object/actor/Player',
	'game/object/actor/PastSelf',
	'game/object/actor/Guard',
	'game/object/door/LockedDoor',
	'game/object/door/BarredDoor',
	'game/object/door/SecurityDoor',
	'game/object/interactive/IDCardScanner',
	'game/object/interactive/SimultaneousWallSwitch',
	'game/object/interactive/WallSwitch',
	'game/object/obstacle/Crate',
	'game/object/device/FloorSwitch',
	'game/object/device/LaserTripWire',
	'game/object/device/Camera',
	'game/object/device/WallMountedTurret',
	'game/object/device/AlarmBell'
], function(
	SUPERCLASS,
	Global,
	FloorTile,
	WallTile,
	Key,
	IDCard,
	Player,
	PastSelf,
	Guard,
	LockedDoor,
	BarredDoor,
	SecurityDoor,
	IDCardScanner,
	SimultaneousWallSwitch,
	WallSwitch,
	Crate,
	FloorSwitch,
	LaserTripWire,
	Camera,
	WallMountedTurret,
	AlarmBell
) {
	function Level0() {
		var self = this;
		SUPERCLASS.call(this);
		this.backgroundColor = '#111';

		//create tiles
		for(var c = 0; c < 9; c++) {
			for(var r = 0; r < 9; r++) {
				this.tileGrid.add(new FloorTile(), c, r);
			}
		}
		[[0,5], [0,6], [0,7], [4,5], [4,6], [4,8], [5,6], [7,6], [8,2]].forEach(function(pos) {
			self.tileGrid.add(new WallTile(), pos[0], pos[1]);
		});

		//create game objects
		this.player = this.spawnGameObj(new Player(), 1, 2);
		var key = this.spawnGameObj(new Key(), 1, 0);
		var card = this.spawnGameObj(new IDCard(), 2, 0);
		this.spawnGameObj(new PastSelf(), 3, 2);
		this.spawnGameObj(new Guard(), 5, 2);
		this.spawnGameObj(new LockedDoor({ dir: 'WEST', key: key }), 4, 7);
		var securityDoor = this.spawnGameObj(new SecurityDoor({ dir: 'NORTH' }), 6, 6);
		var lockedDoor = this.spawnGameObj(new BarredDoor({ dir: 'NORTH' }), 8, 6);
		this.spawnGameObj(new IDCardScanner({ dir: 'EAST', card: card }), 7, 2).onTriggered(function() {
			securityDoor.toggleLocked();
		});
		this.spawnGameObj(new WallSwitch({ dir: 'SOUTH' }), 4, 4).onTriggered(function() {
			lockedDoor.toggleLocked();
		});
		this.spawnGameObj(new WallSwitch({ dir: 'NORTH' }), 7, 7).onTriggered(function() {
			lockedDoor.toggleLocked();
		});
		this.spawnGameObj(new SimultaneousWallSwitch({ dir: 'WEST' }), 1, 5);
		this.spawnGameObj(new SimultaneousWallSwitch({ dir: 'WEST' }), 1, 7);
		this.spawnGameObj(new Crate(), 2, 1);
		this.spawnGameObj(new FloorSwitch(), 4, 1);
		this.spawnGameObj(new LaserTripWire({ dir: 'WEST' }), 3, 6);
		this.spawnGameObj(new Camera({ dir: 'WEST' }), 3, 5);
		this.spawnGameObj(new WallMountedTurret({ dir: 'NORTH' }), 5, 5);
		this.spawnGameObj(new AlarmBell({ dir: 'NORTH' }), 8, 3);

		//reorient camera
		this.camera.x = -Global.CANVAS_WIDTH / 2 + Global.TILE_WIDTH / 2 *
				(this.tileGrid.maxCol - this.tileGrid.minCol + 1);
		this.camera.y = -Global.CANVAS_HEIGHT / 2 + Global.TILE_HEIGHT / 2 *
				(this.tileGrid.maxRow - this.tileGrid.minRow + 1);
	}
	Level0.prototype = Object.create(SUPERCLASS.prototype);
	return Level0;
});