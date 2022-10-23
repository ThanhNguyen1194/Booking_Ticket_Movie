import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import hinhAnh from '../../../../assets/img/banTayDietQuy.jpg'

// import axios from 'axios'
import { getCarouselAction } from '../../../../redux/actions/CarouselActions';
import './HomeCarousel.css';

const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    // backgroundSize: 'cover',
    backgroundColor: black,
    backgroundRepeat: 'no-repeat',

};

const bannerImage = [{ hinhAnh: "" }]

export default function HomeCarousel(props) {

    const { arrImg } = useSelector(state => state.CarouselReducer)

    const dispatch = useDispatch();

    //Sẽ tự kích hoạt khi component load ra 
    useEffect(() => {

        //1 action = {type:'',data}
        //2 (phải cài middleware): callBackFunction (dispatch)

        // const action = getCarouselAction(1);

        dispatch(getCarouselAction());



    }, [dispatch])


    const renderImg = () => {
        return arrImg.map((item, index) => {
            return <div key={index}>
                {/* <div style={{ ...contentStyle, backgroundImage: `url(${hinhAnh})` }}>
                    <img src={hinhAnh} className="opacity-0" alt={"./img/banTayDietQuy.jpg"} />
                </div> */}
                <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                    <img src={item.hinhAnh} className="opacity-0" alt={item.hinhAnh} />
                </div>
            </div>
        })
    }

    return (

        <Carousel autoplay effect="fade" style={{ width: '100%', padding: 0, margin: 0 }} >
            {renderImg()}

        </Carousel>

    )
}