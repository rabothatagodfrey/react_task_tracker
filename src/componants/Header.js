import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title , onAdd , showAdd}) => {



    return (

     <heaader className='header'> 
       <h1 >{title}</h1>
       <Button 
       color = {showAdd ? 'Red' : 'Green'} 
       text = {showAdd ? ' Close' : 'Add'} 
       onClick={onAdd} />
     
     </heaader>

    )
}
Header.defaultProps = {
    title : 'Task Tracker',
   
}

Header.propTypes = {
    title:PropTypes.string.isRequired,
}
//css in js 
// const headingStyle ={
//     color : 'red',
//     backgroundColor : 'black'
// }

export default Header
