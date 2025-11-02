import React, { useContext, useEffect } from "react";
import plusAddImages from "../../assets/plusAddImages.svg";
import removeModal from "../../assets/removeModal.svg";
import { LayoutContext } from "../../context/LayoutContext";

type imagemModalOpen = {
        setModalUploadImage: (value: boolean) => void;
        setImages: (value: string[]) => void;
        images: string[]
    };

function ModalUploadImage({setModalUploadImage, setImages, images}: imagemModalOpen, ) { 
    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);

    // Verifica se as imagens foram carregadas, se sim fecha o modal
    useEffect(() => {
        if(images.length > 0) {
            setModalUploadImage(false);
        }
    }, [images, setModalUploadImage]);

    // caso o a imagem seja arrastada, ela é convertida para base64
    const readFile = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (typeof reader.result === "string") {
                    resolve(reader.result);
                } else {
                    reject(new Error("Erro: resultado da leitura não é uma string."));
                }
            };

            reader.onerror = () => {
                reject(new Error("Erro ao ler o arquivo: "));
            };

            reader.readAsDataURL(file);
        });
    }
   
    // Função para selecionar imagens
    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const fileList = e.target.files;
        if (!fileList) return;

        const files = Array.from(fileList);
        //filtra do array apenas as imagens
        const imageFiles = files.filter((file) => file.type.startsWith("image/"));
        // converte as imagens para base64
        const base64Images = await Promise.all(imageFiles.map(readFile));
        //adiciona as imagens ao array
        setImages([...images, ...base64Images]);
    };

    // Função para arrastar imagens
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const files = Array.from(e.dataTransfer.files);
        //filtra do array apenas as imagens
        const imageFiles = files.filter((file) => file.type.startsWith("image/"));

        if(imageFiles.length === 0) return;

        try{
            // converte as imagens para base64
            const base64Images = await Promise.all(imageFiles.map(readFile));
            //adiciona as imagens ao array
            setImages([...images, ...base64Images]);
        } catch (e) {
            console.log("Erro ao converter imagens: ", e);
        }
    }

    return(
        <div className={`fixed inset-0 z-[10] bg-gray-500/30 }`}>
                    <div className={`fixed grid ${isMobile ? 'grid-cols-[240px_1fr]' : 'grid-cols-[560px_1fr]'}
                             bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  
                                ${isDesktop ? ' w-[700px] h-[400px]' : isTablet ? 'w-[700px] h-[400px]' : 'w-[280px] h-[200px]'} 
                                    z-[20] rounded-[12px] shadow-2xl`}>
                        {/* icone de fechar */ }
                        <div className="flex items-center justify-center row-start-1 col-start-2 ">
                            <img src={removeModal} onClick={() => setModalUploadImage(false)} className="w-[50px] h-[50px]"></img>
                        </div>
                        {/* titulo */ }
                        <div 
                            className={`flex items-center justify-center row-start-1 col-start-1 ${isMobile ? '' : 'pl-[140px] '}`}>
                            <h1 className={`${isMobile ? 'text-[16px]' : 'text-[24px] '} font-semibold text-center`}>Arraste suas imagens aqui ou clique para selecionar</h1>
                        </div>
                        {/* area de arrastar imagens */ }
                        <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} onClick={() => document.getElementById('fileInput')?.click()}
                            className={`flex items-center justify-center place-self-center row-start-2 col-span-2 
                            ${isMobile ? 'w-[260px] h-[120px]' : isTablet ? 'w-[420px] h-[210px]' : 'w-[420px] h-[210px]'}
                                border-4 border-[#9E9E9E]/50 rounded-[12px] bg-white`}
                            >
                            <img src={plusAddImages}  className={`w-[54px] h-[54px] `}></img>
                            <input type="file" id="fileInput" accept="image/*" multiple onChange={handleFileSelect} className="hidden"/>
                        </div>
                    </div>
                </div>
    )
}

export default ModalUploadImage