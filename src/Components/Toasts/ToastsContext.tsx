import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
  PropsWithChildren,
} from 'react'

const defaultPush = () => {}

const defaultValue = {
  pushToastRef: { current: defaultPush },
}

type ContextProps = PropsWithChildren<{
  children?: React.ReactNode
}>

type ToastType = {
  title: string
  content: string
  duration: number
  type: string
}

const ToastsContext = createContext(defaultValue)

export function ToastsContextProvider({ children }: ContextProps) {
  const pushToastRef = useRef(defaultPush)
  return (
    <ToastsContext.Provider value={{ pushToastRef }}>
      <Toasts />
      {children}
    </ToastsContext.Provider>
  )
}

export function useToasts() {
  const { pushToastRef } = useContext(ToastsContext)
  return {
    pushToast: useCallback((toast: ToastType) => pushToastRef.current(toast), [
      pushToastRef,
    ]),
  }
}

function Toasts() {
  const [toasts, setToasts] = useState([]) as any
  const { pushToastRef } = useContext(ToastsContext)
  pushToastRef.current = (toast: ToastType) => {
    setToasts((v: {}[]) => [...v, toast])
    if (toast.duration) {
      setTimeout(() => {
        setToasts((v: {}[]) => v.filter((t) => t !== toast))
      }, toast.duration * 1000)
    }
  }
  return (
    <ul className="toast-list">
      {toasts.map((s: ToastType) => (
        <li key={s.type} className={`msg-${s.type}`}>
          <div>
            {!!s.title && <h3>{s.title}</h3>}
            <div>{s.content}</div>
          </div>
        </li>
      ))}
    </ul>
  )
}
