import valueIcon from '@/assets/images/value.png';

export const CatalogCard = ({ name, price, imgSrc, onClick }) => (
  <div 
    className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-4 hover:border-neutral-600 transition-colors cursor-pointer"
    onClick={onClick} 
  >
    <div className="w-full aspect-square bg-black/30 rounded-xl flex items-center justify-center overflow-hidden">
      <img src={imgSrc} alt={name} className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105" />
    </div>
    <div className="mt-3 flex items-center justify-between text-white">
      <div className="flex flex-col">
        <h3 className="text-sm md:text-base font-semibold">{name}</h3>
        <span className="inline-flex items-center gap-1 text-gray-300 text-sm">
          {price}
          <img src={valueIcon} alt="value" className='w-[1rem] h-[1rem]'/>
        </span>
      </div>
      <button 
        className="px-3 py-2 rounded-lg cursor-pointer border border-white text-white hover:bg-white hover:text-black transition-all text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        Add
      </button>
    </div>
  </div>
);