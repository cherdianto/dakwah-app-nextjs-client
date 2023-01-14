import materiJSON from '@server/data/materi'

const Materi = (req, res) => {
    const materiID = Number(req.query.id)
    const materiList = materiJSON.list
    const materiBasedOnId = materiList.filter(mtr => mtr.id === materiID)

    if(materiBasedOnId.length > 0){
        res.statusCode = 200
        res.json(materiBasedOnId.pop())
    } else {
        res.statusCode = 404
        res.send('ID not found')
    }
}

export default Materi