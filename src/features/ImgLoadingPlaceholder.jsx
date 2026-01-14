import { useState } from "react";
import { Loader2 } from "lucide-react";

export const ImgLoadingPlaceholder = ({ src, alt, className, loading = "lazy" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 bg-transparent flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-neutral-600 animate-spin" />
        </div>
      )}
      
      <img 
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};