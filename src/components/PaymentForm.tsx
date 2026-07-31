"use client";

import Mascot from './Mascot';
import Image from 'next/image';
import { useState, useRef } from 'react';

export default function PaymentForm() {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        if (file.size > 1024 * 1024) {
            alert("Ukuran file maksimal 1 MB!");
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Hanya boleh upload gambar!");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    };

    return (
        <section className="w-full max-w-[420px] mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 flex flex-col items-center relative shadow-2xl">
            <div className="absolute -left-[250px] -top-[80px] scale-[0.55] z-50">
                <Mascot pose="happy" tilt={-15} />
            </div>

            <h1 className="text-xl font-bold tracking-[0.25em] mb-8 text-white relative z-10">
                PAYMENT
            </h1>

            <div className="w-full aspect-[4/5.5] bg-white rounded-xl mb-8 relative z-10 overflow-hidden flex items-center justify-center p-2">
                <Image
                    src="/QRIS.jpeg"
                    alt="QRIS Barcode"
                    fill
                    className="object-cover rounded-xl scale-[1]"
                />
            </div>

            <div className="w-full mb-8 flex flex-col items-center relative z-10">
                <div className="bg-gradient-to-b from-[#1c234a] to-[#0c102a] w-full py-3 text-center rounded-t-xl text-[11px] font-bold tracking-wider border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white z-10">
                    UPLOAD THE PROOFING PAYMENT
                </div>

                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                    }}
                />

                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFile(file);
                    }}
                    className="bg-[#e5e7eb] w-full h-28 rounded-b-xl flex flex-col items-center justify-center text-[#8e8e8e] -mt-1 cursor-pointer hover:bg-[#d1d5db] transition-colors overflow-hidden relative"
                >
                    {preview ? (
                        <Image
                            src={preview}
                            alt="Proof preview"
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <>
                            <span className="text-3xl mb-1">+</span>
                            <span className="text-[10px] uppercase font-medium">Upload or drag the proof here</span>
                        </>
                    )}
                </div>
            </div>

            <button className="bg-gradient-to-b from-[#1c234a] to-[#0c102a] w-[70%] py-3.5 rounded-full text-sm font-bold tracking-[0.2em] border border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.3)] text-white hover:scale-105 transition-transform relative z-10">
                SUBMIT
            </button>
        </section>
    );
}
