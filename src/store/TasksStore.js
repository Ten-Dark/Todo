import {defineStore} from "pinia";
import {computed, onMounted, reactive, ref, watch} from "vue";

export const useTasksStore = defineStore('tasks', () => {
	const tasks = ref([])
	const search = ref('')

	//	LocalStorage
	const storedTasks = localStorage.getItem('tasks');
	onMounted(() => {
		if (storedTasks) {
			tasks.value = JSON.parse(storedTasks);
		}
	});

	window.addEventListener('beforeunload', function(event) {
		localStorage.setItem('tasks', JSON.stringify(tasks.value));
	});



	function createTask(task) {
		if (task.title === '') {
			errors.title = 'Заполните поле "Задача"'
		} else if (selectedOption.value === '') {
			errors.title = 'Выбирете приоритет для задачи'
		} else {
			const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
			tasks.value = savedTasks.concat({
				id: new Date().getTime(),
				title: task.title,
				desc: task.desc,
				priority: selectedOption.value,
				checked: false,
				created: new Date(Date.now()).toLocaleString(),
			});
			localStorage.setItem('tasks', JSON.stringify(tasks.value));
			errors.title = null;
			task.title = '';
			task.desc = '';
		}
	}

	// Search
	const tasksFilter = computed(() => {
		// function filterTasks(tasks, searchQuery) {
		// 	return tasks.filter((item) => {
		// 		return item.title.toLowerCase().includes(searchQuery)
		// 	});
		// }
		// const tasksFiltered = ref(filterTasks(tasks.value, search.value.trim().toLowerCase()));
		// return {
		// 	tasksFiltered
		// }


			let filteredTasks = tasks.value


			// Фильтрация по приоритету
			if (filterOptions.value === options.value[0]) {
				filteredTasks = tasks.value.filter(task => task.priority === options.value[0])
			} else if(filterOptions.value === options.value[1]) {
				filteredTasks = tasks.value.filter(task => task.priority === options.value[1])
			} else if(filterOptions.value === 'все') {
				return filteredTasks
			}

			// Фильтрация по строке поиска
			if (search.value) {
				const searchQuery = search.value.trim().toLowerCase()
				filteredTasks = tasks.value.filter(task => task.title.toLowerCase().includes(searchQuery))
			}

			return filteredTasks
	})

	//	Errors
	const errors = reactive({
		title: null
	})

	//	Options
	const selectedOption = ref('важные')

	const filterOptions = ref(Boolean)
	const options = ref(['важные', 'Второстепенные',])

	//	Checked animation
	const isDisabled = ref(false)

	watch(search, (value) => {
		return value
	})

	function checkedTask(id) {
		for (let i = 0; i < tasks.value.length; i++) {
			if (tasks.value[i].id === id) {
				tasks.value[i].checked = !tasks.value[i].checked

				setTimeout(() => {
					isDisabled.value = false
				}, 300);
				isDisabled.value = true
			}
		}
	}


// function createTask(task) {
// 	if (task.title === '') {
// 		errors.title = 'Заполните поле "Задача"'
// 	} else if (selectedOption.value === '') {
// 		errors.title = 'Выбирете приоритет для задачи'
// 	} else {
// 		tasks.value.push({
// 			id: new Date().getTime(),
// 			title: task.title,
// 			desc: task.desc,
// 			priority: selectedOption.value,
// 			checked: false,
// 			created: new Date(Date.now()).toLocaleString(),
// 		});
// 		localStorage.setItem('tasks', JSON.stringify(tasks.value))
// 		errors.title = null;
// 		task.title = '';
// 		task.desc = '';
// 	}
// }

	return {
		tasks, selectedOption, options, createTask, errors, isDisabled, checkedTask, search, tasksFilter, storedTasks, filterOptions
	};
})