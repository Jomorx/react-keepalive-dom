import React, { useContext, useEffect, useRef } from "react"
import CacheContext from "./cacheContext"
import { CacheStatus, ICacheContext } from "./cache-types"
type IWithKeepAlive = (
  arg1: React.FC<Pick<ICacheContext, "dispatch">>,
  arg2?: { cacheId: string; scroll: boolean }
) => React.FC

const withKeepAlive: IWithKeepAlive = (
  OldComponent,
  { cacheId, scroll } = { cacheId: window.location.pathname, scroll: false }
) => {
  return (props) => {
    const { cacheStates, dispatch, mount, handleScroll } =
      useContext(CacheContext)
    const divRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
      const onScroll = handleScroll.bind(null, cacheId)
      if (scroll) {
        divRef.current?.addEventListener(
          "scroll",
          onScroll,
          true //监听捕获阶段
        )
      }
      //取消监听
      return divRef.current?.removeEventListener("scroll", onScroll)
    }, [handleScroll])

    //可能是第一次，也可能是切回来
    useEffect(() => {
      const cacheState = cacheStates[cacheId]
      //childNode
      if (cacheState?.doms && cacheState.status !== CacheStatus.DESTROY) {
        const { doms } = cacheState
        // 放childNode
        doms.forEach((dom) => {
          divRef.current?.appendChild(dom)
          if (scroll) {
            if (cacheState.scrolls[dom as unknown as symbol]) {
              dom.scrollTop = cacheState.scrolls[dom as unknown as symbol]
            }
          }
        })
      } else {
        //childNode还没有
        mount({
          cacheId,
          reactElement: <OldComponent {...props} dispatch={dispatch} />
        })
      }
    }, [mount, props, cacheStates, dispatch])

    return <div ref={divRef} id={`keep-alive_${cacheId}`}></div>
  }
}

export default withKeepAlive
