import { Outlet } from 'react-router-dom'
import { CubeIcon } from '@heroicons/react/20/solid'
import SharePageButton from '../components/buttons/SharePageButton'

export default function AuthedLayout() {
  return (
    <div className='flex flex-col md:flex-row min-h-screen w-full'>
      <div className='p-4 border-r-2 border-gray-300 hidden md:block'>
        <CubeIcon className='h-16 w-16 inline-block' />
      </div>

      <div className='flex flex-col gap-8 p-4 w-full'>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <h1 className='text-4xl font-semibold text-gray-900 mb-4 mt-4'>
              {/* TODO: Get user name when project is authenticated */}
              Memory lane
            </h1>
            <p className='text-gray-500'>
              {/* TODO: Get user description when project is authenticated */}
              The best memories of your life get better when shared with others.
            </p>
          </div>

          <SharePageButton />
        </div>

        <Outlet />
      </div>
    </div>
  )
}
