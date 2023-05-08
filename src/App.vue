<template>
	<div class="bg-[#332E30] min-h-screen h-full font-bold relative p-10 overflow-x-hidden">
		<div class="absolute top-0 w-full left-0 right-0">
			<Header/>
		</div>
		<div class="container mx-auto flex flex-col justify-center mt-24">
			<div class="container flex flex-col items-center mx-auto relative">
				<transition name="errorShow">
					<div class="text-orange-500 absolute top-[-50px]" v-if="errors.title">
						<p>{{ errors.title }}</p>
					</div>
				</transition>
				<CreateTask/>
			</div>

			<div class="flex items-center justify-start mx-auto container px-5">
				<Search/>
			</div>
			<div class="container mx-auto mt-16">
				<Tasks/>
			</div>
		</div>
	</div>
</template>
<!--
Приоритет задачи
фильтр по приоритету
Поиск
подключить pinia
Работа с ветками гит
34 Урок просмотрен
-->
<script setup>
import Header from "@/components/Header.vue";
import CreateTask from "@/components/CreateTask.vue";
import Tasks from "@/components/Tasks.vue";

import {useTasksStore} from "@/store/TasksStore";
import Search from "@/components/Search.vue";

const {errors, tasks} = useTasksStore()
</script>

<style scoped>
.errorShow-enter-active {
	animation: errorShow-in 0.2s;
}

.errorShow-leave-active {
	animation: errorShow-in 0.2s reverse;
}

@keyframes errorShow-in {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.10);
	}
	100% {
		transform: scale(1);
	}
}



</style>
