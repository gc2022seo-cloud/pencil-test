import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import DemoBanner from '../../components/DemoBanner';
import RestaurantCard from '../../components/RestaurantCard';
import { restaurants } from '../../data/mockData';
import { OrderStackParamList } from '../../navigation/types';
import { colors, fontSize, spacing } from '../../theme';

type Nav = NativeStackNavigationProp<OrderStackParamList, 'RestaurantList'>;

export default function RestaurantListScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={(r) => r.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Text style={styles.heading}>探索附近店家</Text>
            <Text style={styles.sub}>共 {restaurants.length} 間合作餐廳</Text>
            <DemoBanner />
          </View>
        }
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() =>
              navigation.navigate('Menu', { restaurantId: item.id })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  list: { padding: spacing.lg },
  heading: {
    fontSize: fontSize.xxl,
    fontWeight: '900',
    color: colors.navy,
  },
  sub: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
});
