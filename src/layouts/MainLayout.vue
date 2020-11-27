<template>
	<div>
		<preloader v-if="loading"/>
		<div class="app-main-layout" v-else>
			<Navbar @click-nav="isOpen = !isOpen"/>
			<Sidebar :value="isOpen"/>
			<main class="app-content" :class="{full: !isOpen}">
				<div class="app-page">
					<router-view/>
			</div>
			</main>

			<div class="fixed-action-btn">
				<router-link class="btn-floating btn-large blue" to="/record">
					<i class="large material-icons">add</i>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import messages from '@/utils/messages'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default {
	name: 'main-layout',
	components: {
		Navbar, Sidebar
	},
	data: () => ({
		isOpen: true,
		loading: true
	}),
	computed: {
		error() {
			return this.$store.getters.getError
		},
	},
	watch: {
		error(fbError) {
			console.log(fbError)
			this.$error(messages[fbError.code] || 'Чтот-то пошло не так')
		}
	},
	async mounted() {
		await this.$store.dispatch('fetchInfo')
		this.loading = false
	},
}
</script>
