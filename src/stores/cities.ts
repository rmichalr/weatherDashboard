import { defineStore } from "pinia";
import { Api } from "../services/api";

const api = new Api({
	apiKey: import.meta.env.VITE_API_KEY,
	apiEndpoint: "https://api.openweathermap.org/data/2.5/weather",
});

export const useCitiesStore = defineStore("cities", {
	state: (): Record<string, any> => ({
		cities: [],
	}),

	actions: {
		async fetchCities(query: string): Promise<any[]> {
			try {
				const response = await api.fetchCities(query);
				const uniqueCities = response.data.filter(
					(
						city: { name: any; country: any },
						index: any,
						self: any[]
					) =>
						self.findIndex(
							(c: { name: any; country: any }) =>
								c.name === city.name &&
								c.country === city.country
						) === index
				);
				return uniqueCities;
			} catch (error) {
				console.error(error);
				return [];
			}
		},
		setCities(cities: Record<string, any>) {
			this.$state.cities = cities;
		},
	},

	getters: {
		getCities: (state) => state.cities,
	},
});
