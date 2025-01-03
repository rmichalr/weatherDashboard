<script setup>
import { ref, watch, onMounted } from 'vue'
import { useSearchHistoryStore } from '../stores/searchHistory'
import HistoricalSearchList from './HistoricalSearchList.vue'
import { useConfirmDialog } from '@vueuse/core'
import { useModalLock } from '../composables/useModalLock'

const searchHistoryStore = useSearchHistoryStore();
const searches = ref([]);
const isCollapsed = ref(true);
const { isRevealed, reveal, confirm, cancel } = useConfirmDialog();
const { lock, unlock } = useModalLock();

onMounted(() => {
	searches.value = searchHistoryStore.searches
});

watch(() => searchHistoryStore.searches, (newSearches) => {
	searches.value = newSearches;
});

function handleClearData() {
	lock();
	reveal()
		.then(({ isCanceled }) => {
			if (!isCanceled) {
				searchHistoryStore.clearSearches();
			}
		})
		.finally(unlock);
}
</script>

<template>
	<div class="flex historical-searches" v-if="searches.length > 0">
		<div class="flex items-center cursor-pointer text-white" @click="isCollapsed = !isCollapsed">
			<h2 class="text-xl font-bold">Historical Searches</h2>
			<span class="ml-2" :class="{ 'rotate-180': isCollapsed, 'rotate-0': !isCollapsed }">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</span>
		</div>
		<a href="#" 
		   @click.prevent="handleClearData" 
		   class="ml-auto text-white hover:font-bold hover:text-linkColorHover"
		   data-test="clear-data-link">Clear Data</a>
	</div>
	<HistoricalSearchList 
		:searches="searches" 
		:is-collapsed="isCollapsed" 
		class="historical-search-list" />
	<teleport to="body">
		<div v-if="isRevealed"
			class="confirm-dialog shadow-navigation text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-backgroundColor border border-white rounded p-6 text-secondary text-center">
			<h2 class="mb-6 font-bold">Are you sure you want to clear all historical searches?</h2>
			<button @click="confirm" class="mr-2 hover:bg-primary hover:text-secondary">Yes</button>
			<button @click="cancel" class="ml-2 hover:bg-primary hover:text-secondary">No</button>
		</div>
	</teleport>
</template>

<style>
.historical-search-item {
	border-bottom: 1px solid var(--light-gray);
}

.historical-search-item:nth-child(odd) {
	background-color: var(--row-odd-color);
}

.historical-search-item:nth-child(even) {
	background-color: var(--row-even-color);
}

.confirm-dialog {
	pointer-events: auto;
	z-index: 2;
}
</style>
