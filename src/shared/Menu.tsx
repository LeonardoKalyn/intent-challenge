import * as React from "react";

function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox={'0 0 24 24'} {...props}>
      <path d="M24 6H0V2h24v4zm0 4H0v4h24v-4zm0 8H0v4h24v-4z" />
    </svg>
  );
}

const MemoMenu = React.memo(Menu);
export default MemoMenu;
