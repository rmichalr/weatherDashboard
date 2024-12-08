import { defineStore } from "pinia";
import { Api } from "../services/api";
import { ApiDto } from "../models/apiDto";

interface WeatherState {
	weather: Record<string, any> | null;
	error: string | null;
	loading: boolean;
	api: {
		fetchWeather: (location: string) => Promise<any>;
	};
}

const preferences: ApiDto = {
	apiKey: import.meta.env.VITE_API_KEY,
	apiEndpoint: "https://api.openweathermap.org/data/2.5/weather",
};

const api = new Api(preferences);

export const useWeatherStore = defineStore("weather", {
	state: (): WeatherState => ({
		weather: null,
		error: null,
		loading: true,
		api: api,
	}),
	actions: {
		async fetchWeather(location: string): Promise<void> {
			try {
				const response = await api.fetchWeather(location);
				this.$state.weather = response.data;
				this.$state.error = null;
			} catch (err: any) {
				this.$state.error = "Unable to fetch weather for this location";
				throw err;
			}
		},

		setError(error: string) {
			this.$state.error = error;
		},
		setLoading(loading: boolean) {
			this.$state.loading = loading;
		},
		setWeather(weather: Record<string, any>) {
			this.$state.weather = weather;
		},
	},
	getters: {
		weatherData: (state) => state.weather,
		weatherError: (state) => state.error,
		isLoading: (state) => state.loading,
	},
});
