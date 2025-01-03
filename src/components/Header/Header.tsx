'use client';

import React, { useState } from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchTerm.trim() !== '') {
            router.push(`/search/${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <header className="bg-white shadow-md p-4">
            <div className={styles.container}>
                <div className={styles.logoContent}>
                    <Image
                        src="/Logo.webp"
                        alt="Logo de Ecommerce"
                        className="h-10"
                        width={40}
                        height={40}
                    />
                </div>
                <div className={styles.searchContent}>
                    <MagnifyingGlassIcon  className={styles.icon} />
                    <input
                        type="text"
                        placeholder="Buscar producto"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>

            {/* Segunda fila: Categorías de productos 
            <nav className="bg-gray-100 p-2">
                <ul className="flex space-x-6">
                    <li><a href="/categoria/electronica" className="text-gray-700 hover:text-blue-600">Electrónica</a></li>
                    <li><a href="/categoria/ropa" className="text-gray-700 hover:text-blue-600">Ropa</a></li>
                    <li><a href="/categoria/juguetes" className="text-gray-700 hover:text-blue-600">Juguetes</a></li>
                    <li><a href="/categoria/beauty" className="text-gray-700 hover:text-blue-600">Belleza</a></li>
                </ul>
            </nav>*/}
        </header>
    );
};

export default Header;
