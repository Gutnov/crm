<template>
<div>
	<div class="page-title">
		<h3>Планирование</h3>
		<h4>{{getInfo.bill | currency('RUB')}}</h4>
	</div>
	<Preloader v-if="loading"/>
	<p v-else-if="!getCategories.length" class="center">
		Категорий пока нет 
		<router-link to="/categories">Добавить категорию</router-link>
	</p>
	<section 
		v-else
		v-for="cat in categories"
		:key="cat.id"
	>
		<div>
			<p>
				<strong>{{cat.name}}:</strong>
				{{cat.spend | currency('RUB')}} из {{cat.limit | currency('RUB')}}
			</p>
			<div class="progress" v-tooltip="cat.tooltip">
				<div
					class="determinate"
					:class="[cat.progressColor]"
					:style="{width: cat.progressPercent + '%'}"
				></div>
			</div>
		</div>
	</section>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Vue from 'vue'
export default {
	data() {
		return {
			loading: true,
			categories: []
		}
	},
	computed: {
		...mapGetters(['getRecords','getCategories', 'getInfo'])
	},
	async mounted() {
		try {
			await this.$store.dispatch('fetchRecords')
			await this.$store.dispatch('fetchCategories')
			this.loading = false;

			this.categories = this.getCategories.map(cat => {
				const spend = this.getRecords
					.filter(r => r.catId === cat.id)
					.filter(r => r.type === 'outcome')
					.reduce((total, r) => {
						return total += +r.amount
					}, 0)

				const percent = 100 * spend / cat.limit;
				const progressPercent = percent > 100 ? 100 : percent;
				const progressColor = percent < 60 ? 'green' :
				percent < 100 ? 'yellow' : 'red'

				const tooltipValue = cat.limit - spend;
				const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${Vue.filter('currency')(Math.abs(tooltipValue))}`

				return {
					...cat,
					spend,
					percent,
					progressPercent,
					progressColor,
					tooltip
				}
			})

			
		} catch (e) {console.log(e)}
	}
}
</script>
