import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Details } from './features/Details';
import { HomePage } from './features/HomePage';
import { Layout } from './components/Layout';
import { MyList } from './features/List';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Layout>
            <HomePage/>
          </Layout>
        }/>
        <Route path='/details' element={
          <Layout>
            <Details/>
          </Layout>
        }/>
        
        <Route path='/list' element={
          <Layout>
            <MyList/>
          </Layout>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
