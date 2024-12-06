import { vi } from "vitest";
import { createPinia } from "pinia";
import { useWeatherStore } from "./stores/weather";

const mockedWeatherData = {
	name: "Warsaw",
	main: { temp: 1.64 },
	weather: [{ description: "broken clouds" }],
};

export function setupTests() {
	const pinia = createPinia();
	const weatherStore = useWeatherStore(pinia);

	vi.mock("../stores/weather", () => ({
		useWeatherStore: vi.fn().mockReturnValue({
			weatherData: mockedWeatherData,
			isLoading: false,
			error: null,
		}),
	}));

	return {
		fetchWeather: async (): Promise<Record<string, any>> => {
			return mockedWeatherData;
		},
	};
}
