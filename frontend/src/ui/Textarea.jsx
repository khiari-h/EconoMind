function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none resize-none ${className}`}
      {...props}
    />
  )
}

export default Textarea
