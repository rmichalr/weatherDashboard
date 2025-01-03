<script setup>
import HistoricalSearchItem from './HistoricalSearchItem.vue'

defineProps({
	searches: Array,
	isCollapsed: Boolean
})
</script>
<template>
	<div class="mt-2 rounded-lg overflow-y-auto historical-search-list text-secondary shadow-navigation" :class="{ 'hidden': isCollapsed }">
		<ul>
			<li v-for="search in searches" :key="search.id"
				class="p-4 shadow-md text-left historical-search-item flex">
				<HistoricalSearchItem :search="search" />
			</li>
		</ul>
	</div>
</template>

<style scoped>
.historical-search-list {
	max-height: 500px;
}
</style>