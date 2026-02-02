import { useState } from 'react';
import QuestionPage from './pages/QuestionPage';
import CelebrationPage from './pages/CelebrationPage';

function App() {
    const [showEnvelope, setShowEnvelope] = useState(false);

    return (
        <div className="min-h-screen w-full overflow-hidden">
            {!showEnvelope ? (
                <QuestionPage onYes={() => setShowEnvelope(true)} />
            ) : (
                <CelebrationPage />
            )}
        </div>
    );
}

export default App;
