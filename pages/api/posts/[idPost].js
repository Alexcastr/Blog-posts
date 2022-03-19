import { doc, getDoc } from "firebase/firestore"
import { database } from "../../../database"


const getPost = async (req, res) => {
    const post =  await getDoc(doc(database,"posts",req.query.idPost))

    return res.json(post.data())
}

export default getPost