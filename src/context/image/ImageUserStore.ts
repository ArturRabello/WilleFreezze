//Store de funções para armazenamento de imagens no IndexedDB

//interface 
interface idImages{
    userId: string;
    file: string;
}

// Função para salvar imagem no IndexedDB
export async function saveUserImage(userId: string, file: string) {
    const db = await createImageDB();
    return new Promise<void>((resolve, reject) => {
        try{
            const tx = db.transaction("user_images", "readwrite");
            const store = tx.objectStore("user_images");
            const putRequest = store.put(file, userId);
            
            putRequest.onsuccess = () => resolve()
            putRequest.onerror = () => reject(new Error("Erro ao salvar imagem no IndexedDB."));
        }catch(e){
            console.error("Erro ao salvar imagem no IndexedDB:", e);
        }

    })
}

// função para obter imagem do IndexedDB
export async function getUserImage(userId: string) {
    const db = await createImageDB();
    return new Promise<void>((resolve, reject) => {
            const tx = db.transaction("user_images", "readonly");
            const store = tx.objectStore("user_images");
            const getRequest = store.get(userId);

            getRequest.onsuccess = () => resolve(getRequest.result || null);
            getRequest.onerror = () => reject(new Error("Erro ao obter imagem do IndexedDB."));
    }) 
}

//função para deletar imagem do IndexedDB
export async function deleteUserImage(userId: string){
    const db = await createImageDB();
    return new Promise<void>((resolve, reject) => {
        const tx = db.transaction("user_images", "readwrite");
        const store = tx.objectStore("user_images");
        store.delete(userId);

        tx.oncomplete = () => resolve(); // aguarda transação completa
        tx.onerror = () => reject(new Error("Erro ao deletar imagem do IndexedDB."));
        tx.onabort = () => reject(new Error("Transaction abortada ao deletar imagem."));
    });
}

// Função para verificar se uma string eh uma Base64
export function isBase64(str: string): boolean {
    return /^data:image\/[a-zA-Z]+;base64,/.test(str);
}

// Função para converter URL para Base64
export async function urlToBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// Função para converter Base64 para Blob
export function base64ToBlob(base64: string): Blob {
    const [header, data] = base64.split(',');
    const contentType = header.match(/:(.*?);/)?.[1] || '';
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
}

// Função para criar o IndexedDB
export async function createImageDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("imagesDB", 1);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains("user_images")) {
                db.createObjectStore("user_images");
            }
        };
        request.onsuccess = () =>{
            resolve(request.result);
            console.log("IndexedDB aberto com sucesso.");
        }
        request.onerror = () => {
            reject(new Error("Erro ao abrir o IndexedDB."));
            console.error("Erro ao abrir o IndexedDB.");
        } 

    })
}

// Função para contar a quantidade de imagens no IndexedDB
export async function countStoredImages(): Promise<number> {
    const db = await createImageDB();
    return new Promise<number>((resolve, reject) => {
        const tx = db.transaction("user_images", "readonly");
        const store = tx.objectStore("user_images");
        const request = store.count()

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);

    });
}
// Função para obter todas as imagens do IndexedDB
export async function getAllStoredImages(): Promise<idImages[]> {
    const db = await createImageDB();
    return new Promise<idImages[]>((resolve, rejected) => {
        const tx = db.transaction("user_images", "readonly");
        const store = tx.objectStore("user_images");
        const request = store.getAllKeys();

        request.onsuccess = async () => {
            const keys = request.result as string[];
            const images: idImages[] = [];

            for (const key of keys) {
                const getRequest = store.get(key);

                await new Promise<void>((res, rej) => {
                    getRequest.onsuccess = () => {
                        images.push({
                            userId: key,
                            file: getRequest.result as string,
                        });
                        res();
                    };
                    getRequest.onerror = () => rej(getRequest.error);
                });
                
            }
            resolve(images);
        };

        request.onerror = () => rejected(request.error);
    })
}
