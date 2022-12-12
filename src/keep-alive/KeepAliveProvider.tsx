import React, { ReactElement, useReducer, useCallback } from "react"
import CacheContext from "./cacheContext"
import cacheReducer, { ICacheState } from "./cacheReducer"
import CacheTypes from "./cache-types"
const KeepAliveProvider = ({
  children
}: {
  children: ReactElement | ReactElement[]
}) => {
  const [cacheStates, dispatch] = useReducer(cacheReducer, {} as ICacheState)
  const mount = useCallback(
    ({ cacheId, reactElement }) => {
      if (!cacheStates[cacheId]) {
        dispatch({
          type: CacheTypes.CREATE,
          payload: { cacheId, reactElement }
        }) //创建缓存
      }
    },
    [cacheStates]
  )
  const handleScroll = useCallback(
    (cacheId, event) => {
      const { target } = event
      if (cacheStates[cacheId]) {
        const scrolls = cacheStates[cacheId].scrolls
        scrolls[target] = target.scrollTop
      }
    },
    [cacheStates]
  )
  return (
    <CacheContext.Provider
      value={{ cacheStates, dispatch, mount, handleScroll }}
    >
      {children}
      {Object.values(cacheStates).map(({ cacheId, reactElement }) => {
        return (
          //ref 绑定函数 name真实dom渲染后会执行
          <div
            id={`cache-${cacheId}`}
            key={cacheId}
            ref={(divDOM) => {
              const cacheState = cacheStates[cacheId]
              if (divDOM && !cacheState.doms) {
                const doms = Array.from(divDOM.childNodes)
                dispatch({
                  type: CacheTypes.CREATED,
                  payload: { cacheId, doms }
                })
              }
            }}
          >
            {reactElement}
          </div>
        )
      })}
    </CacheContext.Provider>
  )
}

export default KeepAliveProvider
