import { shallowRef } from 'vue'
import { mockNotifications } from '~~/sample-data-mock'
import type { Notification } from '~/types/tresor'

export function useNotificationsData() {
  const notifications = shallowRef<Notification[]>(mockNotifications)
  return { notifications }
}
