import { MemoriesPageView } from './view'
import { MemoriesPageController } from './controller'

export const MemoriesPage = (): JSX.Element => {
  return (
    <MemoriesPageController>
      <MemoriesPageView />
    </MemoriesPageController>
  )
}
