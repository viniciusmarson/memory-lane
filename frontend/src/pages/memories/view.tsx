import MemoryList from './components/MemoryList'
import NewMemoryButton from './components/NewMemoryButton'
import DeleteMemoryModal from './components/DeleteMemoryModal'
import SortMemoriesButton from './components/SortMemoriesButton'

export const MemoriesPageView = (): JSX.Element => {
  return (
    <div className='flex flex-col gap-4 items-center'>
      <div className='flex gap-2 justify-between w-full'>
        <SortMemoriesButton />
        <NewMemoryButton url='/new-memory' />
      </div>

      <MemoryList />

      <DeleteMemoryModal />
    </div>
  )
}
