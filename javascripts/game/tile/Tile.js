define([
	'game/classes/GameObj',
	'game/Global',
	'game/geom/Line',
	'game/geom/Multi',
	'game/geom/Rect',
	'game/geom/Triangle'
], function(
	SUPERCLASS,
	Global,
	Line,
	Multi,
	Rect,
	Triangle
) {
	function Tile(col, row, params, frame, variant) {
		var self = this;
		var T = Global.TILE_SIZE;
		SUPERCLASS.call(this, T * col, T * row, T, T);
		this.col = col;
		this.row = row;
		this._sprite = null;
		require(['create!game/display/Sprite > ' + params.spriteKey], function(sprite) {
			self._sprite = sprite;
		});
		this._frame = frame + 28 * variant;

		//select the correct shape to represent the tile
		if(frame === 23) { //upper half brick
			this.collidableBox = new Rect(T * this.col, T * this.row, T, T / 2);
			//this._topBorder = new Line(T * this.col, T * this.row, T * (this.col + 1), T * this.row);
		}
		else if(frame === 27) { //lower half brick
			this.collidableBox = new Rect(T * this.col, T * (this.row + 0.5), T, T / 2);
			//this._topBorder = new Line(T * this.col, T * (this.row + 0.5), T * this.col + T, T * (this.row + 0.5));
		}
		else if(frame === 16) { //triangle \|
			this.collidableBox = new Triangle(T * this.col, T * this.row, T, T, 'upper-right');
			//this._topBorder = new Line(T * this.col, T * this.row, T * (this.col + 1), T * this.row);
		}
		else if(frame === 17) { //triangle |/
			this.collidableBox = new Triangle(T * this.col, T * this.row, T, T, 'upper-left');
			//this._topBorder = new Line(T * this.col, T * this.row, T * (this.col + 1), T * this.row);
		}
		else if(frame === 18) { //triangle /|
			this.walkSlope = 1;
			this.collidableBox = new Triangle(T * this.col, T * this.row, T, T, 'lower-right');
			//this._topBorder = new Line(T * this.col, T * (this.row + 1), T * (this.col + 1), T * this.row);
		}
		else if(frame === 19) { //triangle |\
			this.walkSlope = -1;
			this.collidableBox = new Triangle(T * this.col, T * this.row, T, T, 'lower-left');
			//this._topBorder = new Line(T * this.col, T * this.row, T * (this.col + 1), T * (this.row + 1));
		}
		else if(frame === 20) { //1st part of /| ramp
			this.walkSlope = 1 / 3;
			this.collidableBox = new Triangle(T * this.col, T * (this.row + 2 / 3), T, T / 3, 'lower-right');
			//this._topBorder = new Line(T * this.col, T * (this.row + 1), T * (this.col + 1), T * (this.row + 2 / 3));
		}
		else if(frame === 21) { //2nd part of /| ramp
			this.walkSlope = 1 / 3;
			this.collidableBox = new Multi([
				new Triangle(T * this.col, T * (this.row + 1 / 3), T, T / 3, 'lower-right'),
				new Rect(T * this.col, T * (this.row + 2 / 3), T, T / 3)
			]);
			//this._topBorder = new Line(T * this.col, T * (this.row + 2 / 3), T * (this.col + 1), T * (this.row + 1 / 3));
		}
		else if(frame === 22) { //3rd part of /| ramp
			this.walkSlope = 1 / 3;
			this.collidableBox = new Multi([
				new Triangle(T * this.col, T * this.row, T, T / 3, 'lower-right'),
				new Rect(T * this.col, T * (this.row + 1 / 3), T, T * 2 / 3, 'lower-right')
			]);
			//this._topBorder = new Line(T * this.col, T * (this.row + 1 / 3), T * (this.col + 1), T * this.row);
		}
		else if(frame === 26) { //1st part of |\ ramp
			this.walkSlope = -1 / 3;
			this.collidableBox = new Triangle(T * this.col, T * (this.row + 2 / 3), T, T / 3, 'lower-left');
			//this._topBorder = new Line(T * this.col, T * (this.row + 2 / 3), T * (this.col + 1), T * (this.row + 1));
		}
		else if(frame === 25) { //2nd part of |\ ramp
			this.walkSlope = -1 / 3;
			this.collidableBox = new Multi([
				new Triangle(T * this.col, T * (this.row + 1 / 3), T, T / 3, 'lower-left'),
				new Rect(T * this.col, T * (this.row + 2 / 3), T, T / 3)
			]);
			//this._topBorder = new Line(T * this.col, T * (this.row + 1 / 3), T * (this.col + 1), T * (this.row + 2 / 3));
		}
		else if(frame === 24) { //3rd part of |\ ramp
			this.walkSlope = -1 / 3;
			this.collidableBox = new Multi([
				new Triangle(T * this.col, T * this.row, T, T / 3, 'lower-left'),
				new Rect(T * this.col, T * (this.row + 1 / 3), T, T * 2 / 3, 'lower-right')
			]);
			//this._topBorder = new Line(T * this.col, T * this.row, T * (this.col + 1), T * (this.row + 1 / 3));
		}
		else { //box
			this.collidableBox = new Rect(T * this.col, T * this.row, T, T);
			//this._topBorder = new Line(T * this.col, T * this.row, T * (this.col + 1), T * this.row);
		}
	}
	Tile.prototype = Object.create(SUPERCLASS.prototype);
	Tile.prototype.render = function(ctx, camera) {
		SUPERCLASS.prototype.render.call(this, ctx, camera);
		if(this._sprite !== null) {
			this._sprite.render(ctx, camera, this.x, this.y, this._frame);
		}
	};
	return Tile;
});