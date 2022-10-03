import React from 'react'
import { Input, Button, Space, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { layDanhSachUser, timKiemUserActions, xoaNguoiDungActions } from '../../../redux/actions/QuanLyNguoiDungAction';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { values } from 'lodash';

const { Search } = Input;

export default function UserManager(props) {
  const { listUser } = useSelector(state => state.QuanLyNguoiDungReducer);
  // console.log('listUser', listUser);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(layDanhSachUser());

  }, [])

  const onSearch = (value) => {
    dispatch(timKiemUserActions(value));

    // console.log(value)
  };

  const columns = [
    {
      title: 'Tài Khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend'],

    },
    {
      title: 'Họ Tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      sorter: (a, b) => {
        let hoTena = a.hoTen?.toLowerCase().trim();
        let hoTenb = b.hoTen?.toLowerCase().trim();
        if (hoTena > hoTenb) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend'],

    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số ĐT',
      dataIndex: 'soDt',
      key: 'soDt',
    },
    {
      title: 'Mật Khẩu',
      dataIndex: 'matKhau',
      key: 'matKhau',
    },
    {
      title: 'Mã Người Dùng',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, user) => {
        return <Fragment>
          <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/usermanager/edituser/${user.taiKhoan}`}><EditOutlined style={{ color: 'blue' }} /> </NavLink>
          <span style={{ cursor: 'pointer' }} key={2} className="text-2xl" onClick={() => {
            //Gọi action xoá
            if (window.confirm('Bạn có chắc muốn xoá người dùng ' + user.taiKhoan)) {
              //Gọi action
              dispatch(xoaNguoiDungActions(user.taiKhoan));
            }


          }}><DeleteOutlined style={{ color: 'red' }} /> </span>


        </Fragment>
      },
    },
  ];



  return (
    <div>
      <Button type='primary' size='large' className='mb-8' onClick={() => {
        history.push('/admin/usermanager/adduser')
      }}>Thêm Người Dùng +</Button>
      <br />

      <Search
        placeholder="nhập vào tài khoản hoặc họ tên người dùng"
        allowClear
        onSearch={onSearch}
        size={'large'}
        style={{
          width: 400,
          fontSize: 25,

        }}
        className="mb-8"
      />

      <Table columns={columns} dataSource={listUser} />
    </div>
  )
}
