<script setup>

defineProps({
	search: Object
})
</script>

<template>
	<div class="content-center">
		<p class="text-backgroundColor">{{ search.date }}</p>
		<p class="text-xl text-white">
			<span class="font-bold">{{ search.city }}</span> (<span class="font-bold">{{ search.weather }}</span>) - <span
				class="font-bold">{{ search.temperature }}°C</span>
		</p>
	</div>
	<img 
		:src="`https://openweathermap.org/img/wn/${search.icon}@2x.png`" 
		:alt="search.description" 
		class="w-16 h-16 ml-auto bg-backgroundColor rounded-xl shadow-inner shadow-gray-700"
	/>
</template>