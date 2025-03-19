import { useAlert } from '../../hooks/useAlert'

export default function Alert() {
  const { alert } = useAlert()

  if (!alert) return null

  const alertStyles = {
    info: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    error: 'bg-red-500 text-white',
  }

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg ${
        alertStyles[alert.type as keyof typeof alertStyles]
      } animate-fade-in`}
    >
      {alert.message}
    </div>
  )
}
