import { toast } from "../../components/ui/use-toast"

export const showToast = {
  success: (message, description) => {
    toast({
      title: message,
      description: description || "",
      variant: "default",
    })
  },
  
  error: (message, description) => {
    toast({
      title: message,
      description: description || "",
      variant: "destructive",
    })
  },
  
  warning: (message, description) => {
    toast({
      title: message,
      description: description || "",
      variant: "default",
    })
  },
  
  info: (message, description) => {
    toast({
      title: message,
      description: description || "",
      variant: "default",
    })
  },
  
  loading: (message) => {
    return toast({
      title: message,
      description: "Loading...",
    })
  },
  
  dismiss: () => {
    // The new toast system handles dismissal automatically
    // This is a placeholder for backward compatibility
  },
  
  promise: (promise, messages) => {
    // For promise-based toasts, we'll use a simple approach
    // The new toast system doesn't have built-in promise handling
    const loadingToast = toast({
      title: messages.loading || "Loading...",
    })
    
    promise
      .then(() => {
        toast({
          title: messages.success || "Success!",
          variant: "default",
        })
      })
      .catch(() => {
        toast({
          title: messages.error || "Something went wrong!",
          variant: "destructive",
        })
      })
    
    return loadingToast
  }
}
