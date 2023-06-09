import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import { toast } from '@redwoodjs/web/toast'

import { useEffect, useState } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import { Link, routes } from '@redwoodjs/router'
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import { useMutation } from '@redwoodjs/web'
import React from 'react'
import Select from 'react-select'
import DoctorChargeBody from '../DoctorChargeBody/DoctorChargeBody'
import OtherChargeBody from '../OtherChargeBody/OtherChargeBody'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const CREATE_PATIENT_MUTATION = gql`
  mutation CreatePatientMutation($input: CreatePatientInput!) {
    createPatient(input: $input) {
      id
      name
    }
  }
`




const OpdForm = (props) => {

  const [patient, setPatient] = useState([])
  const [patientId, setPatientId] = useState(0)
  const [defaultPatient, setDefaultPatient] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [doctors, setDoctors] = useState()
  const [doctorName, setDoctorName] = useState()
  const [doctorChargesArray, setDoctorChargesArray] = useState([])
  const [otherChargesArray, setOtherChargesArray] = useState([])
  const [paymentOption,setPaymentOption] = useState([
    {value:'cheque',label:'cheque'},{value:'cash',label:'cash'}
  ])
  const [payment,setPayment] = useState('')
  const [totalAmount,setTotalAmount] = useState(0)

  const onSubmit = (data) => {
    data['patientId'] = patientId
    data['consultant_doctor'] = doctorName.value
    data['charges'] = {
      'DoctorCharges' : doctorChargesArray,
      'OtherCharges' : otherChargesArray
    }
    data['paymentMode'] = payment
    data['amount'] = totalAmount

    // console.log(data)


    props.onSave(data, props?.opd?.id)
  }

  useEffect(() => {
    const arrPat = props.patients.map((item) => {
      const obj = { 'label': item.name, 'value': item.id }
      return obj
    })
    // // console.log(arrPat)
    setPatient(arrPat)

    let obj = props.users.filter((item) => item.roles == 'doctor')
    obj = obj.map((item) => {
      const obj = { 'label': item.name, 'value': item.name, 'id': item.id }
      return obj
    })
    setDoctors(obj)
  }, [])

  useEffect(()=>{

    let total_amount=0
    otherChargesArray.map((it)=>{
      total_amount+=it.net_amount
    })
    doctorChargesArray.map((it)=>{
      total_amount+=it.amount
    })
    setTotalAmount(total_amount)

  },[otherChargesArray,doctorChargesArray])

  useEffect(() => {
    // console.log(otherChargesArray)
  })

  const changePatienId = (item) => {
    // // console.log(item)
    setDefaultPatient(item)
    setPatientId(item.value)
  }

  const changeDoctor = (item) => {
    setDoctorName(item)

  }

  const openModal = () => {
    setIsOpen(true)



  }

  const addDoctorCharges = () => {
    setDoctorChargesArray((item) => [...item, { name: '', type: '', amount: 0 }])
    // setNoOfDoctorCharges((item) => item + 1)
  }

  const addOtherCharges = () => {
    setOtherChargesArray((item) => [...item, { type: '', qunatity: 0, amount: 0, net_amount: 0 }])


  }

  const delectDoctorCharges = (index) => {
    setDoctorChargesArray((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });



  }
  const delectOtherCharges = (index) => {
    setOtherChargesArray((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });


  }

  const changePayment = (item) =>{
    if(!item)
    {
      setPayment('')
      return
    }
    // console.log(item.value)
    setPayment(item.value)
  }

  const [createPatient, { loading, error }] = useMutation(
    CREATE_PATIENT_MUTATION,
    {
      onCompleted: (data) => {
        const name = data.createPatient.name
        const id = data.createPatient.id
        toast.success('Patient Added ')
        const value = { 'label': name, 'value': id }
        setPatient((item) => [...item, value])
        setDefaultPatient(value)
        setIsOpen(false)

      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const addPatient = (input) => {
    createPatient({ variables: { input } })
  }

  return (
    <div className="rw-form-wrapper">

      {isOpen && (
        <>
          <ReactDialogBox
            closeBox={() => {
              setIsOpen(false)
            }}
            modalWidth="50%"
            headerBackgroundColor="#2c2c2c"
            headerTextColor="white"
            headerHeight="60px"
            closeButtonColor="white"
            bodyBackgroundColor="white"
            bodyTextColor="black"
            bodyHeight="200px"
            headerText={<span className="flex items-end h-14 text-xl">Add Patient Details</span>}
          >
            <Form
              onSubmit={addPatient}
            >

              <div className="grid grid-cols-4 space-y-3">

                <div className='col-span-4 flex items-center space-x-3'>
                  <Label
                    name="name"
                    className="rw-label  mt-0"
                    errorClassName="rw-label rw-label-error mt-0"
                  >
                    Name
                  </Label>

                  <TextField
                    name="name"

                    className="rw-input mt-0"
                    errorClassName="rw-input rw-input-error mt-0"
                    validation={{ required: true }}
                  />

                  <FieldError name="name" className="rw-field-error mt-0" />
                </div>


                <div className='col-span-2 flex items-center space-x-3'>


                  <Label
                    name="age"
                    className="rw-label mt-0"
                    errorClassName="rw-label rw-label-error mt-0"
                  >
                    Age
                  </Label>

                  <NumberField
                    name="age"

                    className="rw-input mt-0"
                    errorClassName="rw-input rw-input-error mt-0"
                    validation={{ required: true }}
                  />

                  <FieldError name="age" className="rw-field-error mt-0" />
                </div>


                <div className='col-span-2 flex items-center space-x-3 pl-4'>

                  <Label
                    name="phone_no"
                    className="rw-label mt-0 "
                    errorClassName="rw-label rw-label-error mt-0"
                  >
                    Phone
                  </Label>

                  <TextField
                    name="phone_no"

                    className="rw-input mt-0"
                    errorClassName="rw-input rw-input-error mt-0"
                  />
                </div>

                <FieldError name="phone_no" className="rw-field-error mt-0" />
              </div>


              <div className="rw-button-group">
                <Submit className="rw-button bg-gray-800 text-white">
                  Add Patient
                </Submit>
              </div>
            </Form>
          </ReactDialogBox>
        </>
      )}


      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <div className='flex items-center mt-3  gap-x-4'>
          <Label
            name="patientId"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Patient id
          </Label>

          <div className=" flex-1">
            <Select options={patient} onChange={changePatienId} isClearable={true}
              value={defaultPatient}

            />
            <FieldError name="patientId" className="rw-field-error" />

          </div>

          <div>
            <div onClick={openModal} className="rw-button rw-button-green">
              <div className="rw-button-icon">+</div> {"New Patient"}
            </div>
          </div>
        </div>

        <div className='flex items-center mt-3  gap-x-4'>
          <Label
            className="rw-label mt-0"
          >
            Consultant Doctor Name
          </Label>
          <div className=" flex-1">
            <Select options={doctors} onChange={changeDoctor} isClearable={true} value={doctorName}
            />
          </div>

        </div>

        <div className='flex justify-center mt-3  gap-x-4'>
          <div className='font-bold text-2xl underline'>
            Doctor Charges
          </div>
        </div>

        <div className="p-2 w-full shadow-sm bg-white ">
          <div className=" grid grid-cols-4 grid-flow-row gap-x-2 gap-y-2">

            <DoctorChargeHeader />

            {
              doctorChargesArray.map((item, index) => {
                return (
                  <>
                    <DoctorChargeBody key={index} item={item} doctors={doctors} index={index}
                      doctorChargesArray={doctorChargesArray}
                      setDoctorChargesArray={setDoctorChargesArray}
                      del={delectDoctorCharges}
                      doctorFees={props.doctorFees}

                    />


                  </>
                )
              })
            }
          </div>

          <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addDoctorCharges}>Add Doctor Charge</div>
          </div>
        </div>

        <div className="p-2 w-full shadow-sm bg-white ">
          <div className=" grid grid-cols-5 grid-flow-row gap-x-2 gap-y-2">

            <OtherChargeHeader />

            {
              otherChargesArray.map((item, index) => {
                return (
                  <>
                    <OtherChargeBody key={index} chargeses={props.chargeses} item={item}
                      otherChargesArray={otherChargesArray}
                      setOtherChargesArray={setOtherChargesArray}
                      del={delectOtherCharges}
                      index={index}
                    />


                  </>
                )
              })
            }
          </div>

          <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addOtherCharges}>Add Other Charge</div>
          </div>
        </div>








        {/* <Label
          name="consultant_doctor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Consultant doctor
        </Label>

        <TextField
          name="consultant_doctor"
          defaultValue={props.opd?.consultant_doctor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="consultant_doctor" className="rw-field-error" /> */}

        {/* <Label
          name="charges"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Charges
        </Label>

        <TextAreaField
          name="charges"
          defaultValue={JSON.stringify(props.opd?.charges)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="charges" className="rw-field-error" /> */}


        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <Label
            name="paymentMode"
            className="rw-label mt-0"
            errorClassName="rw-label mt-0 rw-label-error"
          >
            Payment mode
          </Label>
          <div className="flex">

          </div>
          <Select options={paymentOption} onChange={changePayment} isClearable={true} required  />

          <FieldError name="paymentMode" className="rw-field-error mt-0" />
        </div>


        <div className='flex items-center mt-3 justify-end gap-x-4'>

          <Label
            name="amount"
            className="rw-label mt-0"
            errorClassName="rw-label mt-0 rw-label-error"
          >
            Amount
          </Label>
          <div className="flex">

            <TextField
              name="amount"
              defaultValue={props.opd?.amount}
              value={totalAmount}
              className="rw-input mt-0"
              errorClassName="rw-input mt-0 rw-input-error"
              validation={{ valueAsNumber: true, required: true }}
            />
          </div>
          <FieldError name="amount" className="rw-field-error mt-0" />
        </div>

        {/* <Label
          name="patientId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Patient id
        </Label>

        <NumberField
          name="patientId"
          defaultValue={props.opd?.patientId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="patientId" className="rw-field-error" /> */}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

const DoctorChargeHeader = () => {
  return (
    <>
      <div className="flex col-span-1 justify-center">Doctor Name</div>
      <div className="flex col-span-1 justify-center">Charges Type</div>
      <div className="flex col-span-1 justify-center">Amount</div>
      <div className="flex col-span-1 justify-center">Action</div>
    </>
  )
}
const OtherChargeHeader = () => {
  return (
    <>
      <div className="flex col-span-1 justify-center">Charges Type</div>
      <div className="flex col-span-1 justify-center">Amount</div>
      <div className="flex col-span-1 justify-center">Quantity</div>
      <div className="flex col-span-1 justify-center">Net Amount</div>
      <div className="flex col-span-1 justify-center">Action</div>
    </>
  )
}



export default OpdForm
