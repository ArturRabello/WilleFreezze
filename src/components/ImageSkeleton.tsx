interface ImageSkeletonProps {
    width?: string;
    height?: string;
}

export function ImageSkeleton({ width = 'w-full', height = 'h-48' }: ImageSkeletonProps) {
    {/*Esse essqueleto serve para mostrar ao usuario que a imagem ainda nao foi carregada */}
    return (
        <div className={`${width} ${height} bg-gray-200 animate-pulse flex items-center justify-center rounded-lg`}>
            <span className="text-gray-400 text-sm font-medium">Loading...</span>
        </div>
    );
}