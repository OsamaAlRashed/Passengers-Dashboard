import Vue from "vue";
export const vm = new Vue()

export const checkSize = () => {
  if(innerWidth < 992) {
    vm.$emit('mobile-mode')
  } else {
    vm.$emit('desktop-mode')
  }
}
export const initScreenEvent = () =>  {
  addEventListener('resize', checkSize)
}
export const destroyScreenEvent = () =>  {
  removeEventListener('resize', checkSize)
}
export const editAdminEvent = (payload) =>  {
  vm.$emit('edit-admin-event', payload)
}
export const editDriverEvent = (payload) =>  {
  vm.$emit('edit-driver-event', payload)
}
