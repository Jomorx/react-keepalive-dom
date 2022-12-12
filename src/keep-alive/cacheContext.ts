import { createContext } from "react"
import { ICacheContext } from "./cache-types"

const CacheContext = createContext<ICacheContext>({} as ICacheContext)
export default CacheContext
