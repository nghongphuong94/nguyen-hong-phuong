import { CommonModalProvider, TokenModalProvider } from './providers';
import { CommonModal, TokenModal } from './components';
import PageHome from './pages/PageHome';

const App = () => {
  return (
    <CommonModalProvider>
      <TokenModalProvider>
        <PageHome />
        <CommonModal />
        <TokenModal />
      </TokenModalProvider>
    </CommonModalProvider>
  )
};

export default App;
