'use client';

import LoginForm from '@/components/forms/LoginForm';
import { storeAccessors } from '@/store/utils/storeAccessors/storeAccessors';
import { CustomButton } from './ui/custom/CustomButton';
import { CustomInput } from './ui/custom/CustomInput';

export default function FakeComponent() {
  const openModal = storeAccessors.modal('openModal');
  // const user = storeAccessors.user('user');
  // const events = storeAccessors.event('events');
  // const tasks = storeAccessors.task('tasks');

  return(
    <div className='flex flex-col items-start'>
      <button onClick={() => openModal(<LoginForm />)}>CUM IN</button>
      <CustomButton variant='ghost' onClick={() => console.log('click')} size='lg'>Some text</CustomButton>
      <CustomInput
        inputSize='md'
        label='Test input'
        // value='test'
        // onChange={(e) => console.log(e.currentTarget.value)}
        // disabled
        // required
      />
    </div>
    
  )
}