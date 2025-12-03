'use client';

import { LoadingPage } from '@/components/ui/loading-page/loading-page';

export default function Loading() {
    return <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />;
}
