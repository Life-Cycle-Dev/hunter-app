import { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useHelperContext } from './providers/helper-provider';

export default function DebugBtn() {
  const { router, userData, isDebugMode } = useHelperContext()();
  const pan = useRef(new Animated.ValueXY({ x: 10, y: 100 })).current;
  const initialTouch = useRef({ x: 0, y: 0 });

  const onClick = () => {
    router.push('/debug');
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        initialTouch.current = { x: gestureState.x0, y: gestureState.y0 };
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        pan.flattenOffset();
        const dx = Math.abs(gestureState.moveX - initialTouch.current.x);
        const dy = Math.abs(gestureState.moveY - initialTouch.current.y);
        if (dx < 20 && dy < 20) {
          onClick();
        }
      },
    })
  ).current;

  if (!userData?.is_developer || !isDebugMode) {
    return;
  }

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        position: 'absolute',
        zIndex: 1000,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        transform: pan.getTranslateTransform(),
        shadowRadius: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        width: 40,
        height: 40,
      }}>
      <Icon name="tool" size={20} color="#1f329d" />
    </Animated.View>
  );
}
