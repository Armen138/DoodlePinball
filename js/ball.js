define(function() {
	var Ball = function(world, image, canvas) {
		var x, y;
		return {
			draw: function() {
				canvas.context.drawImage(image, x, y);
			}
		};
	};
	return Ball;
});