<script setup>
import { defineProps } from 'vue'

defineProps({
	search: Object
})
</script>

<template>
	<div class="content-center">
		<p>{{ search.date }}</p>
		<p class="text-xl">
			<span class="font-bold">{{ search.city }}</span> (<span class="font-bold">{{ search.weather }}</span>) - <span
				class="font-bold">{{ search.temperature }}°C</span>
		</p>
	</div>
	<img 
		:src="`https://openweathermap.org/img/wn/${search.icon}@2x.png`" 
		:alt="search.description" 
		class="w-16 h-16 ml-auto bg-white rounded-xl" 
	/>
</template>