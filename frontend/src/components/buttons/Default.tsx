type DefaultButtonProps = {
  children: React.ReactNode
  onClick: () => void
}

export default function DefaultButton({
  children,
  onClick,
}: DefaultButtonProps) {
  return (
    <button
      className='text-black bg-transparent border-2 border-black rounded-md px-4 py-2 flex items-center gap-2'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
