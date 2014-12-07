define([
	'game/classes/actor/MovingFullCollisionActor',
	'create!game/display/Sprite > Mailman'
], function(
	SUPERCLASS,
	MailmanSprite
) {
	function Mailman(x, y) {
		SUPERCLASS.call(this, x, y, MailmanSprite.width, MailmanSprite.height);
		this._moveDir = { x: 0, y: 0 };
		this._bufferedJumpFrames = 0;
		this._isAirborne = false;
		this._bottomCollisionsThisFrame = 0;
	}
	Mailman.prototype = Object.create(SUPERCLASS.prototype);
	Mailman.prototype.startOfFrame = function() {
		SUPERCLASS.prototype.startOfFrame.call(this);

		//reset counters
		this._bottomCollisionsThisFrame = 0;

		//fall each frame
		this.vel.y += 20;
		if(this.vel.y > 500) { this.vel.y = 500; }

		//control direction
		if(this._moveDir.x < 0) {
			this.vel.x -= 5;
		}
		else if(this._moveDir.x > 0) {
			this.vel.x += 5;
		}
	};
	Mailman.prototype.endOfMovement = function() {
		SUPERCLASS.prototype.endOfMovement.call(this);
		if(this._bufferedJumpFrames > 0) { this._bufferedJumpFrames--; }
		this._isAirborne = (this._bottomCollisionsThisFrame === 0);
	};
	Mailman.prototype.render = function(ctx, camera) {
		MailmanSprite.render(ctx, camera, this.x, this.y, 0, false);
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	Mailman.prototype.onCollided = function(collision, dir) {
		SUPERCLASS.prototype.onCollided.call(this, collision, dir);
		if(dir === 'bottom' && this._bufferedJumpFrames > 0) {
			this.vel.y = -500;
			this._bufferedJumpFrames = 0;
			this._bottomCollisionsThisFrame++;
		}
	};
	Mailman.prototype.onKeyboardEvent = function(evt, keyboard) {
		if(evt.gameKey === 'MOVE_LEFT') {
			this._moveDir.x = (evt.isDown ? -1 : (keyboard.MOVE_RIGHT ? 1 : 0));
		}
		else if(evt.gameKey === 'MOVE_RIGHT') {
			this._moveDir.x = (evt.isDown ? 1 : (keyboard.MOVE_LEFT ? -1 : 0));
		}
		else if(evt.gameKey === 'JUMP') {
			if(evt.isDown) { this._bufferedJumpFrames = 6; }
			else if(this.vel.y < -100) { this.vel.y = -100; }
		}
	};
	return Mailman;
});