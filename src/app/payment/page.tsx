import PaymentForm from '@/components/PaymentForm';
import Background from '@/components/Background';
import LogoUpright from '@/components/LogoUpright';

export default function PaymentPage() {
    return (
        <main className="min-h-screen relative overflow-x-hidden flex flex-col items-center justify-center font-sans p-6 text-white">
            <Background />

            <header className="absolute top-6 w-full max-w-5xl flex justify-between items-start z-20 px-6 sm:px-8">
                <div className="w-28 sm:w-36 mt-2">
                    <LogoUpright className="w-full h-auto" />
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="font-bold text-sm uppercase tracking-wide">Welcome John Doe!</p>
                        <p className="text-[10px] text-gray-300">Lorem ipsum dolor sit amet</p>
                    </div>
                    <div className="w-12 h-12 bg-[#3f3f3f] rounded-full"></div>
                </div>
            </header>

            <div className="relative z-10 w-full flex justify-center mt-20">
                <PaymentForm />
            </div>
        </main>
    );
}
