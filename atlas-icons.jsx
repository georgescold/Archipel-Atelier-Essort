// Inline SVG icons (stand-ins for lucide-react), stroke-based, currentColor.
function Svg({ size = 16, children, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      {...rest}>{children}</svg>
  );
}
const Compass = (p) => (<Svg {...p}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></Svg>);
const Menu = (p) => (<Svg {...p}><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></Svg>);
const X = (p) => (<Svg {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Svg>);
const Plus = (p) => (<Svg {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Svg>);
const ArrowUpRight = (p) => (<Svg {...p}><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></Svg>);
const ChevronUp = (p) => (<Svg {...p}><polyline points="18 15 12 9 6 15" /></Svg>);
const ChevronDown = (p) => (<Svg {...p}><polyline points="6 9 12 15 18 9" /></Svg>);
const Lock = (p) => (<Svg {...p}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Svg>);
const ArrowRight = (p) => (<Svg {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Svg>);

Object.assign(window, { Compass, Menu, X, Plus, ArrowUpRight, ChevronUp, ChevronDown, Lock, ArrowRight });
