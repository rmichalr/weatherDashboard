<script lang="ts">
import { defineComponent } from 'vue';
import CurrentWeather from '../components/CurrentWeather.vue';
import HistoricalSearches from '../components/HistoricalSearches.vue';

export default defineComponent({
	components: { CurrentWeather, HistoricalSearches },
});
</script>

<template>
	<div class="container mx-auto p-4 flex flex-col lg:flex-row gap-3">
		<div class="w-full lg:w-1/3 mx-auto flex flex-col gap-5">
			<CurrentWeather />
			<HistoricalSearches />
		</div>
		<div class="w-full lg:w-1/3 lg:order-first">
			<!-- WEATHER CHARTS -->
		</div>
		<div class="w-full lg:w-1/3">
			<!-- MAPS -->
		</div>
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
