import { createStoreAccessors } from './createStoreAccessors';
import { modalFallbacks, userFallbacks, taskFallbacks, eventFallbacks } from '../../fallbacks/fallbackMaps';

export const storeAccessors = createStoreAccessors({
  modal: { storeKey: 'modalStore', fallback: modalFallbacks },
  user: { storeKey: 'userStore', fallback: userFallbacks },
  task: { storeKey: 'taskStore', fallback: taskFallbacks },
  event: { storeKey: 'eventStore', fallback: eventFallbacks },
});
