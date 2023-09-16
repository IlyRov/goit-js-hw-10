import axios from "axios";

const apiKey = 'live_YWg0u6gdp5wTKySikI3gzrI2JHrH2fKh4yR56BflBBj8nSSqZ2trrN0sPi0dzs46';

export async function fetchBreeds() {
    try {
        const response = await axios.get(`https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchCatByBreed(breedId) {
    try {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${apiKey}`);
        
        if (response.data && response.data.length > 0) {
            const catInfo = response.data[0];
    
            return {
                breed: catInfo?.breeds?.[0]?.name || 'Інформація відсутня',
                description: catInfo?.breeds?.[0]?.description || 'Інформація відсутня',
                temperament: catInfo?.breeds?.[0]?.temperament || 'Інформація відсутня',
                imageUrl: catInfo?.url || ''
            };
        } else {
            throw new Error("Кота з цією породою не знайдено.");
        }
    } catch (error) {
        throw error;
    }
}
