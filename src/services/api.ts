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
		} catch (error) {
			console.error(error);
		}
		
		return response?.data;
	}
}
