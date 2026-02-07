import { useState } from 'react';
import QuestionPage from './pages/QuestionPage';
import BrokenHeartPage from './pages/BrokenHeartPage';
import ConfirmationPage from './pages/ConfirmationPage';
import SilverHeartsPage from './pages/SilverHeartsPage';
import FireworksPage from './pages/FireworksPage';

type PageState = 'question' | 'brokenHeart' | 'confirmation' | 'silverHearts' | 'fireworks';

function App() {
    const [currentPage, setCurrentPage] = useState<PageState>('question');
    const [brokenHeartKey, setBrokenHeartKey] = useState(0);

    const handleNoClick = () => {
        setBrokenHeartKey(prev => prev + 1);
        setCurrentPage('brokenHeart');
    };

    return (
        <div className="min-h-screen w-full overflow-hidden">
            {currentPage === 'question' && (
                <QuestionPage 
                    onYesClick={() => setCurrentPage('confirmation')}
                    onNoClick={handleNoClick}
                />
            )}
            {currentPage === 'brokenHeart' && (
                <BrokenHeartPage 
                    key={brokenHeartKey}
                    onTryAgain={() => setCurrentPage('question')} 
                />
            )}
            {currentPage === 'confirmation' && (
                <ConfirmationPage onButtonClick={() => setCurrentPage('silverHearts')} />
            )}
            {currentPage === 'silverHearts' && (
                <SilverHeartsPage onFireworksTransition={() => setCurrentPage('fireworks')} />
            )}
            {currentPage === 'fireworks' && (
                <FireworksPage />
            )}
        </div>
    );
}

export default App;
