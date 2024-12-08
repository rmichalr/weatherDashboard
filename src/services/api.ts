import axios from "axios";
import { ApiDto } from "../models/apiDto";

export class Api {
	private preferences: ApiDto;

	constructor(preferences: ApiDto) {
		this.preferences = preferences;
	}

	async fetchWeather(location: string): Promise<any> {
		let response = null;
		try {
			response = await axios.get(
				`${this.preferences.apiEndpoint}?q=${location}&units=metric&appid=${this.preferences.apiKey}`
			);
		} catch (error: any) {
			if (error.response.status === 404) {
				console.error("Couldn't get weather for this location");
			} else {
				console.error(error);
			}
			throw error;
		}

		return response;
	}

	async fetchCities(query: string) {
		const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${this.preferences.apiKey}`;
		const response = await axios.get(url);
		return response;
	}
}
