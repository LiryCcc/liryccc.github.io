import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';
import init from './init';

const root = document.createElement('div');

const main = async () => {
  await init();
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  document.body.append(root);
};

main();
