// Handle form submission to add a car
carForm.addEventListener("submit", function (event) {
    event.preventDefault();


    const carMake = document.getElementById('carMake');
    const carModel = document.getElementById('carModel');
    const carYear = document.getElementById('carYear');
    const carPrice = document.getElementById('carPrice');
    const carImage = document.getElementById('carImage');

    const newCar = {
        Make: carMake.value,
        Model: carModel.value,
        Year : carYear.value,
        Price : carPrice.value,
        Image :carImage.value,
    };

    // Send a POST request to add the new animal
    fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
    })
        .then(response => response.json())
        .then(addedCar => {
        // Display the added car
        fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas")
        .then(response => response.json())
        .then(updatedCars => {
            displayCar(updatedCars);

            // Clear the form inputs
            carMake.value = "",
            carModel.value = "",
            carYear.value = "",
            carPrice.value = "",
            carImage.value = ""

         });
     });
})

    // Function to display the added car image
    function displayCar(cars) {
        newAddedImage.innerHTML = "";
        cars.forEach((div, index) => {
            div.innerHTML = `
                <img>${newCar.Image}</img>

            `;

        });
    }

        // Function to display the added car make
        function displayCar(cars) {
            Make.innerHTML = "";
            cars.forEach((div, index) => {
                div.innerHTML = `
                    <h1>${newCar.Make}</h1>

                `;

            });
        }

        // Function to display the added car model
        function displayCar(cars) {
            Model.innerHTML = "";
            cars.forEach((div, index) => {
                div.innerHTML = `
                    <h1>${newCar.Model}</h1>

                `;

            });
        }


        // Function to display the added car year
        function displayCar(cars) {
            Year.innerHTML = "";
            cars.forEach((div, index) => {
                div.innerHTML = `
                    <h1>${newCar.Year}</h1>

                `;

            });
        }


        // Function to display the added car price
        function displayCar(cars) {
            Price.innerHTML = "";
            cars.forEach((div, index) => {
                div.innerHTML = `
                    <h1>${newCar.Price}</h1>

                `;

            });
        }