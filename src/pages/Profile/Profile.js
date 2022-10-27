import React from 'react'
import { Tabs } from 'antd';
import backgroundImage from '../../assets/img/backgroundImg.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Input, Select } from 'antd';
import { capNhatThongTinNguoiDungActions, LayDanhSachLoaiNguoiDungAction, themNguoiDungActions, timKiemUserActions } from '../../redux/actions/QuanLyNguoiDungAction';
import { quanLyNguoiDungService } from '../../services/QuanLyNguoiDung';
import { useState } from 'react';
import { GROUPID } from '../../util/settings/config';
import _ from 'lodash';
import moment from 'moment';
import { history } from '../../App';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 8,
    },
};
export default function Profile(props) {
    const dispatch = useDispatch()
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { thongTinDatVe } = thongTinNguoiDung
    // console.log(thongTinNguoiDung)


    const { loaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)


    const onChange = (key) => {
        // console.log(key);
    };

    useEffect(() => {
        if(!localStorage.getItem("USER_LOGIN")){
            history.push("/login")
        }
        dispatch(layThongTinNguoiDungAction())
        dispatch(LayDanhSachLoaiNguoiDungAction());

    }, [])

    const user = thongTinNguoiDung
    // console.log('userDetail' , user);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: user?.taiKhoan,
            matKhau: user?.matKhau,
            email: user?.email,
            soDt: user?.soDT,
            maNhom: GROUPID,
            hoTen: user?.hoTen,
            maLoaiNguoiDung: user?.loaiNguoiDung === "Quản trị" ? "QuanTri" : "KhachHang",
        },
        onSubmit: (values) => {
            // const action = themNguoiDungActions(values);
            if (window.confirm('Bạn có chắc muốn cập nhật tài khoản ' + values.taiKhoan)) {
                //Gọi action
                dispatch(capNhatThongTinNguoiDungActions(values));
            }

            // console.log('values', values);
        },
        validationSchema: yup.object({
            taiKhoan: yup.string()
                .min(6, "Mininum 6 characters")
                .max(32, "Maximum 32 characters")
                .required("Required!"),
            matKhau: yup.string()
                .min(6, "Mininum 6 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),
            email: yup.string()
                .email("Invalid email format")
                .required("Required!"),
            soDt: yup.string()
                .min(6, "Mininum 6 characters")
                .max(12, "Maximum 12 characters")
                .required("Required!"),
            maNhom: yup.string()
                .min(4, "Mininum 4 characters")
                .max(4, "Maximum 4 characters")
                .required("Required!"),
            hoTen: yup.string()
                .min(6, "Mininum 6 characters")
                .max(32, "Maximum 32 characters")
                .required("Required!"),
            maLoaiNguoiDung: yup.string()
                .required("Required!"),
        })
    });
    const renderUserDetails = () => {
        return (

            <form onSubmit={formik.handleSubmit} className=' ' >
                <div className="mt-10 mb-10 px-12 sm:px-24 md:px-48 lg:px-12  xl:px-24 ">
                    <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold">Thông Tin Người Dùng</h2>
                    <div className="mt-10">
                        <div className='grid grid-cols-2 gap-x-10'>
                            <div className="mt-2">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Tài Khoản
                                    </div>
                                </div>
                                <input disabled name="taiKhoan" style={{ paddingLeft: '10px' }} onChange={formik.handleChange} value={formik.values.taiKhoan} className="w-full mt-2  text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào tài khoản" />
                                {formik.errors.taiKhoan && formik.touched.taiKhoan ?

                                    <p className='text-red-500'>{formik.errors.taiKhoan}</p> : ''
                                }
                            </div>
                            <div className="mt-2">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Mật khẩu
                                    </div>
                                </div>
                                <input name="matKhau" style={{ paddingLeft: '10px' }} onChange={formik.handleChange} value={formik.values.matKhau} className="w-full mt-2 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào mật khẩu" />
                                {formik.errors.matKhau && formik.touched.matKhau ?
                                    <p className='text-red-500'>{formik.errors.matKhau}</p> : ''
                                }
                            </div>
                            <div className="mt-2">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Email
                                    </div>
                                </div>
                                <input type="email" name="email" style={{ paddingLeft: '10px' }} onChange={formik.handleChange} value={formik.values.email} className="w-full  mt-2 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào Email" />
                                {formik.errors.email && formik.touched.email ?
                                    <p className='text-red-500'>{formik.errors.email}</p> : ''
                                }
                            </div>
                            <div className="mt-2">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Số Điện Thoại
                                    </div>
                                </div>
                                <input name="soDt" style={{ paddingLeft: '10px' }} onChange={formik.handleChange} value={formik.values.soDt} className="w-full text-lg py-2 b mt-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào Số Điện Thoại" />
                                {formik.errors.soDt && formik.touched.soDt ?
                                    <p className='text-red-500'>{formik.errors.soDt}</p> : ''
                                }
                            </div>

                            <div className="mt-2">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Họ Tên
                                    </div>
                                </div>
                                <input name="hoTen" style={{ paddingLeft: '10px' }} onChange={formik.handleChange} value={formik.values.hoTen} className="w-full text-lg py-2  mt-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào Họ Tên" />
                                {formik.errors.hoTen && formik.touched.hoTen ?
                                    <p className='text-red-500'>{formik.errors.hoTen}</p> : ''
                                }
                            </div>
                            <div className="mt-2">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Loại Người Dùng
                                    </div>
                                </div>
                                <select name="maLoaiNguoiDung" value={formik.values.maLoaiNguoiDung} style={{ paddingLeft: '10px' }} onChange={formik.handleChange} className="w-full te mt-2 xt-lg py-3 border-b border-gray-300 focus:outline-none focus:border-indigo-500 font-bold text-gray-500" placeholder="Nhập vào Họ Tên">
                                    <option value={''}>
                                        Chọn loại người dùng
                                    </option>
                                    {loaiNguoiDung.map((loaiNguoiDung, index) => {
                                        return <option key={index} value={loaiNguoiDung.maLoaiNguoiDung}>
                                            {loaiNguoiDung.tenLoai}
                                        </option>
                                    })}
                                </select>
                                {formik.errors.maLoaiNguoiDung && formik.touched.maLoaiNguoiDung ?
                                    <p className='text-red-500'>{formik.errors.maLoaiNguoiDung}</p> : ''
                                }
                            </div>
                        </div>
                        <div className="mt-10">
                            <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg">
                                Cập Nhật
                            </button>
                        </div>

                    </div>
                </div>
            </form>
        )
    }

    const renderLichSuDatVe = () => {
        return <div className='flex flex-wrap'>
            {thongTinDatVe?.map((item, index) => {
                return <div key={index} className="m-4  max-w-md p-5 sm:flex sm:space-x-6 dark:bg-gray-200 dark:text-gray-100" style={{width:"30%"}}>
                    <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                        <img src={item.hinhAnh} alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
                    </div>
                    <div className="flex flex-col space-y-4">

                        <div>
                            <h2 className="text-2xl font-semibold">{item.tenPhim}</h2>
                            <h3>Tên Rạp: <span className='text-lg font-semibold'>{item.danhSachGhe[0].maHeThongRap}</span></h3>
                            <span className="text-sm dark:text-black">Địa Chỉ Rạp: <span className='font-semibold'>{item.danhSachGhe[0].tenHeThongRap}</span></span>
                        </div>
                        <div className="space-y-1">
                            <span className="flex items-center space-x-2">
                                <span className="dark:text-black">Số Rạp: <span className='font-semibold'>{item.danhSachGhe[0].tenCumRap}</span></span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <span className="dark:text-black">Ghế đặt: {_.sortBy(item.danhSachGhe, ['tenGhe']).map((ghe, index) => {
                                    return <span key={index} className='font-semibold mx-1'>{ghe.tenGhe}</span>
                                })}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <span className="dark:text-black">Ngày Đặt: <span className='font-semibold'>{moment(item.ngayDat).format('DD/MM/YYYY hh:mm:ss A')}</span></span>
                            </span>
                        </div>
                    </div>
                </div>
            })}


        </div>
    }

    return (
        <div className='min-h-screen w-full'>
            <div style={{ height: '400px', width: '100%', backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}>

            </div>
            <div className='px-20'>
                <Tabs

                    type='card'
                    defaultActiveKey="1"
                    onChange={onChange}
                    items={[
                        {
                            label: `Thông tin cá nhân`,
                            key: '1',
                            children: renderUserDetails(),
                        },
                        {
                            label: `Lịch sử đặt vé`,
                            key: '2',
                            children: renderLichSuDatVe(),
                        },

                    ]}
                />
            </div>
        </div>
    )
}