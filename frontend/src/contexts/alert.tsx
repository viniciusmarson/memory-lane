import { createContext, useState } from 'react'
import Alert from '../components/alerts/default'

type AlertContextType = {
  alert: { message: string; type: string } | null
  showAlert: (message: string, type: string, duration: number) => void
}

const AlertContext = createContext<AlertContextType>({
  alert: null,
  showAlert: () => {},
})

function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<AlertContextType['alert']>(null)

  const showAlert = (
    message: string,
    type: string = 'info',
    duration: number = 3000
  ) => {
    setAlert({ message, type })

    setTimeout(() => {
      setAlert(null)
    }, duration)
  }

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}

      <Alert />
    </AlertContext.Provider>
  )
}

export { AlertProvider, AlertContext }
