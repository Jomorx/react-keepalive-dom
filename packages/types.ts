export interface IAliveKeeper {
  maxLimit: number
  cacheList: CacheItem[]
  flushState: React.Dispatch<React.SetStateAction<object>>

}

// 缓存项
export interface CacheItem {
  // 缓存Id
  cacheId: string
  // 缓存状态
  status: CacheStatus
  // 缓存节点
  children: React.ReactNode
  // 更新标识
  updater: object
  // 挂载函数
  load: CacheLoadFn
}

export type CacheStatus = "created" | "activated" | "deactivated" | "destroyed" | "update";
export type CacheLoadFn = (DOM: HTMLDivElement | null) => void;

export type TAliveKeeperC = "maxLimit"|"cacheList"
