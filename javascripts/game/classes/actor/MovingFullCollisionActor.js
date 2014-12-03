define([
	'game/classes/Actor',
	'game/Global',
	'game/geom/Rect'
], function(
	SUPERCLASS,
	Global,
	Rect
) {
	function MovingFullCollisionActor(x, y, width, height) {
		SUPERCLASS.call(this, x, y, width, height);
		this.vel = { x: 0, y: 0 };
		this._finalPos = null;
	}
	MovingFullCollisionActor.prototype = Object.create(SUPERCLASS.prototype);
	MovingFullCollisionActor.prototype.planMovement = function() {
		this._finalPos = {
			x: this.x + this.vel.x / Global.TARGET_FRAMERATE,
			y: this.y + this.vel.y / Global.TARGET_FRAMERATE
		};
	};
	MovingFullCollisionActor.prototype.move = function() {
		var dx = this._finalPos.x - this.x;
		var dy = this._finalPos.y - this.y;
		var percentOfMaxHorizontalMovement = Math.abs(dx) / this._maxHorizontalMovementPerStep;
		var percentOfMaxVerticalMovement = Math.abs(dy) / this._maxVerticalMovementPerStep;
		var percentOfMaxMovement = Math.max(percentOfMaxHorizontalMovement, percentOfMaxVerticalMovement);
		if(percentOfMaxMovement > 1.0) {
			this.x += dx / percentOfMaxMovement;
			this.y += dy / percentOfMaxMovement;
		}
		else {
			this.x = this._finalPos.x;
			this.y = this._finalPos.y;
		}
	};
	MovingFullCollisionActor.prototype.hasMovementRemaining = function() {
		return this._finalPos && (this.x !== this._finalPos.x || this.y !== this._finalPos.y);
	};
	MovingFullCollisionActor.prototype.recalculateCollisionBoxes = function() {
		//calculate some reasonable insets
		var insetFromSides = Math.max(2, Math.floor(this.width / 5));
		var insetFromTop = Math.max(2, Math.floor(this.height / 10));
		if(insetFromSides >= insetFromTop) {
			insetFromSides = insetFromTop - 1;
		}

		//create the collision boxes
		this.collisionBoxes = [
			new Rect(
				this.x + insetFromSides,
				this.y + this.height / 2,
				this.width - 2 * insetFromSides,
				this.height / 2,
			'bottom'),
			new Rect(
				this.x,
				this.y + insetFromTop,
				this.width / 2,
				this.height - 2 * insetFromTop,
			'left'),
			new Rect(
				this.x + this.width / 2,
				this.y + insetFromTop,
				this.width / 2,
				this.height - 2 * insetFromTop,
			'right'),
			new Rect(
				this.x + insetFromSides,
				this.y,
				this.width - 2 * insetFromSides,
				this.height / 2,
			'top')
		];

		this._maxHorizontalMovementPerStep = insetFromSides;
		this._maxVerticalMovementPerStep = insetFromTop;
	};
	MovingFullCollisionActor.prototype.handleCollision = function(collision, collisionBox) {
		var dir = collisionBox.name;
		if(dir === 'bottom') {
			this.bottom = collision.top;
			if(this._finalPos.y > this.y) {
				this._finalPos.y = this.y;
			}
		}
		else if(dir === 'left') {
			this.left = collision.right;
			if(this._finalPos.x < this.x) {
				this._finalPos.x = this.x;
			}
		}
		else if(dir === 'right') {
			this.right = collision.left;
			if(this._finalPos.x > this.x) {
				this._finalPos.x = this.x;
			}
		}
		else if(dir === 'top') {
			this.top = collision.bottom;
			if(this._finalPos.y < this.y) {
				this._finalPos.y = this.y;
			}
		}
		this.onCollided(collision, dir);
	};
	MovingFullCollisionActor.prototype.onCollided = function(collision, dir) {
		if(dir === 'bottom' && this.vel.y > 0) { this.vel.y = 0; }
		else if(dir === 'left' && this.vel.x < 0) { this.vel.x = 0; }
		else if(dir === 'right' && this.vel.x > 0) { this.vel.x = 0; }
		else if(dir === 'top' && this.vel.y < 0) { this.vel.y = 0; }
	};
	return MovingFullCollisionActor;
});