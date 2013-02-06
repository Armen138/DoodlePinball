define(["box2d.min"], function(){

	var Flipper = function(world, canvas) {

		var flip = false;
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
		var position = {x: 10, y: 10};
		bodyDef.position.Set(position.x + 1, position.y);
		var body = world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
		fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
		fixDef.shape.SetAsBox(0.1, 0.1);
		bodyDef.position.Set(position.x, position.y);
		var anchor = world.CreateBody(bodyDef);
		anchor.CreateFixture(fixDef);

		bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
		fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
		fixDef.shape.SetAsBox(0.1, 0.1);
		bodyDef.position.Set(position.x + 1.4, position.y + 0.4);
		//var anchor2 = world.CreateBody(bodyDef);
		//anchor2.CreateFixture(fixDef);

		var joint = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
		joint.enableMotor = true;
		joint.motorSpeed = -1;
		joint.maxMotorTorque = 100;
		joint.enableLimit = true;
/*		joint.upperAngle = -2.5;
		joint.lowerAngle = -3.3;*/
		joint.referenceAngle = 0;
		joint.upperAngle = 4;
		joint.lowerAngle = 0;

    	joint.Initialize(anchor, body, anchor.GetWorldCenter());
    	var revoluteJoint = world.CreateJoint(joint);
		return {
			draw: function() {
				var position = body.GetPosition();
				var angle = body.GetAngle();
				canvas.context.save();
				canvas.context.lineWidth = 4;
				canvas.context.translate(position.x * 50, position.y * 50);
				canvas.context.rotate(angle);				
				canvas.context.strokeRect(-50, -2.5, 2 * 50, 0.1 * 50);
				canvas.context.restore();

				canvas.context.save();
				position = anchor.GetPosition();
				canvas.context.translate(position.x * 50, position.y * 50);
				canvas.context.strokeStyle = "red";
				canvas.context.lineWidth = 4;
				canvas.context.strokeRect(0, 0, 0.1 * 50 - 2.5, 0.1 * 50 - 2.5);
				canvas.context.restore();
/*
				canvas.context.save();
				position = anchor2.GetPosition();
				canvas.context.translate(position.x * 50, position.y * 50);
				canvas.context.strokeStyle = "red";
				canvas.context.lineWidth = 4;
				canvas.context.strokeRect(0, 0, 0.1 * 50 - 2.5, 0.1 * 50 - 2.5);
				canvas.context.restore();*/
			},
			flip: function() {
				console.log("flip");
				flip = !flip;
				//revoluteJoint.EnableMotor(flip);
				revoluteJoint.SetMotorSpeed(flip ? -1 : 1);
			}
		}
	};

	return Flipper;
});