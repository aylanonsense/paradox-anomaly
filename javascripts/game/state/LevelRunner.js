define([
	'game/Global'
], function(
	Global
) {
	function LevelRunner(level) {
		this._level = level;
	}
	LevelRunner.prototype.update = function() {
		var i, j, steps;

		//update effects
		for(i = 0; i < this._level.effects.length; i++) {
			if(this._level.effects[i].isAlive()) {
				this._level.effects[i].update();
			}
		}

		//start of frame
		this._level.startOfFrame();
		for(i = 0; i < this._level.actors.length; i++) {
			if(this._level.actors[i].isAlive()) {
				this._level.actors[i].startOfFrame();
				this._level.actors[i].recalculateCollisionBoxes();
			}
		}

		//move everything
		for(i = this._level.actors.length - 1; i >= 0; i--) {
			if(this._level.actors[i].isAlive()) {
				this._level.actors[i].planMovement();
				this._checkForCollisions(this._level.actors[i]);
				for(steps = 0; steps < Global.MAX_STEPS_PER_FRAME && this._level.actors[i].isAlive() &&
						this._level.actors[i].hasMovementRemaining(); steps++) {
					this._level.actors[i].move();
					this._level.actors[i].recalculateCollisionBoxes();
					this._checkForCollisions(this._level.actors[i]);
				}
				if(steps === Global.MAX_STEPS_PER_FRAME) { console.warn("Maximum move steps per frame exceeded."); }
			}
		}
		for(i = 0; i < this._level.actors.length; i++) {
			if(this._level.actors[i].isAlive()) {
				this._level.actors[i].endOfMovement(); //no movement should be performed here
			}
		}

		//check for hits
		for(i = 0; i < this._level.actors.length; i++) {
			if(this._level.actors[i].isAlive()) {
				this._level.actors[i].recalculateHitBoxes();
			}
		}
		var hits = [];
		for(i = 0; i < this._level.actors.length; i++) {
			for(j = this._level.actors.length - 1; j >= 0; j--) {
				if(i !== j && this._level.actors[i].isAlive() && this._level.actors[j].isAlive()) {
					var hit = this._level.actors[i].isHitting(this._level.actors[j]);
					if(hit) {
						hits.push({
							hitter: this._level.actors[i],
							hittee: this._level.actors[j],
							hit: hit
						});
					}
				}
			}
		}
		for(i = 0; i < hits.length; i++) {
			if(hits[i].hitter.isAlive()) {
				hits[i].hitter.onHit(hits[i].hittee, hits[i].hit);
			}
			if(hits[i].hittee.isAlive()) {
				hits[i].hittee.onHitBy(hits[i].hitter, hits[i].hit);
			}
		}

		//end of frame
		for(i = 0; i < this._level.actors.length; i++) {
			if(this._level.actors[i].isAlive()) {
				this._level.actors[i].endOfFrame();
			}
		}
		this._level.endOfFrame();
	};
	LevelRunner.prototype._checkForCollisions = function(actor) {
		var i, j, box, collision, tiles;
		for(i = 0; i < actor.collisionBoxes.length; i++) {
			box = actor.collisionBoxes[i];

			//check for collisions with other actors
			for(j = 0; j < this._level.actors.length; j++) {
				if(this._level.actors[j].isAlive() && !this._level.actors[j].sameAs(actor)) {
					collision = this._level.actors[j].collidableBox.isOverlapping(box);
					if(collision) {
						actor.handleCollision(collision, box);
						actor.recalculateCollisionBoxes();
					}
				}
			}

			//check for collisions with obstacles
			for(j = 0; j < this._level.obstacles.length; j++) {
				collision = this._level.obstacles[j].collidableBox.isOverlapping(box);
				if(collision) {
					actor.handleCollision(collision, box);
					actor.recalculateCollisionBoxes();
				}
			}

			//check for collisions with tiles
			tiles = this._level.backgroundTileGrid.getTilesOverlapping(actor.boundingBox);
			for(j = 0; j < tiles.length; j++) {
				collision = tiles[j].collidableBox.isOverlapping(box);
				if(collision) {
					actor.handleCollision(collision, box);
					actor.recalculateCollisionBoxes();
				}
			}
			tiles = this._level.tileGrid.getTilesOverlapping(actor.boundingBox);
			for(j = 0; j < tiles.length; j++) {
				collision = tiles[j].collidableBox.isOverlapping(box);
				if(collision) {
					actor.handleCollision(collision, box);
					actor.recalculateCollisionBoxes();
				}
			}
		}
	};
	LevelRunner.prototype.render = function(ctx) {
		ctx.fillStyle = this._level.backgroundColor;
		ctx.fillRect(0, 0, Global.WIDTH, Global.HEIGHT);
		this._renderLayer(ctx, 'FAR_BACKGROUND');
		this._level.backgroundTileGrid.render(ctx, this._level.camera);
		this._renderLayer(ctx, 'BACKGROUND');
		this._level.tileGrid.render(ctx, this._level.camera);
		this._renderLayer(ctx, 'STAGE');
		this._renderLayer(ctx, 'FOREGROUND');
		this._level.renderHUD(ctx, this._level.camera);
		this._renderLayer(ctx, 'FAR_FOREGROUND');
	};
	LevelRunner.prototype._renderLayer = function(ctx, layer) {
		var i;
		for(i = 0; i < this._level.obstacles.length; i++) {
			if(this._level.obstacles[i].renderLayer === layer) {
				this._level.obstacles[i].render(ctx, this._level.camera);
			}
		}
		for(i = 0; i < this._level.widgets.length; i++) {
			if(this._level.widgets[i].renderLayer === layer) {
				this._level.widgets[i].render(ctx, this._level.camera);
			}
		}
		for(i = 0; i < this._level.actors.length; i++) {
			if(this._level.actors[i].isAlive() && this._level.actors[i].renderLayer === layer) {
				this._level.actors[i].render(ctx, this._level.camera);
			}
		}
		for(i = 0; i < this._level.effects.length; i++) {
			if(this._level.effects[i].isAlive() && this._level.effects[i].renderLayer === layer) {
				this._level.effects[i].render(ctx, this._level.camera);
			}
		}
	};
	return LevelRunner;
});