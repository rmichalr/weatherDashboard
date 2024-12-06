import { vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

const mockedWeatherData = {
	name: "Warsaw",
	main: { temp: 1.64 },
	weather: [{ description: "broken clouds" }],
};

export function setupTests() {
	const pinia = createPinia();
	setActivePinia(pinia);

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
