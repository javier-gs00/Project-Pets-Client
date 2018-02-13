import React from 'react'
import { Link } from 'react-router-dom'

const StoreSingle = props => {
    let store = props.store
    // Create tags list
    let tags = []
    if (store.veterinary) tags.push('Veterinaria')
    if (store.urgency) tags.push('Urgencia')
    if (store.grooming) tags.push('Peluquería')
    if (store.physical_store) tags.push('Tienda')
    if (store.product_shipping) tags.push('Envíos')
    return (
        <div className="store-container">
            <div className="store-image">
                <Link to={{
                    pathname: `tiendas/${store.name}`,
                    state: { store: store }
                }}>
                    <img src={store.image_url} alt={store.name + ' imagen no encontrada'}/>
                </Link>
            </div>
            <div className="store-data">
                <div className="store-data-block">
                    <Link to={{
                        pathname: `tiendas/${store.name}`,
                        state: { store: store }
                    }}>
                        <span className="store-name">{store.name}</span>
                    </Link>
                </div>
                <div className="store-data-block">
                    {tags.map((tag, index) => <span key={index}>{tag}</span>)}                    
                </div>
            </div>
        </div>
    )
}

export default StoreSingle