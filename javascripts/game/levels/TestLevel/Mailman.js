define([
	'game/classes/actor/MovingFullCollisionActor',
	'create!game/display/Sprite > Mailman'
], function(
	SUPERCLASS,
	MailmanSprite
) {
	function Mailman(x, y) {
		SUPERCLASS.call(this, x, y, MailmanSprite.width, MailmanSprite.height);
		this.vel.x = 50;
		this.vel.y = 10;
	}
	Mailman.prototype = Object.create(SUPERCLASS.prototype);
	Mailman.prototype.render = function(ctx, camera) {
		MailmanSprite.render(ctx, camera, this.x, this.y, 0, false);
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	Mailman.prototype.onCollided = function() {};
	return Mailman;
});