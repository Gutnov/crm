<template>
	<div class="col s12 m6 l4">
		<div class="card light-blue bill-card">
			<div class="card-content white-text">
				<span class="card-title">Счет в валюте</span>
				<p v-for="cur in currencies" :key="cur" class="currency-line">
					<span :key="cur">{{getRate(cur) | currency(cur)}}</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeBill',
	props: ['rates'],
	data() {
		return {
			currencies: ['RUB', 'USD', 'EUR']
		}
	},
	computed: {
		base() {
			return this.$store.getters.getInfo.bill / (this.rates['RUB'])
		}
	},
	methods: {
		getRate(rate) {
			return Math.floor(this.base * this.rates[rate])
		}
	},
	
}
</script>

<style>

</style>
