import allMateriJSON from '@server/data/materi'

export default (req, res) => {
  res.statusCode = 200
  res.json(allMateriJSON)
}