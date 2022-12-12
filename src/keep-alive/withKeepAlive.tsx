import React, { useContext, useEffect, useRef } from 'react'
import CacheContext from './cacheContext'

const withKeepAlive: (
  arg1: any,
  arg2?: { cacheId: string; scroll: boolean }
) => any = (
  OldComponent,
  { cacheId, scroll } = { cacheId: window.location.pathname, scroll: false }
) => {
  return (props) => {
    const { cacheStates, dispatch, mount, handleScroll } =
      useContext(CacheContext)
    const divRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
      if (scroll) {
        divRef.current?.addEventListener(
          'scroll',
          handleScroll.bind(null, cacheId),
          true //监听捕获阶段
        )
      }
    }, [handleScroll])

    //可能是第一次，也可能是切回来
    useEffect(() => {
      console.log(cacheStates)

      const cacheState = cacheStates[cacheId]
      //孩子已经有了
      if (cacheState?.doms) {
        const { doms } = cacheState
        doms.forEach((dom) => {
          divRef.current?.appendChild(dom)
        }) // 放孩子

        if (scroll) {
          doms.forEach((dom) => {
            if (cacheState.scrolls[dom as unknown as symbol]) {
              dom.scrollTop = cacheState.scrolls[dom as unknown as symbol]
            }
          })
        }
      } else {
        //孩子还没有
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
