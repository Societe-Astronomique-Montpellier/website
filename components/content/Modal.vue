<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()
const { isOpen } = toRefs(props)

const emit = defineEmits<{
  (e: 'closeModal', isCloseModal: boolean): void
}>()
const onclose = () => emit('closeModal', !isOpen.value )
// onClickOutside(target, () => emit('onModalClose', isOpen.value ))
</script>

<template>
  <div
    v-if="isOpen"
    @click.self="onclose"
    data-dialog-backdrop="dialog"
    data-dialog-backdrop-close="true"
    class="pointer-events-none fixed inset-0 grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 z-[2000]"
  >
    <div
        data-dialog="dialog"
        class="relative m-4 p-4 w-full md:w-3/4 lg:w-3/5 2xl:w-2/5 min-w-[90%] md:min-w-[75%] lg:min-w-[60%] 2xl:min-w-[40%] max-w-[90%] md:max-w-[75%] lg:max-w-[60%] 2xl:max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
    >
      <div
          class="flex items-center shrink-0 p-4 text-blue-gray-900 antialiased font-sans text-2xl font-semibold leading-snug justify-between"
      >
        <span> <slot name="header"></slot></span>
        <button
          class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
          type="button"
          data-ripple-dark="true"
          data-dialog-close="true"
          @click="onclose"
        >
            <Icon name="material-symbols-light:close-small" @click.stop="onclose" size="24" />
        </button>
      </div>
      <hr class="dark:border-gray-700/60" />
      <div
        class="relative p-4 text-blue-gray-500 antialiased font-sans text-base leading-relaxed overflow-y-scroll"
      >
        <p
          class="block antialiased font-sans text-base leading-relaxed text-inherit text-gray-600 max-w-lg"
        >
          Are you sure you want to reset all settings to their default values?
          This action cannot be undone.
        </p>
        <div>
          <div class="flex flex-col md:flex-row gap-2">
            <div class="relative w-full min-w-[200px] h-11">
                <input
                    class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900 w-full md:max-w-lg"
                    placeholder=" "
                /><label
                  class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
              >Reset settings
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>