<template>
	<div class="app-loader">
		<div class="preloader-wrapper big active">
			<div class="spinner-layer" :class="loaderClas">
				<div class="circle-clipper left">
					<div class="circle"></div>
				</div>
				<div class="gap-patch">
					<div class="circle"></div>
				</div>
				<div class="circle-clipper right">
					<div class="circle"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Preloader',
		data() {
			return {
				loaderClassesArr: ['spinner-blue-only', 'spinner-red-only', 'spinner-green-only', 'spinner-yellow-only']
			}
		},
		computed: {
			loaderClas() {
				let randomNum = +Math.floor(Math.random() * 4)
				return this.loaderClassesArr[randomNum]
			}
		},
	}

</script>

<style>

</style>
