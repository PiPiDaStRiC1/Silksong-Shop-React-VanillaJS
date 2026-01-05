import '@/styles/style.css';
import {Footer, Header, Main} from '@/components/layouts/index';
import {Home, About, Catalog, Reviews, CatalogItemDetails, Delivery, FAQ, UserProfileDetails, Profile, Error} from '@/pages/index';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {ScrollToTop} from '@/libs/utils/ScroollToTop';
import {AppProviders} from '@/contexts/index';

// СДЕЛАТЬ ABORT CONTROLLER ДЛЯ ЗАПРОСОВ В ORDER И 
// ПОФИКСИТЬ АВТОЗАПОЛНЕНИЕ В SHIPPINGADDRESS И PAYMENTINFO
// СДЕЛАТЬ ВАЛИДАЦИЮ В НАСТРОЙКАХ ПРИ СМЕНЕ ПОЧТЫ

const App = () => {
  return (
    <BrowserRouter>
      <AppProviders>
        <ScrollToTop behavior='smooth'/>
        <div className='flex flex-col justify-between'>
          <Header />
          <Toaster 
            toastOptions={{
              style: {
                background: '#1c1c1c',
                color: '#fff',
                border: '1px solid #333',
                textAlign: 'center',
                position: 'relative',
                top: '5rem'
              },
              success: {
                duration: 2000,
                iconTheme: { primary: '#10b981', secondary: '#fff' }
              },
              error: {
                duration: 2500,
                iconTheme: { primary: '#ef4444', secondary: '#fff' }
              }
            }}
          />
          <Routes>
            <Route element={<Main />}>
              <Route index path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/catalog' element={<Catalog />} />
              <Route path='/catalog/:category/:id' element={<CatalogItemDetails />} />
              <Route path='/profile/:userId' element={<UserProfileDetails />} />
              <Route path='/reviews' element={<Reviews />} />
              <Route path='/delivery' element={<Delivery />} />
              <Route path='/faq' element={<FAQ />} />
              <Route path='/about' element={<About />} />
              <Route path='*' element={<Error />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </AppProviders>
    </BrowserRouter>
  )
}

export default App;