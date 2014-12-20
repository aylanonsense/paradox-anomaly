define([
	'game/classes/Actor'
], function(
	SUPERCLASS
) {
	function Player() {
		SUPERCLASS.call(this, {
			moveSpeed: 2,
			width: 20,
			height: 30
		});
	}
	Player.prototype = Object.create(SUPERCLASS.prototype);
	Player.prototype.render = function(ctx, camera) {
		if(this.x !== null && this.y !== null) {
			ctx.fillStyle = '#0c0';
			ctx.fillRect(this.renderX - camera.x, this.renderY - camera.y, this.width, this.height);
		}
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	Player.prototype.onKeyboardEvent = function(evt, keyboard) {
		if(evt.isDown) {
			if(evt.gameKey === 'MOVE_LEFT') { this.move('WEST'); }
			else if(evt.gameKey === 'MOVE_RIGHT') { this.move('EAST'); }
			else if(evt.gameKey === 'MOVE_UP') { this.move('NORTH'); }
			else if(evt.gameKey === 'MOVE_DOWN') { this.move('SOUTH'); }
		}
	};
	return Player;
});