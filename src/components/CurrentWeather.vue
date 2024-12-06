<template>
	<div class="flex flex-col gap-5">
		<div class="flex items-center">
			<input v-model="city" type="text" placeholder="Enter city name"
				class="h-10 p-2 border border-gray-400 rounded-l-md w-4/5"
				@keydown.enter="getWeather" />
			<button @click="getWeather"
				class="h-10 p-2 bg-green-500 text-white border border-gray-400 rounded-r-md rounded-l-none w-1/5">
				Check
			</button>
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

export default defineComponent({
	setup() {
		const store = useWeatherStore();
		const city = ref('');
		const hasSearched = ref(false);

		const getWeather = async (): Promise<void> => {
			hasSearched.value = true;
			store.setLoading(true);
			try {
				const response: any = await store.fetchWeather(city.value);
				store.setWeather(response.data);
			} catch (error: any) {
				store.setError(error.message);
			} finally {
				store.setLoading(false);
			}
		};

		return {
			city,
			getWeather,
			weather: computed(() => store.weatherData),
			error: computed(() => store.weatherError),
			isLoading: computed(() => store.isLoading),
			hasSearched,
		};
	},
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