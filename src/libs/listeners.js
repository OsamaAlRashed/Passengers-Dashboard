import { vm }  from './global-event'

export const onMobileMode = (action) => {
  vm.$on('mobile-mode', (id)=>{ 
    action(id);      
  });
}
export const onDesktopMode = (action) => {
  vm.$on('desktop-mode', (id)=>{ 
    action(id);      
  });
}
