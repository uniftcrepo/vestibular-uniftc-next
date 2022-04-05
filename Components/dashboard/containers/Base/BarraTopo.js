import React from 'react';

const BarraTopo = ({ signOut }) => (
    <div className="Barra-Topo flex horizontal full-width">
        <div className="flex-1 flex flex-start">
            <a href="/">Gerenciamento de Conteúdo - Vestibular</a>
        </div>
        <div className="flex-1 flex flex-end Sair">
            <span onClick={() => signOut()}>Sair</span>
        </div>
    </div>
)

export default BarraTopo;