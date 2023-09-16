import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

const breedSelect = document.getElementById("breed-select");
const loader = document.getElementById("loader");
const errorText = document.getElementById("error");
const catInfoDiv = document.getElementById("cat-info");
const catBreed = document.getElementById("cat-breed");
const catDescription = document.getElementById("cat-description");
const catTemperament = document.getElementById("cat-temperament");
const catImage = document.getElementById("cat-image-main"); // Виправив ідентифікатор

function clearCatInfo() {
    catBreed.textContent = "";
    catDescription.textContent = "";
    catTemperament.textContent = "";
    catImage.src = "";
    catImage.alt = "";
}

breedSelect.addEventListener("change", async () => {
    const selectedBreedId = breedSelect.value;

    try {
        loader.style.display = "block";
        catInfoDiv.style.display = "none";
        errorText.style.display = "none"; // Приховуємо повідомлення про помилку

        const catData = await fetchCatByBreed(selectedBreedId);

        catBreed.textContent = catData.breed;
        catDescription.textContent = catData.description;
        catTemperament.textContent = catData.temperament;
        catImage.src = catData.imageUrl;
        catImage.alt = `Зображення кота породи ${catData.breed}`;

        loader.style.display = "none";
        catInfoDiv.style.display = "block";
    } catch (error) {
        console.error("Помилка під час завантаження інформації про кота.", error);
        errorText.style.display = "block"; // Показуємо повідомлення про помилку
    }
});

async function initBreedList() {
    try {
        loader.style.display = "block";
        const breeds = await fetchBreeds();

        breeds.forEach(breed => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });

        loader.style.display = "none";
    } catch (error) {
        console.error("Помилка під час завантаження списку порід котів.", error);
        errorText.style.display = "block"; // Показуємо повідомлення про помилку
    }
}

initBreedList();
