define(["box2d.min"], function(){

	var Flipper = function(world, canvas, side) {

		var position = {x: 4, y: 30};
		var length = 3.5;
		if(side < 0) {
			position.x = 12;
		}
		var flip = false;
		var fixDef = new Box2D.Dynamics.b2FixtureDef,
			bodyDef = new Box2D.Dynamics.b2BodyDef;
		bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
		fixDef.friction = 0.2;
		fixDef.density = 1;
		fixDef.restitution = 0.2;
		fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();


		fixDef.shape.SetAsBox(length / 2, 0.2);
		
		bodyDef.position.Set(position.x + ((length / 2 - 0.2) * side), position.y);
		var body = world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
		fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
		fixDef.shape.SetAsBox(0.1, 0.1);
		bodyDef.position.Set(position.x, position.y);
		var anchor = world.CreateBody(bodyDef);
		anchor.CreateFixture(fixDef);

		var joint = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
		joint.enableMotor = false;
		joint.motorSpeed = -100;
		joint.maxMotorTorque = 100;
		joint.enableLimit = true;
		joint.referenceAngle = 0;
		joint.upperAngle = 0.2;
		joint.lowerAngle = -0.2;

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
				canvas.context.strokeRect((-1 * (length / 2) * 50) - (7 * side), -13, length * 50, 0.5 * 50);
				canvas.context.restore();

				canvas.context.save();
				position = anchor.GetPosition();
				canvas.context.translate(position.x * 50, position.y * 50);
				canvas.context.strokeStyle = "red";
				canvas.context.lineWidth = 4;
				canvas.context.strokeRect(0, 0, 0.1 * 50 - 2.5, 0.1 * 50 - 2.5);
				canvas.context.restore();

			},
			on: function() {
				revoluteJoint.EnableMotor(true);
				revoluteJoint.SetMotorSpeed(-1000 * side);
			},
			off: function() {
				revoluteJoint.EnableMotor(false);
			},
			flip: function() {
				console.log("flip");
				flip = !flip;
				revoluteJoint.EnableMotor(flip);
				revoluteJoint.SetMotorSpeed(-1000 * side);
			}
		}
	};

	return Flipper;
});