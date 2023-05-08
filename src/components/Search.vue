<template>
	<div class="container flex items-center justify-between">
		<div class="w-[250px]">
			<transition name="searchAnimate" mode="out-in">
				<input v-if="taskStore.tasks.length >= 2" type="search" name="search"
					   class="outline-none border-b-2 border-gray-400 bg-transparent text-white text-gray-300 font-normal appearance-none" placeholder="Поиск.."
					   v-model="taskStore.search"
				>
			</transition>
		</div>

		<div class="flex items-center justify-between gap-x-2 text-white">
			<button class="py-1 px-3 border-[1px] border-gray-400 rounded transition hover:bg-white hover:text-black font-normal text-sm"
					@click="taskStore.filterOptions = taskStore.options[0]">
				Важные
			</button>

			<button class="py-1 px-3 border-[1px] border-gray-400 rounded transition hover:bg-white hover:text-black font-normal text-sm"
					@click="taskStore.filterOptions = taskStore.options[1]">
				Второстепенные
			</button>
			<button class="py-1 px-3 border-[1px] border-gray-400 rounded transition hover:bg-white hover:text-black font-normal text-sm"
					@click="taskStore.filterOptions = 'все'">
				Все
			</button>
		</div>
	</div>

</template>

<script setup>
import {useTasksStore} from "@/store/TasksStore";
import {onMounted} from "vue";

const taskStore = useTasksStore();
</script>

<style scoped>
.isActive {
	background-color: white;
}

.searchAnimate-enter-active,
.searchAnimate-leave-active {
	transition: .3s all ease-in;
}

.searchAnimate-enter-from {
	width: 0;
	opacity: 0;
}

.searchAnimate-enter-to {
	width: 100%;
	opacity: 1;
}

.searchAnimate-leave-from {
	width: 100%;
	opacity: 1;
}

.searchAnimate-leave-to {
	width: 0;
	opacity: 0;
}
</style>