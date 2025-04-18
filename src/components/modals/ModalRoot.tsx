'use client';

import { createPortal } from 'react-dom';
import { storeAccessors } from '@/store/utils/storeAccessors/storeAccessors';
import { CustomButton } from "@/components/ui/custom/CustomButton";

export const ModalRoot = () => {
  const isOpen = storeAccessors.modal('isOpen');
  const content = storeAccessors.modal('content');
  const closeModal = storeAccessors.modal('closeModal');

  if (!isOpen || !content) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-zinc-900 p-12 pb-20 rounded-xl relative w-full max-w-lg">
        <CustomButton
          className="absolute p-2 top-3 right-3"
          onClick={closeModal}
          variant='ghost'
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#C5C5C5"/>
          </svg>
        </CustomButton>
        {content}
      </div>
    </div>,
    document.body
  )
};