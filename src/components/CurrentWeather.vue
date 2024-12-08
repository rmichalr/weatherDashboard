<template>
	<div class="flex flex-col gap-5 relative">
		<div class="flex items-center">
			<input v-model="city" type="text" placeholder="Enter city name"
				class="h-10 p-2 border border-gray-400 rounded-l-md w-4/5" @keydown.enter="handleEnterKey"
				@input="fetchCities" />
			<button @click="getWeather"
				class="h-10 p-2 bg-green-500 text-white border border-gray-400 rounded-r-md rounded-l-none w-1/5">
				Check
			</button>
		</div>
		<div v-if="showSuggestions && cities && cities.length > 0"
			class="absolute top-10 bg-white w-full text-black text-left rounded-b-md p-2">
			<ul>
				<li v-for="city in cities" :key="city.id" @click="selectCity(city)"
					class="cursor-pointer p-2 hover:bg-gray-300">
					{{ city.name }} ({{ city.country }})
					<small v-if="city.local_names">
						{{ city.local_names.en }} ({{ city.lat }}, {{ city.lon }})
					</small>
				</li>
			</ul>
		</div>
		<div v-if="weather" class="p-6 bg-gray-800 text-white shadow rounded">
			<h2 class="text-2xl font-bold" data-test="city">{{ weather.name }}</h2>
			<p class="text-lg" data-test="temperature">Temperature: {{ weather.main.temp }}°C</p>
			<p data-test="condition">Condition: {{ weather.weather[0].description }}</p>
		</div>
		<div v-else-if="error" class="p-6 bg-red-100 text-red-600">
			<p>Error: {{ error }}</p>
		</div>
		<div v-else-if="hasSearched && isLoading" class="p-6">
			<p v-if="isLoading" class="loading-text">Loading
				<span class="dot"></span>
				<span class="dot"></span>
				<span class="dot"></span>
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useWeatherStore } from '../stores/weather';
import { useCitiesStore } from "../stores/cities";

export default defineComponent({
	setup() {
		const weatherStore = useWeatherStore();
		const citiesStore = useCitiesStore();
		const city = ref('');
		const hasSearched = ref(false);
		const showSuggestions = ref(true);

		const getWeather = async () => {
			hasSearched.value = true;
			weatherStore.setLoading(true);
			try {
				const response: any = await weatherStore.fetchWeather(city.value);
				weatherStore.setWeather(response.data);
			} catch (error: any) {
				city.value = '';
			} finally {
				weatherStore.setLoading(false);
			}
		};

		const fetchCities = async () => {
			showSuggestions.value = true;
			if (city.value.length >= 3) {
				try {
					const citiesArray: any[] = await citiesStore.fetchCities(city.value);
					if (citiesArray) {
						citiesStore.setCities(citiesArray);
					} else {
						console.error('No response received from fetchCities');
					}
				} catch (error) {
					console.error(error);
					citiesStore.setCities([]);
				}
			}
		};

		const selectCity = (selectedCity: any) => {
			city.value = selectedCity.name;
			citiesStore.setCities([]);
			getWeather();
		};

		const handleEnterKey = () => {
			getWeather();
			hideSuggestions();
		}

		const hideSuggestions = () => {
			showSuggestions.value = false;
		}

		return {
			city,
			getWeather,
			selectCity,
			fetchCities,
			handleEnterKey,
			weather: computed(() => weatherStore.weatherData),
			error: computed(() => weatherStore.weatherError),
			isLoading: computed(() => weatherStore.isLoading),
			hasSearched,
			showSuggestions,
			hideSuggestions,
			cities: computed(() => citiesStore.getCities),
		};
	},
	beforeMount() {
		document.addEventListener('click', this.hideSuggestions);
	}
});
</script>

<style scoped>
.loading-text {
	font-size: 16px;
}

.dot {
	display: inline-block;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: var(--loading-dot-color);
	animation: loading 1s infinite;
}

.dot:nth-child(2) {
	animation-delay: 0.2s;
}

.dot:nth-child(3) {
	animation-delay: 0.4s;
}

@keyframes loading {
	0% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(-10px);
	}

	100% {
		transform: translateY(0);
	}
}
</style>