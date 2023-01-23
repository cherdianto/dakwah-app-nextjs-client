import allMateriJSON from '@server/data/materi'

export default (req, res) => {
  const materiID = Number(req.query.id)
  const materiList = allMateriJSON.list
  const materiBasedOnID = materiList.filter(prod => prod.id === materiID)

  if (materiBasedOnID.length > 0) {
    res.statusCode = 200
    res.json(materiBasedOnID.pop())
  } else {
    res.statusCode = 404
    res.send('Not found - ID is not related to any materi')
  }
}