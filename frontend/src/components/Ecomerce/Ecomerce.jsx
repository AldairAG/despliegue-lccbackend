import React from 'react';
import slide_image_1 from '../../Assets/Images/Baners_jpg/ec1.png';
import slide_image_2 from '../../Assets/Images/Baners_jpg/ec2.png';
import slide_image_3 from '../../Assets/Images/Baners_jpg/ec3.png';
import "./Ecomerce.css"



const Ecomerce = () => {

    return (
        <section className="seccion-Ecomerce">
            <div className="divTitulo">
                <h2>E-comerce</h2>
                <span>Available only for Mexico and the United States</span>
            </div>
            <div className='imgContent'>
                <img src={slide_image_3} alt="img1" />
                <img src={slide_image_2} alt="img1" />
                <img src={slide_image_1} alt="img1" />
            </div>
        </section>
    )
}

export default Ecomerce