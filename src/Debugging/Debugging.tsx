import { useLocation, useSearchParams } from 'react-router-dom';
import './debugging.css'

export function Debugging() {
  const rrLocation = useLocation();
  const rrSearchParams = useSearchParams();

  return (
    <div id="debugging">
      <pre className="debugging--pre">
        window.location: {JSON.stringify(window.location, null, 2)}
      </pre>
      <pre className="debugging--pre">
        RR useLocation(): {JSON.stringify(rrLocation, null, 2)}
      </pre>
      <pre className="debugging--pre">
        RR useSearchParams(): {JSON.stringify(rrSearchParams, null, 2)}
      </pre>
    </div>
  )
}