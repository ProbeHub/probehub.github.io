let numInputs = 1;

function addInput() {
	numInputs++;

	const inputsContainer = document.getElementById("inputs-container");
	const newInput = document.createElement("div");

	newInput.innerHTML = `<label for="alphabets-input-${numInputs}">Swallowing Trial:</label>
	<input type="text" id="alphabets-input-${numInputs}" data-index="${numInputs}">
	<button onclick="changeIncrement(${numInputs}, 1)">+</button>
	<button onclick="changeIncrement(${numInputs}, -1)">-</button>
	<input type="text" id="alphabets-input-count-${numInputs}" disabled>
	<br><br>`;

	inputsContainer.appendChild(newInput);
}

function changeIncrement(index, increment) {
	const input = document.getElementById(`alphabets-input-${index}`);
	const countField = document.getElementById(`alphabets-input-count-${index}`);
	let currentIncrement = parseInt(input.getAttribute("data-increment")) || 1;
	currentIncrement += increment;
	if (currentIncrement < 1) {
		currentIncrement = 1;
	}
	input.setAttribute("data-increment", currentIncrement);
	countField.value = `Number of repetition: ${currentIncrement}`;
}

function randomize() {
	const inputs = document.getElementsByTagName("input");
	const output = document.getElementById("output");

	// Create an object to store the input values and their respective increment counters
	const inputValues = {};
	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i].type === "text") {
			const index = inputs[i].getAttribute("data-index");
			inputValues[index] = inputs[i].value;
		}
	}

	// Concatenate the input values into a single string, duplicating each input by its designated increment number
	let concatenatedAlphabets = "";
	for (let i = 1; i <= numInputs; i++) {
		if (inputValues[i]) {
			const input = inputValues[i];
			const increment = parseInt(document.getElementById(`alphabets-input-${i}`).getAttribute("data-increment")) || 1;
			for (let j = 0; j < increment; j++) {
				concatenatedAlphabets += input + ',';
			}
		}
	}

	// Split the concatenated string into an array of characters
	const alphabets = concatenatedAlphabets.split(",");

	// Randomize the array
	for (let i = alphabets.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[alphabets[i], alphabets[j]] = [alphabets[j], alphabets[i]];
	}

	// Count the occurrences of each letter
	let outputAlphabets = "";
	const counts = {};
	for (let i = 0; i < alphabets.length; i++) {
		if (alphabets[i] == "") { continue; }
		const letter = alphabets[i];
		if (counts[letter]) {
			counts[letter]++;
		} else {
			counts[letter] = 1;
		}
		outputAlphabets += alphabets[i] + " trial_" + counts[letter] + "\n";
	}

	// Set the randomized array as the output value
	// output.value = alphabets.join("\n");
	output.value = outputAlphabets;
}

function printOutput() {
	const randomized = document.getElementById("output").value.split("\n");
	let toPrint = "<h1>" + document.getElementById("title").value + "\n\n</h1>";
	for (let i = 0; i < randomized.length; i++) {
		toPrint += randomized[i] + "<br>";
	}
	var win = window.open("about:blank")
	win.document.write(toPrint)
	win.print()
	win.close()
	// window.print(toPrint);
}

function handleFileSelect(event) {
	const file = event.target.files[0];
	const reader = new FileReader();
	reader.onload = function (event) {
		const contents = event.target.result;
		parseCSV(contents);
	};
	reader.readAsText(file);
}

function parseCSV(csv) {
	const lines = csv.split("\n");
	const inputsContainer = document.getElementById("inputs-container");
	inputsContainer.innerHTML = "";

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		if (line === "") { continue; }
		const inputs = line.split(",");
		const inputIndex = i + 1;
		const newInput = document.createElement("div");
		newInput.innerHTML = `<label for="alphabets-input-${inputIndex}">Swallowing Trial:</label>
		<input type="text" id="alphabets-input-${inputIndex}" value="${inputs[0]}" data-index="${inputIndex}">
		<button onclick="changeIncrement(${inputIndex}, 1)">+</button>
		<button onclick="changeIncrement(${inputIndex}, -1)">-</button>
		<input type="text" id="alphabets-input-count-${inputIndex}" value="Number of repetition: ${inputs[1] || 1}" disabled>
		<br><br>`;
		inputsContainer.appendChild(newInput);
	}
	numInputs = lines.length;
}
