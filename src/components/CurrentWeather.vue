<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useWeatherStore } from '../stores/weather';
import { useCitiesStore } from '../stores/cities';
import { watchDebounced } from '@vueuse/core';
import { useSearchHistoryStore } from '../stores/searchHistory'


const weatherStore = useWeatherStore();
const citiesStore = useCitiesStore();
const { searches, addSearch, clearSearches } = useSearchHistoryStore();
const city = ref('');
const hasSearched = ref(false);
const showSuggestions = ref(true);
const weather = ref(null);
const error = ref(null);
const cities = ref([]);
const loading = ref(false);
const isLoading = ref(false);

const getWeather = async () => {
	hasSearched.value = true;
	weatherStore.setLoading(true);
	try {
		await weatherStore.fetchWeather(city.value);
		hasSearched.value = true;
		addSearch({
			city: city.value,
			weather: weatherStore.weather.weather[0].main,
			temperature: weatherStore.weather.main.temp,
			icon: weatherStore.weather.weather[0].icon,
			date: new Date().toLocaleString()
		});
	} catch (error) {
		city.value = '';
	} finally {
		weatherStore.setLoading(false);
	}
};

const fetchCities = async () => {
	showSuggestions.value = true;
	if (city.value.length >= 3) {
		try {
			const citiesArray = await citiesStore.fetchCities(city.value);
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

const selectCity = (selectedCity) => {
	city.value = selectedCity.name;
	citiesStore.setCities([]);
	getWeather();
};

const handleEnterKey = () => {
	getWeather();
	hideSuggestions();
};

const hideSuggestions = () => {
	showSuggestions.value = false;
};

const setHasSearched = (value) => {
	hasSearched.value = value;
};

watchDebounced(
	city,
	async () => {
		showSuggestions.value = true;
		if (city.value.length >= 3) {
			try {
				const citiesArray = await citiesStore.fetchCities(city.value);
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
	},
	{ debounce: 500 }
);

onMounted(() => {
	document.addEventListener('click', hideSuggestions);
});

onUnmounted(() => {
	document.removeEventListener('click', hideSuggestions);
});
</script>

<template>
	<div class="flex flex-col gap-5 relative">
		<div class="flex items-center">
			<input v-model="city" type="text" placeholder="Enter city name"
				class="h-10 p-2 shadow-navigation rounded-l-md w-4/5 focus:outline-none focus:ring-2 focus:ring-primary focus:visible:ring-2 focus:visible:ring-primary focus:visible:ring-offset-2 focus:visible:ring-offset-white dark:focus:visible:ring-offset-slate-900" @keydown.enter="handleEnterKey" />
			<button @click="getWeather"
				class="h-10 p-2 bg-secondary text-primary hover:bg-primary hover:text-secondary shadow-navigation rounded-r-md rounded-l-none w-1/5">
				Check
			</button>
		</div>
		<div v-if="showSuggestions && citiesStore.cities && citiesStore.cities.length > 0"
			class="absolute top-10 bg-white w-full text-black text-left rounded-b-md p-2">
			<ul>
				<li v-for="city in citiesStore.cities" :key="city.id" @click="selectCity(city)"
					class="cursor-pointer p-2 hover:bg-gray-300">
					{{ city.name }} ({{ city.country }})
					<small v-if="city.local_names">
						{{ city.local_names.en }} ({{ city.lat }}, {{ city.lon }})
					</small>
				</li>
			</ul>
		</div>
		<div v-if="hasSearched && weatherStore.weather" class="p-6 rounded bg-panelColor text-white shadow-navigation">
			<h2 class="text-2xl font-bold" data-test="city">{{ weatherStore.weather.name }}</h2>
			<p class="text-lg" data-test="temperature">Temperature: {{ weatherStore.weather.main.temp }}°C</p>
			<img :src="`https://openweathermap.org/img/wn/${weatherStore.weather.weather[0].icon}@2x.png`"
				:alt="weatherStore.weather.weather[0].description" class="w-16 h-16 mx-auto" />
			<p data-test="condition">Condition: {{ weatherStore.weather.weather[0].description }}</p>
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

<style scoped>
.loading-text {
	font-size: 16px;
}

.dot {
	display: inline-block;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: var(--panel-color);
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