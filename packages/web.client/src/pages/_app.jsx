import '../../styles.css';
import 'tailwindcss/tailwind.css';

import { Provider } from 'next-auth/client';

// JSX Components can ONLY be used when identifier is in UpperCase
// eslint-disable-next-line @typescript-eslint/naming-convention
const App = ({ Component, pageProps }) => (
  <Provider session={pageProps.session}>
    <Component {...pageProps} />
  </Provider>
);

export default App;
