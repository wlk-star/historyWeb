import { useEffect, useState } from 'react'
import './style.scss'

function Footer(props) {
  return (
    <div className="footer">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((value, index) => {
        return (
          <a key={`footer${index}`} className="footer_item">
            <span className="item_text"> {value}</span>
            <span></span>
          </a>
        )
      })}
    </div>
  )
}
export default Footer
