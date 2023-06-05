
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BedForm from 'src/components/Bed/BedForm'

const CREATE_BED_MUTATION = gql`
  mutation CreateBedMutation($input: CreateBedInput!) {
    createBed(input: $input) {
      id
    }
  }
`
export const QUERY = gql`
  query FindNewBedQuery {
    floors: floors {
      id
      floor_name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ floors }) => {
  const [createBed, { loading, error }] = useMutation(CREATE_BED_MUTATION, {
    onCompleted: () => {
      toast.success('Bed created')
      navigate(routes.beds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createBed({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Bed</h2>
      </header>
      <div className="rw-segment-main">
        <BedForm onSave={onSave} loading={loading} error={error} floors={floors} />
      </div>
    </div>
  )
}
