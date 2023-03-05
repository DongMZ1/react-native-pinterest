import { useState, useEffect } from "react";
import {Image} from 'react-native'
//unit test failed link to issue https://github.com/facebook/react-native/issues/35518
export const useImageAspectRatio = (imageUrl: string) => {
    const [aspectRatio, setAspectRatio] = useState(1);
  
    useEffect(() => {
      if (!imageUrl) {
        return;
      }
  
      let isValid = true;
      Image.getSize(imageUrl, (width, height) => {
        if (isValid) {
          setAspectRatio(width / height);
        }
      });
  
      return () => {
        isValid = false;
      };
    }, [imageUrl]);
  
    return aspectRatio
  }