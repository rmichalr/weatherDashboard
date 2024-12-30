<script lang="ts">
import { defineComponent } from 'vue';
import CurrentWeather from '../components/CurrentWeather.vue';
import HistoricalSearches from '../components/HistoricalSearches.vue';

export default defineComponent({
	components: { CurrentWeather, HistoricalSearches },
});
</script>

<template>
	<nav class="flex items-center justify-start gap-4 border-b-2 border-solid border-gray-300 shadow-md p-5">
		<router-link to="/" class="text-2xl font-bold text-white">Weather Dashboard</router-link>
		<router-link to="/about" class="text-2xl text-white">About</router-link>
	</nav>
	<div class="container mx-auto p-4 flex flex-row gap-3">
		<div class="w-1/3">
			<HistoricalSearches />
		</div>
		<div class="w-1/3 mx-auto">
			<CurrentWeather />
		</div>
		<div class="w-1/3"></div>
	</div>
	<div class="modal-overlay"></div>
</template>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: none;
	pointer-events: none;
}
</style>