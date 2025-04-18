'use client';
import { storeAccessors } from '@/store/utils/storeAccessors/storeAccessors';
import { CustomButton } from '@/components/ui/custom/CustomButton';
import EventModal from '@/components/modals/EventModal';
import SignModal from '@/components/modals/SignModal';

export default function CreateEventButton() {
  const openModal = storeAccessors.modal('openModal');

  return(
    <CustomButton
      size='lg'
      className='flex items-center justify-center gap-4 max-w-76'
      // onClick={() => openModal(<EventModal type='event' />)}
      onClick={() => openModal(<SignModal />)}
    >
      Create
      <svg className='w-9.5 h-9.5 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M19 7.91675C19.8744 7.91675 20.5833 8.62563 20.5833 9.50008V17.4167H28.5C29.3744 17.4167 30.0833 18.1256 30.0833 19.0001C30.0833 19.8745 29.3744 20.5834 28.5 20.5834H20.5833V28.5001C20.5833 29.3745 19.8744 30.0834 19 30.0834C18.1255 30.0834 17.4166 29.3745 17.4166 28.5001V20.5834H9.49996C8.62551 20.5834 7.91663 19.8745 7.91663 19.0001C7.91663 18.1256 8.62551 17.4167 9.49996 17.4167H17.4166V9.50008C17.4166 8.62563 18.1255 7.91675 19 7.91675Z"/>
      </svg>
    </CustomButton>
  );
};