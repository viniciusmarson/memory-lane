import { CubeIcon } from '@heroicons/react/20/solid'
import { Outlet } from 'react-router-dom'
import SharePageButton from '../components/buttons/SharePageButton'

export default function AuthedLayout() {
  return (
    <div className='flex flex-col md:flex-row min-h-screen w-full'>
      <div className='p-4 border-r-2 border-gray-300 hidden md:block'>
        <CubeIcon className='h-16 w-16 inline-block' />
      </div>

      <div className='flex flex-col gap-4 p-4 w-full'>
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl font-semibold text-gray-900 mb-4 mt-4'>
            {/* TODO: Get user name when project is authenticated */}
            User memory lane
          </h1>

          <SharePageButton />
        </div>

        <div className='flex gap-2 border-2 border-gray-300 p-6 rounded-lg'>
          <p className='text-gray-500'>
            A text explaning the memories defined by the user. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>

        <Outlet />
      </div>
    </div>
  )
}
