import React from 'react'
import {GrFormClose} from 'react-icons/gr'
import {TiTick} from 'react-icons/ti'
import Swal from 'sweetalert2'
export default function Nstructure(props) {
    const handleDelete=()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
           
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                
              )
            }
          })
    }
  return (
    <div className='Notification-box Notificationbox' >
      <div className='contactimagebox'>
        <img src={props.image} id='Avatarimage' alt='User Avatar' />
      </div>
      <div className='NotificationDetail'>
        <div className='notificationText'>
          <h6>{props.title}</h6>
        </div>
        
          
      </div>
      <div className='notiBTN'>
      <a className='btn btn-success Nbtn' id='success'><TiTick/></a>
     <a className='btn btn-danger Nbtn'><GrFormClose onClick={handleDelete}/></a>

      </div>
    </div>
  )
}
