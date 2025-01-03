<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const menuOpen = ref(false);
const route = useRoute();

watch(route, () => {
	menuOpen.value = false;
});
</script>

<template>
	<nav class="sticky top-0 z-10 bg-navigationColor flex items-center justify-start gap-4 p-5 shadow-navigation">
		<button class="lg:hidden" @click="menuOpen = !menuOpen">
			<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
		<span class="lg:hidden text-2xl font-bold ml-auto">Weather Dashboard</span>
		<div class="links flex flex-col lg:flex bg-navigationColor" :class="{ 'hidden': !menuOpen }, { 'open': menuOpen }">
			<button class="lg:hidden w-fit ml-5 mt-5" @click="menuOpen = false">
				<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			<div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4 ">
				<router-link to="/" class="text-2xl p-2 text-white border-b lg:border-b-0 border-gray-300 hover:text-linkColorHover">Weather
					Dashboard</router-link>
				<div class="hidden lg:block border-r border-gray-300 h-6"></div>
				<router-link to="/about" class="text-2xl p-2 text-white border-b lg:border-b-0 border-gray-300 hover:text-linkColorHover">About</router-link>
			</div>
		</div>
	</nav>
</template>

<style>
.links {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	transform: translateX(-100%);
	transition: transform 0.3s ease-in-out;
	z-index: 2;
}

@media screen and (min-width: 1024px) {
	.links {
		transform: translateX(0);
		position: relative;
		left: unset;
		top: unset;
		width: unset;
		height: unset;
		background-color: unset;
		z-index: unset;
	}
}

.links.open {
	transform: translateX(0);
}
</style>