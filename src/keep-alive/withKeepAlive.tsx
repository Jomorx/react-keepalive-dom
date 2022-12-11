import { useContext, useEffect, useRef } from "react";
import CacheContext from "./cacheContext";

const withKeepAlive: (arg1: any, arg2?: any) => any = (
  OldComponent,
  { cacheId, scroll } = { cacheId: window.location.pathname, scroll: false }
) => {
  return (props) => {
    const { cacheStates, dispatch, mount } =
      useContext(CacheContext);
    const divRef = useRef<HTMLDivElement | null>(null);


    //可能是第一次，也可能是切回来
    useEffect(() => {
      const cacheState = cacheStates[cacheId];
      //孩子已经有了
      if (cacheState?.doms) {
        const { doms } = cacheState;
        doms.forEach((dom) => {
          divRef.current?.appendChild(dom);
        }); // 放孩子

      } else {
        //孩子还没有
        mount({ cacheId, reactElement: <OldComponent {...props} dispatch={dispatch} /> });
      }
    }, [mount, props, cacheStates]);

    return <div ref={divRef} id={`keep-alive_${cacheId}`}></div>;
  };
};

export default withKeepAlive;
