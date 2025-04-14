import { CustomButton } from '../ui/custom/CustomButton';
import { ViewSwitcher } from '../ui/switchers/ViewSwitcher';
import DateSwitcher from '../ui/switchers/DateSwitcher';

const VALID_VIEWS = ['day', 'week', 'month', 'year'] as const;
type View = typeof VALID_VIEWS[number];

export default async function Header({ 
  params 
}: { 
  params: { view: string; date: string };
}){
  const awaitParams = await params;

  const viewParam =  awaitParams.view;
  const dateParam =  awaitParams.date;

  const view = (VALID_VIEWS.includes(viewParam as View)
  ? viewParam
  : 'day') as View;

  return(
    <header className='mb-6 flex flex-col'>
      <div className='flex items-center justify-end gap-6'>
        <CustomButton
          size='sm'
          className='p-2 flex items-center justify-center'
          variant='ghost'
        >
          <svg className='w-8 h-8 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.0035 5.53085C13.0192 4.38815 14.4593 4 16 4C17.5407 4 18.9808 4.38815 19.9966 5.53085C20.98 6.63718 21.3333 8.19718 21.3333 10C21.3333 11.8028 20.98 13.3628 19.9966 14.4692C18.9808 15.6118 17.5407 16 16 16C14.4593 16 13.0192 15.6118 12.0035 14.4692C11.0201 13.3628 10.6667 11.8028 10.6667 10C10.6667 8.19718 11.0201 6.63718 12.0035 5.53085ZM13.9966 7.30249C13.6466 7.69615 13.3333 8.46949 13.3333 10C13.3333 11.5305 13.6466 12.3038 13.9966 12.6975C14.3142 13.0548 14.874 13.3333 16 13.3333C17.126 13.3333 17.6859 13.0548 18.0035 12.6975C18.3534 12.3038 18.6667 11.5305 18.6667 10C18.6667 8.46949 18.3534 7.69615 18.0035 7.30249C17.6859 6.94518 17.126 6.66667 16 6.66667C14.874 6.66667 14.3142 6.94518 13.9966 7.30249ZM10.4249 21.1466C9.29198 21.8296 8.58277 22.8418 8.23853 24.321C8.18391 24.5557 8.24475 24.7707 8.42835 24.965C8.62716 25.1754 8.95592 25.3333 9.33334 25.3333H22.6667C23.0441 25.3333 23.3729 25.1754 23.5717 24.965C23.7553 24.7707 23.8161 24.5557 23.7615 24.321C23.4172 22.8418 22.708 21.8296 21.5751 21.1466C20.3879 20.4308 18.6066 20 16 20C13.3935 20 11.6121 20.4308 10.4249 21.1466ZM9.04809 18.8628C10.8201 17.7945 13.1537 17.3333 16 17.3333C18.8464 17.3333 21.1799 17.7945 22.9519 18.8628C24.7782 19.9639 25.8726 21.6277 26.3588 23.7166C26.9409 26.218 24.7442 28 22.6667 28H9.33334C7.25586 28 5.05915 26.218 5.64127 23.7166C6.1274 21.6277 7.22179 19.9639 9.04809 18.8628Z"/>
          </svg>
        </CustomButton>
        <CustomButton
          size='sm'
          className='p-2 flex items-center justify-center'
          variant='ghost'
        >
          <svg className='w-8 h-8 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.5677 5.79903C11.9744 3.96888 13.5977 2.66675 15.4725 2.66675H16.5276C18.4024 2.66675 20.0256 3.96888 20.4323 5.79903L20.5553 6.3526C21.088 6.6045 21.5963 6.89909 22.0757 7.23184L22.6182 7.06107C24.4065 6.49821 26.3459 7.25292 27.2832 8.87654L27.8108 9.79027C28.7482 11.4139 28.4321 13.4707 27.0505 14.738L26.6311 15.1228C26.6547 15.4123 26.6667 15.7049 26.6667 16.0001C26.6667 16.2952 26.6547 16.5878 26.6311 16.8774L27.0506 17.2621C28.4322 18.5294 28.7482 20.5863 27.8108 22.2099L27.2833 23.1236C26.3459 24.7472 24.4066 25.5019 22.6183 24.9391L22.0757 24.7683C21.5963 25.1011 21.088 25.3957 20.5553 25.6476L20.4323 26.2011C20.0256 28.0313 18.4024 29.3334 16.5276 29.3334H15.4725C13.5977 29.3334 11.9744 28.0313 11.5677 26.2011L11.4447 25.6476C10.912 25.3957 10.4038 25.1011 9.92435 24.7683L9.38179 24.9391C7.59348 25.5019 5.65418 24.7472 4.71678 23.1236L4.18924 22.2099C3.25184 20.5863 3.56789 18.5294 4.9495 17.2621L5.36899 16.8773C5.34539 16.5878 5.33337 16.2952 5.33337 16.0001C5.33337 15.7049 5.34539 15.4123 5.369 15.1228L4.94951 14.738C3.56791 13.4707 3.25186 11.4139 4.18926 9.79028L4.7168 8.87655C5.6542 7.25293 7.5935 6.49822 9.38181 7.06108L9.92437 7.23185C10.4038 6.89909 10.9121 6.60451 11.4447 6.35261L11.5677 5.79903ZM15.4725 5.33341C14.8476 5.33341 14.3065 5.76746 14.1709 6.37751L13.9003 7.59513C13.804 8.02855 13.4983 8.38559 13.0848 8.54746C12.3302 8.8429 11.6306 9.25013 11.0067 9.7493C10.6598 10.0269 10.1973 10.1134 9.77346 9.97998L8.5812 9.60473C7.9851 9.41711 7.33867 9.66868 7.0262 10.2099L6.49866 11.1236C6.18619 11.6648 6.29154 12.3504 6.75208 12.7729L7.67236 13.617C7.99918 13.9168 8.15556 14.3594 8.08956 14.798C8.03067 15.1894 8.00003 15.5907 8.00003 16.0001C8.00003 16.4094 8.03067 16.8108 8.08956 17.2022C8.15555 17.6407 7.99917 18.0834 7.67235 18.3831L6.75206 19.2273C6.29152 19.6497 6.18617 20.3353 6.49864 20.8765L7.02618 21.7903C7.33865 22.3315 7.98508 22.5831 8.58118 22.3954L9.77345 22.0202C10.1973 21.8868 10.6597 21.9733 11.0067 22.2509C11.6306 22.75 12.3302 23.1573 13.0848 23.4527C13.4983 23.6146 13.804 23.9716 13.9003 24.405L14.1709 25.6227C14.3065 26.2327 14.8476 26.6667 15.4725 26.6667H16.5276C17.1525 26.6667 17.6936 26.2327 17.8292 25.6227L18.0997 24.405C18.1961 23.9716 18.5018 23.6146 18.9152 23.4527C19.6699 23.1573 20.3694 22.75 20.9933 22.2509C21.3403 21.9733 21.8028 21.8868 22.2266 22.0202L23.4189 22.3954C24.015 22.5831 24.6614 22.3315 24.9739 21.7903L25.5014 20.8765C25.8139 20.3353 25.7085 19.6497 25.248 19.2273L24.3277 18.3832C24.0009 18.0834 23.8445 17.6407 23.9105 17.2022C23.9694 16.8108 24 16.4094 24 16.0001C24 15.5907 23.9694 15.1893 23.9105 14.798C23.8445 14.3594 24.0009 13.9168 24.3277 13.617L25.248 12.7729C25.7085 12.3504 25.8139 11.6648 25.5014 11.1236L24.9738 10.2099C24.6614 9.66867 24.0149 9.4171 23.4188 9.60472L22.2266 9.97997C21.8028 10.1134 21.3403 10.0269 20.9933 9.74929C20.3694 9.25012 19.6699 8.8429 18.9152 8.54745C18.5018 8.38559 18.1961 8.02855 18.0997 7.59513L17.8292 6.37751C17.6936 5.76746 17.1525 5.33341 16.5276 5.33341H15.4725ZM13.3333 16.0001C13.3333 14.5273 14.5272 13.3334 16 13.3334C17.4728 13.3334 18.6667 14.5273 18.6667 16.0001C18.6667 17.4728 17.4728 18.6667 16 18.6667C14.5272 18.6667 13.3333 17.4728 13.3333 16.0001Z"/>
          </svg>
        </CustomButton>
      </div>
      <div
        className='flex items-center justify-start gap-18'
      >
        <CustomButton
          size='lg'
          className='flex items-center justify-center gap-4 max-w-76'
        >
          Create
          <svg className='w-9.5 h-9.5 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M19 7.91675C19.8744 7.91675 20.5833 8.62563 20.5833 9.50008V17.4167H28.5C29.3744 17.4167 30.0833 18.1256 30.0833 19.0001C30.0833 19.8745 29.3744 20.5834 28.5 20.5834H20.5833V28.5001C20.5833 29.3745 19.8744 30.0834 19 30.0834C18.1255 30.0834 17.4166 29.3745 17.4166 28.5001V20.5834H9.49996C8.62551 20.5834 7.91663 19.8745 7.91663 19.0001C7.91663 18.1256 8.62551 17.4167 9.49996 17.4167H17.4166V9.50008C17.4166 8.62563 18.1255 7.91675 19 7.91675Z"/>
          </svg>
        </CustomButton>
        <div
          className='flex flex-1 items-center justify-between'
        >
          <DateSwitcher view={view} date={dateParam}/>
          <ViewSwitcher view={view} date={new Date(dateParam)}/>
        </div>
      </div>
    </header>
  );
};
