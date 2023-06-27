import { db } from 'src/lib/db'

export const ipdSummaries = () => {
  return db.ipdSummary.findMany()
}

export const ipdSummary = ({ id }) => {
  return db.ipdSummary.findUnique({
    where: { id },
  })
}

export const createIpdSummary = ({ input }) => {
  return db.ipdSummary.create({
    data: input,
  })
}

export const updateIpdSummary = ({ id, input }) => {
  return db.ipdSummary.update({
    data: input,
    where: { id },
  })
}

export const deleteIpdSummary = ({ id }) => {
  return db.ipdSummary.delete({
    where: { id },
  })
}

export const IpdSummary = {
  ipd: (_obj, { root }) => {
    return db.ipdSummary.findUnique({ where: { id: root?.id } }).ipd()
  },
}
