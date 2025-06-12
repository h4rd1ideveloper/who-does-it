'use client';
import React, { Suspense } from 'react';
import Resultados from '@/components/Resultados/Resultados';


export default function ResultadosPage() {

  return (<Suspense fallback={<div>Carregando parâmetros...</div>}>
      <Resultados />
    </Suspense>);
}
