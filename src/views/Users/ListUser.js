import React from "react";
import axios from "axios";
import './ListUser.scss';
import { withRouter } from 'react-router-dom';

class ListUser extends React.Component {

    state = {
        ListUsers: []
    }
    async componentDidMount() {
        // axios.get('https://reqres.in/api/users?page=2')
        //     .then(res => {
        //         console.log('>>> check res: ', res.data.data)
        //     })
        let res = await axios.get('http://localhost:8080/api/v1/users')
        this.setState({
            ListUsers: res && res.data && res.data.data ? res.data.data : []
        })

    }
    handleViewDetailUser = (user) => {
        this.props.history.push(`/user/${user.id}`)
    }

    render() {

        let { ListUsers } = this.state;
        return (
            <div className="list-user-container">
                <div className="title">
                    fetch all list users
                </div>

                <table>
                    <tr>
                        <th>stt</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                    </tr>
                    {ListUsers && ListUsers.length > 0 &&
                        ListUsers.map((item, index) => {
                            return (

                                <tr className="child" key={item.id}
                                    onClick={() => this.handleViewDetailUser(item)}
                                >
                                    <td>{index + 1}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                </tr>

                            )
                        })
                    }
                </table>
            </div>
        )
    }
}
export default withRouter(ListUser);