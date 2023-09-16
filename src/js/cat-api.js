
import axios from "axios";

export async function fetchBreeds() {
    try {
        const response = await axios.get("https://api.thecatapi.com/v1/breeds");
        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function fetchCatByBreed(breedId) {
    try {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
        const catInfo = response.data[0].breeds[0]; // Отримуємо інформацію про породу

        return {
            breed: catInfo.name || "Інформація про породу відсутня",
            description: catInfo.description || "Опис відсутній",
            temperament: catInfo.temperament || "Темперамент відсутній",
            imageUrl: response.data[0].url || ""
        };
    } catch (error) {
        throw error;
    }
}
