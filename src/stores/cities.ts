import { defineStore } from "pinia";
import { Api } from "../services/api";
import { ref } from "vue";

const api = new Api({
	apiKey: import.meta.env.VITE_API_KEY,
	apiEndpoint: "https://api.openweathermap.org/data/2.5/weather",
});

export const useCitiesStore = defineStore("cities", () => {
	const cities = ref<any[]>([]);

	const fetchCities = async (query: string): Promise<any[]> => {
		try {
			const response = await api.fetchCities(query);
			const uniqueCities = response.data.filter(
				(city: { name: any; country: any }, index: any, self: any[]) =>
					self.findIndex(
						(c: { name: any; country: any }) =>
							c.name === city.name && c.country === city.country
					) === index
			);
			cities.value = uniqueCities;
			return uniqueCities;
		} catch (error) {
			console.error(error);
			return [];
		}
	};

	const setCities = (newCities: any[]) => {
		cities.value = newCities;
	};

	return {
		cities,
		fetchCities,
		setCities,
	};
});
