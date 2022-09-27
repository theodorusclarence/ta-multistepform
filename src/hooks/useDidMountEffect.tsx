import * as React from 'react';

const useDidMountEffect = (func: () => void, deps: unknown[]) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDidMountEffect;
