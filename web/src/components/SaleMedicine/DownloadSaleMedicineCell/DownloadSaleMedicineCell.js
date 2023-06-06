import DownloadSaleMedicine from "../DownloadSaleMedicine/DownloadSaleMedicine"

export const QUERY = gql`
  query FindDownloadSaleMedicineQuery($id: Int!) {
    saleMedicine: saleMedicine(id: $id) {
      id
      billNo
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
      patientId
      doctor_name
      patient{
        name
        phone_no
        age

      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ saleMedicine,download }) => {
  return (
    <>
      <DownloadSaleMedicine saleMedicine={saleMedicine} download={download}/>
    </>
  )
}
