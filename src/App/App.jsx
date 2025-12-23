import '../styles/style.css';
import {Footer, Header, Main} from '@/components/layouts/index';
import {Home, About, Catalog, Reviews, CatalogItemDetails, Delivery, FAQ} from '@/pages/index';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ScrollToTop} from '@/libs/utils/ScroollToTop'
import {DataProvider} from '../contexts/DataProvider'

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop behavior='smooth'/>
        <div className='flex flex-col justify-between'>
          <Header />
          <Routes>
            <Route element={<Main />}>
              <Route index path='/' element={<Home />} />
              <Route path='/catalog' element={<Catalog />} />
              <Route path='/catalog/:category/:id' element={<CatalogItemDetails />} />
              <Route path='/reviews' element={<Reviews />} />
              <Route path='/delivery' element={<Delivery />} />
              <Route path='/faq' element={<FAQ />} />
              <Route path='/about' element={<About />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App;


// можешь в отдельный файл накидать примерный план дизайна и содеражания страниц? Мне не нужна никакая бизнес-логика, связанныя с хуками и тд. Просто сделай дизайн, для всех страниц, которые считаешь нужнами. Повторюсь без бизнес логики и отдельной папкой с файлами, которые можно было подключить в App