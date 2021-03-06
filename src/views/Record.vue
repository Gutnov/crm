<template>
	<div>
		<div class="page-title">
			<h3>Новая запись</h3>
		</div>
		<Preloader v-if="loading"/>
		<p v-else-if="!categories.length" class="center">
			Категорий пока нет 
			<router-link to="/categories">Добавить категорию</router-link>
		</p>
		<form
			class="form"
			v-else
			@submit.prevent="submitHandler"
		>
			<div class="input-field">
				<select v-model="category" ref="select">
					<option 
						v-for="c in categories"
						:key="c.id"
						:value="c.id"
					>{{c.name}}</option>
				</select>
				<label>Выберите категорию</label>
			</div>

			<p>
				<label>
					<input
						class="with-gap"
						name="type"
						type="radio"
						value="income"
						v-model="type"
					/>
					<span>Доход</span>
				</label>
			</p>

			<p>
				<label>
					<input
						class="with-gap"
						name="type"
						type="radio"
						value="outcome"
						v-model="type"
					/>
					<span>Расход</span>
				</label>
			</p>

			<div class="input-field">
				<input
					id="amount"
					type="number"
					v-model.number="amount"
					:class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
				>
				<label for="amount">Сумма</label>
				<span 
					class="helper-text invalid"
					v-show="$v.amount.$dirty && !$v.amount.minValue"
				>Минимальная величина {{$v.amount.$params.minValue.min}}</span>
			</div>

			<div class="input-field">
				<input
					id="description"
					type="text"
					v-model="description"
					:class="{invalid: $v.description.$dirty && !$v.description.required}"
				>
				<label for="description">Описание</label>
				<span
					class="helper-text invalid"
					v-show="$v.description.$dirty && !$v.description.required"
				>Введите описание</span>
			</div>

			<button class="btn waves-effect waves-light" type="submit">
				Создать
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

export default {
	data() {
		return {
			select: null,
			category: null,
			loading: true,
			type: 'income',
			description: '',
			amount: 1
		}
	},
	computed: {
		...mapGetters(['getInfo']),
		categories() {
			return this.$store.getters.getCategories
		},
		canCreateRecord() {
			if (this.type === 'income') {
				return true
			}
			return this.getInfo.bill >= this.amount
		}
	},
	methods: {
		async submitHandler() {
			if(this.$v.$invalid) {
				this.$v.$touch()
				return
			}
			if (this.canCreateRecord) {
				const recordData = {
					type: this.type,
					catId: this.category,
					amount: this.amount,
					description: this.description,
					date: new Date().toJSON()
				}
				try {
					await this.$store.dispatch('createRecord', recordData)
					const bill = this.type === 'income'
						? this.getInfo.bill + this.amount
						: this.getInfo.bill - this.amount;

					await this.$store.dispatch('updateInfo', {bill})
					this.$message('Запись успешно создана')
					this.amount = 1;
					this.description = '';
					this.$v.$reset()
				} catch (e) {console.log(e)}
			} else {
				this.$message(`Недостаточно средств (${this.amount - this.getInfo.bill})`)
			}
		}
	},
	validations: {
		description: {required},
		amount: {minValue: minValue(1)}
	},
	async mounted() {
		await this.$store.dispatch('fetchCategories')
		this.loading = false
		setTimeout(() => {
			this.select = M.FormSelect.init(this.$refs.select)
			M.updateTextFields()
		}, 0);

		if(this.categories.length) {
			this.category = this.categories[0].id
		}
	},
	destroyed() {
		if(this.select && this.select.destroy) {
			this.select.destroy()
		}
	},

}
</script>
