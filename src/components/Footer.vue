<template>
    <footer class="mt-auto">
        <div class="bg-secondary-200 p-4 font-sans text-center text-secondary-700 dark:bg-secondary-700 dark:text-secondary-200">
            © {{ currentYear }} Copyright:
            <a class="text-secondary-800 dark:text-secondary-400" href="javascript:void(0);"
            >Demo vue app</a
            >
        </div>
    </footer>
</template>

<script>
export default {
    data () {
        return {
            currentYear : new Date().getFullYear()
        }
    }
}
</script>