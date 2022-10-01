import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung"
import { DANG_KY, DANG_NHAP_ACTION, SET_LIST_USER, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";
import {history} from '../../App'
import { notifiFunction } from "../../components/Notification/Notification";



export const dangNhapAction = (thongTinDangNhap) => {



    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);


            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                //Chuyển hướng đăng nhập về trang trước đó
                history.push('/');
            }

            console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
        }

    }

}

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {



    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();


            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });

            }

            console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
        }

    }

}

export const dangKyAction = (thongTinDangKy) => {

    console.log('thongTinDangKy', thongTinDangKy);

    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);


            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_KY,
                    thongTinDangNhap: result.data.content
                });
                notifiFunction('success', 'Create user successfully !')
                history.push('/login');
            }

            console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
            notifiFunction('error', error.response?.data.message)


        }

    }

}

export const layDanhSachUser = () => {

    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.layDanhSachUser();

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_LIST_USER,
                    listUser: result.data.content
                });

            }


        } catch (error) {
            console.log('error', error.response.data);
        }

    }
}