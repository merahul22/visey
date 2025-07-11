'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';

interface ImageCropperProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string) => void;
  aspectRatio?: number;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  isOpen,
  onClose,
  imageSrc,
  onCropComplete,
  aspectRatio = 5 / 3, // Default banner aspect ratio (250/150)
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Reset error state when imageSrc changes
  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    // Handle cases where the image might not have loaded properly
    try {
      const { width, height } = e.currentTarget;
      
      if (!width || !height) {
        console.error("Image has zero width or height on load");
        return;
      }
      
      // Set initial crop to center with correct aspect ratio
      const cropWidth = Math.min(90, (height * aspectRatio) / width * 100);
      const cropHeight = Math.min(90, width / aspectRatio / height * 100);
      
      setCrop({
        unit: '%',
        width: cropWidth,
        height: cropHeight,
        x: (100 - cropWidth) / 2,
        y: (100 - cropHeight) / 2,
      });
    } catch (error) {
      console.error("Error on image load:", error);
    }
  }, [aspectRatio]);

  const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: PixelCrop): Promise<string> => {
      return new Promise((resolve, reject) => {
        // Check if the image is loaded correctly
        if (!image.complete || !image.naturalWidth || !image.naturalHeight) {
          console.error("Image not properly loaded:", image);
          reject(new Error('Image not properly loaded or has zero dimensions'));
          return;
        }

        try {
          // Try to use the original image first if it's already CORS-friendly
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
    
          if (!ctx) {
            reject(new Error('No 2d context'));
            return;
          }
    
          const scaleX = image.naturalWidth / image.width;
          const scaleY = image.naturalHeight / image.height;
    
          canvas.width = crop.width;
          canvas.height = crop.height;
    
          // Draw the cropped image to the canvas
          ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
          );
    
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Canvas is empty'));
              return;
            }
            
            // Create a blob URL - note that these URLs need to be revoked
            // after use to avoid memory leaks, but we're letting the 
            // PostFundingOpportunity component handle that since it will
            // upload this blob to permanent storage
            const url = URL.createObjectURL(blob);
            resolve(url);
          }, 'image/jpeg', 0.9);
        } catch (error) {
          console.error("First attempt to crop failed, trying with proxy:", error);
          
          // If direct approach fails due to CORS, use a proxy or data URL approach
          const tempImg = new Image();
          tempImg.crossOrigin = "anonymous";
          
          tempImg.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              if (!ctx) {
                reject(new Error('No 2d context'));
                return;
              }
              
              // Create a new canvas with the entire image first
              canvas.width = tempImg.naturalWidth;
              canvas.height = tempImg.naturalHeight;
              ctx.drawImage(tempImg, 0, 0);
              
              // Get the image data to create a new clean canvas (this breaks any CORS taint)
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              canvas.width = crop.width;
              canvas.height = crop.height;
              
              // Calculate scale if needed
              const scaleX = tempImg.naturalWidth / tempImg.width;
              const scaleY = tempImg.naturalHeight / tempImg.height;
              
              // Reset the canvas for the cropped portion
              ctx.putImageData(
                imageData, 
                -crop.x * scaleX, 
                -crop.y * scaleY
              );
              
              canvas.toBlob((blob) => {
                if (!blob) {
                  reject(new Error('Canvas is empty'));
                  return;
                }
                const url = URL.createObjectURL(blob);
                resolve(url);
              }, 'image/jpeg', 0.9);
            } catch (error) {
              console.error("Final crop attempt failed:", error);
              reject(error);
            }
          };
          
          tempImg.onerror = () => {
            reject(new Error('Error loading image for cropping'));
          };
          
          if (image.src.startsWith('data:') || image.src.startsWith('blob:')) {
            tempImg.src = image.src;
          } else {
            // For external images, use our proxy API
            tempImg.src = `/api/proxy-image?url=${encodeURIComponent(image.src)}`;
          }
        }
      });
    },
    []
  );

  const handleCropComplete = useCallback(async () => {
    if (completedCrop && imgRef.current) {
      try {
        const croppedImageUrl = await getCroppedImg(imgRef.current, completedCrop);
        onCropComplete(croppedImageUrl);
        onClose();
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    }
  }, [completedCrop, getCroppedImg, onCropComplete, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Crop Banner Image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
              minWidth={50}
              minHeight={50}
            >
                      {/* We need to use img instead of Next.js Image here because ReactCrop requires a standard img element */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={imageSrc || 'https://res.cloudinary.com/dlriuadjv/image/upload/v1729353205/xbbb0zw6js60dxnq64qj.png'} 
                alt="Crop preview"
                onLoad={onImageLoad}
                onError={() => {
                  console.error("Image failed to load:", imageSrc);
                  setImageError(true);
                  toast.error("Failed to load image. Please try again or use a different image.");
                }}
                crossOrigin="anonymous" 
                style={{ maxWidth: '100%', maxHeight: '60vh' }}
              />
            </ReactCrop>
          </div>
          <div className="flex justify-center gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleCropComplete} 
              disabled={!completedCrop || imageError}
            >
              Apply Crop
            </Button>
          </div>
          {imageError && (
            <div className="text-center text-red-500 text-sm">
              There was a problem loading the image. Please try a different image.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
