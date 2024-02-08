import {
  useLocation,
  useSearchParams,
  useParams,
} from "../../lib/react-router-dom";
import "./debugging.css";
import { useAppContext } from "../../contexts/app/AppContext";

export function Debugging() {
  const rrLocation = useLocation();
  const rrSearchParams = useSearchParams();
  const appState = useAppContext();
  const rrParams = useParams();

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
      <pre className="debugging--pre">
        useAppContext().state: {JSON.stringify(appState.state, null, 2)}
      </pre>
      <pre className="debugging--pre">
        RR useParams(): {JSON.stringify(rrParams, null, 2)}
      </pre>
    </div>
  );
}
