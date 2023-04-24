import { Pressable } from '@react-native-material/core';
import { View, useColorScheme, } from 'react-native';
import { AppButtonColorDark } from '../../../tools/color';
import CustomText from './CustomText';
import { useState } from 'react';

export default function CustomButton({ onPress, backgroundColor, title }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const bgColor = backgroundColor ? backgroundColor : isDarkMode ? '#7c68ee' : AppButtonColorDark
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      style={{ backgroundColor: bgColor, justifyContent: 'center', alignContent: 'center', borderRadius: 20 }} onTouchStart={onPress} >
      <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
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