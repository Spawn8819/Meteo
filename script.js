$(document).ready(function () {

	let city = ['London', 'Milan', 'Bangkok', 'Los Angeles', 'Nairobi'];
	let api = '419e1f85af2d8b43d06c32691b7fb745';
	let index =
	{
		value: 1,
		change() {
			$("#nome").empty();
			$("#nome").append(datiMeteo[index.getvalue - 1].name);
			$("#tempo").empty();
			$("#tempo").append(datiMeteo[index.getvalue - 1].weather[0].main);
			$("#gradi").empty();
			let celsius = datiMeteo[index.getvalue - 1].main.temp - 273.15;
			$("#gradi").append(Math.round(celsius));
			$("#minmax").empty();
			let min = datiMeteo[index.getvalue - 1].main.temp_min - 273.15;
			let max = datiMeteo[index.getvalue - 1].main.temp_max - 273.15;
			$("#minmax").append(Math.round(min) + "°/" + Math.round(max) + "°");
			// $("#icona img").src = "http://openweathermap.org/img/wn/" + datiMeteo[index.getvalue - 1].weather[0].icon + ".png";
			let img =new Image();
			img.src = "http://openweathermap.org/img/wn/"+ datiMeteo[index.getvalue - 1].weather[0].icon +"@2x.png";
			$("#icona").empty();
			$("#icona").append(img);

		},
		get getvalue() {
			return this.value;
		},
		set setvalue(v) {
			this.value = v;
			this.change();
		}
	};
	let slides = $(".slides > div").length;
	let datiMeteo;
	const promises = [];
	let path = document.location.href;

	function call(value) {
		return new Promise((resolve) => {
			setTimeout(() => {
				// console.log("Resolving " + value);

				$.get('https://api.openweathermap.org/data/2.5/weather?q=' + city[value] + '&appid=' + api).done(function (data) {
					datiMeteo += data;
					resolve(data);
				});

				// resolve(value);
			}, Math.floor(Math.random() * 1000));
		});
	}



	for (let i = 0; i <= 4; ++i) {
		promises.push(call(i));
	}

	Promise.all(promises)
		.then((results) => {
			$(".loader").css("display", "none");
			datiMeteo = results;

			$("#nome").empty();
			$("#nome").append(datiMeteo[index.getvalue - 1].name);
			$("#tempo").empty();
			$("#tempo").append(datiMeteo[index.getvalue - 1].weather[0].main);
			$("#gradi").empty();
			let celsius = datiMeteo[index.getvalue - 1].main.temp - 273.15;
			$("#gradi").append(Math.round(celsius));
			$("#minmax").empty();
			let min = datiMeteo[index.getvalue - 1].main.temp_min - 273.15;
			let max = datiMeteo[index.getvalue - 1].main.temp_max - 273.15;
			$("#minmax").append(Math.round(min) + "°/" + Math.round(max) + "°");
			// $("#icona img").src = "http://openweathermap.org/img/wn/" + datiMeteo[index.getvalue - 1].weather[0].icon + ".png";
			let img =new Image();
			img.src = "http://openweathermap.org/img/wn/"+ datiMeteo[index.getvalue - 1].weather[0].icon +"@2x.png";
			$("#icona").empty();
			$("#icona").append(img);
			console.log("All done", results);
		})
		.catch((e) => {
			console.log("ERRORE:" + e);
		});

	$("#next").on('click', function () {
		if (index.getvalue + 1 <= slides) {
			index.setvalue = index.getvalue + 1;
			document.location.href = path + '#slide-' + index.getvalue;
		}
	});
	$("#prev").on('click', function () {
		if (index.getvalue - 1 >= 1) {
			index.setvalue = index.getvalue - 1;
			document.location.href = path + '#slide-' + index.getvalue;
		}
	});
	$(".slider-nav a").on('click', function () {
		let str = this.getAttribute("href");
		var res = str.split("-", 2);
		index.setvalue = parseInt(res[1]);
	});

	jQuery(window).on("swipeleft", function (event) {
		if (index.getvalue + 1 <= slides) {
			index.setvalue = index.getvalue + 1;
			document.location.href = path + '#slide-' + index.getvalue;
		}
	});
	jQuery(window).on("swiperight", function (event) {
		if (index.getvalue - 1 >= 1) {
			index.setvalue = index.getvalue - 1;
			document.location.href = path + '#slide-' + index.getvalue;
		}
	});

})