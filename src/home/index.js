import React from 'react'
import {Link} from 'react-router-dom'
class Home extends React.PureComponent{
    render(){
        return (
            <Link to={'/users'} >BO MUNDO,dame users</Link>
        )
    }

}
export default Home