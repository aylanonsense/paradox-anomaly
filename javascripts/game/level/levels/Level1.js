define([
	'game/level/Level',
	'game/level/maps/Level1.map',
	'game/Global',
	'game/util/toVector',
	'game/object/ObjectLibrary',
	'game/object/actor/Player',
	'game/tile/types/FloorTile',
	'game/tile/types/WallTile'
], function(
	SUPERCLASS,
	MAP,
	Global,
	toVector,
	ObjectLibrary,
	Player,
	FloorTile,
	WallTile
) {
	function Level1() {
		var self = this;
		SUPERCLASS.call(this);
		this.backgroundColor = '#111';

		//create tiles
		var playerStartingPos = null;
		for(var r = 0; r < MAP.walls.length; r++) {
			for(var c = 0; c < MAP.walls[r].length; c++) {
				if(MAP.walls[r][c] === '.') {
					if(!playerStartingPos) {
						playerStartingPos = { col: c, row: r };
					}
					this.tileGrid.add(new FloorTile(), c, r);
				}
				else if(MAP.walls[r][c] === 'S') {
					playerStartingPos = { col: c, row: r };
					this.tileGrid.add(new FloorTile(), c, r);
				}
				else if(MAP.walls[r][c] === 'E') {
					this.tileGrid.add(new FloorTile(), c, r);
				}
				else if(MAP.walls[r][c] === 'W') {
					this.tileGrid.add(new WallTile(), c, r);
				}
			}
		}

		//spawn player
		if(playerStartingPos) {
			this.player = this.spawnGameObj(new Player({
					facing: MAP.player.initialFacing || 'EAST'
				}), playerStartingPos.col, playerStartingPos.row);
		}

		//spawn game objects
		var objs = [];
		for(var i = 0; i < MAP.objects.length; i++) {
			var ObjectClass = ObjectLibrary[MAP.objects[i].type];
			if(ObjectClass) {
				objs.push(this.spawnGameObj(new ObjectClass(MAP.objects[i].params),
					MAP.objects[i].col, MAP.objects[i].row));
			}
			else {
				throw new Error("No object of type '" + MAP.objects[i].type + "' exists");
			}
		}

		//wire up game objects
		for(i = 0; i < MAP.triggers.length; i++) {
			objs[MAP.triggers[i].from].onTriggered(createTriggerHandler(objs[MAP.triggers[i].to]));
		}

		//reorient camera
		this.camera.x = -Global.CANVAS_WIDTH / 2 + Global.TILE_WIDTH / 2 *
				(this.tileGrid.maxCol - this.tileGrid.minCol + 1);
		this.camera.y = -Global.CANVAS_HEIGHT / 2 + Global.TILE_HEIGHT / 2 *
				(this.tileGrid.maxRow - this.tileGrid.minRow + 1);
	}

	//helper functions
	function createTriggerHandler(obj) {
		return function(onOrOff) {
			obj.trigger(onOrOff);
		};
	}

	Level1.prototype = Object.create(SUPERCLASS.prototype);
	return Level1;
});