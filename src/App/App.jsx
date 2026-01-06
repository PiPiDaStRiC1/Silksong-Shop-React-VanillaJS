import '@/styles/style.css';
import {Footer, Header, Main} from '@/components/layouts/index';
import {Home, About, Catalog, Reviews, CatalogItemDetails, Delivery, FAQ, UserProfileDetails, Profile, Error} from '@/pages/index';
import { AuthModal } from '@/pages/index';
import {Routes, Route, useLocation} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {ScrollToTop} from '@/libs/utils/ScroollToTop';
import {AppProviders} from '@/contexts/index';
import {ProtectedRoute} from '@/features/index'

// СДЕЛАТЬ ABORT CONTROLLER ДЛЯ ЗАПРОСОВ В ORDER И 
// ПОФИКСИТЬ АВТОЗАПОЛНЕНИЕ В SHIPPINGADDRESS И PAYMENTINFO
// СДЕЛАТЬ ВАЛИДАЦИЮ В НАСТРОЙКАХ ПРИ СМЕНЕ ПОЧТЫ
// ВОЗМОЖНО УБРАТЬ ВСЕ SIDE-EFFECTS (TOASTЫ) ИЗ КОНТЕКСТОВ И ХУКОВ
// ПЕРЕДАЛАТЬ ПРОВЕРКУ ЛОГИНА НА ГЛОБАЛЬНЫЙ ФЛАГ isLoggedIn ВМЕСТО ПРОВЕРКИ user\
// Header.jsx стал сложнее (много условной логики). Можно вынести в useAuthNavigation() хук

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
            <Route 
              path='/delivery' 
              element={
                <ProtectedRoute>
                  <Delivery />
                </ProtectedRoute>
              } 
            />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/about' element={<About />} />
            <Route path='/auth' element={<AuthModal />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
        {locationState?.background && 
          <Routes>
            <Route path='/auth' element={<AuthModal />} />
          </Routes>
        }
        <Footer />
      </div>
    </AppProviders>
  )
}

export default App;