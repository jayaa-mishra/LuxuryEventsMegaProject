import { ImgHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  unoptimized?: boolean;
  priority?: boolean;
}

export default function Image({ src, alt, fill, unoptimized, className, ...props }: ImageProps) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={clsx(fill && "absolute inset-0 w-full h-full object-cover", className)} 
      {...props} 
    />
  );
}
