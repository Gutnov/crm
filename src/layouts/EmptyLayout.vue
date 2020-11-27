<template>
	<div class="grey darken-1 empty-layout">
		<router-view />
	</div>
</template>

<script>
import messages from '@/utils/messages'

export default {
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
}
</script>
