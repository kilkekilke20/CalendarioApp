import React from 'react'

//aqui apareceran los eventos en el calendario, por ahora solo extraere el titulo y el usuario
export const CalendarioEvent = ({ event }) => {
    const {title, user} = event
  return (
    <div>
        <span>
            <strong> {title} </strong>
            <strong>-  {user.name} </strong>
        </span>
    </div>
  )
}
