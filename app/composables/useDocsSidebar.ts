const isOpen = ref(false)

export function useDocsSidebar() {
  function toggle() {
    isOpen.value = !isOpen.value
  }

  function close() {
    isOpen.value = false
  }

  return {
    isOpen: readonly(isOpen),
    toggle,
    close,
  }
}
