import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  TextAreaField,
  NumberField,
  Submit,
  DateField,
} from '@redwoodjs/forms'
import NewSaleMedicineTable from '../NewSaleMedicineTable/NewSaleMedicineTable'
import { useEffect, useState } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import { Link, routes } from '@redwoodjs/router'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const SaleMedicineForm = (props) => {


  const [no_of_medicine, setNoOfMedicine] = useState(0)
  const [show_medicine_heading, setShowMedicineHeading] = useState(false)
  const [productList, setProductList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_amount_list, set_total_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_sgst_amount_list, set_total_sgst_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_cgst_amount_list, set_total_cgst_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [medicineObj, setmedicineObj] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [permedicineObj, setPermedicineObj] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  const [total_amount, set_total_amount] = useState(0)
  // const [total_dis_amount, set_total_dis_amount] = useState(0)
  const [total_sgst_amount, set_total_sgst_amount] = useState(0)
  const [total_cgst_amount, set_total_cgst_amount] = useState(0)
  const [grand_total, set_grand_total] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountamt, setDiscountAmt] = useState(0)
  const [patientId, setPatientId] = useState(0)



  const onSubmit = (data) => {
    const newmedicine = medicineObj.filter((val) => {
      return val !== 0
    })

    const newperMedicine = permedicineObj.filter((val) => {
      return val !== 0
    })

    let input = {}
    input = {
      'billNo': data['billNo'],
      'date': data['date'],
      'medicine': newmedicine,
      'total':  parseFloat(total_amount.toFixed(5)),
      'discount': parseFloat(discountamt.toFixed(5)),
      'sgst': parseFloat(total_sgst_amount.toFixed(5)),
      'cgst': parseFloat(total_cgst_amount.toFixed(5)),
      'grand_total': grand_total,
      'patientId':patientId,
      'permedicine': newperMedicine
    }

    console.log(input)

    props.onSave(input, props?.saleMedicine?.id)

  }

  const updateMedicineTable = (e) => {
    console.log(e.target.value)
    const val = e.target.value
    if (val == '') {
      setNoOfMedicine(0)
      setShowMedicineHeading(false)
    } else {
      setNoOfMedicine(val)
      setShowMedicineHeading(true)
    }
  }

  useEffect(() => {
    // console.log("manufacturer :-",manufacturersList,"product List :- ",productList)
    let tamt = 0
    let sgstamt = 0
    let cgstamt = 0
    // console.log(total_amount_list,total_sgst_amount_list,total_cgst_amount_list)
    for (let i = 0; i < no_of_medicine; i++) {
      tamt += total_amount_list[i]

      sgstamt += total_sgst_amount_list[i]
      cgstamt += total_cgst_amount_list[i]
    }

    set_grand_total(Math.round(tamt + sgstamt + cgstamt))
    set_total_amount(tamt)
    set_total_sgst_amount(sgstamt)
    set_total_cgst_amount(cgstamt)
  }, [total_amount_list, total_cgst_amount_list, total_sgst_amount_list])

  useEffect(() => {
    let dis = total_amount * parseFloat(discount) / 100.0
    setDiscountAmt(dis)
    // console.log("here")
  }, [discount])


  const ShowHeadMedicine = () => {
    if (show_medicine_heading) {
      return <MedicineTableHeading />
    } else {
      return <></>
    }
  }

  var medicineRows = []
  for (var i = 0; i < no_of_medicine; i++) {
    medicineRows.push(<NewSaleMedicineTable key={'sale_' + i} value={i}
      patients={props.patients} productList={productList}
      setProductList={setProductList}
      set_total_amount_list={set_total_amount_list}
      set_total_sgst_amount_list={set_total_sgst_amount_list}
      set_total_cgst_amount_list={set_total_cgst_amount_list}
      setmedicineObj={setmedicineObj}
      setPermedicineObj={setPermedicineObj}
      medicines={props.medicines}

    />)
  }

  const modifyPatient = (name) =>{
    if(name.length===0){
      return
    }
    setPatientId(name[0].id)
    // // console.log(name)
    // Manufacturer = name[0].id
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />


        <div className='flex items-center mt-3  gap-x-4'>
          <Label
            name="billNo"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Bill no
          </Label>
          <div className="flex">
            <TextField
              name="billNo"
              defaultValue={props.saleMedicine?.billNo}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />
          </div>
          <FieldError name="billNo" className="rw-field-error" />
          <Label
            name="date"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Date
          </Label>
          <div className="flex">
            <DateField
              name="date"
              defaultValue={formatDatetime(props.saleMedicine?.date)}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />
          </div>

          <FieldError name="date" className="rw-field-error" />


          <Label
            name="patientId"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Patient id
          </Label>

          <div className=" flex-1">


            {/* <NumberField
          name="patientId"
          defaultValue={props.saleMedicine?.patientId}
          className="rw-input mt-0"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          /> */}
            <Multiselect
              className="rw-input mt-0  "
              name={"patientId"}
              options={props.patients} // Options to display in the dropdown
              onSelect={(event) => modifyPatient(event)} // Function will trigger on select event
              onRemove={(event) => modifyPatient(event)} // Function will trigger on remove event
              selectionLimit={1}

              displayValue={'name'}// Property name to display in the dropdown options
            />

          </div>



          <FieldError name="patientId" className="rw-field-error" />

          <div>
          <Link to={routes.newPatient()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> {"New Patient"}
        </Link>
          </div>

        </div>


        <Label
          name="no_of_medicine"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          No Of Medicine
        </Label>

        <NumberField
          name="no_of_medicine"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          onChange={updateMedicineTable}
        />

        <FieldError name="no_of_medicine" className="rw-field-error" />
        <div className="p-2 w-full shadow-sm bg-white ">
          <div className=" grid grid-cols-12 grid-flow-row gap-x-2 gap-y-2">

            {ShowHeadMedicine()}

            {medicineRows}
          </div>
        </div>


        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <Label
            name="total"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Total
          </Label>
          <div className="flex">
            <TextField
              name="total"
              defaultValue={props.saleMedicine?.total}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              // validation={{ valueAsNumber: true, required: true }}
              disabled={true}
              value={total_amount}
            />
          </div>
          <FieldError name="total" className="rw-field-error" />
        </div>

        <div className='flex items-center mt-3 justify-end gap-x-4'>


          <Label
            name="discount"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Discount % :-
          </Label>

          <div className='flex'>


            <TextField
              name="discount"
              defaultValue={props.saleMedicine?.discount}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            // validation={{ valueAsNumber: true, required: true }}
            />
          </div>

          <FieldError name="discount" className="rw-field-error" />
          <Label
            name="discountamt"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Discount Amount :-
          </Label>

          <div className='flex'>


            <TextField
              name="discountamt"
              defaultValue={props.saleMedicine?.discount}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              value={discountamt}
              disabled={true}
            // value=
            />
          </div>

          <FieldError name="discountamt" className="rw-field-error" />
        </div>


        <div className='flex items-center mt-3 justify-end gap-x-4'>


          <Label
            name="sgst"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Sgst
          </Label>

          <div className="flex">



            <TextField
              name="sgst"
              defaultValue={props.saleMedicine?.sgst}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              // validation={{ valueAsNumber: true, required: true }}
              disabled={true}
              value={total_sgst_amount}
            />
          </div>

          <FieldError name="sgst" className="rw-field-error" />

        </div>



        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <Label
            name="cgst"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Cgst
          </Label>
          <div className="flex">
            <TextField
              name="cgst"
              defaultValue={props.saleMedicine?.cgst}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              // validation={{ valueAsNumber: true, required: true }}
              disabled={true}
              value={total_cgst_amount}
            />
          </div>

          <FieldError name="cgst" className="rw-field-error" />
        </div>



        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <Label
            name="grand_total"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Grand total
          </Label>
          <div className="flex">
            <TextField
              name="grand_total"
              defaultValue={props.saleMedicine?.grand_total}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              // validation={{ valueAsNumber: true, required: true }}
              disabled={true}
              value={grand_total}
            />
          </div>
          <FieldError name="grand_total" className="rw-field-error" />
        </div>


        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

function MedicineTableHeading() {
  return (
    <>

      <div className="flex col-span-4 justify-center">Medicine Name</div>
      <div className="flex col-span-3 justify-center">Batch No</div>
      <div className="flex col-span-1 justify-center">Expiry Date</div>
      <div className="flex col-span-1 justify-center">M.R.P</div>
      <div className="flex col-span-1 justify-center">Quantity</div>
      <div className="flex col-span-1 justify-center">CGST/SGST</div>
      <div className="flex col-span-1 justify-center">Amount</div>
    </>
  )
}

export default SaleMedicineForm
