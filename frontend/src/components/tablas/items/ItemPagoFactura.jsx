export const ItemPagoFactura = ({ item }) => {
    return (
        <div className='item-content'>
            <div className='item-segment'>
                <h3>
                    {item.emisor}
                </h3>
                <p className='item-date'>{item.date} {item.hora}</p>
            </div>
            <div className='item-segment'>
                <p className='item-acotacion'>Amount</p>
                <h4 className={'elemento '}>{item.monto} USDT</h4>
            </div>
            <div className='item-segment'>
                <p className='item-acotacion'>Total amount</p>
                <h4 className={'elemento '}>{item.montoMax} USDT</h4>
            </div>
            <div className='item-segment'>
                <p className='item-acotacion'>Wallet</p>
                <h4 className='elemento'>
                    {item?.wallet == 1 ? 'Dividend wallet' : item?.wallet == 2 ? 'Comission wallet' : 'Corporate credit'}
                </h4>
            </div>
        </div>
    )
}