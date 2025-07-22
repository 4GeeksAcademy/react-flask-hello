import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import flagES from '../assets/img/Flags/es.svg'
import flagEN from '../assets/img/Flags/us.svg'

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [activeFlag, setActiveFlag] = useState(i18n.language === 'es' ? flagES : flagEN);

    useEffect(() => {
        setActiveFlag(i18n.language === 'es' ? flagES : flagEN);
    }, [i18n.language])

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className='btn-group'>
            <button type="button" className="btn btn-link dropdown-toggle p-0" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={activeFlag} alt="current language" className='flag-icon-main' />
            </button>
            <ul className='dropdown-menu dropdown-menu-dark'>
                <li>
                    <button className='dropdown-item' onClick={() => changeLanguage('es')}>
                        <img src={flagES} alt="Español" className='flag-icon-dropdown' />
                    </button>
                </li>
                <li>
                    <button className='dropdown-item' onClick={() => changeLanguage('en')}>
                        <img src={flagEN} alt="English" className='flag-icon-dropdown' />
                    </button>
                </li>

            </ul>
        </div>

    );
}

export default LanguageSwitcher; 