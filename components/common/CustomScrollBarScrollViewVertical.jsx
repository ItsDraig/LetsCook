import React, { useRef, useState } from 'react';
import { Text, Animated, View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from '../../constants';

const CustomScrollBarScrollViewVertical = props => {
    const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
    const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
    const [showScrollBar, setShowScrollBar] = useState(false);
    const scrollIndicator = useRef(new Animated.Value(0)).current;

    const scrollIndicatorSize =
      completeScrollBarHeight > visibleScrollBarHeight
        ? (visibleScrollBarHeight * visibleScrollBarHeight) /
          completeScrollBarHeight
        : visibleScrollBarHeight;

    const difference =
      visibleScrollBarHeight > scrollIndicatorSize
        ? visibleScrollBarHeight - scrollIndicatorSize
        : 0;

    const scrollIndicatorPosition = Animated.multiply(
      scrollIndicator,
      visibleScrollBarHeight / completeScrollBarHeight
    ).interpolate({
      inputRange: [0, difference],
      outputRange: [0, difference],
      extrapolate: 'clamp'
    });

    return (
      <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10}}>
          <ScrollView
            style={styles.instructions}
            centerContent
            contentContainerStyle={{ paddingRight: 14 }}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={(width, height) => {setCompleteScrollBarHeight(height);}}
            onLayout={({nativeEvent: {layout: { height }}}) => {setVisibleScrollBarHeight(height);}}
            onScroll={Animated.event([{nativeEvent:{contentOffset: {y: scrollIndicator}}}],{useNativeDriver: false})}
            scrollEventThrottle={16}
          >
            <Pressable onHoverIn={() => setShowScrollBar(true)} onHoverOut={() => setShowScrollBar(false)} style={{cursor: 'text'}}>
            <Text style={styles.subtitleText}>Steps:</Text>
              {props.recipe.instructions?.map((step, index) => (
                <Text style={index % 2 === 0 ? styles.boldStepText : styles.stepText} key={index}>{step}</Text>))}
            </Pressable>
          </ScrollView>
          <View style={{ opacity: showScrollBar ? 1 : 0 }}>
            <View style={{ height: '100%', width: 6, backgroundColor: '#52057b', borderRadius: 8}}>
              <Animated.View style={{ width: 6, borderRadius: 8, backgroundColor: '#bc6ff1', height: scrollIndicatorSize, transform: [{ translateY: scrollIndicatorPosition }]}}/>
            </View>
          </View>
      </View>
    );
};

const styles = StyleSheet.create({
    instructions: {
      height: '100%',
    },
    subtitleText: {
        fontSize: SIZES.xLarge,
        fontFamily: FONT.medium,
        color: COLORS.white,
        paddingTop: SIZES.xSmall - 1,
    },
    boldStepText: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.bold,
        color: COLORS.white,
        paddingTop: SIZES.xSmall,
    },
    stepText: {
        fontSize: SIZES.small + 1,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginBottom: SIZES.small / 2,
    },
});

export default CustomScrollBarScrollViewVertical;