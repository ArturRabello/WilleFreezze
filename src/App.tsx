import React from "react";
import AppRoutes from "./routes/AppRoutes";
import './index.css';
import { LayoutProvider} from "./context/LayoutContext";
import { SearchProvider } from "./context/SearchContext";
import { ImageProvider} from "./context/image/ImageContext";   


//Provieder e routes
function App(){
  return(
    <div className="">
      <React.StrictMode>
        <LayoutProvider>
          <ImageProvider>
          <SearchProvider>
            <AppRoutes/>
          </SearchProvider>
          </ImageProvider>
        </LayoutProvider>
    </React.StrictMode>
    </div>
    
  );
}


export default App