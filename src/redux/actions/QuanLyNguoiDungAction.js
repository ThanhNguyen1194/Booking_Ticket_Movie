import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung"
import { DANG_KY, DANG_NHAP_ACTION, DANH_SACH_LOAI_NGUOI_DUNG, SET_LIST_USER, SET_THONG_TIN_NGUOI_DUNG, TIM_KIEM_USER } from "./types/QuanLyNguoiDungType";
import { history } from '../../App'
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

            // console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
            notifiFunction('error', error.response?.data.message)

        }

    }

}

export const layThongTinNguoiDungAction = () => {



    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();


            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });

            }

            // console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
        }

    }

}

export const dangKyAction = (thongTinDangKy) => {

    // console.log('thongTinDangKy', thongTinDangKy);

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

            // console.log('result', result);

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
            // console.log('result', result);
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

export const timKiemUserActions = (tuKhoa) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.searchUser(tuKhoa);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: TIM_KIEM_USER,
                    ketQuaTimKiem: result.data.content
                });

            }

        } catch (error) {
            console.log('error', error.response.data);

        }
    }
}
export const LayDanhSachLoaiNguoiDungAction = () => {

    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.LayDanhSachLoaiNguoiDung();
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANH_SACH_LOAI_NGUOI_DUNG,
                    loaiNguoiDung: result.data.content
                });

            }
        } catch (err) {
            console.log('error', err.response.data);

        }
    }
}
export const themNguoiDungActions = (thongTinNguoiDung) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(thongTinNguoiDung);
            if (result.data.statusCode === 200) {

                notifiFunction('success', 'Add user successfully !')
                history.push('/admin/usermanager')
            }
        } catch (err) {
            console.log('error', err.response.data);
            notifiFunction('error', err.response?.data.message)

        }
    }
}
export const xoaNguoiDungActions = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan)
            // console.log('result: ', result);
            if (result.data.statusCode === 200) {

                notifiFunction('success', 'Delete user successfully !')
                // layDanhSachUser()
                window.location.reload()
            }
        } catch (err) {
            console.log('error', err.response.data);
            notifiFunction('error', err.response?.data.message)

        }
    }
}
export const capNhatThongTinNguoiDungActions = (thongTinCapNhat) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(thongTinCapNhat)
            // console.log('result: ', result);
            if (result.data.statusCode === 200) {

                notifiFunction('success', 'Update user successfully !')
                // layDanhSachUser()
                // history.push('/admin/usermanager')
            }
        } catch (error) {
            console.log('error', error.response.data);
            notifiFunction('error', error.response?.data.message)
        }
    }
}