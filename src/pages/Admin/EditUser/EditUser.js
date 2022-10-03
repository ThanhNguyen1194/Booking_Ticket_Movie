import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinNguoiDungActions, LayDanhSachLoaiNguoiDungAction, themNguoiDungActions, timKiemUserActions } from '../../../redux/actions/QuanLyNguoiDungAction';
import { quanLyNguoiDungService } from '../../../services/QuanLyNguoiDung';
import { useState } from 'react';
import { GROUPID } from '../../../util/settings/config';
import { groupBy } from 'lodash';
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

export default function AddUser(props) {

  const [userDetail, setUserDetail] = useState({});
  // console.log('userDetail', userDetail.userDetail);
  const { loaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
  // console.log('loaiNguoiDung',loaiNguoiDung);
  const taiKhoan = props.match.params.id
  // console.log('index', taiKhoan);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(LayDanhSachLoaiNguoiDungAction());
    dispatch(async () => {
      try {
        let result = await quanLyNguoiDungService.searchUser(taiKhoan);
        // console.log('result' , result);
        setUserDetail({
          userDetail: result.data.content[0]
        })

      } catch (error) {

      }

      // return () => {
      //     dispatch(layDanhSachPhimAction());
      // }
    })
  }, [])

  const user = userDetail.userDetail
  // console.log('userDetail' , user);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: user?.taiKhoan,
      matKhau: user?.matKhau,
      email: user?.email,
      soDt: user?.soDt,
      maNhom: GROUPID,
      hoTen: user?.hoTen,
      maLoaiNguoiDung: user?.maLoaiNguoiDung,
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





  return (

    <form onSubmit={formik.handleSubmit} className=' ' >
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12  xl:px-24 ">
        <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
      xl:text-bold">Chỉnh Sửa Thông Tin Người Dùng</h2>
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
              <input name="soDt" style={{ paddingLeft: '10px' }} onChange={formik.handleChange} value={formik.values.soDt} className="w-full text-lg py-2 b mt-2 order-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào Số Điện Thoại" />
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
