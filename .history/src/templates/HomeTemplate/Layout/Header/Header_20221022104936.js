import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App';
import { Select } from 'antd';

//Hook đa ngôn ngữ
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';
import { useEffect } from 'react';

const { Option } = Select;


export default function Header(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { t, i18n } = useTranslation();
    const userDetail = JSON.parse(localStorage.getItem('USER_LOGIN'))


    const renderAdminSite = () => {
        if (userDetail?.maLoaiNguoiDung === 'QuanTri') {
            return <li className="flex">
                <NavLink to="/admin/films" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">Admin</NavLink>
            </li>
        }
    }
    useEffect(() => {
        i18n.changeLanguage('en')
    }, [i18n])
    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }


    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button onClick={() => {
                    history.push('/login')
                }} className="self-center px-8 py-3 rounded">{t('signin')}</button>
                <button onClick={() => {
                    history.push('/register')
                }} className="self-center px-8 py-3 mr-8 font-semibold rounded bg-violet-600 text-coolGray-50">{t('register')}</button>

            </Fragment>
        }


        return <Fragment> <button onClick={() => {
            history.push('/profile')
        }} className="self-center px-8 py-3 rounded">{t('hello')} ! {userLogin.name}</button>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/home');
                window.location.reload();
            }} className="text-yellow-500 mr-5">Đăng xuất</button>
        </Fragment>
    }
    return (
        <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10" >
            <div className="container flex justify-between h-16 mx-auto text-lg">
                <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent  text-white " activeClassName="border-b-2  border-violet-300 text-cyan-300">{t("Home")}</NavLink>
                    </li>
                    {/* <li className="flex">
                        <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-violet-600 text-violet-600">Contact</NavLink>
                    </li> */}
                    <li className="flex">
                        <NavLink to="/profile" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-violet-300 text-cyan-300">{t("Profile")}
                        </NavLink>
                    </li>
                    {/* <li className="flex">
                        <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-violet-600 text-violet-600">News</NavLink>
                    </li> */}

                    {renderAdminSite()}

                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">

                    {renderLogin()}




                    <Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
                        <Option value="en">Eng</Option>
                        <Option value="chi">Chi</Option>

                        <Option value="vi">Vi</Option>
                    </Select>

                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>


            </div>
        </header>

    )
}