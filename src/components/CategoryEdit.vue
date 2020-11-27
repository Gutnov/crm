<template>
	<div>
		<div class="page-subtitle">
			<h4>Редактировать</h4>
		</div>

		<form @submit.prevent="submitHandler">
			<div class="input-field">
				<select ref="select" v-model="current">
					<option 
						v-for="c in categories"
						:key="c.id"
						:value="c.id"
					>{{c.name}}</option>
				</select>
				<label>Выберите категорию</label>
			</div>

			<div class="input-field">
				<input id="name"
					type="text"
					v-model="name"
					:class="{invalid: $v.name.$dirty && !$v.name.required}"
				>
				<label for="name">Название</label>
				<span
					class="helper-text invalid"
					v-show="$v.name.$dirty && !$v.name.required"
				>Введите название категории</span>
			</div>

			<div class="input-field">
				<input id="limit" 
					type="number"
					v-model.number="limit"
					:class="{invalid: $v.limit.$dirty && !$v.limit.minValue}" 
				>
				<label for="limit">Лимит</label>
				<span 
					class="helper-text invalid"
					v-show="$v.limit.$dirty && !$v.limit.minValue"
				>Минимальная величина {{$v.limit.$params.minValue.min}}</span>
			</div>

			<button class="btn waves-effect waves-light" type="submit">
				Обновить
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
	name: 'CategoryEdit',
	data() {
		return {
			select: null,
			name: '',
			limit: 100,
			current: null
		}
	},
	computed: {
		categories() {
			return this.$store.getters.getCategories
		}
	},
	methods: {
		async submitHandler() {
			if(this.$v.$invalid) {
				this.$v.$touch()
				return
			}

			try {
				const categoryData = {
					id: this.current,
					limit: this.limit,
					name: this.name
				}
				await this.$store.dispatch('updateCategory', categoryData)
				this.$message('Категория обновлена')
			} catch (e) {console.log(e)}
		}
	},
	mounted() {
		this.select = M.FormSelect.init(this.$refs.select)
		M.updateTextFields()
	},
	watch: {
		current(id) {
			const {name, limit} = this.categories.find(c => c.id === id)
			this.name = name;
			this.limit = limit;
		}
	},
	validations: {
		name: {required},
		limit: {minValue: minValue(100)}
	},
	created() {
		const{id, name, limit} = this.categories[0]
		this.name = name;
		this.limit = limit;
		this.current = id
	},
	destroyed() {
		if(this.select && this.select.destroy) {
			this.select.destroy()
		}
	},
}

</script>

<style>

</style>
