import React from "react";
import axios from "axios";
import './ListUser.scss';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Adduser from './Adduser';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllUsers, createNewUserService, deleteUserService, updateUser } from "./userService";
import ModalEdit from "./ModalEdit";
function Register(props) {
    // State để lưu trữ giá trị các input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  // Hàm xử lý khi form được submit
  const handleSubmit = async(event) => {
    event.preventDefault();
    // Thực hiện validate dữ liệu nếu cần thiết
    if (validateForm()) {
        const formData = {
          name,
          email,
          phone: phoneNumber, // Lưu ý: dùng đúng key mà API yêu cầu
          password,
        };
        console.log('chekc formData: ', formData);
        try {
          const response = await axios.post('https://testdev.doapp.vn/api/register', formData);
          console.log('Response:', response.data);
          toast.success(response.data.msg)
          // Thực hiện các hành động sau khi đăng ký thành công, ví dụ như điều hướng hoặc hiển thị thông báo
        } catch (error) {
          console.error('There was an error!', error);
          // Xử lý lỗi, ví dụ như hiển thị thông báo lỗi cho người dùng
        }
      }
  };

  // Hàm validate dữ liệu
  const validateForm = () => {
    if (!name || !email || !phoneNumber || !password) {
      alert('All fields are required!');
      return false;
    }
    // Bạn có thể thêm các điều kiện validate khác tại đây
    return true;
  };

    return (
        <div className="container mt-5 w-50">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <label className="form-label">Phone Number:</label>
          <input
            type="text"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
    );
}

export default Register;
