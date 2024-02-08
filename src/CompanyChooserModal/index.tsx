import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/app/AppContext';
import './companyChooserModal.css';

export function CompanyChooserModal() {
    const { state: { user } } = useAppContext();

    const companyIds = user?.companyIds ?? [];

    return (
        <div id="companychooser">
            <h1>Choose your company</h1>
            {
                companyIds.map((companyId) => (
                    <Link key={companyId} to={`/company/${companyId}/`}>Company #{companyId}</Link>
                ))
            }
        </div>
    )
}