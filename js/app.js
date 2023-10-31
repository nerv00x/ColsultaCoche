
let arrayCoches; // This variable will store the list of car makes retrieved from the API
const campoInputMarcasHTML = document.getElementById('marca'); // Get the input field for car makes
const sugerencias = document.querySelector('.sugerencias'); // Get the container for suggestions

async function consultaApiCochesInfo() {
    return fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json")
        .then(function (resultadoEnBruto) {
            return resultadoEnBruto.json();
        })
        .then(function (resultadoJSON) {
            return resultadoJSON;
        })
        .catch(function (error) {
            console.log(`Error promesa: ${error}`);
        });
}

window.addEventListener('load', async () => {
    // Fetch car makes from the API and store them in the arrayCoches
    const listadoCoches = await consultaApiCochesInfo();
    arrayCoches = listadoCoches.Results;
    // arrayCoches now contains an array of objects with car make information.
});

function filtradoTerminoEnArray(arrayDatos, termino) {
    // Filter the array based on the search term (termino) and return the filtered array
    return arrayDatos.filter(item => item.MakeName.toLowerCase().includes(termino.toLowerCase()));
}

function autoCompletado(e) {
    // This function should be executed every time the user inputs a value in the input field
    const searchTerm = campoInputMarcasHTML.value;
    const filteredResults = filtradoTerminoEnArray(arrayCoches, searchTerm);

    // Clear previous suggestions
    sugerencias.innerHTML = '';

    // Create and append new suggestion options
    filteredResults.forEach(item => {
        const option = document.createElement('option');
        option.value = item.MakeName;
        sugerencias.appendChild(option);
    });
}

// Attach the "input" event listener to the input field for real-time autocompletion
campoInputMarcasHTML.addEventListener('input', autoCompletado);


