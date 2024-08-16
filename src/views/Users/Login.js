import React from "react";
import axios from "axios";
import './ListUser.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import Adduser from './Adduser';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllUsers, createNewUserService, deleteUserService, updateUser } from "./userService";
import ModalEdit from "./ModalEdit";
function Login(props) {
    // State để lưu trữ giá trị các input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hàm xử lý khi form được submit
  const handleSubmit = async(event) => {
    event.preventDefault();
    // Thực hiện validate dữ liệu nếu cần thiết
    if (validateForm()) {
        const formData = {
          email,
          password,
        };
        try {
          const response = await axios.post('https://testdev.doapp.vn/api/login', formData);
          console.log('Response:', response.data);
           // Lưu token vào localStorage
          localStorage.setItem('authToken', response.data.data.token);
          // Thực hiện các hành động sau khi đăng ký thành công, ví dụ như điều hướng hoặc hiển thị thông báo
          toast.success(response.data.msg)
        } catch (error) {
          console.error('There was an error!', error);
          // Xử lý lỗi, ví dụ như hiển thị thông báo lỗi cho người dùng
        }
      }
  };

  // Hàm validate dữ liệu
  const validateForm = () => {
    if ( !email || !password) {
      alert('All fields are required!');
      return false;
    }
    // Bạn có thể thêm các điều kiện validate khác tại đây
    return true;
  };

    return (
        <div className="container mt-5 w-50">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
    );
}

export default Login;
