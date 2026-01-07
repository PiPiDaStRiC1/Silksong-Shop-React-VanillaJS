import '@/styles/style.css';
import {Footer, Header, Main} from '@/components/layouts/index';
import {Home, About, Catalog, Reviews, CatalogItemDetails, Delivery, FAQ, UserProfileDetails, Profile, Error} from '@/pages/index';
import { AuthModal } from '@/pages/index';
import {Routes, Route, useLocation} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {ScrollToTop} from '@/libs/utils/ScroollToTop';
import {AppProviders} from '@/contexts/index';
import {ProtectedRoute, GuestOnlyRoute} from '@/features/index'

// ToDo:
// ПОСМОТРЕТЬ await, ГДЕ ЕСТЬ ПРОМИССЫ И ОБЕРНУТЬ, ВОЗМОЖНО, В TRY CATCH
// ПОФИКСИТЬ АВТОЗАПОЛНЕНИЕ В SHIPPINGADDRESS И PAYMENTINFO
// Header.jsx стал сложнее (много условной логики). Можно вынести в useAuthNavigation() хук

// ГЛОБАЛЬНОЕ ИЗМЕНЕНИЕ НУЖНО СДЕЛАТЬ!!!!!!!!!!!!!!!!!!!!!!!
// Вместо единого ключа 'wishList' и 'cart', хранить данные отдельно для каждого пользователя:
// 'wishList_{userId}' и 'cart_{userId}' 

const App = () => {
  const location = useLocation();
  const locationState = location.state;

  return (
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
        <Routes location={locationState?.background || location}>
          <Route element={<Main />}>
            <Route index path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/catalog/:category' element={<Catalog />} />
            <Route path='/catalog/:category/:id' element={<CatalogItemDetails />} />
            <Route path='/reviews' element={<Reviews />} />
            <Route path='/reviews/:userId' element={<UserProfileDetails />} />
            <Route path='/delivery' element={<ProtectedRoute><Delivery /></ProtectedRoute>} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/about' element={<About />} />
            <Route path='/auth' element={<GuestOnlyRoute><AuthModal /></GuestOnlyRoute>} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
        {locationState?.background && 
          <Routes>
              <Route path='/auth' element={<GuestOnlyRoute><AuthModal /></GuestOnlyRoute>} />
          </Routes>
        }
        <Footer />
      </div>
    </AppProviders>
  )
}

export default App;