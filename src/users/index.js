import React from 'react';
import {connect} from 'react-redux';
import User from './components/User';
import axios from 'axios';
import mapDispatchToProps from './redux/map-dispatch';
import mapStateToProps from './redux/map-state';


class UsersHome extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {

        e.preventDefault();

        axios.get('/rest/users/')
             .then((res) => {
                this.props.setUser(res.data.users);
            })
             .catch((err) => console.log(err));


    }

    render() {

        let userList  = [];
        for(let user of this.props.users){
            userList.push(<User user={user} />);
        }

        return (
            <div>
                {userList}
                <button onClick={this.handleSubmit}> Dame gas maudo </button>
            </div>);

    }
}
export default connect(mapStateToProps,
                       mapDispatchToProps)
                       (UsersHome);