import React, { ElementType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FloatingPortal,
  offset,
  shift,
  arrow,
  useHover,
  useInteractions,
  useFloating,
  Placement
} from '@floating-ui/react'
import { useRef, useState, useId } from 'react'
interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  placement?: Placement
}
function Popover({ children, className, renderPopover, as: Element = 'div', placement = 'bottom-end' }: Props) {
  const arrowRef = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { x, y, strategy, refs, context, middlewareData } = useFloating({
    middleware: [offset(15), shift(), arrow({ element: arrowRef })],
    placement: placement
  })
  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  const hover = useHover(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  const id = useId()
  return (
    <Element
      ref={refs.setReference}
      {...getReferenceProps()}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
      className={{ className }}
    >
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0
              }}
              {...getFloatingProps()}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <div className=''>
                <span
                  ref={arrowRef}
                  className='absolute z-[1] translate-y-[-100%] border-[12px] border-x-transparent border-t-transparent border-b-[aqua] '
                  style={{ left: middlewareData.arrow?.x, top: middlewareData.arrow?.y }}
                ></span>
                <div className='relative rounded-sm border border-gray-300 border-x-transparent  shadow-md '>
                  {renderPopover}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}

export default Popover
