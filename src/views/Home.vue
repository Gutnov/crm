<template>
	<div>
		<div class="page-title">
			<h3>Счет</h3>

			<button class="btn waves-effect waves-light btn-small" @click="logInfo">
				<i class="material-icons">refresh</i>
			</button>
		</div>

		<Preloader v-if="loading"/>

		<div v-else class="row">
			<HomeBill :rates="currency.rates"/>
			<HomeCurrency 
				:rates="currency.rates"
				:date="currency.date"
			/>
		</div>
	</div>
</template>
<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'
export default {
	name: 'Home',
	components: {
		HomeBill, HomeCurrency
	},
	data() {
		return {
			loading: true,
			currency: false
		}
	},
	methods: {
		logInfo() {
			console.log(this.$store.getters.getInfo.bill)
		}
	},
	async mounted() {
		this.currency = await this.$store.dispatch('fetchCurrency');
		this.loading = false;
	},
}
</script>
