import { useEffect, useState, useRef, useCallback } from 'react'
import '../style.scss'
// import qfl from '../../../common/images/qfl.mp4'
import videoImage from '../../../common/images/video.jpg'
const VideoComp = () => {
  const [play, setPlay] = useState(false)
  return (
    <div className="content_container">
      <ul
        className="content"
        style={{
          justifyContent: 'center',
        }}
      >
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
              <video
                id="video"
                src="http://localhost:3005/static/images/qfl.mp4"
                controls
              ></video>
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
