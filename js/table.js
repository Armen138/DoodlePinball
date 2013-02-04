define(["events", "flipper", "box2d.min"], function(events, Flipper) {
	/* table size:
		80x160cm
		0.8x1.6m
	*/
	var Table = function(world, canvas) {
		//create ground
		var fixDef = new Box2D.Dynamics.b2FixtureDef,
			bodyDef = new Box2D.Dynamics.b2BodyDef;
		bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
		fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
		fixDef.shape.SetAsEdge( new Box2D.Common.Math.b2Vec2(0, 0),
								new Box2D.Common.Math.b2Vec2(32, 0));
		bodyDef.position.Set(0, 32);
		world.CreateBody(bodyDef).CreateFixture(fixDef);

		fixDef.shape.SetAsEdge( new Box2D.Common.Math.b2Vec2(0, 0),
								new Box2D.Common.Math.b2Vec2(32, 0));
		bodyDef.position.Set(0, 0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);			

		fixDef.shape.SetAsEdge( new Box2D.Common.Math.b2Vec2(0, 0),
								new Box2D.Common.Math.b2Vec2(0, 32));
		bodyDef.position.Set(0, 0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);			


		fixDef.shape.SetAsEdge( new Box2D.Common.Math.b2Vec2(0, 0),
								new Box2D.Common.Math.b2Vec2(0, 32));
		bodyDef.position.Set(16, 0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);		

		var flipper = Flipper(world, canvas);
		return {
			draw: function() {
				flipper.draw();
			}
		};
		window.addEventListener("click", function() {
			flipper.flip();
		});
	};
	return Table;
});