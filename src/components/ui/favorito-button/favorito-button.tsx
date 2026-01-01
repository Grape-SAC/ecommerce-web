'use client';

import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import styles from './favorito-button.module.css';

type Props = {
    isFavorite: boolean;
    onToggle: () => void;
};

export default function FavoriteButton({ isFavorite, onToggle }: Props) {
    return (
        <button
            className={styles.favoriteButton}
            aria-label="Agregar a favoritos"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
            }}
        >
            {isFavorite ? (
                <HeartSolid width={20} color="#e11d48" />
            ) : (
                <HeartOutline width={20} color="#333" />
            )}

        </button>
    );
}
