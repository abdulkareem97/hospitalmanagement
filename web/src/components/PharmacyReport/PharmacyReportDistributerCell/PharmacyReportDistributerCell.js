import PurchaseMedicines from 'src/components/PurchaseMedicine/PurchaseMedicines'


export const QUERY = gql`
  query FindPharmacyReportDistributerQuery($id: Int!,$startDate: String!,$endDate: String!) {
    distributersReport: distributersReport(id: $id,startDate: $startDate, endDate: $endDate) {
      data {
        id
      invoiceNo
      distributerId
      did{
        id
        name
      }
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
      }
      totalSum
    },

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({ startDate, endDate }) => <div>

  No Report Found B/w {startDate.toString()} and {endDate.toString()}

</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ distributersReport, startDate, endDate }) => {


  return (
    <>
      <div className='text-white p-10 text-center'>
        <span>
          Total Purchase Amount From Distributer {distributersReport.data[0]?.did?.name} From {startDate.toString()} to {endDate.toString()} is <span className='font-bold'>
            ₹{distributersReport.totalSum}
          </span>
        </span>

      </div>
      <PurchaseMedicines purchaseMedicines={distributersReport.data} />



    </>
  )
}
