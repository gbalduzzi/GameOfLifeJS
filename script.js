var x, y, numbX, numbY, w, h, started = 0;
var matrix, tempMatrix, generations = 0;

(function ($) {

	$(document).ready(function () {
		x= $(window).width();
		y= $(window).height()-100;
		numbX = Math.floor(x / 15);
		numbY = Math.floor(y / 15);
		w = x / numbX;
		h = y / numbY;

		for (var i=0; i < numbY; i++) {
			$("article #container").append('<span class="row row-'+i+'" row='+i+'></span>');
			for (var j=0; j < numbX; j++) {
				$("article #container .row-"+i+"").append('<div class="cell cell-'+j+'" col="'+j+'" ></div>');
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

		$("#reset").click(function () {
			started = 0;
			$("#start").text("Start");
			matrix = null;
			generations = 0;
			updateGenerations();

			$("article #container .cell").each(function () {
				if ($(this).hasClass('on')) {
					$(this).removeClass('on');
				}
			});
		})

		$("#start").click(function () {
			if (started) {
				started = 0;
				$(this).text('Restart');
			} else {
				start();
				$(this).text('Stop');
			}

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
				matrix[$(this).parent().attr('row')][$(this).attr('col')] = 1;
			}
		});
	}

	function getNumberNeighbours(i, j) {
		var n= matrix[i-1][j-1] + matrix[i-1][j] + matrix[i-1][j+1] + matrix[i][j-1] + matrix[i][j+1] + matrix[i+1][j-1] + matrix[i+1][j] + matrix[i+1][j+1];
		return n;
	}

	function applyDiff(diff) {
		for(var i =0; i < diff.length; i++) {
			matrix[diff[i][0]][diff[i][1]] = diff[i][2];
			if (diff[i][2]) {
				$("article #container .row-"+diff[i][0]+" .cell-"+diff[i][1]+"").addClass('on');
			} else {
				$("article #container .row-"+diff[i][0]+" .cell-"+diff[i][1]+"").removeClass('on');
			}
		}
	}

	function updateGenerations() {
		$("footer #counter-number").text(generations);
	}

	function changeGeneration() {
		if (!started) {
			return;
		}
		var diff = new Array();

		for (var i = 1; i < matrix.length-1; i++) {
			for (var j=1; j < matrix[i].length-1; j++) {
				var n = getNumberNeighbours(i,j);

				if (n < 2 || n > 3) {
					if (matrix[i][j] != 0) {
						var diffElem = new Array();
						diffElem.push(i);
						diffElem.push(j);
						diffElem.push(0);
						diff.push(diffElem);
					}

				} else if (n == 3) {
					if (matrix[i][j] != 1) {
						var diffElem = new Array();
						diffElem.push(i);
						diffElem.push(j);
						diffElem.push(1);
						diff.push(diffElem);
					}
				}
			}
		}
		applyDiff(diff);

		generations++;
		updateGenerations();

		setTimeout(changeGeneration, 250);
	}


})(jQuery);
