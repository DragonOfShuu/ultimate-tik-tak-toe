import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.sass'
import SettingsComp from './contexts/settings/SettingsComp.tsx'
import PagerComp from './contexts/pager/PagerComp.tsx'
import VisualSettingsComp from './contexts/visualSettings/VisualSettingsComp.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SettingsComp>
            <PagerComp startingPage={'title'}>
                <VisualSettingsComp>
                    <App />
                </VisualSettingsComp>
            </PagerComp>
        </SettingsComp>
    </React.StrictMode>,
)
