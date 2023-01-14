import materiJSON from '@server/data/materi'

const AllMateri = (req, res) => {
  res.statusCode = 200
  res.json(materiJSON)
}

export default AllMateri