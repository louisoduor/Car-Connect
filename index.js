document.addEventListener("DOMContentLoaded", function () {
    const brandNameDivs = document.querySelectorAll('#brand');
    const brandYearDivs = document.querySelectorAll('#year');
    const fleetsDiv = document.querySelector('.fleets-div');

    // Fetch data from API (brand names)
    fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas")
        .then(resp => resp.json())
        .then(data => {
            // Display the brand names
            displayBrandNames(data);
        });

    // Fetch data from API (model - year|fuel type)
    fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos")
        .then(resp => resp.json())
        .then(data => {
            // Display the brand years
            displayBrandYears(data);
        });

    // Fetch data from Json server
    fetch("http://localhost:3000/cars")
        .then(resp => resp.json())
        .then(data => {
            // Create buttons for each brand
            createBrandButtons(data);
        });

    // Event listener for brand buttons
    fleetsDiv.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const selectedMake = event.target.dataset.make;
            displayCarDetails(selectedMake);
        }
    });

    // Function to display the brand names
    function displayBrandNames(brand) {
        brandNameDivs.forEach((brandDiv, index) => {
            brandDiv.innerHTML = `
                <h1 >${brand[index].nome}</h1>
            `;
        });
    }

    function displayBrandYears(year) {
        brandYearDivs.forEach((brandDiv, index) => {
            brandDiv.innerHTML = `
                <p>${year[index].nome}</p>
            `;
        });
    }

    // Function to create buttons for each brand
    function createBrandButtons(brand) {
        brand.forEach((brandData) => {
            const button = document.createElement('button');

            button.innerText = brandData.make;
            button.dataset.make = brandData.make;
            fleetsDiv.appendChild(button);

            button.style.backgroundColor = "orange"
            button.style.color = "white"
            button.style.fontSize = "20px"
            button.style.fontWeight = "900"
            button.style.padding = "10px"
            button.style.marginRight = "20px"
            button.style.borderRadius = "10px"
            button.style.paddingBottom = "10px"
        });
    }

    // Function to display the car details
    function displayCarDetails(selectedMake) {
        // Fetch data from json server
        fetch(`http://localhost:3000/cars?make=${selectedMake}`)
            .then(resp => resp.json())
            .then(data => {
                renderCarDetails(data[0]);
            });
    }

    // Function to render car details
    function renderCarDetails(carData) {
        const carDetailsDiv = document.querySelector('.fleets');
        carDetailsDiv.innerHTML = `

            <div id ="selected-car" class ="selected-car">
                <div class="car-photo">
                    <img src="${carData.image}" alt="">
                </div>
                <div class="details">
                    <div id = "ava-cars" class="text-white text-3xl font-semibold">${carData.make}</div>
                    <div class="text-white text-2xl font-semibold">${carData.model}</div>
                    <div class="text-orange-600 text-2xl font-semibold">${carData.year}</div>
                    <div class="text-white text-2xl font-semibold">${carData.price}</div>
                    <button class="purchase-button bg-orange-600 text-white text-3xl mt-5 p-2">Purchase</button>
                    <button class="back-button bg-orange-600 text-white text-3xl mt-5 p-2"><a href="index.html">Back</a></button>
                </div>
            </div>
            `;

        // Event listener for purchase button
        const purchaseButton = document.querySelector('.purchase-button');
        purchaseButton.addEventListener('click', function () {
            displayPurchaseForm(carData);
        });
    }

    // Function to display the purchase form
    function displayPurchaseForm(carData) {
        const carDetailsDiv = document.querySelector('.fleets');
        carDetailsDiv.innerHTML = `
            <form id="purchaseForm">
                <div class="form-group">
                    <label for="buyerName" class="text-orange-600 font-extrabold text-3xl">Name:</label>
                    <input type="text" id="buyerName" name="buyerName" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="buyerPhone" class="text-orange-600 font-extrabold text-3xl">Phone Number:</label>
                    <input type="text" id="buyerPhone" name="buyerPhone" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="buyerEmail" class="text-orange-600 font-extrabold text-3xl">Email:</label>
                    <input type="email" id="buyerEmail" name="buyerEmail" class="form-input" required>
                </div>
                <button type="submit" class="button bg-orange-600 p-4 text-white font-extrabold">Submit Order</button>
                <button type="submit" class="button bg-orange-600 p-4 mt-5 text-white font-extrabold"> <a href = "index.html">Home</a></button>

            </form>
        `;

        // Event listener for form submission
        const purchaseForm = document.getElementById('purchaseForm');
        purchaseForm.addEventListener('submit', function (event) {
            event.preventDefault();
            handlePurchase(carData);
        });
    }

    // Function to handle the purchase
    function handlePurchase(carData) {
        // You can add logic here to handle the purchase
        alert(`Purchase successful!\nDetails:\nMake: ${carData.make}\nModel: ${carData.model}\nYear: ${carData.year}\nPrice: ${carData.price}\nBuyer: ${document.getElementById('buyerName').value}`);
        
        // Reset the UI to initial state
        displayBrandNames([]);
        displayBrandYears([]);
        fleetsDiv.innerHTML = '';
    }
    

    // Event listener for form submission
    const carPostForm = document.getElementById('carFormPost');
    carPostForm.addEventListener('click', function (event) {
        event.preventDefault();
        postFormDataToDB();
    });
    // Function to post form data to the server bd.json
    function postFormDataToDB() {
    const make = document.getElementById('carMake').value;
    const model = document.getElementById('carModel').value;
    const year = document.getElementById('CarYear').value;
    const price = document.getElementById('CarPrice').value;
    const image = document.getElementById('CarImage').value;

    // Prepare the data to be sent
    const formData = {
        make: make,
        model: model,
        year: year,
        price: price,
        image : image

    };

    fetch(' http://localhost:3000/cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Success:', data);
    })
    .catch((error) => {
        alert('Error:', error);
    })
}
});
