<template>
	<div class="flex flex-wrap items-start gap-y-16 gap-x-16 text-white">
		<transition-group name="tasksAnimate">
			<div
				v-for="(task, index) in taskStore.tasksFilter"
				:key="task.id"
				class="flex flex-col basis-1/4 p-5 gap-y-5 transition ease-in bg-[#4A423F] hover:bg-[#423B38] hover:-translate-y-2 rounded-xl text-[#CCCCCC] w-[400px]"
			>
				<div class="flex flex-col gap-y-5">
					<div class="flex items-start justify-between">

						<p class="max-w-[200px]">{{ task.title }}</p>
						<div class="flex items-center justify-between space-x-2">
							<p class="font-light text-xs text-right">{{ task.created }}</p>
							<svg
								xmlns="http://www.w3.org/2000/svg" fill="text-gray-500" viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-5 h-5 cursor-pointer transition hover:text-gray-500 hover:fill-amber-500"
								@click="removeTask(index)"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
							</svg>
						</div>
					</div>


					<div class="font-normal text-justify break-words">{{ task.desc }}</div>
				</div>


				<div class="flex items-center justify-between text-sm font-normal">
					<div class="flex items-center justify-between px-4 py-2 rounded-xl bg-[#4C4C4C] w-fit">
						{{ task.priority }}
					</div>
					<button
						class="flex items-center justify-between w-fit gap-x-2"
						:disabled="taskStore.isDisabled"
						@click="taskStore.checkedTask(task.id)"
					>
						<transition name="checkedIcon" mode="out-in">
							<svg v-if="!task.checked" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
								 stroke-width="1.5"
								 stroke="currentColor" class="w-5 h-5 transition">
								<path stroke-linecap="round" stroke-linejoin="round"
									  d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"/>
							</svg>
							<svg v-else-if="task.checked" xmlns="ht gap-x-2tp://www.w3.org/2000/svg" fill="none"
								 viewBox="0 0 24 24"
								 stroke-width="1.5"
								 stroke="currentColor" class="w-5 h-5 text-green-600">
								<path stroke-linecap="round" stroke-linejoin="round"
									  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
							</svg>

						</transition>
						<transition name="checkedStatus" mode="out-in">
							<p v-if="!task.checked" class="font-light text-xs text-right">{{ status.complete }}</p>
							<p v-else-if="task.checked" class="font-light text-xs text-right">{{ status.done }}</p>
						</transition>
					</button>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script setup>
import {useTasksStore} from "@/store/TasksStore";
import {reactive} from "vue";

const taskStore = useTasksStore();

const status = reactive({
	complete: 'Завершить',
	done: 'выполнено',
})

function removeTask(index) {
	taskStore.tasks.splice(index, 1)
	localStorage.setItem('tasks', JSON.stringify(taskStore.tasks))
}
</script>

<style>
#checkedTaskButton:hover #checkBoxIcon {
	color: rgb(22, 163, 74);
}
.checkedIcon-enter-active {
	animation: checkedIcon-in 0.3s;
}
.checkedIcon-leave-active {
	animation: checkedIcon-in 0.3s reverse;
}
@keyframes checkedIcon-in {
	0% {
		transform: translatex(-20px);
		opacity: 0;
	}
	50% {
		transform: translatex(10px);
		opacity: .5;
	}
	100% {
		transform: translatex(0);
		opacity: 1;
	}
}

.tasksAnimate-enter-active {
	animation: tasksAnimate-in 0.2s;
}

.tasksAnimate-leave-active {
	animation: tasksAnimate-in 0.2s reverse;
}

@keyframes tasksAnimate-in {
	0% {
		transform: translateY(-40px);
		opacity: 0;
	}
	50% {
		transform: translateY(40px);
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}

.checkedStatus-enter-active {
	animation: checkedStatusAnimate 0.3s;
}

.checkedStatus-leave-active {
	animation: checkedStatusAnimate 0.3s reverse;
}

@keyframes checkedStatusAnimate {
	0% {
		transform: translateX(-40px);
	}
	50% {
		transform: translateX(10px);
	}

	100% {
		transform: translateX(0px);
	}
}
</style>