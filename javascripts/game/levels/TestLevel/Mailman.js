if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
	'game/classes/actor/MovingFullCollisionActor',
	'create!game/display/Sprite>Mailman'
], function(
	SUPERCLASS,
	MailmanSprite
) {
	function Mailman(x, y) {
		SUPERCLASS.call(this, x, y, 50, 50);
		this.vel.x = 50;
	}
	Mailman.prototype = Object.create(SUPERCLASS.prototype);
	Mailman.prototype.render = function(ctx, camera) {
		SUPERCLASS.prototype.render.call(this, ctx, camera);
		//ctx.fillStyle = '#f00';
		//ctx.fillRect(this.x, this.y, this.width, this.height);
		MailmanSprite.render(ctx, camera, this.x, this.y, 0, false);
	};
	return Mailman;
});