import { useToasts } from './ToastsContext'
import { useState } from 'react'

import './styles.css'

const samples = [
  {
    type: 'thankyou',
    title: 'Merci !!!',
    content: 'Votre commentaire a bien été ajouté',
    duration: 3,
  },
  {
    type: 'success',
    title: 'Bravo !!!',
    content: 'Vous avez passez le test avec succès',
    duration: 3,
  },
  {
    type: 'danger',
    title: 'Attention !!!',
    content: "Une erreur innatendue s'est produite",
    duration: 3,
  },
  {
    type: 'warning',
    title: 'Plus que quelques minutes !!!',
    content: 'Avant de pouvoir répondre à la question',
    duration: 3,
  },
]

const Toasts = () => {
  const [customMessage, setCustomMessage] = useState('')
  const { pushToast } = useToasts()
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const [currentToast] = samples.filter(
      (i) => i.type === e.target.dataset.type,
    )
    // Clone before change to preserve original datas
    const newest = { ...currentToast }
    if (!!customMessage) {
      newest.title = ''
      newest.content = customMessage
      setCustomMessage('')
    }

    pushToast(!!customMessage ? newest : currentToast)
  }
  const handleChange = (e) => setCustomMessage(e.target.value)

  return (
    <div className="toast-main-container">
      <h1>Toasts :</h1>
      <p>
        Rapide de message de notification à l'intention de l'utilisateur d'une
        application, concernant le succès ou l'échec d'une opération effectuée
      </p>
      <div className="toast-custom-content">
        <input
          placeholder="Message personnalisé ..."
          className="input-message-perso"
          type="text"
          value={customMessage}
          onChange={handleChange}
        />
      </div>
      <div className="toast-type-buttons">
        <h2>Type de toast ?</h2>
        <p>Cliquez ci-dessous pour une démo</p>
        <ul>
          {samples.map((s) => (
            <li
              key={s.type}
              onClick={handleClick}
              data-type={s.type}
              className={`msg-${s.type}`}
            >
              {s.type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Toasts
