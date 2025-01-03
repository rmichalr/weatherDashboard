<template>
	<div class="container mx-auto p-4 text-justify">
		<h1 class="text-4xl font-bold text-center mb-3">About</h1>
		<p class="text-xl">This is a weather dashboard built with Vue 3, TypeScript, Vite, Composition API, Pinia, Vue
			Router, Axios, and Tailwind CSS. It uses the OpenWeatherMap API to fetch weather data and stores it in
			Pinia. The weather data is then displayed in a responsive and accessible way. The app also has a feature to
			clear all historical searches and a feature to view the historical searches. The app is tested with Vitest
			and uses the Vue Testing Library.</p>
	</div>

	<div class="p-4 mt-4 flex justify-center items-center gap-5 w-fit mx-auto">
		<a href="https://michalroman.hashnode.dev/" target="_blank" class="flex items-center px-4 py-2 rounded-md hover:bg-primary hover:text-secondary bg-secondary">
			<span class="text-xl">My blog</span>
		</a>

		<a href="https://www.linkedin.com" target="_blank" class="flex items-center px-4 py-2 rounded-md hover:bg-primary hover:text-secondary bg-secondary">
			<img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" class="w-6 h-6 mr-2" />
			<span class="text-xl">Michał Roman</span>
		</a>

		<a href="https://github.com/rmichalr/weatherDashboard" target="_blank" class="flex items-center px-4 py-2 rounded-md hover:bg-primary hover:text-secondary bg-secondary">
			<img src="https://github.githubassets.com/favicons/favicon.png" alt="GitHub" class="w-6 h-6 mr-2" />
			<span class="text-xl">GitHub</span>
		</a>
	</div>
</template>
