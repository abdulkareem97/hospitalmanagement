import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import Multiselect from 'multiselect-react-dropdown'
import { useState } from 'react'
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'



const CREATE_MANUFACTURER_MUTATION = gql`
  mutation CreateManufacturerMutation($input: CreateManufacturerInput!) {
    createManufacturer(input: $input) {
      id
      name
    }
  }
`

const CREATE_COMPOSITION_MUTATION = gql`
  mutation CreateCompositionMutation($input: CreateCompositionInput!) {
    createComposition(input: $input) {
      id
      name
    }
  }
`

const ProductForm = (props) => {


  // const [compositionList,setCompositionList] = useState([])
  const [compositionList, setCompositionList] = useState(props?.defaultComposition?.map((item) => item.id))
  const [Manufacturer, setManufacturerList] = useState(props?.defaultManufacturer ? props.defaultManufacturer[0]?.id : 0)

  const [manufacturerModelIsOpen, setManufacturerModelIsOpen] = useState(false)
  const [manufacturerName, setManufacturerName] = useState()
  const [compositionIsOpen,setCompositionIsOpen] = useState(false)
  const [compositionName,setCompositionName] = useState()

  const onSubmit = (data) => {
    data['compositionList'] = compositionList
    data['manufacturerId'] = Manufacturer
    // console.log(data['compositionList'])
    props.onSave(data, props?.product?.id)
  }

  const modifiyComposition = (items) => {
    let cl = []
    for (let i = 0; i < items.length; i++) {
      cl.push(items[i].id)
    }

    // compositionList = [...cl]
    // console.log(compositionList)
    setCompositionList(cl)
  }
  const modifiyManufacturer = (name) => {
    if (name.length === 0) {
      return
    }
    // console.log(name)
    // Manufacturer = name[0].id
    setManufacturerList(name[0].id)
  }
  // console.log("here")

  const openManufacturerModal = () => {
    setManufacturerModelIsOpen(true)
  }

  const openCompositionModal = () => {
    setCompositionIsOpen(true)
  }

  const [createManufacturer, { loading, error }] = useMutation(
    CREATE_MANUFACTURER_MUTATION,
    {
      onCompleted: (data) => {
        const name = data.createManufacturer.name
        const id = data.createManufacturer.id
        const value = { id, name }
        toast.success('Manufacturer created')
        console.log(data.createManufacturer)
        setManufacturerName(value)
        setManufacturerModelIsOpen(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const [createComposition, { loading1, error1 }] = useMutation(
    CREATE_COMPOSITION_MUTATION,
    {
      onCompleted: (data) => {
        toast.success('Composition created')
        const name = data.createComposition.name
        const id = data.createComposition.id
        const value = { id, name }
        setCompositionName(value)
        setCompositionIsOpen(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )


  const addManufacturer = (input) => {
    createManufacturer({ variables: { input } })
  }
  const addComposition = (input) => {
    createComposition({ variables: { input } })
  }



  return (
    <div className="rw-form-wrapper">

      {
        manufacturerModelIsOpen && (
          <>
            <ReactDialogBox
              closeBox={setManufacturerModelIsOpen.bind(this, false)}
              modalWidth='50%'
              headerBackgroundColor='#000000'
              headerTextColor='white'
              headerHeight='60px'
              closeButtonColor='white'
              bodyBackgroundColor='#2c2c2c'
              bodyTextColor='white'
              bodyHeight='200px'

              headerText={<span className="flex items-end h-14 text-xl">Add Manufacturer Details</span>}

            >


              <Form onSubmit={addManufacturer} error={props.error}>
                <FormError
                  error={props.error}
                  wrapperClassName="rw-form-error-wrapper"
                  titleClassName="rw-form-error-title"
                  listClassName="rw-form-error-list"
                />

                <Label
                  name="name"
                  className="rw-label mt-0"
                  errorClassName="rw-label mt-0 rw-label-error"
                >
                  Name
                </Label>

                <TextField
                  name="name"
                  defaultValue={props.manufacturer?.name}
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  placeholder='Enter Manufacturer Name'
                  validation={{ required: true }}
                />

                <FieldError name="name" className="rw-field-error" />

                <div className="rw-button-group">
                  <Submit className="rw-button rw-button-blue">
                    Save
                  </Submit>
                </div>
              </Form>

            </ReactDialogBox>
          </>
        )




      }


      {
        compositionIsOpen && (
          <>
            <ReactDialogBox
              closeBox={setCompositionIsOpen.bind(this, false)}
              modalWidth='50%'
              headerBackgroundColor='#000000'
              headerTextColor='white'
              headerHeight='60px'
              closeButtonColor='white'
              bodyBackgroundColor='#2c2c2c'
              bodyTextColor='white'
              bodyHeight='200px'

              headerText={<span className="flex items-end h-14 text-xl">Add Composition Details</span>}

            >

<Form onSubmit={addComposition} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label mt-0"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.composition?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit  className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>


            </ReactDialogBox>
          </>)

        }
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.product?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className='flex items-center mt-3  gap-x-4'>

          <Label
            className="rw-label mt-0"
          >
            Manufacturer Name
          </Label>

          <div className=" flex-1">

            <Multiselect
              options={props.manufacturers} // Options to display in the dropdown
              selectedValues={props?.defaultManufacturer || manufacturerName ? [manufacturerName] : []}
              onSelect={(event) => modifiyManufacturer(event)} // Function will trigger on select event
              onRemove={(event) => modifiyManufacturer(event)} // Function will trigger on remove event
              selectionLimit={1}
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>

          <div>
            <div onClick={openManufacturerModal} className="rw-button mt-0 rw-button-green">
              <div className="rw-button-icon">+</div> {"New Manufacturer"}
            </div>
          </div>
        </div>
        <Label

          className="rw-label mb-2"

        >
          Select Compositions
        </Label>

        <Multiselect
          options={props.compostions} // Options to display in the dropdown
          selectedValues={props?.defaultComposition || compositionName ? [compositionName] : []}
          onSelect={(event) => modifiyComposition(event)} // Function will trigger on select event
          onRemove={(event) => modifiyComposition(event)} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />

<div>
            <div onClick={openCompositionModal} className="rw-button mt-0 rw-button-green">
              <div className="rw-button-icon">+</div> {"New Composition"}
            </div>
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

export default ProductForm
