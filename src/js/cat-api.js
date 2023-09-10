
import axios from "axios";

export async function fetchBreeds() {
    try {
        const response = await axios.get("https://api.thecatapi.com/v1/breeds");
        return response.data.map(breed => ({
            id: breed.id,
            name: breed.name
        }));
    } catch (error) {
        throw error;
    }
}

export async function fetchCatByBreed(breedId) {
    try {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
        const catInfo = response.data[0];

        return {
            breed: catInfo.breeds[0].name,
            description: catInfo.breeds[0].description,
            temperament: catInfo.breeds[0].temperament,
            imageUrl: catInfo.url
        };
    } catch (error) {
        throw error;
    }
}
