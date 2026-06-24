import { Navigate } from "react-router-dom"

function ProtectedRoute({user, loading, children}) {
  if(loading){
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f8f8fc]">
      <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"/>
    </div>
  )
}
if(!user) return <Navigate to="/login" replace />
return children
}
export default ProtectedRoute
