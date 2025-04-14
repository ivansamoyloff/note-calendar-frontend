'use client';

import { createPortal } from 'react-dom';
import { storeAccessors } from '@/store/utils/storeAccessors/storeAccessors';

export const ModalRoot = () => {
  const isOpen = storeAccessors.modal('isOpen');
  const content = storeAccessors.modal('content');
  const closeModal = storeAccessors.modal('closeModal');

  if (!isOpen || !content) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl relative w-full max-w-lg">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-zinc-600 hover:text-zinc-900"
        >
          HUI
        </button>
        {content}
      </div>
    </div>,
    document.body
  )
};