import React,{useEffect}  from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'


const items = [
    { rota: "/dashboard/banners", icone: (<i className="fas fa-copy" />), titulo: "Banners" },
    { rota: "/dashboard/fdi", icone: (<i className="fas fa-book-open" />), titulo: "FDI - Demais Cursos" },
    { rota: "/dashboard/fdi_medicina", icone: (<i className="fas fa-book-open" />), titulo: "FDI - Medicina" },
    { rota: "/dashboard/consultor", icone: (<i className="fas fa-clone" />), titulo: "Consultor" },
    /*   { rota: "/categorias", icone: (<i className="fas fa-clone" />), titulo: "Categorias" },
      { rota: "/produtos", icone: (<i className="fas fa-boxes" />), titulo: "Produtos" },
      { rota: "/configuracoes", icone: (<i className="fas fa-cog" />), titulo: "Configurações" },
      { rota: "/perfil", icone: (<i className="fas fa-user" />), titulo: "Perfil" }, */
]

const ListItems = ({ open, history }) => {
    const router = useRouter()
    useEffect(()=>{
        document.title="CMS Vestibular UNIFTC"
      },[])
    const localAtual = router.pathname;
    return (
        <div className="items-wrapper">
            <img src={'/imagens/logoInterno.svg'} />
            {items.map((item, index) => {
                return (
                    <Link key={index} href={item.rota} className="LinkMenu">
                        <div className={`menu-item ${ localAtual === item.rota ? "menu-item-active" : "" } flex horizontal`}>
                            
                        { 
                                open && 
                                (
                                    <div className="flex-2 flex flex-start">
                                        <span>{item.titulo}</span>
                                    </div>
                                )
                            }
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default ListItems