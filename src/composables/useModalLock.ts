import { ref, watch } from "vue";

export function useModalLock() {
	const isLocked = ref(false);

	watch(isLocked, (locked) => {
		const modalOverlay: any = document.querySelector(".modal-overlay");
		if (modalOverlay) {
			modalOverlay.style.display = locked ? "block" : "none";
			document.body.style.overflow = locked ? "hidden" : "auto";
			document.body.style.pointerEvents = locked ? "none" : "auto";
		}
	});

	return {
		isLocked,
		lock: () => (isLocked.value = true),
		unlock: () => (isLocked.value = false),
	};
}
