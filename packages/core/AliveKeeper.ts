import { Dispatch, SetStateAction } from "react"
import { CacheItem, IAliveKeeper, TAliveKeeperC } from "../types"
import { DEFAULT_MAX_CACHE_LIMIT } from "./constant"

export class AliveKeeper implements IAliveKeeper {
  // 最大缓存数
  maxLimit: number
  // 缓存的列表
  cacheList : CacheItem[]
  // 刷新状态
  flushState: Dispatch<SetStateAction<object>>

  constructor(data: Pick<IAliveKeeper, TAliveKeeperC>) {
    this.maxLimit = data.maxLimit ?? DEFAULT_MAX_CACHE_LIMIT
    this.cacheList = []
  }
}
