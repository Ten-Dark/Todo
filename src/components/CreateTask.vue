<template>
	<div class="flex flex-col items-center justify-center text-white">
		<div class="w-[600px] flex flex-col justify-between gap-y-5">
			<div class="flex items-center justify-between">
				<label for="task">Задача</label>
				<input type="text" name="task" v-model="task.title" placeholder="Заголовок..">
			</div>

			<div class="flex items-center justify-between">
				<label for="desc">Описание задачи</label> <textarea
				class="text-black font-normal text-sm px-4 py-2 rounded" name="desc" id="desc" cols="27" rows="4"
				v-model="task.desc" placeholder="Описание..."></textarea>
			</div>

			<div class="flex items-center justify-between relative w-full text-gray-700">


				<label for="priority" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Приоритет
					задачи</label>

				<select id="priority"
						class="w-fit h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline outline-none transition active:text-white active:bg-[#4A423F]"
						v-model="taskStore.selectedOption"
				>
					<option v-for="option in taskStore.options">{{ option }}</option>
				</select>

				<div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
					<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
						<path
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd" fill-rule="evenodd"></path>
					</svg>
				</div>

			</div>

			<div class="flex justify-center items-center mt-10">
				<button
					id="addTask"
					class="flex items-center justify-between gap-x-2 bg-white transition duration-[.2s]
					hover:bg-transparent hover:border-white hover:border-1 hover:text-white hover:-translate-y-1
					active:translate-y-0.5 active:duration-[.1s]
					text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
					@click="createTask(task)"
				>
					<p>Добавить</p>

					<svg id="addTaskIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						 stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import {useTasksStore} from "@/store/TasksStore";
import {reactive} from "vue";

const taskStore = useTasksStore()

const {tasks, createTask} = taskStore

const task = reactive({
	title: '',
	desc: '',
})
</script>

<style scoped>
#addTask:hover #addTaskIcon {
	color: orange;
}

input {
	border-radius: 25px;
	padding: .3rem 1rem;
	color: black;
	font-weight: 400;
}

</style>