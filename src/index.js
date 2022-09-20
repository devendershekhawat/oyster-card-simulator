import { createRoot } from 'react-dom/client';
import App from './App';

import 'antd/dist/antd.min.css';
import './index.scss';

const root = createRoot(document.getElementById('root'));

root.render(<App />);
