<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>
		<section>
			<preloader v-if="loading" />
			<div class="row" v-else>
				<div class="col s12 m6">
					<CategoryCreate />
				</div>
				<div class="col s12 m6">
					<CategoryEdit 
						:key="categoriesKey"
						v-if="categories"
					/>
					<p v-else>Категорий пока нет</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
import Preloader from '../components/Preloader.vue'

export default {
	name: 'Categories',
	components: {
		CategoryCreate, CategoryEdit
	},
	data() {
		return {
			loading: true
		}
	},
	computed: {
		categoriesKey() {
			return Math.floor(Math.random() * 10000000 + this.categories.length).toString()
		},
		categories() {
			return this.$store.getters.getCategories
		}

	},
	async mounted() {
		try {
			await this.$store.dispatch('fetchCategories');
			this.loading = false;
		} catch (e) {}
	},
}
</script>
