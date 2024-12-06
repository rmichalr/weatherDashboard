import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import CurrentWeather from "./CurrentWeather.vue";
import { useWeatherStore } from "../stores/weather";
import { setupTests } from "../setupTests";

describe("CurrentWeather", () => {
	it("renders input and button initially", () => {
		const wrapper = mount(CurrentWeather);

		expect(wrapper.find("input").exists()).toBe(true);
		expect(wrapper.find("button").exists()).toBe(true);
	});
});

describe("Async Functions", () => {
	const { fetchWeather } = setupTests();
	it("should resolve weather", async () => {
		const weather = await fetchWeather();
		expect(weather).toEqual({
			name: "Warsaw",
			main: { temp: 1.64 },
			weather: [{ description: "broken clouds" }],
		});
	});

	it("should render the weather data", async () => {
		const wrapper = mount(CurrentWeather);
		const weatherStore = useWeatherStore();

		const weatherResult = await fetchWeather();
		weatherStore.setWeather(weatherResult);
		await wrapper.vm.$nextTick();

		expect(wrapper.find("[data-test='city']").text()).toBe("Warsaw");
		expect(wrapper.find("[data-test='temperature']").text()).toContain("1.64");
		expect(wrapper.find("[data-test='condition']").text()).toContain("broken clouds");
	});
});
