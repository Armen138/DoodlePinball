define(["box2d.min"], function(){

	var Flipper = function(world, canvas) {
		var fixDef = new Box2D.Dynamics.b2FixtureDef,
			bodyDef = new Box2D.Dynamics.b2BodyDef;
		bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
		fixDef.friction = 0.2;
		fixDef.density = 1;
		fixDef.restitution = 0.2;
		fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
		/*fixDef.shape.SetAsEdge( new Box2D.Common.Math.b2Vec2(0, 0),
								new Box2D.Common.Math.b2Vec2(8, 0));*/
		fixDef.shape.SetAsBox(2.0, 0.1);
		var position = {x: 1, y: 24};
		bodyDef.position.Set(position.x, position.y);
		body = world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
		fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
		fixDef.shape.SetAsBox(0.1, 0.1);
		bodyDef.position.Set(position.x + 1, position.y);
		anchor = world.CreateBody(bodyDef);
		anchor.CreateFixture(fixDef);

		var joint = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
    	joint.Initialize(anchor, body, anchor.GetWorldCenter());
    	world.CreateJoint(joint);
		return {
			draw: function() {
				var position = body.GetPosition();
				var angle = body.GetAngle();
				canvas.context.save();
				canvas.context.rotate(angle);
				canvas.context.lineWidth = 4;
				canvas.context.translate(position.x * 50, position.y * 50);
				canvas.context.moveTo(0, 0);
				canvas.context.lineTo(8 * 50, 0);
				canvas.context.stroke();
				canvas.context.restore();
			},
			flip: function() {
				var force = 30;
				body.ApplyTorque(force);				
			}
		}
	};

	return Flipper;
});