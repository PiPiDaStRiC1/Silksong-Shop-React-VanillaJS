import '../styles/style.css';
import {Footer, Header, Main} from '@/components/layouts/index';
import {Home, About, Catalog, Reviews, CatalogItemDetails, Delivery, FAQ, UserProfileDetails, Profile} from '@/pages/index';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {ScrollToTop} from '@/libs/utils/ScroollToTop';
import {DataProvider, CartProvider, UserProvider, OrderProvider} from '@/contexts/index';

const App = () => {
  return (
    <CartProvider>
      <DataProvider>
        <UserProvider>
          <BrowserRouter>
            <OrderProvider>
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
                  </Route>
                </Routes>
                <Footer />
              </div>
            </OrderProvider>
          </BrowserRouter>
        </UserProvider>
      </DataProvider>
    </CartProvider>
  )
}

export default App;