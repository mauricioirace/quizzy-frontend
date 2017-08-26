import setUser from './set-user'
import {bindActionCreators} from 'redux'

export default function mapDispatchToProps(dispatch,props) {
    return {
        setUser: (users) => dispatch(setUser(users))
    }
}