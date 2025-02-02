import { useEffect } from 'react'
import { useUser } from '../../../context/UserContext'
import './Item.css'
export const ItemInternalTransfer = ({ item }) => {
    const { userData } = useUser()

    return (
        <div className='item-content'>
            <div className='item-segment'>
                <h3>
                    {userData?.userName == item.emisor ? item.userName : item.emisor}
                </h3>
                <p className='item-date'>{item.date} {item.hora}</p>
            </div>
            <div className='item-segment'>
                <p className='item-acotacion'>Amount</p>
                <h4 className={'elemento ' + (userData?.userName === item.emisor ? 'rojo':'verde')}>
                    {userData?.userName == item.emisor ? -item.cantidad
                        : item.cantidad} USDT
                </h4>
            </div>
            <div className='item-segment'>
                <p className='item-acotacion'>Wallet</p>
                <h4 className='elemento'>
                    {item?.status == 1 ? 'Dividend wallet' : 'Comission wallet'}
                </h4>
            </div>
        </div>
    )
}