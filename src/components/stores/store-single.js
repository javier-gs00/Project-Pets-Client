import React from 'react'

const StoreSingle = props => {
    let store = props.store
    // Create tags list
    let tags = []
    if (store.veterinary) tags.push('Veterinaria')
    if (store.urgencia) tags.push('Urgencia')
    if (store.grooming) tags.push('Peluquería')
    if (store.physical_store) tags.push('Tienda')
    if (store.product_shipping) tags.push('Envíos')
    return (
        <div className="store-container">
            <div className="store-image">
                <img src={store.image_url} alt={store.name + ' image no encontrada'}/>
            </div>
            <div className="store-data">
                <div className="store-data-block">
                    <span className="store-name">{store.name}</span>
                </div>
                <div className="store-data-block">
                    {tags.map((tag, index) => <span key={index}>{tag}</span>)}                    
                </div>
            </div>
        </div>
    )
}

export default StoreSingle