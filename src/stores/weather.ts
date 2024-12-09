import { defineStore } from "pinia";
import { Api } from "../services/api";
import { ApiDto } from "../models/apiDto";
import { ref } from "vue";

const preferences: ApiDto = {
	apiKey: import.meta.env.VITE_API_KEY,
	apiEndpoint: "https://api.openweathermap.org/data/2.5/weather",
};

const api = new Api(preferences);

export const useWeatherStore = defineStore("weather", () => {
	const weather = ref<Record<string, any> | null>(null);
	const error = ref<string | null>(null);
	const loading = ref<boolean>(true);

	const fetchWeather = async (location: string) => {
		try {
			const response = await api.fetchWeather(location);
			setWeather(response.data);
			error.value = null;
		} catch (err: any) {
			error.value = "Unable to fetch weather for this location";
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const setError = (caughtError: string) => {
		error.value = caughtError;
	};

	const setLoading = (isLoading: boolean) => {
		loading.value = isLoading;
	};

	const setWeather = (newWeather: Record<string, any>) => {
		weather.value = newWeather;
	};

	return {
		weather,
		error,
		loading,
		fetchWeather,
		setError,
		setLoading,
		setWeather,
	};
});
