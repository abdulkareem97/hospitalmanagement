import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SaleMedicineForm from 'src/components/SaleMedicine/SaleMedicineForm'

const CREATE_SALE_MEDICINE_MUTATION = gql`
  mutation CreateSaleMedicineMutation($input: CreateSaleMedicineInput!) {
    createSaleMedicine(input: $input) {
      id
    }
  }
`

const NewSaleMedicine = () => {
  const [createSaleMedicine, { loading, error }] = useMutation(
    CREATE_SALE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('SaleMedicine created')
        navigate(routes.saleMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createSaleMedicine({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New SaleMedicine</h2>
      </header>
      <div className="rw-segment-main">
        <SaleMedicineForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSaleMedicine
