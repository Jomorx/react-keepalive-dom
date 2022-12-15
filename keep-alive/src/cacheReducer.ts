import { CacheStatus, ICacheDispatch, ICacheState } from "./cache-types"

const cacheReducer = (
  cacheStates: ICacheState,
  { type, payload }: ICacheDispatch
) => {
  const { cacheId, reactElement, doms } = payload
  switch (type) {
    case CacheStatus.CREATE: {
      return {
        ...cacheStates,
        [cacheId]: {
          cacheId, //缓存ID
          reactElement, // 要创建的虚拟dom
          status: CacheStatus.CREATE, // 状态是创建
          doms: undefined,
          scrolls: {} // 滚动信息
        }
      }
    }
    //代表真实dom已经被创建
    case CacheStatus.CREATED: {
      return {
        ...cacheStates,
        [cacheId]: {
          //一个缓存条目
          ...cacheStates[cacheId],
          status: CacheStatus.CREATED, // 状态是创建
          doms
        }
      }
    }
    case CacheStatus.DESTROY: {
      return {
        ...cacheStates,
        [cacheId]: {
          //一个缓存条目
          ...cacheStates[cacheId],
          status: CacheStatus.DESTROY // 状态是销毁
        }
      }
      break
    }
    default:
      return cacheStates
  }
}
export default cacheReducer
