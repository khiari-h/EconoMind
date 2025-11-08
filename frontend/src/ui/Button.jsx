function Button({ children, variant = 'default', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    default: 'bg-primary-500 text-white hover:bg-primary-600',
    professor: 'bg-professor text-white hover:bg-professor-dark',
    coach: 'bg-coach text-white hover:bg-coach-dark',
    ghost: 'text-gray-700 hover:text-primary-600'
  }
  return (
    <button className={`${base} px-4 py-2 ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
