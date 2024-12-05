import { defineStore } from "pinia";
import axios from "axios";

interface WeatherState {
	weather: Record<string, any> | null;
	error: string | null;
	loading: boolean;
}

export const useWeatherStore = defineStore("weather", {
	state: (): WeatherState => ({
		weather: null,
		error: null,
		loading: true,
	}),
	actions: {
		async fetchWeather(location: string) {
			const apiKey = import.meta.env.VITE_API_KEY;
			
			try {
				const response = await axios.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
				);
				this.$state.weather = response.data;
				this.$state.error = null;
			} catch (err: any) {
				this.$state.error =
					err.response?.data?.message || "Unable to fetch weather";
				this.$state.weather = null;
			}
		},
		setError(error: string) {
			this.$state.error = error;
		},
		setLoading(loading: boolean) {
			this.$state.loading = loading;
		},
	},
	getters: {
		weatherData: (state) => state.weather,
		weatherError: (state) => state.error,
		isLoading: (state) => state.loading,
	},
});
