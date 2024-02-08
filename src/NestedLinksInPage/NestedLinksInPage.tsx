import { Link } from "react-router-dom";
import './nestedLinksInPage.css'

const links = [
  '/',
  '/trips',
  '/billing'
] as const;

export function NestedLinksInPage() {
  return (
    <div className="nestedlinks">
      <div className="nestedlinks--links">
        {
          links.map((path) => (
            <Link key={path} className="nestedlinks--link" to={path}>&lt;Link to="{path}" /&gt;</Link>
          ))
        }
      </div>
    </div>
  )
}