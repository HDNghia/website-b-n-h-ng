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
function Profile(props) {
    // State để lưu trữ giá trị các input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [randomString, setRandomString] = useState('');

  // Hàm xử lý khi form được submit
  useEffect(() => {
    async function fetchMyAPI() {
      const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
      let data = {};
      try {
        const response = await axios.get('https://testdev.doapp.vn/api/profile', {
          headers: {
            'customer-token': token, // Đặt token vào header
          },
        });
    
        setName(response.data.data.name);
        // Xử lý dữ liệu nhận được từ API
      } catch (error) {
        console.error('Error fetching data:', error);
        // Xử lý lỗi nếu có
      }
    }
    fetchMyAPI()

},[name])

    const generateRandomString = async() => {
      var token1 = localStorage.getItem('authToken');
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const length = 10;
  
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
  
      setRandomString(result);
      try {
        console.log('chekc token1: ', token1);
        const response = await axios.post('https://testdev.doapp.vn/api/device_id',{device_id: result}, {
          headers: {
            'customer-token': token1, // Đặt token vào header
          },
        });
        toast.success(response.data.msg)
      } catch (error) {
        console.error('Error fetching data:', error);
        // Xử lý lỗi nếu có
      }
    };

    return (
        <div className="container mt-5 w-50">
      <h2 className="text-center mb-4">Profile</h2>
        <div className="mb-3">
          <label className="form-label">name:</label>
          <input
            type="name"
            className="form-control"
            value={name}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" onClick={generateRandomString}>Generate Random String</button>
        {randomString && (
        <div className="mt-3">
          <p>Generated String: {randomString}</p>
        </div>
      )}
    </div>
    );
}

export default Profile;
