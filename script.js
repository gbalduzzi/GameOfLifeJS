var x, y, numbX, numbY, w, h, started = 0;
var matrix, tempMatrix;

function cloneMatrix (matrix) {
	var cloneMatrix = [];
	for (var i = 0; i < matrix.length; i++) {
		cloneMatrix[i] = matrix[i].slice();
	}

	return cloneMatrix;
}

(function ($) {

	$(document).ready(function () {
		x= $(window).width();
		y= $(window).height()-100;
		numbX = Math.floor(x / 10);
		numbY = Math.floor(y / 10);
		w = x / numbX;
		h = y / numbY;

		for (var i=0; i < numbY; i++) {
			for (var j=0; j < numbX; j++) {
				$("article #container").append('<div class="cell" row="'+i+'" column="'+j+'"></div>');
			}
		}

		$("article .cell").css({ "width": w, "height": h }); 

		$("article .cell").click(function () {

			if (started) {
				return;
			}

			if ($(this).hasClass('on')) {
				$(this).removeClass('on');
			} else {
				$(this).addClass('on');
			}	
		});

		$("#button").click(function () {
			start();
			
		})
	});

	function start () {
		if (!started) {
			started = 1;
		} else {
			return;
		}

		matrix = new Array(numbY);
		for (var i=0; i < numbY; i++) {
			matrix[i] = new Array (numbX);
			for (var j=0; j < numbX; j++) {
				matrix[i][j] = 0;
			}
		}

		mapIntoMatrix();

		changeGeneration();

	}

	function mapIntoMatrix() {
		$("article #container .cell").each(function () {
			if ($(this).hasClass('on')) {
				matrix[$(this).attr('row')][$(this).attr('column')] = 1;
			}
		});
	}

	function drawFromMatrix() {
		$("article #container .cell").each(function () {
			if (matrix[$(this).attr('row')][$(this).attr('column')] == 1 && !$(this).hasClass('on')) {
				$(this).addClass('on');
			} else if (matrix[$(this).attr('row')][$(this).attr('column')] == 0 && $(this).hasClass('on')) {
				$(this).removeClass('on');
			}
		});
	}

	function getNumberNeighbours(i, j) {
		var n= matrix[i-1][j-1] + matrix[i-1][j] + matrix[i -1][j+1] + matrix[i][j-1] + matrix[i][j+1] + matrix[i+1][j-1] + matrix[i+1][j] + matrix[i+1][j+1];
		return n;
	}

	function changeGeneration() {
		tempMatrix = cloneMatrix(matrix)

		for (var i = 1; i < matrix.length-1; i++) {
			for (var j=1; j < matrix[i].length-1; j++) {
				var n = getNumberNeighbours(i,j);
				if (n < 2 || n > 3) {
					tempMatrix[i][j] = 0;
				} if (n == 3) {
					tempMatrix[i][j] = 1;
				}
			}
		}
		matrix = cloneMatrix(tempMatrix);

		drawFromMatrix();


		setTimeout(changeGeneration, 50);
	}


})(jQuery); 
