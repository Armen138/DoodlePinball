define(["box2d.min"], function() {
	var Ball = function(world, image, canvas) {
		var scale = 50;
		var pPos = new Box2D.Common.Math.b2Vec2(0.1, 0.1),
			fixDef = new Box2D.Dynamics.b2FixtureDef,
			bodyDef = new Box2D.Dynamics.b2BodyDef,
			body = null;
		var kick = false;
		fixDef.friction = 0.2;
		fixDef.density = 1;
		fixDef.restitution = 0.2;	
		bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
		fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(0.64);
		fixDef.userData = this;
		bodyDef.position.Set(pPos.x, pPos.y);
		bodyDef.allowSleep = false;
		body = world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);
		
		return {
			draw: function() {
				var position = body.GetPosition();
				var angle = body.GetAngle();
				canvas.context.save();
				canvas.context.translate(position.x * scale, position.y * scale);
				canvas.context.rotate(angle);
				canvas.context.drawImage(image, -32, -32);
				canvas.context.restore();
			},
			boop: function() {
				var force = new Box2D.Common.Math.b2Vec2(-1, -30.0);
				body.ApplyImpulse(force, body.GetWorldCenter());
			}
		};
	};
	return Ball;
});