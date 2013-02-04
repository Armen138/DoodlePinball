define(["canvas", "resources", "ball", "table", "box2d.min"], function(Canvas, Resources, Ball, Table) {
	var world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 5), true),
		ball;
	Canvas.size(800, 1600);
	Resources.on("load", function() {
		console.log("loaded");
		ball = Ball(world, Resources.images.ball, Canvas);
		table = Table(world, Canvas);

		game.run();
		console.log(Canvas.size());
	});
	Resources.load({
		"ball": "images/ball.png"
	});	
	var game = {
		run: function() {
			Canvas.clear();
			world.Step(0.12, 10, 10);
			world.ClearForces();
			ball.draw();
			table.draw();
			setTimeout(game.run, 17);
		}
	};
	window.addEventListener("keyup", function(e){
		ball.boop(); 
	});
	return game;
});