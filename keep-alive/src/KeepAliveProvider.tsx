import React, { ReactElement, useReducer, useCallback } from "react"
import CacheContext from "./cacheContext"
import cacheReducer from "./cacheReducer"
import { CacheStatus, ICacheState, ICacheContext } from "./cache-types"
const KeepAliveProvider = ({
  children
}: {
  children: ReactElement | ReactElement[]
}) => {
  const [cacheStates, dispatch] = useReducer(cacheReducer, {} as ICacheState)
  const mount: ICacheContext["mount"] = useCallback(
    ({ cacheId, reactElement }) => {
      //如果没有dom 表示第一次render
      if (!cacheStates[cacheId]) {
        dispatch({
          type: CacheStatus.CREATE,
          payload: { cacheId, reactElement }
        }) //创建缓存
      }
      //有dom 表示删除dom
      else {
        const cacheState = cacheStates[cacheId]
        if (cacheState.status === CacheStatus.DESTROY) {
          //获取到旧的真实dom
          const doms = cacheState.doms
          if(doms)
          doms.forEach((dom) => dom.parentNode?.removeChild(dom))
          //创建新的dom
          dispatch({
            type: CacheStatus.CREATE,
            payload: { cacheId, reactElement }
          })
        }
      }
    },
    [cacheStates]
  )
  const handleScroll: ICacheContext["handleScroll"] = useCallback(
    (cacheId, event) => {
      // target是一个dom
      const target = event.target
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
      {Object.values(cacheStates)
        .filter((cacheState) => cacheState.status !== CacheStatus.DESTROY)
        .map(({ cacheId, reactElement }) => {
          return (
            //ref 绑定函数 name真实dom渲染后会执行
            <div
              id={`cache-${cacheId}`}
              key={cacheId}
              ref={(divDOM) => {
                const cacheState = cacheStates[cacheId]
                if (
                  divDOM &&
                  (!cacheState.doms ||
                    cacheState.status === CacheStatus.DESTROY)
                ) {
                  const doms = Array.from(divDOM.childNodes)
                  dispatch({
                    type: CacheStatus.CREATED,
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
