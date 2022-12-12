import { ReactNode } from 'react'
import CacheTypes from './cache-types'
export type ICacheState = {
  [k in string]: {
    cacheId: string
    reactElement: ReactNode
    status: string
    doms: HTMLElement[]
    scrolls: { [k in symbol]: number  }
  }
}
const cacheReducer = (cacheStates: ICacheState, { type, payload }) => {
  const { cacheId, reactElement, doms } = payload
  switch (type) {
    case CacheTypes.CREATE: {
      return {
        ...cacheStates,
        [cacheId]: {
          cacheId, //缓存ID
          reactElement, // 要创建的虚拟dom
          status: CacheTypes.CREATE, // 状态是创建
          doms: undefined,
          scrolls: {} // 滚动信息
        }
      }
    }
    //代表真实dom已经被创建
    case CacheTypes.CREATED: {
      return {
        ...cacheStates,
        [cacheId]: {
          //一个缓存条目
          ...cacheStates[cacheId],
          status: CacheTypes.CREATED, // 状态是创建
          doms
        }
      }
    }
    default:
      return cacheStates
  }
}

export default cacheReducer
