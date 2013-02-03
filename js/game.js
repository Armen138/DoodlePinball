define(["canvas", "resources", "box2d.min"], function(Canvas, Resources) {
	var world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 5), true);
	Canvas.size(800, 600);
	Resources.on("load", function() {
		console.log("loaded");
		Canvas.context.drawImage(Resources.images.ball, 0, 0);
	});
	Resources.load({
		"ball": "images/ball.png"
	});	
	var game = {
		run: function() {
			console.log("run game");
		}
	};
	return game;
});