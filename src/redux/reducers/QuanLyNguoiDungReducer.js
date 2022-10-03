import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, DANH_SACH_LOAI_NGUOI_DUNG, SET_LIST_USER, SET_THONG_TIN_NGUOI_DUNG, TIM_KIEM_USER } from "../actions/types/QuanLyNguoiDungType"


let user = {};
if(localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {},
    listUser: [],
    loaiNguoiDung:[]
     
}


export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case DANG_NHAP_ACTION : {
            const {thongTinDangNhap} = action;
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN,thongTinDangNhap.accessToken);
            return {...state,userLogin:thongTinDangNhap}
        }

        case SET_THONG_TIN_NGUOI_DUNG :{ 
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return {...state};
        }
        case SET_LIST_USER: {
            return {...state,listUser: action.listUser};
        }
        case TIM_KIEM_USER: {
            return {...state,listUser: action.ketQuaTimKiem};
        }

        case DANH_SACH_LOAI_NGUOI_DUNG : {
            return {...state,loaiNguoiDung: action.loaiNguoiDung}
        }
        default:
            return { ...state }
    }
}