import { useEffect, useState, useRef, useCallback } from 'react'
import '../style.scss'
import qfl from '../../../common/images/qfl.mp4'
import videoImage from '../../../common/images/video.jpg'
const VideoComp = () => {
  const [play, setPlay] = useState(false)
  return (
    <div className="content_container">
      <ul className="content">
        <li
          className="content_item"
          style={{
            bottom: '50%',
            minWidth: '720px',
            marginBottom: '-300px',
            // transform: ['translate(0, 100%)'],
          }}
        >
          <div className="history_video">
            <figure>
              <video id="video" src={qfl} controls></video>
            </figure>
          </div>
          <button
            onClick={() => {
              if (document.getElementById('video').paused) {
                document.getElementById('video').play()
                setPlay(true)
              } else {
                document.getElementById('video').pause()
                setPlay(false)
              }
            }}
          >
            <span className={play ? 'pauseSpan' : null}>Play video</span>
          </button>
        </li>
      </ul>
    </div>
  )
}
export default VideoComp
