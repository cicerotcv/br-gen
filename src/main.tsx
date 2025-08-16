import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { ConfigProvider } from './contexts/config.context.tsx';
import './global.css';
import { TooltipProvider } from './modules/shadcn/components/ui/tooltip.tsx';

createRoot(document.getElementById('root')!).render(
  <ConfigProvider>
    <TooltipProvider delayDuration={200}>
      <App />
    </TooltipProvider>
  </ConfigProvider>
);
