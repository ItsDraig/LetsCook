import React, { ComponentProps } from 'react'
import { FlatList } from 'react-native'
import { useDraggableScrollFlatList } from './use-draggable-scroll-flatlist.web'

export const DraggableFlatList = React.forwardRef<
  FlatList,
  ComponentProps<typeof FlatList>
>(function DraggableScrollView(props, ref) {
  const { refs } = useDraggableScrollFlatList<FlatList>({
    outerRef: ref,
    cursor: 'grab', // optional, default
  })

  return <FlatList ref={refs} horizontal {...props} />
})