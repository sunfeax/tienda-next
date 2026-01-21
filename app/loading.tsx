import spinergif from '@/public/loader.gif';
import Image from 'next/image';

const MainLoading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background">
            <Image 
                src={spinergif} 
                alt="loading..." 
                width={100} 
                height={100} 
                className="object-contain"
            />
        </div>
    );
};

export default MainLoading;