import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import { timeTag } from 'src/lib/formatters'
import IpdOverview from '../IpdOverview/IpdOverview'

const DELETE_IPD_MUTATION = gql`
  mutation DeleteIpdMutation($id: Int!) {
    deleteIpd(id: $id) {
      id
    }
  }
`

const Ipd = ({ ipd }) => {

  const [dropDownOpen,setDropDownOpen] = useState('overview')
  const toggleDropDown = (text) => {
    setDropDownOpen(text)
  }




  const [deleteIpd] = useMutation(DELETE_IPD_MUTATION, {
    onCompleted: () => {
      toast.success('Ipd deleted')
      navigate(routes.ipds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ipd ' + id + '?')) {
      deleteIpd({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Ipd {ipd.id} Detail
          </h2>
        </header>
        <div>
          <div className='flex bg-gray-800 text-white  space-x-5 rounded-3xl justify-around'>
            <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2' onClick={toggleDropDown.bind(this,'overview')}>
              OverView
            </div>
            <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'operation')}
            >
              Operations
            </div>
            <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'consultant')}
            >
              consultant Registration
            </div>
            <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'charges')}
            >
              Charges
            </div>
            <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'payment')}
            >
              Payment
            </div>

          </div>


          {
            dropDownOpen=='overview' && <IpdOverview />
          }
        </div>
      </div>
      <nav className="rw-button-group">
        {/* <Link
          to={routes.editIpd({ id: ipd.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link> */}
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ipd.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Ipd
