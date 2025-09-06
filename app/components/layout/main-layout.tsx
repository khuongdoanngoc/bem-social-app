import { Outlet } from 'react-router'
import { Sidebar } from '@/components/layout/sidebar'

export default function MainLayout() {
    return (
        <div
            className="min-h-screen flex bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url(/app/assets/imgs/background.jpg)',
            }}
        >
            {/* Blur overlay */}
            <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
            
            {/* Sidebar */}
            <div className="fixed left-0 top-0 z-10 w-80 h-screen">
                <Sidebar />
            </div>
            
            {/* Main content */}
            <div className="relative z-10 flex-1 ml-80 p-6">
                <div className="h-full bg-gray-900/90 border border-gray-700/50 backdrop-blur-md rounded-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
                    <div className="h-full p-6 overflow-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
