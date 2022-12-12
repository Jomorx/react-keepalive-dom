import React, { createContext, ReactElement } from "react"
import { ICacheState } from "./cacheReducer"
import CacheTypes from "./cache-types"
type ICacheDispatch = {
  type: keyof CacheTypes
  payload: unknown
}
export type ICacheContext = {
  cacheStates: ICacheState
  dispatch: (arg: ICacheDispatch) => void
  mount: ({
    cacheId,
    reactElement
  }: {
    cacheId: string
    reactElement: ReactElement
  }) => void
  handleScroll: (cacheId: string, event: Event) => void
}
const CacheContext = createContext<ICacheContext>({} as ICacheContext)
export default CacheContext
