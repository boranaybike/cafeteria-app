import { toast } from "react-toastify"

export const showMessage = (message: string, type: 'success' | 'error') => {
  const options = {
    position: "top-right" as const,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0
  }
  
  if (type === 'success') {
    toast.success(message || 'Success!', options)
  } else if (type === 'error') {
    toast.error(message, options)
  }
}