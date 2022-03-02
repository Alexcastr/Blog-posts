import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/facebook"
import {database} from "../../../database"
import {doc,getDoc,setDoc} from 'firebase/firestore'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // ...add more providers here
   ],
   callbacks:{
    async jwt({token,account}){
        console.log("JWT",token)
        console.log("Account",account)
        if(account?.providerAccountId){
            // enviamos al token un id sacado del account porque alli si hay id
            token.id = account.providerAccountId
            const snapshot = await getDoc(doc(database,"users",account.providerAccountId))
            if(snapshot.exists()){
                const user = snapshot.data()
                if(user.role){
                    //enviamos al token un role de la bd 
                    token.role = user.role
                }
            }else{
                const snapshot = await setDoc(
                    doc(
                        database,
                        "users",
                        account.providerAccountId
                    ),
                    {
                        role:"regular",
                        id:account.providerAccountId,
                        email:token.email,
                        name:token.name,
                        picture:token.picture
                    }
                )
                token.role = "regular"
            }
        }
        return token
    },
    async session({ session, token, user }){
        if(token?.id && token?.role){
            session.user.id = token.id
            session.user.role = token.role
        }
        console.log("Session",session)
        return session
    }
}
})