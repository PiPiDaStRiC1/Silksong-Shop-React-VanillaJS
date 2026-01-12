import '@/styles/style.css';
import {Footer, Header, Main} from '@/components/layouts/index';
import {Home, Catalog, Reviews, CatalogItemDetails} from '@/pages/index';
import {Routes, Route, useLocation} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {ScrollToTop} from '@/libs/utils/ScroollToTop';
import {AppProviders} from '@/contexts/index';
import {ProtectedRoute, GuestOnlyRoute, Preloader} from '@/features/index'
import { lazy, Suspense } from 'react';

// ToDo: 
// КАК-ТО СДЕЛАТЬ ВОССТАНОВЛЕНИЕ ТАЙМЕРОВ, ДАЖЕ ПОСЛЕ РЕЛОГА ПОЛЬЗОВАТЕЛЯ
// (ПОКА ЧТО ПРОСТО БУДУ ОЧИЩАТЬ ТАЙМЕРЫ ПРИ РАЗЛОГЕ)
// 
// ОПТИМИЗАЦИЯ ВСЕГО, ЧТО МОЖНО
// 
// СДЕЛАТЬ БОЛЕЕ ДЕТАЛЬНУЮ ОПТИМИЗАЦИЮ КАРТИНОК (СКЕЛЕТОН) И БЕСКОНЕЧНОГО СКРОЛЛА
// УЛУЧШИТЬ LAZY ЗАГРУЗКУ СТРАНИЦ И КОМПОНЕНТОВ (ВОЗМОЖНО)

const Profile = lazy(() => import('@/pages/Profile'));
const Delivery = lazy(() => import('@/pages/Delivery'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const About = lazy(() => import('@/pages/About'));
const Error = lazy(() => import('@/pages/Error'));
const AuthModal = lazy(() => import('@/pages/AuthModal'));
const UserProfileDetails = lazy(() => import('@/pages/UserProfileDetails'));


function App() {
  const location = useLocation();
  const locationState = location.state;

  return (
    <AppProviders>
      <ScrollToTop behavior='smooth' />
      <div className='flex flex-col justify-between bg-black'>
        <Header />
        <Toaster
          toastOptions={{
            style: {
              background: '#1c1c1c',
              color: '#fff',
              border: '1px solid #333',
              textAlign: 'center',
              position: 'relative',
              top: '5rem',
            },
            success: {
              duration: 2000,
              iconTheme: { primary: '#10b981', secondary: '#fff' }
            },
            error: {
              duration: 2500,
              iconTheme: { primary: '#ef4444', secondary: '#fff' }
            }
          }} />
        <Routes location={locationState?.background || location}>
          <Route element={<Main />}>
            <Route index path='/' element={<Home />} />
            <Route path='/profile' element={
              <Suspense fallback={<Preloader />}>
                <Profile />
              </Suspense>
            } />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/catalog/:category' element={<Catalog />} />
            <Route path='/catalog/:category/:id' element={<CatalogItemDetails />} />
            <Route path='/reviews' element={<Reviews />} />
            <Route path='/reviews/:userId' element={
              <Suspense fallback={<Preloader />}>
                <UserProfileDetails />
              </Suspense>
            } />
            <Route path='/delivery' element={
              <Suspense fallback={<Preloader />}>
                <ProtectedRoute><Delivery /></ProtectedRoute>
              </Suspense>
            } />
            <Route path='/faq' element={
              <Suspense fallback={<Preloader />}>
                <FAQ />
              </Suspense>
            } />
            <Route path='/about' element={
              <Suspense fallback={<Preloader />}>
                <About />
              </Suspense>
            } />
            <Route path='/auth' element={
              <Suspense fallback={<Preloader />}>
                <GuestOnlyRoute><AuthModal /></GuestOnlyRoute>
              </Suspense>
            } />
            <Route path='*' element={
              <Suspense fallback={<Preloader />}>
                <Error />
              </Suspense>
            } />
          </Route>
        </Routes>
        {locationState?.background &&
          <Routes>
            <Route path='/auth' element={
              <Suspense fallback={<Preloader />}>
                <GuestOnlyRoute><AuthModal /></GuestOnlyRoute>
              </Suspense>
            } />
          </Routes>
        }
        <Footer />
      </div>
    </AppProviders>
  );
}

export default App;