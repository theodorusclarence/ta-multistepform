import * as React from 'react';
import { Tooltip as ReactTippy, TooltipProps } from 'react-tippy';

import 'react-tippy/dist/tippy.css';

type TooltipTextProps = {
  /** Elements to be shown in the tooltip */
  content?: React.ReactNode;
  /** Tooltip trigger */
  children?: React.ReactNode;
  /** Add underline to children, useful for texts */
  withUnderline?: boolean;
  /** If using underline, you can customize the CSS */
  spanClassName?: string;
} & TooltipProps;

/** Tooltip to show additional content or information */
export default function Tooltip({
  content,
  children,
  ...rest
}: TooltipTextProps) {
  const props = {
    trigger: 'mouseenter',
    interactive: true,
    hideOnClick: false,
    html: <>{content}</>,
    children: children,
    ...rest,
  };
  return React.cloneElement(<ReactTippy />, { ...props });
}
