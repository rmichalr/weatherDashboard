<script lang="ts">
import { defineComponent } from 'vue';
import CurrentWeather from '../components/CurrentWeather.vue';

export default defineComponent({
	components: { CurrentWeather },
});
</script>

<template>
	<div class="container mx-auto p-4">
		<CurrentWeather />
	</div>
</template>