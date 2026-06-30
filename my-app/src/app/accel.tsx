import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const COLORS = { x: '#E07070', y: '#70C9B0', z: '#5BAEC2' };

function ValueBar({ value, color }: { value: number; color: string }) {
  const clamped = Math.max(-1, Math.min(1, value));
  const barWidth = Math.abs(clamped) * 50;
  const isPositive = clamped >= 0;

  return (
    <View style={bar.track}>
      <View style={bar.left}>
        {!isPositive && (
          <View style={[bar.fill, { width: `${barWidth}%`, backgroundColor: color }]} />
        )}
      </View>
      <View style={bar.center} />
      <View style={bar.right}>
        {isPositive && (
          <View style={[bar.fill, { width: `${barWidth}%`, backgroundColor: color }]} />
        )}
      </View>
    </View>
  );
}

export default function AccelScreen() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscriptionRef = useRef<ReturnType<typeof Accelerometer.addListener> | null>(null);

  const _subscribe = () => {
    subscriptionRef.current = Accelerometer.addListener(setData);
    setIsSubscribed(true);
  };

  const _unsubscribe = () => {
    subscriptionRef.current?.remove();
    subscriptionRef.current = null;
    setIsSubscribed(false);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const axes: { label: string; value: number; color: string }[] = [
    { label: 'X', value: x, color: COLORS.x },
    { label: 'Y', value: y, color: COLORS.y },
    { label: 'Z', value: z, color: COLORS.z },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accelerometer</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={isSubscribed ? _unsubscribe : _subscribe}
      >
        <Text style={styles.buttonText}>{isSubscribed ? 'Pause' : 'Resume'}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Live Values</Text>

      {axes.map(({ label, value, color }) => (
        <View key={label} style={styles.row}>
          <Text style={styles.axisLabel}>{label}</Text>
          <View style={styles.barContainer}>
            <ValueBar value={value} color={color} />
          </View>
          <Text style={styles.valueText}>{value.toFixed(4)}</Text>
        </View>
      ))}
    </View>
  );
}

const bar = StyleSheet.create({
  track: {
    flexDirection: 'row',
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  center: {
    width: 2,
    backgroundColor: '#BDBDBD',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  fill: {
    height: '100%',
    borderRadius: 14,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#E07070',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  axisLabel: {
    width: 24,
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  barContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  valueText: {
    width: 70,
    textAlign: 'right',
    fontSize: 14,
    color: '#555',
},
});
