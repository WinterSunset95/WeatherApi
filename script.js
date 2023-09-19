const userinput = document.getElementById("userinput")
const display = document.getElementById("display")

const inputClick = () => {
	document.querySelector('.placeholder').style.transform = "scale(0.9)"
	userinput.style.height= "auto"
	userinput.style.padding= "0.5rem"
	userinput.focus()
}

document.addEventListener('mousedown', (e) => {
	if (e.target != userinput) {
		document.querySelector('.placeholder').style.transform = "scale(1)"
		userinput.style.height= "0"
		userinput.style.padding= "0"
	}
})

const getWeather = () => {
	const input = userinput.value;
	fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${input}`, {
		method: "GET",
		headers: {
			'X-RapidAPI-Key': 'b0286087bfmshfa69e2cad96216ep15190cjsn57eb91b3cf1b',
			'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
		}
	})
	.then(response => response.json())
	.then(data => {
		console.log(data)
		try {
			display.innerHTML = `
				<h3>${data.location.name}, ${data.location.region}, ${data.location.country}</h3>
				<p>Weather Condition: ${data.current.condition.text}</p>
				<p>
				Humidity: ${data.current.humidity} <br>
				Temperature: ${data.current.temp_c} <br>
				Wind: ${data.current.gust_kph}km/h
				</p>
			`
		} catch {
			display.innerHTML = `
				Error: ${data.error.message}
			`
		}
	})
	.catch(err => {
		console.log("error")
		console.log(err)
	})
}
