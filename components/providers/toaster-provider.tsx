"use client";

import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
    return (
        <Toaster
            position="top-left"
            reverseOrder={false}
            toastOptions={{
                style: {
                    textAlign: 'right',
                    direction: 'rtl',
                },
            }}
        />
    )
}