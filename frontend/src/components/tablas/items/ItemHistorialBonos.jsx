//import './Item.css';
import './ItemHistorialBonos.css';
import { useUser } from '../../../context/UserContext';

export const ItemHistorialBonos = ({ item }) => {
  const { userData } = useUser();

  return (
    <div className="item-content">
      <div className="item-header">
        <div className="item-column">
          <p className="item-title">Monto</p> 
          <div className="item-value">{item.monto}</div>
        </div>
{/*         <div className="item-column">
          <p className="item-title">Concepto</p>
          <div className="item-value">{item.emisor}</div>
        </div> */}
        <div className="item-column">
          <p className="item-title">Fecha</p>
          <div className="item-value">{item.fecha}</div>
        </div>
        <div className="item-column">
          <p className="item-title">Hora</p>
          <div className="item-value">{item.hora}</div>
        </div>
        <div className="item-column">
          <p className="item-title">Emisor</p>
          <div className="item-value">{item.emisor}</div>
        </div>
      </div>
    </div>
  );
};
