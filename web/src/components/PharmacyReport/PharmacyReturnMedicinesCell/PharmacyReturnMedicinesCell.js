import ReturnMedicinesList from "src/components/ReturnMedicine/ReturnMedicines/ReturnMedicines"

export const QUERY = gql`
  query PharmacyReturnMedicinesQuery($startDate: String!,$endDate: String!) {
    returnMedicinesReport: returnMedicinesReport(startDate: $startDate, endDate: $endDate){
      data {

      id
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
      patient{
        name
      }

      }
      totalSum
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({ startDate, endDate }) => <div>

  No Report Found B/w {startDate.toString()} and {endDate.toString()}

</div>
export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ returnMedicinesReport, startDate, endDate }) => {


  return (
    <>
      <div className='text-white p-10 text-center'>
        <span>
          Total Sale Amount  From {startDate.toString()} to {endDate.toString()} is <span className='font-bold'>
            ₹{returnMedicinesReport?.totalSum}
          </span>
        </span>

      </div>
      <ReturnMedicinesList returnMedicines={returnMedicinesReport.data} />



    </>
  )
}
