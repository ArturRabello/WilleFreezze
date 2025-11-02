import { createContext, useState, useContext, useEffect} from "react";
import { saveUserImage, deleteUserImage, urlToBase64, isBase64, countStoredImages, getAllStoredImages } from "./ImageUserStore";

// context relacionado a armazenamento de imagens

// interface composta por funções passadas ao context
interface ImageContextType { 
    saveImage: (userId: string, file: string) => Promise<void>;
    getImage: (userId: string ) => Promise<string | undefined>;
    deleteImage: (userId: string) => Promise<void>;
    getAllImages : () => Promise<void>;
    imagesDone: Record<string, string>;
    initialState: () => Promise<void>;
}

//interface do tipo de dados do objeto armazenado, no caso, id e imagem
interface idImages{
    userId: string;
    file: string;
}

// criando o context
export const ImageContext = createContext<ImageContextType | null>(null);

//função que verifica se o context foi criado, se sim o retorna 
export const useImage = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImage must be used within a ImageProvider');
    }
    return context;
}

// Componente composto por funções context
export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  
    const [idImages, setIdImages] = useState<idImages[]>([]); // lista composta de id e imagem
    const [imagesDone, setImagesDone] = useState<Record<string, string>>({}); // coleção de imagens carregadas

    // Função para carregar as imagens do IndexedDB
    const initialState = async () => {
        //pega os dados dos produtos do json
        const serializedImagesJson = await import('../../jsons/Products.json');

        // verifica a quantidade de imagens armazenadas no indexedDB
        const count = await countStoredImages();

        // se a quantidade for 0, carrega as imagens do json, se não, carrega as imagens do indexedDB
        // as imagens serão salvas 
        if (count === 0) {
            const products = serializedImagesJson.default;
            //a imagem é convertida para base64
            const idImagesFromJson: idImages[] = await Promise.all(products.flatMap((type: any) =>
                type.flavers.map(async(item: any) => ({
                    userId: item.id,
                    file: isBase64(item.img) ? item.img : await urlToBase64(item.img),
                }))
            ));
            try {
                for (const img of idImagesFromJson) {
                    await saveUserImage(img.userId, img.file);
                }
                setIdImages(idImagesFromJson);
                console.log("Imagens carregadas do JSON com sucesso.");
                } catch (e) {
                    console.error("Erro ao carregar imagens do JSON para o IndexedDB:", e);
                }
        } else {
            const imageFromDB = await getAllStoredImages();
            setIdImages(imageFromDB);
        }
    }


    // salva a imagem 
    const saveImage = async (userId: string, file: string) => {
        //verifica se a imagem está na base64, caso não, ela é convertida
        try {
            let base64File = file;
            if (!isBase64(file)) {
                base64File = await urlToBase64(file);
            }
            // salva a imagem no IndexedDB
            await saveUserImage(userId, base64File);
            // atualiza a lista de imagens
            setIdImages([...idImages, { userId: userId, file: base64File }]);
            console.log("Imagem salva com sucesso no IndexedDB.");
        } catch (error) {
            if (error instanceof Error) {
                console.error("Erro ao salvar imagem no IndexedDB:", error.message);
            } else {
                console.error("Erro desconhecido ao salvar imagem no IndexedDB:", error);
            }
        }
    }
    // pega a imagem direto do indexedDB
    const getImage = async (userId: string) => {
        try{
            const item = idImages.find((i) => i.userId === userId);
            if (!item) return undefined;
            console.log("Imagem obtida com sucesso do IndexedDB.");
            
        }catch (error) {
            if(error instanceof Error){
                const message = error.message;
                console.error("Erro ao obter imagem no IndexedDB:", message);
            } else {
                console.error("Erro desconhecido ao obter imagem no IndexedDB:", error);
            }
        }
    }

    // pega todas as imagens do indexedDB.
    // cria um objeto com as imagens e os ids.
    // esse objeto é adicionado a uma coleção.
    const getAllImages = async () => {
        const urls: Record<string, string> = {};
        for (const item of idImages) {
            urls[item.userId] = item.file;
           
        }
        setImagesDone(urls);
    }

    // Remove a imagem do indexedDB e do estado das listas de imagem
    const deleteImage = async (userId: string) => {
        try{
            await deleteUserImage(userId);
            console.log(userId);
            setIdImages(idImages.filter((item) => item.userId !== userId));
            console.log("Imagem deletada com sucesso do IndexedDB.");
        } catch (error) {
            if(error instanceof Error){
                const message = error.message;
                console.error("Erro ao deletar imagem no IndexedDB:", message);
            } else {
                console.error("Erro desconhecido ao deletar imagem no IndexedDB:", error);
            }
        }

    }

    // atualiza as imagens quando o estado das imagens mudar
    useEffect(() => {
        getAllImages();
        console.log("Atualizando todas as imagens no contexto de imagem.");
    }, [idImages]);

    return(
        <ImageContext.Provider 
            value={{saveImage, getImage, deleteImage, initialState, getAllImages, imagesDone}}>
        {children}
        </ImageContext.Provider>
    )
}