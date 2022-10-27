import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
//Kết nối redux
import { useSelector, useDispatch } from 'react-redux'
import Film from '../../components/Film/Film';
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick'
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapActions';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';

export default function Home(props) {

    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const {heThongRapChieu} = useSelector(state => state.QuanLyRapReducer);

    // const userLogin = localStorage.getItem('USER_LOGIN');
    const dispatch = useDispatch();
    // console.log('propsHome', arrFilm);
   
    useEffect(()=>{
        // console.log('renderFilms', arrFilm);
        const action = layDanhSachPhimAction();
        dispatch(action); //dispatch function từ thunk

        dispatch(layDanhSachHeThongRapAction());

    },[])
    
    return (
        <div>
            <HomeCarousel />

            <section className="text-gray-600 body-font" >
                <div className="container px-5 py-24 mx-auto " >

                    <MultipleRowSlick arrFilm={arrFilm}/>
                </div>
            </section>

            <div className="mx-36" style={{width:"90%",margin:"10px auto"}}>
                <HomeMenu  heThongRapChieu={heThongRapChieu}/>

            </div>
        </div>
    )
}