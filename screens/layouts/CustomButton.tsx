import { Pressable } from '@react-native-material/core';
import { View, useColorScheme, } from 'react-native';
import CustomText from './CustomText';
import { useState } from 'react';
import { AppButtonColorDark } from '../../tools/color';

export default function CustomButton({ onPress, backgroundColor, title, height, width, style }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const bgColor = backgroundColor ? backgroundColor : isDarkMode ? '#7c68ee' : AppButtonColorDark;
  const hyt = height ? height : 50;
  const wit = width ? width : 70;
  return (
    <Pressable
      style={{ backgroundColor: bgColor, justifyContent: 'center', alignContent: 'center', borderRadius: 20 }} onTouchStart={onPress} >
      <View style={[style, { height: hyt, width: wit, justifyContent: 'center', alignItems: 'center' }]}>
        <CustomText style={{ fontWeight: 'bold', color: 'white' }} title={title} />
      </View>
    </Pressable>
  );
}
//

// function PressableWithScaleEffect() {
//   const [pressed, setPressed] = useState(false);
//   const scale = useSharedValue(1);

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: withSpring(scale.value) }],
//     };
//   });

//   return (
//     <Pressable
//       style={{ alignItems: 'center', justifyContent: 'center' }}
//       onPressIn={() => {
//         setPressed(true);
//         scale.value = 0.9;
//       }}
//       onPressOut={() => {
//         setPressed(false);
//         scale.value = 1;
//       }}
//     >
//       <Animated.View style={[animatedStyle]}>
//         <Text style={{ fontSize: 16 }}>Press me!</Text>
//       </Animated.View>
//     </Pressable>
//   );
// }